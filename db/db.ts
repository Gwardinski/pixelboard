import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@/db/schema";

const pool = new Pool({
  connectionString: process.env.NEXT_PUBLIC_POSTGRES,
});

export const db = drizzle(pool, { schema });

export default db;
