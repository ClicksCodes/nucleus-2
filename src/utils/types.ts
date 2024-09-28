import type {
    SlashCommandBuilder,
    SlashCommandSubcommandBuilder,
    SlashCommandSubcommandGroupBuilder,
    SlashCommandOptionsOnlyBuilder,
    CommandInteraction,
    AutocompleteInteraction
} from 'discord.js';

type extendedCommand = {
    command: SlashCommandBuilder | SlashCommandSubcommandBuilder | SlashCommandSubcommandGroupBuilder | SlashCommandOptionsOnlyBuilder
    callback: (interaction: CommandInteraction) => Promise<void>
    check?: (interaction: CommandInteraction) => Promise<boolean>
    autocomplete?: (interaction: AutocompleteInteraction) => Promise<void>
}

export type { extendedCommand };
