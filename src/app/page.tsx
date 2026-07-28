import Link from "next/link";
import { HeroVisual } from "@/components/HeroVisual";
import { ListingCard } from "@/components/ListingCard";
import { SEED_LISTINGS } from "@/data/seed";
import { PLATFORMS } from "@/lib/platforms";

export default function HomePage() {
  const featured = SEED_LISTINGS.filter((l) => l.featured).slice(0, 3);

  return (
    <div className="atmosphere">
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative mx-auto grid max-w-6xl lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-center px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
            <p className="animate-rise font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
              AICreds
            </p>
            <h1 className="animate-rise-delay-1 mt-5 max-w-xl font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
              Sell unused AI credits. Buy what you need.
            </h1>
            <p className="animate-rise-delay-2 mt-5 max-w-lg text-base leading-relaxed text-ink-muted sm:text-lg">
              List OpenAI, Anthropic, Azure, and more — set your price, add your
              contact channels, and connect directly with buyers.
            </p>
            <div className="animate-rise-delay-2 mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/sell"
                className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-6 text-sm font-semibold text-white transition hover:bg-accent-deep"
              >
                List your credits
              </Link>
              <Link
                href="/listings"
                className="inline-flex h-12 items-center justify-center rounded-md border border-line bg-surface px-6 text-sm font-semibold text-ink transition hover:border-accent hover:bg-accent-soft"
              >
                Browse the market
              </Link>
            </div>
          </div>
          <HeroVisual />
        </div>
      </section>

      <section className="border-b border-line bg-bg-elevated/70">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-muted">
            Supported platforms
          </p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
            {PLATFORMS.filter((p) => p.id !== "other").map((platform) => (
              <span key={platform.id} className="text-sm font-medium text-ink">
                {platform.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-ink">
              Featured listings
            </h2>
            <p className="mt-2 max-w-xl text-ink-muted">
              Fresh offers across major AI platforms — open a listing to see
              seller contact options.
            </p>
          </div>
          <Link
            href="/listings"
            className="text-sm font-semibold text-accent-deep hover:underline"
          >
            View all listings
          </Link>
        </div>

        <div className="mt-10 border-t border-line">
          {featured.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-3">
          {[
            {
              step: "01",
              title: "List what you have",
              body: "Pick the platform, credit amount, and asking price in a few minutes.",
            },
            {
              step: "02",
              title: "Share how to reach you",
              body: "Email, phone, WhatsApp, Telegram, Discord, Reddit — add what you use.",
            },
            {
              step: "03",
              title: "Close directly",
              body: "Buyers contact you off-platform. You negotiate and transfer on your terms.",
            },
          ].map((item) => (
            <div key={item.step}>
              <p className="text-xs uppercase tracking-[0.18em] text-accent-deep">
                {item.step}
              </p>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
