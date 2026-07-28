"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ContactPanel } from "@/components/ContactPanel";
import { PlatformBadge } from "@/components/PlatformBadge";
import {
  formatCreditAmount,
  formatMoney,
  formatRelativeDate,
  savingsPercent,
} from "@/lib/format";
import { useListings } from "@/lib/listings-context";

export default function ListingDetailPage() {
  const params = useParams<{ id: string }>();
  const { getListing, ready } = useListings();
  const listing = getListing(params.id);

  if (!ready) {
    return (
      <div className="atmosphere min-h-full px-5 py-16 text-sm text-ink-muted sm:px-8">
        Loading listing…
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="atmosphere min-h-full">
        <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-ink">
            Listing not found
          </h1>
          <p className="mt-3 text-ink-muted">
            This listing may have been removed, or it only exists in another
            browser.
          </p>
          <Link
            href="/listings"
            className="mt-8 inline-flex h-11 items-center rounded-md bg-accent px-5 text-sm font-semibold text-white hover:bg-accent-deep"
          >
            Back to market
          </Link>
        </div>
      </div>
    );
  }

  const save = savingsPercent(
    listing.creditAmount,
    listing.priceUSD,
    listing.creditUnit,
  );

  return (
    <div className="atmosphere min-h-full">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.2fr_0.8fr]">
        <article>
          <Link
            href="/listings"
            className="text-sm font-medium text-ink-muted transition hover:text-ink"
          >
            ← All listings
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <PlatformBadge platform={listing.platform} />
            <span className="text-sm text-ink-muted">
              {formatRelativeDate(listing.createdAt)}
            </span>
          </div>

          <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {listing.title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {listing.description}
          </p>

          <dl className="mt-10 grid gap-6 border-y border-line py-8 sm:grid-cols-3">
            <div>
              <dt className="text-xs uppercase tracking-[0.14em] text-ink-muted">
                Credits
              </dt>
              <dd className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-ink">
                {formatCreditAmount(listing.creditAmount, listing.creditUnit)}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.14em] text-ink-muted">
                Asking price
              </dt>
              <dd className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-ink">
                {formatMoney(listing.priceUSD)}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.14em] text-ink-muted">
                Seller
              </dt>
              <dd className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-ink">
                {listing.sellerName}
              </dd>
            </div>
          </dl>

          {save !== null ? (
            <p className="mt-6 text-sm font-medium text-success">
              About {save}% below face value of the credit balance.
            </p>
          ) : null}
        </article>

        <aside className="h-fit border border-line bg-surface p-6 sm:p-8">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-ink">
            Contact seller
          </h2>
          <div className="mt-4">
            <ContactPanel
              contact={listing.contact}
              sellerName={listing.sellerName}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
