import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How it works",
};

export default function HowItWorksPage() {
  return (
    <div className="atmosphere min-h-full">
      <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">
          Guide
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          How AICreds works
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-muted">
          AICreds is a listing board — not an escrow. Sellers publish offers;
          buyers reach out through the contact channels provided.
        </p>

        <div className="mt-12 grid gap-4">
          {[
            {
              title: "Create a listing",
              body: "Choose OpenAI, Anthropic, Azure OpenAI, Gemini, Midjourney, or another platform. Enter credit amount, unit, and asking price.",
            },
            {
              title: "Add contact options",
              body: "Share email, phone, WhatsApp, Telegram, Discord, and/or Reddit. Buyers pick the channel that works for them.",
            },
            {
              title: "Buyers browse and filter",
              body: "The market page lets people filter by platform and open any listing to see pricing and contact details.",
            },
            {
              title: "You close the deal",
              body: "Negotiate transfer terms privately. AICreds does not move money or verify account ownership.",
            },
          ].map((step, index) => (
            <div key={step.title} className="card card-hover rounded-2xl p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">
                Step {index + 1}
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold text-ink">
                {step.title}
              </h2>
              <p className="mt-3 text-ink-muted leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/sell"
            className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-bold text-white hover:bg-accent-deep hover:shadow-[0_8px_24px_rgba(29,155,240,0.35)]"
          >
            List credits
          </Link>
          <Link
            href="/listings"
            className="inline-flex h-12 items-center justify-center rounded-full border border-line bg-transparent px-6 text-sm font-bold text-ink hover:border-accent hover:bg-accent-soft"
          >
            Browse listings
          </Link>
        </div>
      </div>
    </div>
  );
}
