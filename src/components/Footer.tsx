import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-bg-elevated">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
            A
          </span>
          <div>
            <p className="font-[family-name:var(--font-display)] text-lg font-bold text-ink">
              AICreds
            </p>
            <p className="mt-1 max-w-sm text-sm leading-relaxed text-ink-muted">
              A simple marketplace to list unused AI platform credits and connect
              with buyers — directly, on your terms.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-5 text-sm font-medium text-ink-muted">
          <Link href="/listings" className="transition hover:text-accent">
            Browse listings
          </Link>
          <Link href="/sell" className="transition hover:text-accent">
            Sell credits
          </Link>
          <Link href="/how-it-works" className="transition hover:text-accent">
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
