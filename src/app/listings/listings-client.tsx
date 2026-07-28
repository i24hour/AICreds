"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ListingCard } from "@/components/ListingCard";
import { PlatformFilters } from "@/components/PlatformFilters";
import { useListings } from "@/lib/listings-context";
import { PLATFORMS } from "@/lib/platforms";
import type { PlatformId } from "@/lib/types";

export default function ListingsClient() {
  const searchParams = useSearchParams();
  const { listings, ready, filterByPlatform } = useListings();
  const platformParam = searchParams.get("platform");
  const active: PlatformId | "all" = PLATFORMS.some((p) => p.id === platformParam)
    ? (platformParam as PlatformId)
    : "all";

  const filtered = useMemo(
    () => filterByPlatform(active),
    [filterByPlatform, active],
  );

  const counts = useMemo(() => {
    const result: Partial<Record<PlatformId | "all", number>> = {
      all: listings.length,
    };
    for (const p of PLATFORMS) {
      result[p.id] = listings.filter((l) => l.platform === p.id).length;
    }
    return result;
  }, [listings]);

  return (
    <div className="atmosphere min-h-full">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-muted">
            Market
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
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

        <div className="mt-8 border-t border-line bg-bg-elevated/50 px-0 sm:px-2">
          {!ready ? (
            <p className="py-10 text-sm text-ink-muted">Loading listings…</p>
          ) : filtered.length === 0 ? (
            <p className="py-10 text-sm text-ink-muted">
              No listings for this platform yet.{" "}
              <a href="/sell" className="font-medium text-accent-deep underline">
                Be the first to list
              </a>
              .
            </p>
          ) : (
            filtered.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
