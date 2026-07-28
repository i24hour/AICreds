import { getPlatform } from "@/lib/platforms";
import type { PlatformId } from "@/lib/types";

export function PlatformBadge({
  platform,
  size = "md",
}: {
  platform: PlatformId;
  size?: "sm" | "md";
}) {
  const p = getPlatform(platform);
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-md border border-line bg-surface ${
        size === "sm" ? "px-2 py-1 text-xs" : "px-2.5 py-1.5 text-sm"
      }`}
    >
      <span
        className="inline-flex h-5 w-5 items-center justify-center rounded text-[10px] font-semibold text-white"
        style={{ backgroundColor: p.hue }}
        aria-hidden
      >
        {p.short}
      </span>
      <span className="font-medium text-ink">{p.name}</span>
    </span>
  );
}
