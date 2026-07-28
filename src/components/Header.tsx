import Link from "next/link";

const links = [
  { href: "/listings", label: "Browse" },
  { href: "/how-it-works", label: "How it works" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-5 sm:h-16 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-white transition-transform group-hover:scale-105">
            A
          </span>
          <span className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-ink">
            AICreds
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-accent-soft hover:text-accent sm:px-4"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/sell"
            className="ml-1 inline-flex h-9 items-center justify-center rounded-full bg-accent px-4 text-sm font-bold text-white transition hover:bg-accent-deep sm:ml-2 sm:h-10 sm:px-5"
          >
            Sell credits
          </Link>
        </nav>
      </div>
    </header>
  );
}
