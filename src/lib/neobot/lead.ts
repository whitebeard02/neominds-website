import { N8N_WEBHOOK_URL } from "@/config/env";
import { formatLeadTimestamp } from "@/lib/utils";

export type LeadState = {
  serviceInterest: string;
  projectType: string;
  budgetRange: string;
  name: string;
  email: string;
  leadSubmitted: boolean;
};

export const initialLeadState = (): LeadState => ({
  serviceInterest: "",
  projectType: "",
  budgetRange: "",
  name: "",
  email: "",
  leadSubmitted: false,
});

const EMAIL_PATTERN = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

const SERVICES = [
  "web development",
  "product development",
  "automation",
  "custom ai",
  "mobile development",
  "training",
] as const;

const BUDGET_PATTERNS = [
  /under\s*₹?\s*1\s*lakh/i,
  /₹?\s*1\s*[-–to]+\s*5\s*lakh/i,
  /₹?\s*5\s*[-–to]+\s*15\s*lakh/i,
  /₹?\s*15\s*lakh\+/i,
  /prefer not to say/i,
  /let'?s discuss/i,
];

export function isValidEmail(email: string): boolean {
  return email.includes("@") && email.includes(".") && EMAIL_PATTERN.test(email);
}

export function isValidName(name: string): boolean {
  return name.trim().length >= 2;
}

function extractEmail(text: string): string | null {
  const match = text.match(EMAIL_PATTERN);
  return match ? match[0].toLowerCase() : null;
}

function extractName(text: string, lastAssistantMessage?: string): string | null {
  const trimmed = text.trim();
  if (!trimmed || trimmed.includes("@")) return null;

  const explicitPatterns = [
    /(?:my name is|i'm|i am|call me|this is)\s+([a-zA-Z][a-zA-Z\s'.-]{1,48})/i,
    /(?:name[:\s]+)([a-zA-Z][a-zA-Z\s'.-]{1,48})/i,
  ];

  for (const pattern of explicitPatterns) {
    const match = trimmed.match(pattern);
    if (match?.[1] && isValidName(match[1])) {
      return match[1].trim();
    }
  }

  const askedForName =
    lastAssistantMessage &&
    /\b(name|what should i call you|may i (?:have|get) your name)\b/i.test(lastAssistantMessage);

  if (askedForName && /^[a-zA-Z][a-zA-Z\s'.-]{1,48}$/.test(trimmed) && isValidName(trimmed)) {
    return trimmed;
  }

  return null;
}

function detectServiceInterest(text: string): string | null {
  const lower = text.toLowerCase();
  const serviceMap: Record<string, string> = {
    "web development": "Web Development",
    "website": "Web Development",
    "web app": "Web Development",
    "product development": "Product Development",
    "mvp": "Product Development",
    "saas": "Product Development",
    automation: "Automation Solutions",
    workflow: "Automation Solutions",
    integration: "Automation Solutions",
    "custom ai": "Custom AI Projects",
    "ai project": "Custom AI Projects",
    llm: "Custom AI Projects",
    rag: "Custom AI Projects",
    "machine learning": "Custom AI Projects",
    "mobile development": "Mobile Development",
    "mobile app": "Mobile Development",
    ios: "Mobile Development",
    android: "Mobile Development",
    training: "Custom Training Programs",
    course: "Custom Training Programs",
    learn: "Custom Training Programs",
    upskill: "Custom Training Programs",
  };

  for (const [keyword, service] of Object.entries(serviceMap)) {
    if (lower.includes(keyword)) return service;
  }

  for (const service of SERVICES) {
    if (lower.includes(service)) {
      return service
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    }
  }

  return null;
}

function detectBudget(text: string): string | null {
  for (const pattern of BUDGET_PATTERNS) {
    if (pattern.test(text)) return text.match(pattern)?.[0] ?? text.trim();
  }

  const lower = text.toLowerCase();
  if (/\b(budget|₹|lakh|rupee|inr)\b/i.test(text)) {
    return text.trim().slice(0, 120);
  }
  if (lower.includes("not sure") || lower.includes("don't know")) {
    return "Prefer not to say";
  }

  return null;
}

export function updateLeadStateFromMessage(
  state: LeadState,
  userMessage: string,
  lastAssistantMessage?: string,
): LeadState {
  const next = { ...state };

  const email = extractEmail(userMessage);
  if (email && isValidEmail(email)) {
    if (next.email && next.email !== email) {
      next.leadSubmitted = false;
    }
    next.email = email;
  }

  const name = extractName(userMessage, lastAssistantMessage);
  if (name && isValidName(name)) {
    if (next.name && next.name !== name) {
      next.leadSubmitted = false;
    }
    next.name = name;
  }

  const service = detectServiceInterest(userMessage);
  if (service) next.serviceInterest = service;

  const budget = detectBudget(userMessage);
  if (budget) next.budgetRange = budget;

  if (userMessage.trim().length > 15 && !next.projectType) {
    const serviceHit = detectServiceInterest(userMessage);
    if (serviceHit || /\b(build|project|need|want|looking|help)\b/i.test(userMessage)) {
      next.projectType = userMessage.trim().slice(0, 300);
    }
  } else if (userMessage.trim().length > 20) {
    next.projectType = userMessage.trim().slice(0, 300);
  }

  return next;
}

export type LeadPayload = {
  name: string;
  email: string;
  source: "NeoBOT";
  timestamp: string;
  projectType?: string;
  budgetRange?: string;
};

export async function submitLeadWebhook(state: LeadState): Promise<void> {
  if (!isValidName(state.name) || !isValidEmail(state.email)) {
    return;
  }

  const projectType = state.projectType || state.serviceInterest || undefined;

  const payload: LeadPayload = {
    name: state.name.trim(),
    email: state.email.trim(),
    source: "NeoBOT",
    timestamp: formatLeadTimestamp(),
  };

  if (projectType) payload.projectType = projectType;
  if (state.budgetRange) payload.budgetRange = state.budgetRange;

  // For compatibility with the Contact Form -> n8n flow, include common fields
  // such as `service`, `phone` and `message` so downstream mappings work.
  const enrichedPayload = {
    ...payload,
    // keep the existing projectType but also supply `service` expected by n8n
    service: projectType ?? "",
    phone: (state as any).phone ?? "",
    message: projectType ?? "",
    budgetRange: state.budgetRange ?? "",
  } as Record<string, unknown>;

  try {
    // Log payload for visibility when debugging lead submissions
    // (kept lightweight and non-sensitive)
    console.info("[NeoBOT] submitting lead webhook:", { name: enrichedPayload.name, email: enrichedPayload.email, service: enrichedPayload.service });

    await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enrichedPayload),
    });
  } catch (error) {
    console.error("[NeoBOT] Lead webhook failed:", error);
  }
}

export function shouldSubmitLead(state: LeadState): boolean {
  return (
    !state.leadSubmitted &&
    isValidName(state.name) &&
    isValidEmail(state.email)
  );
}
