"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { PLATFORMS } from "@/lib/platforms";
import { useListings } from "@/lib/listings-context";
import type { ContactMethod, ListingInput, PlatformId } from "@/lib/types";

const emptyContact: ContactMethod = {
  email: "",
  phone: "",
  whatsapp: "",
  telegram: "",
  discord: "",
  reddit: "",
};

export function SellForm() {
  const router = useRouter();
  const { addListing } = useListings();
  const [platform, setPlatform] = useState<PlatformId>("openai");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [creditAmount, setCreditAmount] = useState("");
  const [creditUnit, setCreditUnit] = useState<"USD" | "credits" | "tokens">(
    "USD",
  );
  const [priceUSD, setPriceUSD] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [contact, setContact] = useState<ContactMethod>(emptyContact);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const hasContact = useMemo(
    () => Object.values(contact).some((v) => Boolean(v?.trim())),
    [contact],
  );

  function updateContact(key: keyof ContactMethod, value: string) {
    setContact((prev) => ({ ...prev, [key]: value }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const amount = Number(creditAmount);
    const price = Number(priceUSD);

    if (!title.trim() || !description.trim() || !sellerName.trim()) {
      setError("Please fill in title, description, and your name.");
      return;
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      setError("Enter a valid credit amount greater than zero.");
      return;
    }
    if (!Number.isFinite(price) || price <= 0) {
      setError("Enter a valid asking price greater than zero.");
      return;
    }
    if (!hasContact) {
      setError("Add at least one contact method so buyers can reach you.");
      return;
    }

    const cleanedContact: ContactMethod = {};
    (Object.keys(contact) as Array<keyof ContactMethod>).forEach((key) => {
      const value = contact[key]?.trim();
      if (value) cleanedContact[key] = value;
    });

    const input: ListingInput = {
      platform,
      title: title.trim(),
      description: description.trim(),
      creditAmount: amount,
      creditUnit,
      priceUSD: price,
      sellerName: sellerName.trim(),
      contact: cleanedContact,
    };

    setSubmitting(true);
    const listing = addListing(input);
    router.push(`/listings/${listing.id}`);
  }

  const fieldClass =
    "mt-2 w-full rounded-md border border-line bg-surface px-3 py-2.5 text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-soft";
  const labelClass = "text-sm font-medium text-ink";

  return (
    <form onSubmit={onSubmit} className="space-y-10">
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
              value={platform}
              onChange={(e) => setPlatform(e.target.value as PlatformId)}
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
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}
              placeholder="How buyers should address you"
              required
            />
          </label>
        </div>

        <label className="block">
          <span className={labelClass}>Listing title</span>
          <input
            className={fieldClass}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. OpenAI API balance — $400 remaining"
            required
          />
        </label>

        <label className="block">
          <span className={labelClass}>Description</span>
          <textarea
            className={`${fieldClass} min-h-28 resize-y`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
              value={creditAmount}
              onChange={(e) => setCreditAmount(e.target.value)}
              placeholder="420"
              required
            />
          </label>

          <label className="block">
            <span className={labelClass}>Unit</span>
            <select
              className={fieldClass}
              value={creditUnit}
              onChange={(e) =>
                setCreditUnit(e.target.value as "USD" | "credits" | "tokens")
              }
            >
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
              value={priceUSD}
              onChange={(e) => setPriceUSD(e.target.value)}
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
            Add any channels you use. At least one is required — the rest are optional.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className={labelClass}>Email</span>
            <input
              className={fieldClass}
              type="email"
              value={contact.email}
              onChange={(e) => updateContact("email", e.target.value)}
              placeholder="you@example.com"
            />
          </label>
          <label className="block">
            <span className={labelClass}>Phone</span>
            <input
              className={fieldClass}
              value={contact.phone}
              onChange={(e) => updateContact("phone", e.target.value)}
              placeholder="+1 555 0100"
            />
          </label>
          <label className="block">
            <span className={labelClass}>WhatsApp</span>
            <input
              className={fieldClass}
              value={contact.whatsapp}
              onChange={(e) => updateContact("whatsapp", e.target.value)}
              placeholder="+1 555 0100"
            />
          </label>
          <label className="block">
            <span className={labelClass}>Telegram</span>
            <input
              className={fieldClass}
              value={contact.telegram}
              onChange={(e) => updateContact("telegram", e.target.value)}
              placeholder="@username"
            />
          </label>
          <label className="block">
            <span className={labelClass}>Discord</span>
            <input
              className={fieldClass}
              value={contact.discord}
              onChange={(e) => updateContact("discord", e.target.value)}
              placeholder="username or username#0000"
            />
          </label>
          <label className="block">
            <span className={labelClass}>Reddit</span>
            <input
              className={fieldClass}
              value={contact.reddit}
              onChange={(e) => updateContact("reddit", e.target.value)}
              placeholder="u/username"
            />
          </label>
        </div>
      </section>

      {error ? (
        <p className="rounded-md border border-warn/30 bg-[#fff7ea] px-4 py-3 text-sm text-warn">
          {error}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-6 text-sm font-semibold text-white transition hover:bg-accent-deep disabled:opacity-60"
        >
          {submitting ? "Publishing…" : "Publish listing"}
        </button>
        <p className="text-xs text-ink-muted sm:max-w-sm">
          Your listing stays in this browser for now. Buyers contact you directly
          via the channels you share.
        </p>
      </div>
    </form>
  );
}
