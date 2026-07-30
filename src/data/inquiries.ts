import type {
  ContactInquiry,
  ContactInquiryInput,
  InquiryTopic,
} from "../types/inquiry";

export const inquiryTopics: { value: InquiryTopic; label: string }[] = [
  { value: "viewing", label: "Viewing" },
  { value: "valuation", label: "Valuation" },
  { value: "general", label: "General" },
];

export type InquiryErrors = Partial<Record<keyof ContactInquiryInput, string>>;

// Deliberately permissive: catches typos, not exotic-but-valid addresses.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MESSAGE_MIN_LENGTH = 10;

export function createEmptyInquiry(): ContactInquiryInput {
  return {
    name: "",
    email: "",
    phone: "",
    topic: "viewing",
    propertySlug: "",
    message: "",
  };
}

export function validateInquiry(input: ContactInquiryInput): InquiryErrors {
  const errors: InquiryErrors = {};

  if (!input.name.trim()) {
    errors.name = "Tell us who you are.";
  }

  const email = input.email.trim();
  if (!email) {
    errors.email = "We need an email to reply to.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "That does not look like an email address.";
  }

  const message = input.message.trim();
  if (!message) {
    errors.message = "Tell us what you are looking for.";
  } else if (message.length < MESSAGE_MIN_LENGTH) {
    errors.message = `At least ${MESSAGE_MIN_LENGTH} characters, please.`;
  }

  return errors;
}

/** Typed mapper for the storage boundary — trims here, once. */
export function toContactInquiry(input: ContactInquiryInput): ContactInquiry {
  return {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    topic: input.topic,
    propertySlug: input.propertySlug,
    message: input.message.trim(),
    submittedAt: new Date().toISOString(),
  };
}

/**
 * The single point where an enquiry leaves the app.
 *
 * NOTE: this does not persist anything yet — it only builds the record. Swap
 * the body for a Firestore `addDoc` (exported from src/firebase.ts) and no
 * caller has to change.
 */
export async function submitInquiry(
  input: ContactInquiryInput,
): Promise<ContactInquiry> {
  const inquiry = toContactInquiry(input);
  console.info("Contact enquiry (not yet persisted):", inquiry);
  return inquiry;
}
