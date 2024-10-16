import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const dbPath = `postgres://${process.env["PG_USER"]}:${process.env["PG_PASSWORD"]}@${process.env["PG_HOST"]}:${process.env["PG_PORT"]}/${process.env["PG_DATABASE"]}`;

const migrationClient = postgres(dbPath, { max: 1 });
await migrate(drizzle(migrationClient), { migrationsFolder: "./drizzle" });
migrationClient.end();

const queryClient = postgres(dbPath, { onnotice: () => {} });
queryClient.begin(() => {});
const client = drizzle(queryClient);

export const close = async () => await queryClient.end();

export default client;
