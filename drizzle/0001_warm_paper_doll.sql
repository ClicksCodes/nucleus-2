DO $$ BEGIN
 CREATE TYPE "public"."days" AS ENUM('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
CREATE TABLE IF NOT EXISTS "channel_hourly_messages_average" (
	"channel_id" text NOT NULL,
	"day_of_week" "days" NOT NULL,
	"server" text NOT NULL,
	"hour_0" integer DEFAULT 0,
	"hour_1" integer DEFAULT 0,
	"hour_2" integer DEFAULT 0,
	"hour_3" integer DEFAULT 0,
	"hour_4" integer DEFAULT 0,
	"hour_5" integer DEFAULT 0,
	"hour_6" integer DEFAULT 0,
	"hour_7" integer DEFAULT 0,
	"hour_8" integer DEFAULT 0,
	"hour_9" integer DEFAULT 0,
	"hour_10" integer DEFAULT 0,
	"hour_11" integer DEFAULT 0,
	"hour_12" integer DEFAULT 0,
	"hour_13" integer DEFAULT 0,
	"hour_14" integer DEFAULT 0,
	"hour_15" integer DEFAULT 0,
	"hour_16" integer DEFAULT 0,
	"hour_17" integer DEFAULT 0,
	"hour_18" integer DEFAULT 0,
	"hour_19" integer DEFAULT 0,
	"hour_20" integer DEFAULT 0,
	"hour_21" integer DEFAULT 0,
	"hour_22" integer DEFAULT 0,
	"hour_23" integer DEFAULT 0,
	"count" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "channel_hourly_messages_average_channel_id_day_of_week_pk" PRIMARY KEY("channel_id","day_of_week")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "channel_hourly_messages_week" (
	"channel_id" text NOT NULL,
	"day_of_week" "days" NOT NULL,
	"server" text NOT NULL,
	"hour_0" integer DEFAULT 0,
	"hour_1" integer DEFAULT 0,
	"hour_2" integer DEFAULT 0,
	"hour_3" integer DEFAULT 0,
	"hour_4" integer DEFAULT 0,
	"hour_5" integer DEFAULT 0,
	"hour_6" integer DEFAULT 0,
	"hour_7" integer DEFAULT 0,
	"hour_8" integer DEFAULT 0,
	"hour_9" integer DEFAULT 0,
	"hour_10" integer DEFAULT 0,
	"hour_11" integer DEFAULT 0,
	"hour_12" integer DEFAULT 0,
	"hour_13" integer DEFAULT 0,
	"hour_14" integer DEFAULT 0,
	"hour_15" integer DEFAULT 0,
	"hour_16" integer DEFAULT 0,
	"hour_17" integer DEFAULT 0,
	"hour_18" integer DEFAULT 0,
	"hour_19" integer DEFAULT 0,
	"hour_20" integer DEFAULT 0,
	"hour_21" integer DEFAULT 0,
	"hour_22" integer DEFAULT 0,
	"hour_23" integer DEFAULT 0,
	CONSTRAINT "channel_hourly_messages_week_channel_id_day_of_week_pk" PRIMARY KEY("channel_id","day_of_week")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "guild_member_count" (
	"guildId" text NOT NULL,
	"date" timestamp DEFAULT now(),
	"count" integer,
	CONSTRAINT "guild_member_count_guildId_date_pk" PRIMARY KEY("guildId","date")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "unique_members" (
	"guildId" text NOT NULL,
	"date" timestamp DEFAULT now(),
	"count" integer,
	CONSTRAINT "unique_members_guildId_date_pk" PRIMARY KEY("guildId","date")
);
--> statement-breakpoint
DROP TABLE "server_settings";
