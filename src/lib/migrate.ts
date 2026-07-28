import { ensureListingsSchema } from "@/lib/listings";
import { getSql } from "@/lib/db";

export async function migrateSchema() {
  await ensureListingsSchema();
}

export async function clearAllListings() {
  const sql = getSql();
  await sql`DELETE FROM listings`;
}
