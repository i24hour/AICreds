import { createId } from "@/lib/format";
import { getSql } from "@/lib/db";
import type {
  ContactMethod,
  Listing,
  ListingInput,
  PlatformId,
} from "@/lib/types";

type ListingRow = {
  id: string;
  platform: string;
  title: string;
  description: string;
  credit_amount: string | number;
  credit_unit: string;
  price_usd: string | number;
  seller_name: string;
  contact_email: string | null;
  contact_phone: string | null;
  contact_whatsapp: string | null;
  contact_telegram: string | null;
  contact_discord: string | null;
  contact_reddit: string | null;
  featured: boolean;
  created_at: string | Date;
};

function toListing(row: ListingRow): Listing {
  const contact: ContactMethod = {};
  if (row.contact_email) contact.email = row.contact_email;
  if (row.contact_phone) contact.phone = row.contact_phone;
  if (row.contact_whatsapp) contact.whatsapp = row.contact_whatsapp;
  if (row.contact_telegram) contact.telegram = row.contact_telegram;
  if (row.contact_discord) contact.discord = row.contact_discord;
  if (row.contact_reddit) contact.reddit = row.contact_reddit;

  return {
    id: row.id,
    platform: row.platform as PlatformId,
    title: row.title,
    description: row.description,
    creditAmount: Number(row.credit_amount),
    creditUnit: row.credit_unit as Listing["creditUnit"],
    priceUSD: Number(row.price_usd),
    sellerName: row.seller_name,
    contact,
    createdAt:
      row.created_at instanceof Date
        ? row.created_at.toISOString()
        : new Date(row.created_at).toISOString(),
    featured: Boolean(row.featured),
  };
}

export async function ensureListingsSchema() {
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS listings (
      id TEXT PRIMARY KEY,
      platform TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      credit_amount NUMERIC NOT NULL,
      credit_unit TEXT NOT NULL,
      price_usd NUMERIC NOT NULL,
      seller_name TEXT NOT NULL,
      contact_email TEXT,
      contact_phone TEXT,
      contact_whatsapp TEXT,
      contact_telegram TEXT,
      contact_discord TEXT,
      contact_reddit TEXT,
      featured BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS listings_platform_idx ON listings (platform)
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS listings_created_at_idx ON listings (created_at DESC)
  `;
}

export async function getListings(platform?: PlatformId | "all") {
  const sql = getSql();
  if (platform && platform !== "all") {
    const rows = (await sql`
      SELECT * FROM listings
      WHERE platform = ${platform}
      ORDER BY created_at DESC
    `) as ListingRow[];
    return rows.map(toListing);
  }

  const rows = (await sql`
    SELECT * FROM listings
    ORDER BY created_at DESC
  `) as ListingRow[];
  return rows.map(toListing);
}

export async function getListingById(id: string) {
  const sql = getSql();
  const rows = (await sql`
    SELECT * FROM listings WHERE id = ${id} LIMIT 1
  `) as ListingRow[];
  return rows[0] ? toListing(rows[0]) : null;
}

export async function countListingsByPlatform() {
  const sql = getSql();
  const rows = (await sql`
    SELECT platform, COUNT(*)::int AS count
    FROM listings
    GROUP BY platform
  `) as Array<{ platform: string; count: number }>;

  const counts: Partial<Record<PlatformId | "all", number>> = { all: 0 };
  for (const row of rows) {
    counts[row.platform as PlatformId] = row.count;
    counts.all = (counts.all ?? 0) + row.count;
  }
  return counts;
}

export async function createListing(input: ListingInput) {
  const sql = getSql();
  const id = createId();
  const createdAt = new Date().toISOString();

  await sql`
    INSERT INTO listings (
      id,
      platform,
      title,
      description,
      credit_amount,
      credit_unit,
      price_usd,
      seller_name,
      contact_email,
      contact_phone,
      contact_whatsapp,
      contact_telegram,
      contact_discord,
      contact_reddit,
      featured,
      created_at
    ) VALUES (
      ${id},
      ${input.platform},
      ${input.title},
      ${input.description},
      ${input.creditAmount},
      ${input.creditUnit},
      ${input.priceUSD},
      ${input.sellerName},
      ${input.contact.email ?? null},
      ${input.contact.phone ?? null},
      ${input.contact.whatsapp ?? null},
      ${input.contact.telegram ?? null},
      ${input.contact.discord ?? null},
      ${input.contact.reddit ?? null},
      FALSE,
      ${createdAt}
    )
  `;

  return {
    ...input,
    id,
    createdAt,
    featured: false,
  } satisfies Listing;
}

