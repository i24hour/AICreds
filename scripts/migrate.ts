import { config } from "dotenv";
import { clearAllListings, migrateSchema } from "../src/lib/migrate";

config({ path: ".env.local" });

async function main() {
  const clear = process.argv.includes("--clear");
  await migrateSchema();
  if (clear) {
    await clearAllListings();
    console.log("Neon listings table cleared.");
  } else {
    console.log("Neon listings table migrated.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
