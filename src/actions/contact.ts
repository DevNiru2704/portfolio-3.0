"use server";

import { contactSchema, type ContactInput } from "@/validators/contact";
import { messageRepository } from "@/repositories/message-repository";
import { getResend } from "@/lib/resend";
import { owner } from "@/config/owner";

export type ContactState = { status: "success" } | { status: "error"; message: string };

export async function submitContactAction(input: ContactInput): Promise<ContactState> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const { name, email, subject, message } = parsed.data;

  try {
    await messageRepository.create({ name, email, subject, message });
  } catch (error) {
    console.error("Failed to persist contact message:", error);
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  // Email is a best-effort notification; a delivery failure must not lose the saved message.
  await notifyOwner({ name, email, subject, message }).catch((error) =>
    console.error("Failed to send contact notification:", error),
  );

  return { status: "success" };
}

async function notifyOwner({ name, email, subject, message }: ContactInput): Promise<void> {
  const resend = getResend();
  if (!resend) return;

  await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
    to: process.env.CONTACT_TO_EMAIL ?? owner.email,
    replyTo: email,
    subject: `New contact - ${subject?.trim() || "(no subject)"} · ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });
}
