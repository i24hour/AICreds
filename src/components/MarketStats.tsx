import { countListingsByPlatform } from "@/lib/listings";
import { PLATFORMS } from "@/lib/platforms";

export async function MarketStats() {
  const counts = await countListingsByPlatform();
  const platformCount = PLATFORMS.filter((p) => (counts[p.id] ?? 0) > 0).length;

  const stats = [
    { label: "Listings live", value: counts.all ?? 0 },
    { label: "Platforms active", value: platformCount },
    { label: "Countries served", value: "120+" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 sm:gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="card rounded-2xl px-4 py-5 sm:px-6">
          <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-ink sm:text-3xl">
            {stat.value}
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-ink-muted sm:text-sm">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
