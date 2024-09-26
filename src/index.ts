import client from '@/utils/client.js';
import { Events } from 'discord.js';


client.once(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user?.username}`);

    client.registerCommands();
});

client.on(Events.InteractionCreate, async (interaction) => {
    await client.commandHandler(interaction);
});

client.login(process.env["DISCORD_TOKEN"]);
