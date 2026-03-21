import "dotenv/config";

import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import * as schema from "./schema";
import * as relation from "./relation";

let connectionString = process.env.DATABASE_URL;

const client = postgres(connectionString, { prepare: false, ssl: "require" });

const db = drizzle({
  client,
  schema: { ...schema, ...relation },
});

export type DB = typeof db;

export default db;
