import type { Metadata } from "next";
import Link from "next/link";
import { ListingCard } from "@/components/ListingCard";
import { PlatformFilters } from "@/components/PlatformFilters";
import {
  countListingsByPlatform,
  getListings,
} from "@/lib/listings";
import { PLATFORMS } from "@/lib/platforms";
import type { PlatformId } from "@/lib/types";

export const metadata: Metadata = {
  title: "Browse listings",
};

export const dynamic = "force-dynamic";

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<{ platform?: string }>;
}) {
  const params = await searchParams;
  const platformParam = params.platform;
  const active: PlatformId | "all" = PLATFORMS.some((p) => p.id === platformParam)
    ? (platformParam as PlatformId)
    : "all";

  const [listings, counts] = await Promise.all([
    getListings(active),
    countListingsByPlatform(),
  ]);

  return (
    <div className="atmosphere min-h-full">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">
            Market
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Browse AI credit listings
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Filter by platform, compare asking prices, then open a listing to
            contact the seller.
          </p>
        </div>

        <div className="mt-10">
          <PlatformFilters active={active} counts={counts} />
        </div>

        <div className="mt-8 grid gap-4">
          {listings.length === 0 ? (
            <div className="card rounded-2xl p-12 text-center">
              <p className="text-sm text-ink-muted">
                No listings for this platform yet.{" "}
                <Link href="/sell" className="font-bold text-accent hover:underline">
                  Be the first to list
                </Link>
                .
              </p>
            </div>
          ) : (
            listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
