export type PlatformId =
  | "openai"
  | "anthropic"
  | "azure"
  | "gemini"
  | "midjourney"
  | "cohere"
  | "groq"
  | "mistral"
  | "perplexity"
  | "other";

export type ContactMethod = {
  email?: string;
  phone?: string;
  whatsapp?: string;
  telegram?: string;
  discord?: string;
  reddit?: string;
};

export type Listing = {
  id: string;
  platform: PlatformId;
  title: string;
  description: string;
  creditAmount: number;
  creditUnit: "USD" | "credits" | "tokens";
  priceUSD: number;
  sellerName: string;
  contact: ContactMethod;
  createdAt: string;
  featured?: boolean;
};

export type ListingInput = Omit<Listing, "id" | "createdAt" | "featured">;
