import { pgTable, text } from "drizzle-orm/pg-core";

const serverSettings = pgTable("server_settings", {
    id: text("id").notNull().unique().primaryKey(),
    isThisOptionEnabled: text("is_this_option_enabled").notNull().default("false")
});

export default {
    serverSettings
};
