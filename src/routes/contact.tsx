import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Linkedin, Twitter, Instagram, Github } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { PageHeader } from "@/components/PageHeader";
import { N8N_WEBHOOK_URL } from "@/config/env";
import { formatLeadTimestamp } from "@/lib/utils";
import { site } from "@/lib/site";

const services = [
  "Web Development",
  "Product Development",
  "Automation Solutions",
  "Custom AI Projects",
  "Mobile Development",
  "Custom Training Programs",
];

const budgetRanges = [
  "Under ₹25,000",
  "₹25,000 – ₹75,000",
  "₹75,000 – ₹2,00,000",
  "₹2,00,000 – ₹5,00,000",
  "₹5,00,000+",
  "Not Sure Yet",
] as const;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Neominds Tech Hub" },
      { name: "description", content: "Talk to our team about a project, a program, or a partnership. Based in Hyderabad. Reach us by email, phone, or form." },
      { property: "og:title", content: "Contact — Neominds Tech Hub" },
    ],
  }),
  component: Page,
});

type FormFields = "name" | "email" | "phone" | "service" | "budgetRange" | "message";
type Errors = Partial<Record<FormFields, string>>;

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  budgetRange: "",
  message: "",
};

function Page() {
  useReveal();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    if (!form.email.trim()) e.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Enter a valid email address";
    if (!form.phone.trim()) e.phone = "Please enter your phone number";
    if (!form.service) e.service = "Please choose a service";
    if (!form.budgetRange) e.budgetRange = "Please select a budget range";
    if (!form.message.trim() || form.message.trim().length < 10) e.message = "Message should be at least 10 characters";
    return e;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const eMap = validate();
    setErrors(eMap);
    if (Object.keys(eMap).length) return;

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      service: form.service,
      budgetRange: form.budgetRange,
      message: form.message.trim(),
      source: "Contact Form" as const,
      timestamp: formatLeadTimestamp(),
    };

    setStatus("submitting");

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Webhook responded with ${response.status}`);
      }

      setStatus("success");
      setForm(emptyForm);
    } catch (error) {
      console.error("[Contact Form] Webhook submission failed:", error);
      setStatus("error");
    }
  };

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
    },
  });

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={<>Let's start a <span className="text-gradient-primary">conversation.</span></>}
        description="Tell us about your project, your team, or your learning goals. We reply within one business day."
      />

      <section className="pb-24">
        <div className="container-x grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          {/* Info */}
          <aside className="reveal flex flex-col gap-4">
            {[
              { icon: MapPin, title: "Visit us", body: site.address },
              { icon: Mail, title: "Email", body: site.email, href: `mailto:${site.email}` },
              { icon: Phone, title: "Phone", body: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
              { icon: Clock, title: "Business hours", body: site.hours },
            ].map((c) => {
              const Icon = c.icon;
              const Inner = (
                <>
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{c.title}</div>
                    <div className="mt-1 text-sm text-foreground/90">{c.body}</div>
                  </div>
                </>
              );
              return c.href ? (
                <a key={c.title} href={c.href} className="hover-lift flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-card">
                  {Inner}
                </a>
              ) : (
                <div key={c.title} className="hover-lift flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-card">
                  {Inner}
                </div>
              );
            })}

            <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Follow us</div>
              <div className="mt-3 flex gap-2">
                {[Linkedin, Twitter, Instagram, Github].map((Icon, i) => (
                  <a key={i} href="#" aria-label="Social link" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-white/[0.03] text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </aside>

          {/* Form */}
          <form
            noValidate
            onSubmit={onSubmit}
            className="reveal rounded-3xl border border-border bg-card p-6 shadow-elegant sm:p-9"
            aria-label="Contact form"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="name" label="Full name" error={errors.name}>
                <input id="name" type="text" autoComplete="name" required maxLength={100} className={inputCls} placeholder="Your name" {...field("name")} />
              </Field>
              <Field id="email" label="Email" error={errors.email}>
                <input id="email" type="email" autoComplete="email" required maxLength={255} className={inputCls} placeholder="you@company.com" {...field("email")} />
              </Field>
              <Field id="phone" label="Phone" error={errors.phone}>
                <input id="phone" type="tel" autoComplete="tel" required maxLength={20} className={inputCls} placeholder="+91 ..." {...field("phone")} />
              </Field>
              <Field id="service" label="Service interested in" error={errors.service}>
                <select id="service" required className={selectCls} {...field("service")}>
                  <option value="">Select a service</option>
                  {services.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field id="budgetRange" label="Budget range" error={errors.budgetRange}>
                  <select id="budgetRange" required className={selectCls} {...field("budgetRange")}>
                    <option value="">Select your budget range</option>
                    {budgetRanges.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field id="message" label="Message" error={errors.message}>
                  <textarea id="message" rows={5} required maxLength={2000} className={`${inputCls} resize-none`} placeholder="Tell us a bit about your project or goals…" {...field("message")} />
                </Field>
              </div>
            </div>

            <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">We respect your privacy. Your info stays with us.</p>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : (<>Send message <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></>)}
              </button>
            </div>

            {status === "success" && (
              <div role="status" className="mt-5 flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Thank you for contacting Neominds Tech Hub. Our team has received your message and will get back to you shortly.
              </div>
            )}

            {status === "error" && (
              <div role="alert" className="mt-5 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-foreground">
                Something went wrong sending your message. Please try again in a moment.
              </div>
            )}
          </form>
        </div>

        {/* Map */}
        <div className="container-x mt-16">
          <div className="reveal overflow-hidden rounded-3xl border border-border shadow-elegant">
            <iframe
              title="Neominds Tech Hub location map"
              loading="lazy"
              src="https://www.google.com/maps?q=Moguls+Court+Basheerbagh+Hyderabad&output=embed"
              className="h-[360px] w-full grayscale-[60%] contrast-[1.05]"
              style={{ border: 0, filter: "invert(0.92) hue-rotate(180deg)" }}
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}

const inputCls =
  "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

const selectCls = `${inputCls} min-h-[48px] cursor-pointer appearance-none bg-[length:1rem] bg-[right_0.875rem_center] bg-no-repeat pr-10 [background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23a3a3a3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")]`;

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </label>
      {children}
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}
