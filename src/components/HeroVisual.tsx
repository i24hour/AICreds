export function HeroVisual() {
  return (
    <div
      className="relative h-full min-h-[360px] w-full overflow-hidden border-t border-line sm:min-h-[480px] sm:border-t-0 sm:border-l"
      aria-hidden
    >
      <div className="absolute inset-0 grid-overlay opacity-60" />
      <div className="absolute -right-12 top-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(29,155,240,0.4),transparent_70%)] blur-3xl animate-drift" />
      <div className="absolute bottom-8 left-8 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(29,155,240,0.2),transparent_70%)] blur-2xl" />

      <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-ink-muted">
          <span>Live market</span>
          <span className="animate-pulse-line text-accent">● Active</span>
        </div>

        <div className="space-y-6">
          <p className="animate-rise font-[family-name:var(--font-display)] text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Real listings.
            <br />
            Real sellers.
          </p>
          <p className="animate-rise-delay-1 max-w-sm text-sm leading-relaxed text-ink-muted sm:text-base">
            OpenAI, Anthropic, Azure, and more — published by people clearing
            unused balances.
          </p>

          <div className="animate-rise-delay-2 flex flex-wrap gap-2">
            {["OpenAI", "Anthropic", "Azure", "Gemini"].map((name) => (
              <span
                key={name}
                className="glass rounded-full px-3 py-1.5 text-xs font-medium text-ink"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        <p className="animate-rise-delay-3 max-w-sm text-sm leading-relaxed text-ink-muted">
          Connect on email, WhatsApp, Telegram, Discord, and more.
        </p>
      </div>
    </div>
  );
}
