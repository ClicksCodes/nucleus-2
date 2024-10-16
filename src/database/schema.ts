import { pgTable, text, integer, pgEnum, primaryKey, timestamp, index } from "drizzle-orm/pg-core";

export const days = pgEnum("days", ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]);

const hourlyWeekCounts = {
    channelId: text("channel_id").notNull(),
    dayOfWeek: days("day_of_week").notNull(),
    server: text("server").notNull(),
    hour_0: integer("hour_0").default(0),
    hour_1: integer("hour_1").default(0),
    hour_2: integer("hour_2").default(0),
    hour_3: integer("hour_3").default(0),
    hour_4: integer("hour_4").default(0),
    hour_5: integer("hour_5").default(0),
    hour_6: integer("hour_6").default(0),
    hour_7: integer("hour_7").default(0),
    hour_8: integer("hour_8").default(0),
    hour_9: integer("hour_9").default(0),
    hour_10: integer("hour_10").default(0),
    hour_11: integer("hour_11").default(0),
    hour_12: integer("hour_12").default(0),
    hour_13: integer("hour_13").default(0),
    hour_14: integer("hour_14").default(0),
    hour_15: integer("hour_15").default(0),
    hour_16: integer("hour_16").default(0),
    hour_17: integer("hour_17").default(0),
    hour_18: integer("hour_18").default(0),
    hour_19: integer("hour_19").default(0),
    hour_20: integer("hour_20").default(0),
    hour_21: integer("hour_21").default(0),
    hour_22: integer("hour_22").default(0),
    hour_23: integer("hour_23").default(0)
};

export const channelHourlyMessagesWeek = pgTable("channel_hourly_messages_week", hourlyWeekCounts, (table) => ({
    id: primaryKey({ columns: [table.channelId, table.dayOfWeek] })
}));

export const channelHourlyMessagesAverage = pgTable(
    "channel_hourly_messages_average",
    Object.assign(hourlyWeekCounts, {
        count: integer("count").notNull().default(0)
    }),
    (table) => ({
        id: primaryKey({ columns: [table.channelId, table.dayOfWeek] })
    })
);

export const guildMemberCount = pgTable(
    "guild_member_count",
    {
        guildId: text("guild_id").notNull(),
        date: timestamp("date").defaultNow().notNull(),
        count: integer("count").notNull()
    },
    (table) => ({
        id: primaryKey({ columns: [table.guildId, table.date] }),
        dateIndex: index("date_index").on(table.date),
        guildIdIndex: index("guild_id_index").on(table.guildId)
    })
);

export const uniqueMembers = pgTable(
    "unique_members",
    {
        channelId: text("guild_id").notNull(),
        date: timestamp("date").defaultNow(),
        count: integer("count")
    },
    (table) => ({
        id: primaryKey({ columns: [table.channelId, table.date] })
    })
);
