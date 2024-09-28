import type {
    SlashCommandBuilder,
    SlashCommandSubcommandBuilder,
    SlashCommandSubcommandGroupBuilder,
    SlashCommandOptionsOnlyBuilder,
    CommandInteraction,
    AutocompleteInteraction,
    CommandInteractionOptionResolver
} from "discord.js";

type extendedCommand = {
    command:
        | SlashCommandBuilder
        | SlashCommandSubcommandBuilder
        | SlashCommandSubcommandGroupBuilder
        | SlashCommandOptionsOnlyBuilder;
    callback: (interaction: ClientCommandInteraction) => Promise<void>;
    check?: (interaction: CommandInteraction) => Promise<boolean>;
    autocomplete?: (interaction: AutocompleteInteraction) => Promise<void>;
};

type ClientCommandInteraction = CommandInteraction & {
    options: CommandInteractionOptionResolver;
};

export type { extendedCommand, ClientCommandInteraction };
