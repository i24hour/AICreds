import type { Listing } from "@/lib/types";

export const SEED_LISTINGS: Listing[] = [
  {
    id: "lst_openai_420",
    platform: "openai",
    title: "OpenAI API balance — ready to transfer",
    description:
      "Unused OpenAI prepaid balance from a closed side project. Account is in good standing. Happy to walk through transfer over a quick call.",
    creditAmount: 420,
    creditUnit: "USD",
    priceUSD: 340,
    sellerName: "Maya Chen",
    contact: {
      email: "maya.sells.ai@example.com",
      telegram: "@mayachen",
      discord: "maya.c#2140",
    },
    createdAt: "2026-07-24T10:00:00.000Z",
    featured: true,
  },
  {
    id: "lst_anthropic_850",
    platform: "anthropic",
    title: "Anthropic Claude credits — bulk lot",
    description:
      "Team plan credits we no longer need after migrating stacks. Prefer buyers who can close within 48 hours.",
    creditAmount: 850,
    creditUnit: "USD",
    priceUSD: 680,
    sellerName: "Jordan Hale",
    contact: {
      email: "jordan.hale@example.com",
      whatsapp: "+1 415 555 0198",
      reddit: "u/jordanhale",
    },
    createdAt: "2026-07-22T14:30:00.000Z",
    featured: true,
  },
  {
    id: "lst_azure_1200",
    platform: "azure",
    title: "Azure OpenAI committed spend remainder",
    description:
      "Remaining Azure OpenAI credit on a pay-as-you-go subscription. Includes notes on region and model access currently enabled.",
    creditAmount: 1200,
    creditUnit: "USD",
    priceUSD: 950,
    sellerName: "Priya Nair",
    contact: {
      email: "priya.nair.dev@example.com",
      phone: "+1 646 555 0112",
      telegram: "@priyanair",
    },
    createdAt: "2026-07-20T09:15:00.000Z",
    featured: true,
  },
  {
    id: "lst_gemini_200",
    platform: "gemini",
    title: "Google Gemini API credits",
    description:
      "Smaller lot ideal for experimentation. Fast response on email or Discord.",
    creditAmount: 200,
    creditUnit: "USD",
    priceUSD: 155,
    sellerName: "Alex Rivera",
    contact: {
      email: "alex.r@example.com",
      discord: "alexrivera",
      whatsapp: "+44 7700 900123",
    },
    createdAt: "2026-07-18T16:45:00.000Z",
  },
  {
    id: "lst_midjourney_12",
    platform: "midjourney",
    title: "Midjourney Pro months — transferable seat",
    description:
      "Twelve months of Pro access leftover from a studio retainer. Will coordinate handoff privately.",
    creditAmount: 12,
    creditUnit: "credits",
    priceUSD: 280,
    sellerName: "Sam Okonkwo",
    contact: {
      email: "sam.studio@example.com",
      telegram: "@samok",
      reddit: "u/samstudio",
    },
    createdAt: "2026-07-16T11:20:00.000Z",
  },
  {
    id: "lst_groq_500",
    platform: "groq",
    title: "Groq Cloud credits",
    description:
      "High-throughput inference credits. Selling below face value — message with intended use case.",
    creditAmount: 500,
    creditUnit: "USD",
    priceUSD: 375,
    sellerName: "Elena Vogt",
    contact: {
      email: "elena.vogt@example.com",
      phone: "+49 151 555 0188",
      discord: "elenav",
    },
    createdAt: "2026-07-14T08:00:00.000Z",
  },
  {
    id: "lst_mistral_300",
    platform: "mistral",
    title: "Mistral API prepaid balance",
    description:
      "Clean account, invoices available on request. Prefer Telegram for faster coordination.",
    creditAmount: 300,
    creditUnit: "USD",
    priceUSD: 230,
    sellerName: "Noah Berger",
    contact: {
      telegram: "@noahberger",
      email: "noah.berger@example.com",
      whatsapp: "+33 6 12 34 56 78",
    },
    createdAt: "2026-07-12T19:10:00.000Z",
  },
  {
    id: "lst_cohere_175",
    platform: "cohere",
    title: "Cohere platform credits",
    description:
      "Leftover Cohere credits from a research sprint. Flexible on price for a quick close.",
    creditAmount: 175,
    creditUnit: "USD",
    priceUSD: 120,
    sellerName: "Riley Park",
    contact: {
      email: "riley.park@example.com",
      reddit: "u/rileypark",
      discord: "rileypark",
    },
    createdAt: "2026-07-10T13:40:00.000Z",
  },
];
