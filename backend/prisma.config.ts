import 'dotenv/config'
import { defineConfig } from "prisma/config";
import { Pool } from 'pg';
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({
	connectionString: process.env.DIRECT_URL
})

export default defineConfig({
	schema: "prisma/schema.prisma",
	migrations: {
		path: "prisma/migration"
	},
	datasource: { url: process.env.DATABASE_URL },
	adapter: new PrismaPg(pool)
});