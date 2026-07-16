// Reading time is derived from the post body, never stored. A stored value goes
// stale the moment the text is edited, and invites made-up numbers.

// 200 words per minute is the usual figure for prose; technical writing sits at
// the slower end of the range, so this errs slightly generous rather than
// promising a faster read than the reader gets.
const WORDS_PER_MINUTE = 200;

export function readingTime(body: string): string {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
  return `${minutes} min`;
}
