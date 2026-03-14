import "dotenv/config";

import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { TransactionalAdapterDrizzleOrm } from "@nestjs-cls/transactional-adapter-drizzle-orm";

import * as schema from "./schema";
import * as relation from "./relation";

let connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});

const db = drizzle({
  client: pool,
  schema: { ...schema, ...relation },
});

export type DB = typeof db;

export type DbTransactionAdapter = TransactionalAdapterDrizzleOrm<typeof db>;

export default db;
