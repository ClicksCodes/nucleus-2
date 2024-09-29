import { extendedCommand } from "@/utils/types.js";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import nucleusClient from "@/utils/client.js";
import schema from "@/database/schema.js";

const callback = async (interaction: ChatInputCommandInteraction) => {
    const isEphemeral = interaction.options.getBoolean("ephemeral") || false;
    const extraText = interaction.options.getString("message") || "";

    await nucleusClient.database.update(schema.serverSettings).set({
        id: "ping",
        isThisOptionEnabled: isEphemeral.toString()
    });

    await interaction.reply({
        content: "Pong! " + extraText,
        ephemeral: isEphemeral
    });
};

const command: extendedCommand = {
    command: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!")
        .addBooleanOption((option) => option.setName("ephemeral").setDescription("Should the response be ephemeral?"))
        .addStringOption((option) => option.setName("message").setDescription("The message to send")),
    callback
};

export default command;
