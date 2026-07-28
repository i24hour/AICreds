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
      className="group block rounded-2xl border border-line bg-surface p-5 transition-all duration-200 hover:border-accent hover:bg-surface-2 hover:shadow-[0_14px_40px_rgba(0,0,0,0.6)] sm:p-6"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <PlatformBadge platform={listing.platform} size="sm" />
            <span className="text-xs text-ink-muted">
              {formatRelativeDate(listing.createdAt)}
            </span>
          </div>
          <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-ink transition-colors group-hover:text-accent sm:text-2xl">
            {listing.title}
          </h3>
          <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
            {listing.description}
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent-soft text-xs font-bold text-accent">
              {listing.sellerName.charAt(0).toUpperCase()}
            </span>
            <p className="text-xs text-ink-muted">{listing.sellerName}</p>
          </div>
        </div>

        <div className="shrink-0 rounded-xl border border-line bg-bg p-4 text-left sm:min-w-[170px] sm:border-l-4 sm:border-l-accent sm:text-right">
          <p className="text-xs uppercase tracking-[0.16em] text-ink-muted">
            Asking
          </p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-accent">
            {formatMoney(listing.priceUSD)}
          </p>
          <p className="mt-1 text-sm text-ink-muted">
            for {formatCreditAmount(listing.creditAmount, listing.creditUnit)}
          </p>
          {save !== null ? (
            <p className="mt-3 inline-flex rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success">
              Save {save}%
            </p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
