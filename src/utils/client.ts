import { Client, Interaction, ApplicationCommandDataResolvable } from 'discord.js';
import configFile from "../../config.json" with { type: "json" };
import { extendedCommand } from '@/utils/types.js';

import ping from '@/commands/ping.js';


class NucleusClient extends Client {
    config: typeof configFile;
    commands: Record<string, extendedCommand>;

    constructor(config: typeof configFile) {
        super({ intents: []});
        this.config = config;
        this.commands = {
            ping
        };
    }

    async commandHandler(interaction: Interaction) {
        if (!interaction.isCommand()) return;

        const { commandName } = interaction;

        if (this.commands[commandName]) {
            this.commands[commandName].callback(interaction);
        }
    }

    async registerCommands() {
        // If --update-commands (or -u) isn't passed, don't update commands
        if (!process.argv.includes('--update-commands') && !process.argv.includes('-u')) return;
        console.log("Registering commands...");
        Object.keys(this.commands).forEach(async (command) => {
            const commandObject = this.commands[command]!.command;  // Builder
            const builtCommand = commandObject.toJSON() as ApplicationCommandDataResolvable;
            await this.guilds.cache.get(this.config.developmentServer)?.commands.create(builtCommand);
        });
        console.log("Commands registered!");
    }
};


const Nucleus = new NucleusClient(configFile);

export default Nucleus;
