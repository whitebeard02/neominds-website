import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { Bot, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { neobotChat } from "@/lib/api/neobot.functions";
import { NEOBOT_SYSTEM_PROMPT } from "@/lib/neobot/system-prompt";
import {
  initialLeadState,
  shouldSubmitLead,
  submitLeadWebhook,
  updateLeadStateFromMessage,
  type LeadState,
} from "@/lib/neobot/lead";
import { useIsMobile } from "@/hooks/use-mobile";
import { TypingIndicator } from "./TypingIndicator";

type ChatRole = "system" | "user" | "assistant";

type ChatMessage = {
  role: ChatRole;
  content: string;
};

type DisplayMessage = {
  role: "user" | "assistant";
  content: string;
};

const WELCOME_MESSAGE =
  "Hi! I'm NeoBOT, your guide to Neominds Tech Hub. Whether you're exploring our services, training programs, or ready to start a project — I'm here to help. What brings you here today?";

const ERROR_MESSAGE =
  "Sorry, I'm having trouble connecting right now. Please try again in a moment.";

function buildApiMessages(history: ChatMessage[]): ChatMessage[] {
  return [{ role: "system", content: NEOBOT_SYSTEM_PROMPT }, ...history.filter((m) => m.role !== "system")];
}

export function NeoBOT() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [leadState, setLeadState] = useState<LeadState>(initialLeadState);
  const [displayMessages, setDisplayMessages] = useState<DisplayMessage[]>([
    { role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [apiHistory, setApiHistory] = useState<ChatMessage[]>([
    { role: "assistant", content: WELCOME_MESSAGE },
  ]);

  const panelRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "auto") => {
    const el = messagesRef.current;
    if (!el) return;
    try {
      el.scrollTo({ top: el.scrollHeight, behavior });
    } catch {
      // fallback to end ref
      messagesEndRef.current?.scrollIntoView({ behavior });
    }
  }, []);

  useEffect(() => {
    const el = messagesRef.current;
    if (!el) return;

    // If user is near bottom, or a user message was just added, or loading finished,
    // auto-scroll. Using rAF ensures layout is stable before scrolling to avoid jank.
    const isNearBottom = el.scrollHeight - el.clientHeight - el.scrollTop < 140;
    const lastMsg = displayMessages[displayMessages.length - 1];
    const justUserMessage = lastMsg?.role === "user";

    if (isNearBottom || justUserMessage || !isLoading) {
      requestAnimationFrame(() => scrollToBottom("smooth"));
    }
  }, [displayMessages, isLoading, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      const timer = window.setTimeout(() => inputRef.current?.focus(), 280);
      return () => window.clearTimeout(timer);
    }
    launcherRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const trySubmitLead = useCallback(async (state: LeadState) => {
    if (!shouldSubmitLead(state)) return state;

    await submitLeadWebhook(state);
    return { ...state, leadSubmitted: true };
  }, []);

  const sendMessage = useCallback(
    async (rawText: string) => {
      const text = rawText.trim();
      if (!text || isLoading) return;

      const lastAssistant = [...displayMessages].reverse().find((m) => m.role === "assistant")?.content;

      const userMessage: DisplayMessage = { role: "user", content: text };
      setDisplayMessages((prev) => [...prev, userMessage]);
      setApiHistory((prev) => [...prev, { role: "user", content: text }]);
      setInput("");
      setIsLoading(true);

      const updatedLead = updateLeadStateFromMessage(leadState, text, lastAssistant);
      setLeadState(updatedLead);

      try {
        const messages = buildApiMessages([...apiHistory, { role: "user", content: text }]);
        const result = await neobotChat({ data: { messages } });

        const assistantMessage: DisplayMessage = { role: "assistant", content: result.content };
        setDisplayMessages((prev) => [...prev, assistantMessage]);
        setApiHistory((prev) => [...prev, { role: "assistant", content: result.content }]);

        const finalLead = await trySubmitLead(updatedLead);
        setLeadState(finalLead);
      } catch {
        const errorMsg: DisplayMessage = { role: "assistant", content: ERROR_MESSAGE };
        setDisplayMessages((prev) => [...prev, errorMsg]);
        setApiHistory((prev) => [...prev, { role: "assistant", content: ERROR_MESSAGE }]);
      } finally {
        setIsLoading(false);
      }
    },
    [apiHistory, displayMessages, isLoading, leadState, trySubmitLead],
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void sendMessage(input);
  };

  const onInputKeyDown = (e: ReactKeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage(input);
    }
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] flex items-end justify-end p-3 sm:p-5">
      {/* Chat panel */}
      <div
        id="neobot-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="NeoBOT chat"
        className={cn(
          "neobot-panel pointer-events-auto flex origin-bottom-right flex-col overflow-hidden rounded-2xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isOpen
            ? "neobot-panel-open scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0",
          isMobile
            ? "fixed inset-x-3 bottom-[4.75rem] top-auto max-h-[min(72dvh,calc(100dvh-6rem))] w-auto"
            : "mb-[4.25rem] h-[min(560px,calc(100dvh-7rem))] w-[min(400px,calc(100vw-2rem))]",
        )}
      >
        {/* Header */}
        <div className="neobot-panel-header flex shrink-0 items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/15 text-primary ring-1 ring-inset ring-primary/25">
              <Bot className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-display text-sm font-semibold leading-tight">NeoBOT</h2>
              <p className="text-[11px] text-muted-foreground">Neominds Tech Hub Assistant</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="neobot-close-btn grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={messagesRef}
          className="neobot-messages min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4"
          aria-live="polite"
          aria-relevant="additions"
        >
          <ul className="flex flex-col gap-3">
            {displayMessages.map((msg, i) => (
              <li
                key={`${msg.role}-${i}`}
                className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[88%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                    msg.role === "user"
                      ? "neobot-bubble-user rounded-br-md"
                      : "neobot-bubble-assistant rounded-bl-md",
                  )}
                >
                  {msg.content}
                </div>
              </li>
            ))}
            {isLoading && (
              <li>
                <TypingIndicator />
              </li>
            )}
          </ul>
          <div ref={messagesEndRef} className="h-px shrink-0" aria-hidden="true" />
        </div>

        {/* Input */}
        <form
          onSubmit={onSubmit}
          className="neobot-input-area shrink-0 p-3"
        >
          <div className="flex items-end gap-2">
            <label htmlFor="neobot-input" className="sr-only">
              Message NeoBOT
            </label>
            <textarea
              id="neobot-input"
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onInputKeyDown}
              disabled={isLoading}
              placeholder="Ask about our services…"
              className="neobot-input max-h-24 min-h-[44px] flex-1 resize-none rounded-xl px-3 py-2.5 text-sm outline-none disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Launcher */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className={cn(
          "pointer-events-auto absolute bottom-3 right-3 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_48px_-8px_oklch(0.58_0.22_25_/_0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-5 sm:right-5 sm:h-[3.75rem] sm:w-[3.75rem]",
          isOpen && "neobot-launcher-active scale-95",
        )}
        aria-label={isOpen ? "Close NeoBOT chat" : "Open NeoBOT chat"}
        aria-expanded={isOpen}
        aria-controls="neobot-panel"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
        {!isOpen && (
          <span
            className="absolute inset-0 rounded-full animate-[glow-pulse_2.5s_ease-in-out_infinite]"
            aria-hidden="true"
          />
        )}
      </button>
    </div>
  );
}
