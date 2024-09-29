CREATE TABLE IF NOT EXISTS "server_settings" (
	"id" text PRIMARY KEY NOT NULL,
	"is_this_option_enabled" text DEFAULT 'false' NOT NULL,
	CONSTRAINT "server_settings_id_unique" UNIQUE("id")
);
