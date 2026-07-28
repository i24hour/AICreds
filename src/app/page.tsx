import Link from "next/link";
import { HeroVisual } from "@/components/HeroVisual";
import { ListingCard } from "@/components/ListingCard";
import { MarketStats } from "@/components/MarketStats";
import { getListings } from "@/lib/listings";
import { PLATFORMS } from "@/lib/platforms";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const latest = (await getListings()).slice(0, 3);

  return (
    <div className="atmosphere">
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative mx-auto grid max-w-6xl lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-center px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
            <p className="animate-rise inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
              <span className="text-gradient">AICreds</span>
            </p>
            <h1 className="animate-rise-delay-1 mt-5 max-w-xl font-[family-name:var(--font-display)] text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
              Sell unused AI credits.
              <br />
              Buy what you need.
            </h1>
            <p className="animate-rise-delay-2 mt-5 max-w-lg text-base leading-relaxed text-ink-muted sm:text-lg">
              List OpenAI, Anthropic, Azure, and more — set your price, add your
              contact channels, and connect directly with buyers.
            </p>
            <div className="animate-rise-delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/sell"
                className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-bold text-white transition hover:bg-accent-deep hover:shadow-[0_8px_24px_rgba(29,155,240,0.35)]"
              >
                List your credits
              </Link>
              <Link
                href="/listings"
                className="inline-flex h-12 items-center justify-center rounded-full border border-line bg-transparent px-6 text-sm font-bold text-ink transition hover:border-accent hover:bg-accent-soft"
              >
                Browse the market
              </Link>
            </div>
          </div>
          <HeroVisual />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <MarketStats />
      </section>

      <section className="border-t border-line bg-bg-elevated/50">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-ink-muted">
            Supported platforms
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {PLATFORMS.filter((p) => p.id !== "other").map((platform) => (
              <span
                key={platform.id}
                className="glass rounded-full px-3.5 py-1.5 text-sm font-medium text-ink"
              >
                {platform.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Latest listings
            </h2>
            <p className="mt-2 max-w-xl text-ink-muted">
              Fresh offers across major AI platforms — open a listing to see
              seller contact options.
            </p>
          </div>
          <Link
            href="/listings"
            className="text-sm font-bold text-accent hover:underline"
          >
            View all listings →
          </Link>
        </div>

        <div className="mt-10 grid gap-4">
          {latest.length === 0 ? (
            <div className="card rounded-2xl p-10 text-center">
              <p className="text-sm text-ink-muted">
                No listings yet.{" "}
                <Link href="/sell" className="font-bold text-accent hover:underline">
                  Be the first to list credits
                </Link>
                .
              </p>
            </div>
          ) : (
            latest.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))
          )}
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-16 sm:px-8 lg:grid-cols-3">
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
            <div
              key={item.step}
              className="card card-hover rounded-2xl p-6 sm:p-8"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-accent">
                {item.step}
              </p>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl font-bold text-ink">
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
