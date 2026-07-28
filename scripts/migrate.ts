import { config } from "dotenv";
import { migrateAndSeed } from "../src/lib/migrate";

config({ path: ".env.local" });

async function main() {
  await migrateAndSeed();
  console.log("Neon listings table migrated and seeded.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
