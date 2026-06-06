export function TypingIndicator() {
  return (
    <div
      className="flex items-start gap-2"
      role="status"
      aria-live="polite"
      aria-label="NeoBOT is typing"
    >
      <div className="neobot-typing-bubble rounded-2xl rounded-bl-md px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="sr-only">NeoBOT is typing</span>
          <span className="neobot-typing-dot h-2.5 w-2.5 rounded-full bg-primary" />
          <span className="neobot-typing-dot neobot-typing-dot-2 h-2.5 w-2.5 rounded-full bg-primary/80" />
          <span className="neobot-typing-dot neobot-typing-dot-3 h-2.5 w-2.5 rounded-full bg-primary/60" />
        </div>
      </div>
    </div>
  );
}
