import type {
    SlashCommandBuilder,
    SlashCommandSubcommandBuilder,
    SlashCommandSubcommandGroupBuilder,
    SlashCommandOptionsOnlyBuilder,
    CommandInteraction,
    AutocompleteInteraction,
    ChatInputCommandInteraction
} from "discord.js";

type extendedCommand = {
    command:
        | SlashCommandBuilder
        | SlashCommandSubcommandBuilder
        | SlashCommandSubcommandGroupBuilder
        | SlashCommandOptionsOnlyBuilder;
    callback: (interaction: ChatInputCommandInteraction) => Promise<void>;
    check?: (interaction: CommandInteraction) => Promise<boolean>;
    autocomplete?: (interaction: AutocompleteInteraction) => Promise<void>;
};

export type { extendedCommand };

export const colours = {
    red: 0xf27878,
    yellow: 0xe5ab71,
    green: 0x65cc76,
    blue: 0x6576cc
};
