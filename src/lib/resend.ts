import { Resend } from "resend";

// Lazily build the client; returns null when no API key is configured.
let client: Resend | null = null;

export function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  client ??= new Resend(key);
  return client;
}
