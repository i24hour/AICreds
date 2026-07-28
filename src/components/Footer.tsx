import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-bg-elevated">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-ink">
            AICreds
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-muted">
            A simple marketplace to list unused AI platform credits and connect
            with buyers — directly, on your terms.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-ink-muted">
          <Link href="/listings" className="hover:text-ink">
            Browse listings
          </Link>
          <Link href="/sell" className="hover:text-ink">
            Sell credits
          </Link>
          <Link href="/how-it-works" className="hover:text-ink">
            How it works
          </Link>
        </div>
      </div>
      <div className="border-t border-line/70">
        <p className="mx-auto max-w-6xl px-5 py-4 text-xs text-ink-muted sm:px-8">
          Buyers and sellers arrange transfers privately. AICreds does not hold
          funds or verify ownership.
        </p>
      </div>
    </footer>
  );
}
