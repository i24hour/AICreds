import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactPanel } from "@/components/ContactPanel";
import { PlatformBadge } from "@/components/PlatformBadge";
import {
  formatCreditAmount,
  formatMoney,
  formatRelativeDate,
  savingsPercent,
} from "@/lib/format";
import { getListingById } from "@/lib/listings";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const listing = await getListingById(id);
  return {
    title: listing?.title ?? "Listing not found",
  };
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = await getListingById(id);

  if (!listing) notFound();

  const save = savingsPercent(
    listing.creditAmount,
    listing.priceUSD,
    listing.creditUnit,
  );

  return (
    <div className="atmosphere min-h-full">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.15fr_0.85fr]">
        <article>
          <Link
            href="/listings"
            className="inline-flex items-center gap-1 text-sm font-medium text-ink-muted transition hover:text-accent"
          >
            ← All listings
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <PlatformBadge platform={listing.platform} />
            <span className="text-sm text-ink-muted">
              {formatRelativeDate(listing.createdAt)}
            </span>
          </div>

          <h1 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {listing.title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {listing.description}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="card rounded-2xl p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-ink-muted">
                Credits
              </p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-ink">
                {formatCreditAmount(listing.creditAmount, listing.creditUnit)}
              </p>
            </div>
            <div className="card rounded-2xl p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-ink-muted">
                Asking price
              </p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-ink">
                {formatMoney(listing.priceUSD)}
              </p>
            </div>
            <div className="card rounded-2xl p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-ink-muted">
                Seller
              </p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-ink">
                {listing.sellerName}
              </p>
            </div>
          </div>

          {save !== null ? (
            <p className="mt-8 inline-flex rounded-full bg-success/15 px-4 py-2 text-sm font-semibold text-success">
              About {save}% below face value
            </p>
          ) : null}
        </article>

        <aside id="contact" className="h-fit scroll-mt-24">
          <div className="card rounded-2xl p-6 sm:p-8">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-ink">
              Contact seller
            </h2>
            <div className="mt-5">
              <ContactPanel
                contact={listing.contact}
                sellerName={listing.sellerName}
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
