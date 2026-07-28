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
  const options: Array<{ id: PlatformId | "all"; label: string }> = [
    { id: "all", label: "All platforms" },
    ...PLATFORMS.map((p) => ({ id: p.id as PlatformId, label: p.name })),
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
            className={`shrink-0 rounded-md border px-3 py-2 text-sm transition-colors ${
              isActive
                ? "border-accent bg-accent text-white"
                : "border-line bg-surface text-ink-muted hover:border-accent hover:text-ink"
            }`}
          >
            {option.label}
            <span className={`ml-2 ${isActive ? "text-white/80" : "text-ink-muted"}`}>
              {count}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
