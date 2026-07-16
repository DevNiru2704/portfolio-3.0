import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Reuse a single client in dev to avoid exhausting connections on hot reload.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrismaClient(): PrismaClient {
  // Pool sizing note: with the driver adapter, `connection_limit` in the URL
  // is ignored (that is a Prisma engine param) - node-postgres owns the pool,
  // so the ceiling must be set here. Production runs on Vercel serverless
  // behind Supabase's transaction pooler, where each function instance keeps
  // its own pool; a small max keeps many concurrent instances from exhausting
  // the pooler's client slots.
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
    max: 3,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 10_000,
  });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
