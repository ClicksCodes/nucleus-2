import type { NucleusClient } from "@/utils/client.js";
import { eq, desc } from "drizzle-orm";
import * as schema from "@/database/schema.js";

const startup = async (client: NucleusClient) => {
    const servers = await client.guilds.fetch();
    for (const guild of servers) {
        const guildId = guild[1].id;
        const fetched = client.guilds.cache.get(guildId);
        if (!fetched) continue;
        const members = fetched.memberCount;
        const mostRecentRecord = await client.database
            .select()
            .from(schema.guildMemberCount)
            .where(eq(schema.guildMemberCount.guildId, guildId))
            .orderBy(desc(schema.guildMemberCount.date))
            .limit(1)
            .execute();
        if (mostRecentRecord.length !== 0) {
            // There is a record
            const mostRecentRecordData = mostRecentRecord[0]!;
            if (mostRecentRecordData.count === members) continue;
        }
        // Some data is missing, insert a new record
        await client.database
            .insert(schema.guildMemberCount)
            .values({ guildId: guildId, count: members, date: new Date() })
            .execute();
    }
};

export default startup;
