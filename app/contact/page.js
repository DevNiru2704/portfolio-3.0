'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Github, Linkedin, Mail, Twitter, Loader2, MapPin, Clock } from 'lucide-react';
import { owner } from '@/config/owner';
import { GridBg } from '@/components/site/grid-bg';
import { toast } from 'sonner';

function ContactPage() {
  const [state, setState] = useState('idle'); // idle | submitting | success | error
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const onSubmit = async (e) => {
    e.preventDefault();
    setState('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Network');
      setState('success');
      toast.success('Message received. I’ll reply within 24h.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setState('error');
      toast.error('Something went wrong. Try again or email directly.');
    }
  };

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
              <span className="text-gradient">Let’s build</span> <span className="text-gradient-accent">something</span>.
            </h1>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Tell me about the system you’re trying to build. Freelance, full-time, advisory, or open source — I read every message.
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

          <div className="relative">
            <AnimatePresence mode="wait">
              {state !== 'success' ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={onSubmit}
                  className="relative rounded-2xl border border-border bg-card/70 p-6 backdrop-blur shadow-[0_30px_120px_-40px_hsl(var(--glow-cyan)/0.25)]"
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">new message</div>
                  <div className="mt-1 text-lg font-semibold">Open a conversation</div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <Field label="Name" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                    <Field type="email" label="Email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                  </div>
                  <Field label="Subject" value={form.subject} onChange={(v) => setForm({ ...form, subject: v })} />
                  <Field
                    label="Message"
                    required
                    textarea
                    value={form.message}
                    onChange={(v) => setForm({ ...form, message: v })}
                  />
                  <button
                    type="submit"
                    disabled={state === 'submitting'}
                    className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
                  >
                    {state === 'submitting' ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
                    ) : (
                      <>Send message <ArrowRight className="h-4 w-4" /></>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="relative grid place-items-center rounded-2xl border border-border bg-card/70 p-10 text-center backdrop-blur"
                >
                  <div className="relative grid h-16 w-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-400">
                    <CheckCircle2 className="h-8 w-8" />
                    <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/30" />
                  </div>
                  <h2 className="mt-6 text-2xl font-semibold tracking-tight">Message received.</h2>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    Your message is in the queue. Average response time is under 24 hours.
                  </p>
                  <button
                    onClick={() => setState('idle')}
                    className="mt-5 inline-flex h-9 items-center gap-2 rounded-full border border-border bg-background px-4 text-xs hover:border-foreground/30"
                  >
                    Send another
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, value, onChange, required, type = 'text', textarea }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {label} {required && <span className="text-red-400">*</span>}
      </span>
      {textarea ? (
        <textarea
          required={required}
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-foreground/30 focus:outline-none"
        />
      ) : (
        <input
          required={required}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm placeholder:text-muted-foreground focus:border-foreground/30 focus:outline-none"
        />
      )}
    </label>
  );
}
function InfoRow({ icon: Icon, label, value, href, external }) {
  const Cmp = href ? 'a' : 'div';
  const props = href ? (external ? { href, target: '_blank', rel: 'noreferrer' } : { href }) : {};
  return (
    <Cmp className="flex items-center gap-3 rounded-xl border border-border bg-card/40 p-3 text-sm transition-colors hover:border-foreground/20" {...props}>
      <span className="grid h-8 w-8 place-items-center rounded-md border border-border bg-background">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
        <div>{value}</div>
      </div>
    </Cmp>
  );
}
function Social({ icon: Icon, href }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="inline-grid h-10 w-10 place-items-center rounded-full border border-border bg-card/60 text-muted-foreground transition-colors hover:text-foreground">
      <Icon className="h-4 w-4" />
    </a>
  );
}
function App() {
  return <ContactPage />;
}
export default App;
