import { SEED_LISTINGS } from "@/data/seed";
import { ensureListingsSchema, upsertListing } from "@/lib/listings";

export async function migrateAndSeed() {
  await ensureListingsSchema();
  for (const listing of SEED_LISTINGS) {
    await upsertListing(listing);
  }
}
