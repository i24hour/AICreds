"use client";

import Link from "next/link";
import { PLATFORMS } from "@/lib/platforms";
import type { PlatformId } from "@/lib/types";

export function PlatformFilters({
  active,
  counts,
}: {
  active: PlatformId | "all";
  counts: Partial<Record<PlatformId | "all", number>>;
}) {
  const options: Array<{ id: PlatformId | "all"; label: string; short?: string; hue?: string }> = [
    { id: "all", label: "All platforms" },
    ...PLATFORMS.map((p) => ({
      id: p.id as PlatformId,
      label: p.name,
      short: p.short,
      hue: p.hue,
    })),
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {options.map((option) => {
        const isActive = active === option.id;
        const count = counts[option.id] ?? 0;
        return (
          <Link
            key={option.id}
            href={
              option.id === "all"
                ? "/listings"
                : `/listings?platform=${option.id}`
            }
            className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "border-accent bg-accent text-white"
                : "border-line bg-transparent text-ink-muted hover:border-accent hover:bg-accent-soft hover:text-accent"
            }`}
          >
            {option.hue ? (
              <span
                className="inline-flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white"
                style={{ backgroundColor: option.hue }}
                aria-hidden
              >
                {option.short}
              </span>
            ) : null}
            {option.label}
            <span className={isActive ? "text-white/80" : "text-ink-muted"}>
              {count}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
