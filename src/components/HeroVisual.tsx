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
          <span>Live board</span>
          <span className="animate-pulse-line">● Market open</span>
        </div>

        <div className="space-y-4">
          {[
            { platform: "OpenAI", amount: "$420", ask: "$340" },
            { platform: "Anthropic", amount: "$850", ask: "$680" },
            { platform: "Azure", amount: "$1,200", ask: "$950" },
          ].map((row, index) => (
            <div
              key={row.platform}
              className="animate-rise flex items-end justify-between border-b border-white/15 pb-3 text-white"
              style={{ animationDelay: `${0.15 * (index + 1)}s` }}
            >
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-white/50">
                  {row.platform}
                </p>
                <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold">
                  {row.amount}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/50">Asking</p>
                <p className="font-[family-name:var(--font-display)] text-xl font-medium text-[#9ec0ff]">
                  {row.ask}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="max-w-xs text-sm leading-relaxed text-white/60">
          List unused balances. Connect on email, WhatsApp, Telegram, Discord,
          and more.
        </p>
      </div>
    </div>
  );
}
