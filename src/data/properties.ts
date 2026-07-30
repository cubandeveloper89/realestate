import type { Property } from "../types/property";

export const properties: Property[] = [
  {
    id: "rp-001",
    slug: "silverkeep-estate",
    title: "Silverkeep Estate",
    location: "Asheville, North Carolina",
    price: 1280000,
    currency: "USD",
    status: "available",
    type: "Estate",
    bedrooms: 5,
    bathrooms: 4,
    areaSqFt: 5200,
    heroImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    summary: "A secluded estate with mountain views, guest quarters, and formal gardens.",
    description:
      "Silverkeep Estate blends old-world character with practical modern comfort. The home offers generous entertaining spaces, quiet private suites, and outdoor areas designed for long stays and private gatherings.",
    features: [
      { label: "Lot", value: "3.8 acres" },
      { label: "Garage", value: "3 cars" },
      { label: "Highlight", value: "Mountain terrace" },
    ],
  },
  {
    id: "rp-002",
    slug: "ravenstone-villa",
    title: "Ravenstone Villa",
    location: "Charleston, South Carolina",
    price: 895000,
    currency: "USD",
    status: "reserved",
    type: "Villa",
    bedrooms: 4,
    bathrooms: 3,
    areaSqFt: 3400,
    heroImage:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
    summary: "A refined villa with courtyard living, warm interiors, and a walkable district.",
    description:
      "Ravenstone Villa is designed around a private courtyard that brings light into the main living areas. It suits buyers who want a polished home near restaurants, galleries, and historic streets.",
    features: [
      { label: "Outdoor", value: "Private courtyard" },
      { label: "Kitchen", value: "Chef-ready layout" },
      { label: "District", value: "Historic quarter" },
    ],
  },
  {
    id: "rp-003",
    slug: "goldenhall-penthouse",
    title: "Goldenhall Penthouse",
    location: "Miami, Florida",
    price: 1760000,
    currency: "USD",
    status: "available",
    type: "Penthouse",
    bedrooms: 3,
    bathrooms: 3,
    areaSqFt: 2850,
    heroImage:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=80",
    summary: "A bright penthouse with skyline views, private elevator access, and terrace dining.",
    description:
      "Goldenhall Penthouse puts the city at eye level. Floor-to-ceiling glass, a deep terrace, and direct elevator entry create a polished home for buyers who want privacy without leaving the center of the action.",
    features: [
      { label: "View", value: "Skyline and bay" },
      { label: "Access", value: "Private elevator" },
      { label: "Terrace", value: "Outdoor dining" },
    ],
  },
];

export function findPropertyBySlug(slug: string): Property | undefined {
  return properties.find((property) => property.slug === slug);
}

export function formatPropertyPrice(property: Property): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: property.currency,
    maximumFractionDigits: 0,
  }).format(property.price);
}
