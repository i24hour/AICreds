export function formatMoney(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

export function formatCreditAmount(
  amount: number,
  unit: "USD" | "credits" | "tokens",
): string {
  if (unit === "USD") return formatMoney(amount);
  if (unit === "tokens") {
    return `${new Intl.NumberFormat("en-US").format(amount)} tokens`;
  }
  return `${new Intl.NumberFormat("en-US").format(amount)} credits`;
}

export function formatRelativeDate(iso: string): string {
  const date = new Date(iso);
  const diff = Date.now() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days <= 0) return "Listed today";
  if (days === 1) return "Listed yesterday";
  if (days < 7) return `Listed ${days} days ago`;
  return `Listed ${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
}

export function savingsPercent(creditAmount: number, priceUSD: number, unit: string): number | null {
  if (unit !== "USD" || creditAmount <= 0) return null;
  const pct = Math.round(((creditAmount - priceUSD) / creditAmount) * 100);
  return pct > 0 ? pct : null;
}

export function createId(): string {
  return `lst_${Math.random().toString(36).slice(2, 10)}`;
}
