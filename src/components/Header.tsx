import Link from "next/link";

const links = [
  { href: "/listings", label: "Browse" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/sell", label: "Sell credits" },
];

export function Header() {
  return (
    <header className="relative z-20 border-b border-line/80 bg-bg-elevated/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-ink sm:text-2xl">
            AICreds
          </span>
          <span className="hidden text-xs uppercase tracking-[0.18em] text-ink-muted sm:inline">
            Marketplace
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-2.5 py-2 text-sm text-ink-muted transition-colors hover:bg-accent-soft hover:text-ink sm:px-3"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
