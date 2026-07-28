export function HeroVisual() {
  return (
    <div
      className="relative h-full min-h-[320px] w-full overflow-hidden border-l border-line/60 bg-[#0f1720] sm:min-h-[420px]"
      aria-hidden
    >
      <div className="absolute inset-0 grid-overlay opacity-40" />
      <div className="absolute -right-16 top-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(31,94,255,0.45),transparent_70%)] blur-2xl animate-drift" />
      <div className="absolute bottom-8 left-8 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(15,122,79,0.35),transparent_70%)] blur-xl" />

      <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-white/55">
          <span>Market board</span>
          <span className="animate-pulse-line">● Ready</span>
        </div>

        <div className="space-y-5">
          <p className="animate-rise font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight text-white sm:text-4xl">
            Real listings.
            <br />
            Real sellers.
          </p>
          <p className="animate-rise-delay-1 max-w-xs text-sm leading-relaxed text-white/65">
            OpenAI, Anthropic, Azure, and more — published by people clearing
            unused balances.
          </p>
        </div>

        <p className="animate-rise-delay-2 max-w-xs text-sm leading-relaxed text-white/55">
          Connect on email, WhatsApp, Telegram, Discord, and more.
        </p>
      </div>
    </div>
  );
}
