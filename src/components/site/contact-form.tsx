"use client";

import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { submitContactAction } from "@/actions/contact";
import { contactSchema, type ContactInput } from "@/validators/contact";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    const result = await submitContactAction(values);
    if (result.status === "success") {
      toast.success("Message received. I'll reply within 24h.");
      reset();
    } else {
      toast.error(result.message);
      throw new Error(result.message); // keep isSubmitSuccessful false
    }
  });

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!isSubmitSuccessful ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            onSubmit={onSubmit}
            noValidate
            className="relative rounded-2xl border border-border bg-card/70 p-6 backdrop-blur shadow-[0_30px_120px_-40px_hsl(var(--signal)/0.25)]"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">new message</div>
            <div className="mt-1 text-lg font-semibold">Open a conversation</div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Field label="Name" required error={errors.name?.message} registration={register("name")} />
              <Field label="Email" type="email" required error={errors.email?.message} registration={register("email")} />
            </div>
            <Field label="Subject" error={errors.subject?.message} registration={register("subject")} />
            <Field label="Message" required textarea error={errors.message?.message} registration={register("message")} />

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  Send message <ArrowRight className="h-4 w-4" />
                </>
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
              onClick={() => reset()}
              className="mt-5 inline-flex h-9 items-center gap-2 rounded-full border border-border bg-background px-4 text-xs hover:border-foreground/30"
            >
              Send another
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface FieldProps {
  label: string;
  registration: UseFormRegisterReturn;
  required?: boolean;
  textarea?: boolean;
  type?: string;
  error?: string;
}

function Field({ label, registration, required, textarea, type = "text", error }: FieldProps) {
  const base =
    "mt-1 w-full rounded-lg border border-border bg-background px-3 text-sm placeholder:text-muted-foreground focus:border-foreground/30 focus:outline-none";
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {label} {required && <span className="text-red-400">*</span>}
      </span>
      {textarea ? (
        <textarea rows={5} className={`${base} py-2`} {...registration} />
      ) : (
        <input type={type} className={`${base} h-10`} {...registration} />
      )}
      {error && <span className="mt-1 block text-[11px] text-red-400">{error}</span>}
    </label>
  );
}
