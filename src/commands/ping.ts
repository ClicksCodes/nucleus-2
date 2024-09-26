import { extendedCommand } from "@/utils/types.js";
import {
    SlashCommandBuilder,
    CommandInteraction,
} from 'discord.js';


const callback = async (interaction: CommandInteraction) => {
    const isEphemeral = interaction.options.get("ephemeral")?.value as boolean;
    const extraText = interaction.options.get("message")?.value as string | "";

    await interaction.reply({ content: 'Pong! ' + extraText, ephemeral: isEphemeral });
}


const command: extendedCommand = {
    command: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!")
        .addBooleanOption(option => option.setName("ephemeral").setDescription("Should the response be ephemeral?"))
        .addStringOption(option => option.setName("message").setDescription("The message to send")),
    callback
};

export default command;