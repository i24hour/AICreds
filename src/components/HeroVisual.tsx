export function HeroVisual() {
  return (
    <div
      className="relative h-full min-h-[320px] w-full overflow-hidden border-t border-line bg-surface sm:min-h-[420px] sm:border-t-0 sm:border-l"
      aria-hidden
    >
      <div className="absolute inset-0 grid-overlay opacity-50" />
      <div className="absolute -right-10 top-8 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(29,155,240,0.35),transparent_70%)] blur-2xl animate-drift" />
      <div className="absolute bottom-6 left-6 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(29,155,240,0.18),transparent_70%)] blur-xl" />

      <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-ink-muted">
          <span>Market</span>
          <span className="animate-pulse-line text-accent">● Live</span>
        </div>

        <div className="space-y-5">
          <p className="animate-rise font-[family-name:var(--font-display)] text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Real listings.
            <br />
            Real sellers.
          </p>
          <p className="animate-rise-delay-1 max-w-xs text-sm leading-relaxed text-ink-muted">
            OpenAI, Anthropic, Azure, and more — published by people clearing
            unused balances.
          </p>
        </div>

        <p className="animate-rise-delay-2 max-w-xs text-sm leading-relaxed text-ink-muted">
          Connect on email, WhatsApp, Telegram, Discord, and more.
        </p>
      </div>
    </div>
  );
}
