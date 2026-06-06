import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Github } from "lucide-react";
import { Logo } from "./Logo";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border bg-[var(--gradient-surface)]">
      <div className="container-x py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm text-muted-foreground">
              IT Solutions, AI Engineering, and a thriving training community of {site.community} members.
            </p>
            <div className="mt-6 flex gap-2">
              {[Linkedin, Twitter, Instagram, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-10 w-10 place-items-center rounded-full border border-border bg-white/[0.03] text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-foreground/80 transition-colors hover:text-primary">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-foreground/80">
              <li>Web Development</li>
              <li>Product Development</li>
              <li>Automation Solutions</li>
              <li>Custom AI Projects</li>
              <li>Mobile Development</li>
              <li>Training Programs</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex gap-3 text-foreground/80">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{site.address}</span>
              </li>
              <li className="flex gap-3 text-foreground/80">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href={`mailto:${site.email}`} className="hover:text-primary">{site.email}</a>
              </li>
              <li className="flex gap-3 text-foreground/80">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-primary">{site.phone}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="tracking-wide">{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
