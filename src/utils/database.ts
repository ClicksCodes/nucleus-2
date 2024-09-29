import { drizzle } from "drizzle-orm/postgres-js";
import { migrate as mg } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const dbPath = `postgres://${process.env["PG_USER"]}:${process.env["PG_PASSWORD"]}@localhost:${process.env["PG_PORT"]}/${process.env["PG_DATABASE"]}`;

const queryClient = postgres(dbPath);
queryClient.begin(() => {});
const client = drizzle(queryClient);

export const migrate = async () => mg(client, { migrationsFolder: "./drizzle" });
export const close = async () => await queryClient.end();

export default client;
