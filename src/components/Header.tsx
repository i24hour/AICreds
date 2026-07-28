import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-8">
        <Link
          href="/"
          className="group flex min-w-0 shrink items-center gap-2 sm:gap-2.5"
        >
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white transition-transform group-hover:scale-105">
            A
          </span>
          <span className="truncate font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-ink sm:text-xl">
            AICreds
          </span>
        </Link>

        <nav className="flex shrink-0 items-center gap-0.5 sm:gap-2">
          <Link
            href="/listings"
            className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-full px-2.5 text-sm font-medium text-ink-muted transition-colors hover:bg-accent-soft hover:text-accent sm:h-10 sm:px-4"
          >
            Browse
          </Link>
          <Link
            href="/how-it-works"
            className="hidden h-10 items-center justify-center whitespace-nowrap rounded-full px-4 text-sm font-medium text-ink-muted transition-colors hover:bg-accent-soft hover:text-accent sm:inline-flex"
          >
            How it works
          </Link>
          <Link
            href="/sell"
            className="ml-1 inline-flex h-9 items-center justify-center whitespace-nowrap rounded-full bg-accent px-3.5 text-sm font-bold text-white transition hover:bg-accent-deep sm:ml-2 sm:h-10 sm:px-5"
          >
            <span className="sm:hidden">Sell</span>
            <span className="hidden sm:inline">Sell credits</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
