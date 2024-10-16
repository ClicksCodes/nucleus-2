ALTER TABLE "guild_member_count" RENAME COLUMN "guildId" TO "guild_id";--> statement-breakpoint
ALTER TABLE "unique_members" RENAME COLUMN "guildId" TO "guild_id";--> statement-breakpoint
ALTER TABLE "guild_member_count" DROP CONSTRAINT "guild_member_count_guildId_date_pk";--> statement-breakpoint
ALTER TABLE "unique_members" DROP CONSTRAINT "unique_members_guildId_date_pk";--> statement-breakpoint
ALTER TABLE "guild_member_count" ADD CONSTRAINT "guild_member_count_guild_id_date_pk" PRIMARY KEY("guild_id","date");--> statement-breakpoint
ALTER TABLE "unique_members" ADD CONSTRAINT "unique_members_guild_id_date_pk" PRIMARY KEY("guild_id","date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "date_index" ON "guild_member_count" USING btree ("date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "guild_id_index" ON "guild_member_count" USING btree ("guild_id");