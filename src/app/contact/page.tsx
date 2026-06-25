import type { Metadata } from "next";
import type { ComponentType } from "react";
import { Github, Linkedin, Mail, Twitter, MapPin, Clock } from "lucide-react";
import { owner } from "@/config/owner";
import { GridBg } from "@/components/site/grid-bg";
import { ContactForm } from "@/components/site/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${owner.name} for freelance, full-time, advisory or open source work.`,
};

export default function ContactPage() {
  return (
    <div>
      <section className="relative isolate overflow-hidden border-b border-border">
        <GridBg />
        <div className="container relative grid gap-10 py-16 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-pulse-dot rounded-full bg-emerald-400" />
                <span className="absolute inset-0 rounded-full bg-emerald-400/60" />
              </span>
              Available · Avg response 24h
            </div>
            <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight md:text-7xl">
              <span className="text-gradient">Let&apos;s build</span>{" "}
              <span className="text-gradient-accent">something</span>.
            </h1>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Tell me about the system you&apos;re trying to build. Freelance, full-time, advisory, or open source — I read
              every message.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <InfoRow icon={Mail} label="Email" value={owner.email} href={`mailto:${owner.email}`} />
              <InfoRow icon={MapPin} label="Location" value={owner.location} />
              <InfoRow icon={Clock} label="Timezone" value={owner.timezone} />
              <InfoRow icon={Github} label="GitHub" value={`@${owner.githubUser}`} href={owner.github} external />
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Social icon={Github} href={owner.github} />
              <Social icon={Linkedin} href={owner.linkedin} />
              <Social icon={Twitter} href={owner.twitter} />
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </div>
  );
}

interface InfoRowProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

function InfoRow({ icon: Icon, label, value, href, external }: InfoRowProps) {
  const className =
    "flex items-center gap-3 rounded-xl border border-border bg-card/40 p-3 text-sm transition-colors hover:border-foreground/20";
  const content = (
    <>
      <span className="grid h-8 w-8 place-items-center rounded-md border border-border bg-background">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
        <div>{value}</div>
      </div>
    </>
  );

  if (!href) return <div className={className}>{content}</div>;
  return (
    <a className={className} href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
      {content}
    </a>
  );
}

function Social({ icon: Icon, href }: { icon: ComponentType<{ className?: string }>; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-grid h-10 w-10 place-items-center rounded-full border border-border bg-card/60 text-muted-foreground transition-colors hover:text-foreground"
    >
      <Icon className="h-4 w-4" />
    </a>
  );
}
