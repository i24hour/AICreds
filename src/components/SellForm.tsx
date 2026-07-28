"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import {
  createListingAction,
  type CreateListingState,
} from "@/app/actions/listings";
import { PLATFORMS } from "@/lib/platforms";
import type { PlatformId } from "@/lib/types";

const initialState: CreateListingState = {};

export function SellForm() {
  const router = useRouter();
  const [platform, setPlatform] = useState<PlatformId>("openai");
  const [state, formAction, pending] = useActionState(
    createListingAction,
    initialState,
  );

  useEffect(() => {
    if (state.id) {
      router.push(`/listings/${state.id}`);
    }
  }, [state.id, router]);

  const fieldClass =
    "mt-2 w-full rounded-xl border border-line bg-bg px-3 py-2.5 text-ink outline-none transition placeholder:text-ink-muted focus:border-accent focus:ring-2 focus:ring-accent-soft";
  const labelClass = "text-sm font-medium text-ink";

  return (
    <form action={formAction} className="space-y-10">
      <section className="space-y-5">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-ink">
            What are you selling?
          </h2>
          <p className="mt-2 text-sm text-ink-muted">
            Choose the platform, credit amount, and the price you want.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className={labelClass}>Platform</span>
            <select
              className={fieldClass}
              name="platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value as PlatformId)}
              required
            >
              {PLATFORMS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className={labelClass}>Your name</span>
            <input
              className={fieldClass}
              name="sellerName"
              placeholder="How buyers should address you"
              required
            />
          </label>
        </div>

        <label className="block">
          <span className={labelClass}>Listing title</span>
          <input
            className={fieldClass}
            name="title"
            placeholder="e.g. OpenAI API balance — $400 remaining"
            required
          />
        </label>

        <label className="block">
          <span className={labelClass}>Description</span>
          <textarea
            className={`${fieldClass} min-h-28 resize-y`}
            name="description"
            placeholder="Share transfer details, account standing, and any constraints."
            required
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-3">
          <label className="block">
            <span className={labelClass}>Credit amount</span>
            <input
              className={fieldClass}
              type="number"
              min="0"
              step="any"
              name="creditAmount"
              placeholder="420"
              required
            />
          </label>

          <label className="block">
            <span className={labelClass}>Unit</span>
            <select className={fieldClass} name="creditUnit" defaultValue="USD">
              <option value="USD">USD balance</option>
              <option value="credits">Credits</option>
              <option value="tokens">Tokens</option>
            </select>
          </label>

          <label className="block">
            <span className={labelClass}>Asking price (USD)</span>
            <input
              className={fieldClass}
              type="number"
              min="0"
              step="any"
              name="priceUSD"
              placeholder="340"
              required
            />
          </label>
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-ink">
            How can buyers reach you?
          </h2>
          <p className="mt-2 text-sm text-ink-muted">
            Add any channels you use. At least one is required — the rest are
            optional.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className={labelClass}>Email</span>
            <input
              className={fieldClass}
              type="email"
              name="email"
              placeholder="you@example.com"
            />
          </label>
          <label className="block">
            <span className={labelClass}>Phone</span>
            <input
              className={fieldClass}
              name="phone"
              placeholder="+1 555 0100"
            />
          </label>
          <label className="block">
            <span className={labelClass}>WhatsApp</span>
            <input
              className={fieldClass}
              name="whatsapp"
              placeholder="+1 555 0100"
            />
          </label>
          <label className="block">
            <span className={labelClass}>Telegram</span>
            <input
              className={fieldClass}
              name="telegram"
              placeholder="@username"
            />
          </label>
          <label className="block">
            <span className={labelClass}>Discord</span>
            <input
              className={fieldClass}
              name="discord"
              placeholder="username or username#0000"
            />
          </label>
          <label className="block">
            <span className={labelClass}>Reddit</span>
            <input
              className={fieldClass}
              name="reddit"
              placeholder="u/username"
            />
          </label>
        </div>
      </section>

      {state.error ? (
        <p className="rounded-md border border-warn/40 bg-warn/10 px-4 py-3 text-sm text-warn">
          {state.error}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-bold text-white transition hover:bg-accent-deep disabled:opacity-60"
        >
          {pending ? "Publishing…" : "Publish listing"}
        </button>
        <p className="text-xs text-ink-muted sm:max-w-sm">
          Your listing goes live for every buyer on the marketplace.
        </p>
      </div>
    </form>
  );
}
