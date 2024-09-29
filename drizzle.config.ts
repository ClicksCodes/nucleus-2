import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./src/database/schema.ts",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        user: process.env["PG_USER"],
        password: process.env["PG_PASSWORD"],
        host: "localhost",
        port: parseInt(process.env["PG_PORT"] || "5432"),
        database: process.env["PG_DATABASE"]!
    }
});
