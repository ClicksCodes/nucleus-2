import { colours, extendedCommand } from "@/utils/types.js";
import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonInteraction,
    ButtonStyle,
    ChatInputCommandInteraction,
    EmbedBuilder,
    GuildTextBasedChannel,
    Interaction,
    SlashCommandBuilder
} from "discord.js";
// import nucleusClient from "@/utils/client.js";

const callback = async (interaction: ChatInputCommandInteraction) => {
    const isEphemeral = interaction.options.getBoolean("ephemeral", false) || false;
    const extraText = interaction.options.getString("message", false) || "None";

    const reply = await interaction.reply({
        embeds: [
            new EmbedBuilder()
                .setTitle("Pong!")
                .setDescription(`${extraText}`)
                .addFields(
                    { name: "Latency", value: `${Date.now() - interaction.createdTimestamp}ms` },
                    { name: "API Latency", value: `${Math.round(interaction.client.ws.ping)}ms` }
                )
                .setColor(colours.red)
        ],
        components: [
            new ActionRowBuilder<ButtonBuilder>().addComponents(
                new ButtonBuilder().setCustomId("log_pls").setLabel("Log this").setStyle(ButtonStyle.Danger)
            )
        ],
        ephemeral: isEphemeral,
        fetchReply: true
    });

    let pressed: ButtonInteraction;
    const channel = interaction.channel as GuildTextBasedChannel;
    try {
        pressed = (await channel.awaitMessageComponent({
            filter: (i: Interaction) =>
                i.isMessageComponent() && i.user.id === interaction.user.id && i.message.id === reply.id,
            time: 15 * 60 * 1000
        })) as ButtonInteraction;
    } catch {
        return;
    }
    pressed.deferUpdate();
    console.log("pressed!!!11!!!1!!!111!!!!!");
    console.log(pressed.user.displayName);
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
