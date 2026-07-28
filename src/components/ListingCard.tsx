import Link from "next/link";
import { PlatformBadge } from "@/components/PlatformBadge";
import {
  formatCreditAmount,
  formatMoney,
  formatRelativeDate,
  savingsPercent,
} from "@/lib/format";
import type { Listing } from "@/lib/types";

export function ListingCard({ listing }: { listing: Listing }) {
  const save = savingsPercent(
    listing.creditAmount,
    listing.priceUSD,
    listing.creditUnit,
  );

  return (
    <Link
      href={`/listings/${listing.id}`}
      className="group block border-b border-line py-6 transition-colors first:pt-0 last:border-b-0 hover:bg-accent-soft/40 sm:px-3"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <PlatformBadge platform={listing.platform} size="sm" />
            {listing.featured ? (
              <span className="text-xs uppercase tracking-[0.14em] text-accent-deep">
                Featured
              </span>
            ) : null}
          </div>
          <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent-deep sm:text-2xl">
            {listing.title}
          </h3>
          <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
            {listing.description}
          </p>
          <p className="mt-3 text-xs text-ink-muted">
            {listing.sellerName} · {formatRelativeDate(listing.createdAt)}
          </p>
        </div>

        <div className="shrink-0 text-left sm:min-w-[140px] sm:text-right">
          <p className="text-xs uppercase tracking-[0.14em] text-ink-muted">
            Asking
          </p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold text-ink">
            {formatMoney(listing.priceUSD)}
          </p>
          <p className="mt-1 text-sm text-ink-muted">
            for {formatCreditAmount(listing.creditAmount, listing.creditUnit)}
          </p>
          {save !== null ? (
            <p className="mt-2 text-sm font-medium text-success">{save}% below face</p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
