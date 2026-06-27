import "dotenv/config";
import path from "node:path";
import { defineConfig } from "prisma/config";

// Prisma 7: the connection lives here (not in the schema). CLI commands
// (db push, migrate, studio, seed) read the URL from here; the runtime client
// connects through the driver adapter in src/lib/prisma.ts.
export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  datasource: {
    url: process.env.DATABASE_URL,
  },
  migrations: {
    seed: "tsx prisma/seed.ts",
  },
});
