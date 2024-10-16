import { Events, Guild } from "discord.js";
import client from "../utils/client.js";
import { guildMemberCount } from "@/database/schema.js";

export default {
    event: Events.GuildCreate,
    once: false,
    callback: async (guild: Guild) => {
        console.log("Dispatched");
        await client.database.insert(guildMemberCount).values({
            guildId: guild.id,
            date: new Date(),
            count: guild.memberCount
        });
    }
};
