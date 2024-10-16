import { Events, GuildMember } from "discord.js";
import client from "../utils/client.js";
import { guildMemberCount } from "@/database/schema.js";

export default {
    event: Events.GuildMemberRemove,
    once: false,
    callback: async (member: GuildMember) => {
        await client.database.insert(guildMemberCount).values({
            guildId: member.guild.id,
            date: new Date(),
            count: member.guild.memberCount
        });
    }
};
