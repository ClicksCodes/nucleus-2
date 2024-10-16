import client from "@/utils/client.js";
import { Events } from "discord.js";
import logs from "@/utils/logger.js";
import handle from "./utils/errorHandler.js";

client.once(Events.ClientReady, () => {
    logs.success("Logged in as " + client.user?.displayName);

    client.registerCommands();
    client.registerEvents();
    client.startAPI();
    client.startup();
});

client.on(Events.InteractionCreate, async (interaction) => {
    await client.commandHandler(interaction);
});

process.on("unhandledRejection", (error: Error) => {
    handle(error);
});

client.login(process.env["DISCORD_TOKEN"]);
