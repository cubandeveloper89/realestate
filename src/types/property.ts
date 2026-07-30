export type PropertyStatus = "available" | "reserved" | "sold";

export interface PropertyFeature {
  label: string;
  value: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  location: string;
  price: number;
  currency: "USD";
  status: PropertyStatus;
  type: "Estate" | "Villa" | "Townhouse" | "Penthouse";
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  heroImage: string;
  summary: string;
  description: string;
  features: PropertyFeature[];
}
