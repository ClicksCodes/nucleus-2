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
