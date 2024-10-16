import { colours, extendedCommand } from "@/utils/types.js";
import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import client from "@/utils/client.js";
import { guildMemberCount } from "@/database/schema.js";
import { gt, and, eq, sql } from "drizzle-orm";

const callback = async (interaction: ChatInputCommandInteraction) => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const todayRecords = await client.database
        .select({ count: sql<number>`count(*)` })
        .from(guildMemberCount)
        .where(and(gt(guildMemberCount.date, startOfToday), eq(guildMemberCount.guildId, interaction.guild!.id)))
        .groupBy(guildMemberCount.date)
        .execute();

    const mostRecent = await client.database
        .select()
        .from(guildMemberCount)
        .where(eq(guildMemberCount.guildId, interaction.guild!.id))
        .orderBy(guildMemberCount.date)
        .limit((todayRecords[0]?.count ?? 0) + 1)
        .execute();

    const membersStart = mostRecent[0]!.count;
    const membersEnd = mostRecent[mostRecent.length - 1]!.count;

    await interaction.reply({
        embeds: [
            new EmbedBuilder()
                .setTitle(`Summary for ${now.toDateString()}`)
                .setDescription(
                    `Today, the server has ${membersEnd >= membersStart ? "gained" : "lost"} ` +
                        `${Math.abs(membersEnd - membersStart)} members. (${membersStart} -> ${membersEnd})`
                )
                .setColor(colours.blue)
        ]
    });
};

const command: extendedCommand = {
    command: new SlashCommandBuilder().setName("summary").setDescription("Creates a summary of the server for today."),
    callback
};

export default command;
