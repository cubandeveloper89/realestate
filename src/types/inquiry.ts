export type InquiryTopic = "viewing" | "valuation" | "general";

/** What the contact form collects. */
export interface ContactInquiryInput {
  name: string;
  email: string;
  phone: string;
  topic: InquiryTopic;
  /** Slug of the property the enquiry is about, or "" for a general enquiry. */
  propertySlug: string;
  message: string;
}

/** What crosses the storage boundary once the form is accepted. */
export interface ContactInquiry extends ContactInquiryInput {
  id: string;
  submittedAt: string;
}
