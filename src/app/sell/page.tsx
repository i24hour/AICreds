import type { Metadata } from "next";
import { SellForm } from "@/components/SellForm";

export const metadata: Metadata = {
  title: "Sell credits",
};

export default function SellPage() {
  return (
    <div className="atmosphere min-h-full">
      <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        <p className="text-xs uppercase tracking-[0.18em] text-ink-muted">
          Sell
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          List your AI credits
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
          Tell buyers which platform, how much you have, your asking price, and
          how to reach you. Publish in under a minute.
        </p>

        <div className="mt-12 border-t border-line pt-10">
          <SellForm />
        </div>
      </div>
    </div>
  );
}
