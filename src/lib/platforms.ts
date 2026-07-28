import type { PlatformId } from "./types";

export type Platform = {
  id: PlatformId;
  name: string;
  short: string;
  hue: string;
};

export const PLATFORMS: Platform[] = [
  { id: "openai", name: "OpenAI", short: "OA", hue: "#10a37f" },
  { id: "anthropic", name: "Anthropic", short: "AN", hue: "#d97757" },
  { id: "azure", name: "Azure OpenAI", short: "AZ", hue: "#0078d4" },
  { id: "gemini", name: "Google Gemini", short: "GE", hue: "#4285f4" },
  { id: "midjourney", name: "Midjourney", short: "MJ", hue: "#1e3a5f" },
  { id: "cohere", name: "Cohere", short: "CO", hue: "#39594d" },
  { id: "groq", name: "Groq", short: "GQ", hue: "#f55036" },
  { id: "mistral", name: "Mistral", short: "MI", hue: "#ff7000" },
  { id: "perplexity", name: "Perplexity", short: "PX", hue: "#20808d" },
  { id: "other", name: "Other", short: "OT", hue: "#475569" },
];

export function getPlatform(id: PlatformId): Platform {
  return PLATFORMS.find((p) => p.id === id) ?? PLATFORMS[PLATFORMS.length - 1];
}
