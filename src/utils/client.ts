import { Client, Interaction, ApplicationCommandDataResolvable, GatewayIntentBits } from 'discord.js';
import configFile from "../../config.json" with { type: "json" };
import fs from 'fs';
import { extendedCommand } from '@/utils/types.js';
import logs from '@/utils/logger.js';

import ping from '@/commands/ping.js';


class NucleusClient extends Client {
    config: typeof configFile;
    commands: Record<string, extendedCommand>;

    constructor(config: typeof configFile) {
        super({ intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers
        ] });
        this.config = config;
        this.commands = {
            ping
        };
    }

    async commandHandler(interaction: Interaction) {
        if (!interaction.isCommand()) return;

        const { commandName } = interaction;

        if (this.commands[commandName]) {
            try {
                this.commands[commandName].callback(interaction);
            } catch (error) {
                logs.error(`Error in command callback: ${error}`);
                const messageContent = "There was an error while executing this command!";
                if (interaction.replied) interaction.editReply({ content: messageContent });
                else interaction.followUp({ content: "There was an error while executing this command!", ephemeral: true });
            }
        }
    }

    async registerCommands() {
        // If --update-commands (or -u) isn't passed, don't update commands
        if (!process.argv.includes('--update-commands') && !process.argv.includes('-u')) {
            return logs.info("Skipping command registration");
        }
        logs.info("Registering commands");
        Object.keys(this.commands).forEach(async (command) => {
            const commandObject = this.commands[command]!.command;  // Builder
            const builtCommand = commandObject.toJSON() as ApplicationCommandDataResolvable;
            await this.guilds.cache.get(this.config.developmentServer)?.commands.create(builtCommand);
            logs.info(`Registered command ${command}`);
        });
        logs.success("Commands registered");
    }

    async registerEvents() {
        // Events are stored in /{config.eventsPath}/*.ts
        // Each event has a default export of { event: Discord.Event, once: boolean, callback: Function }
        logs.info("Registering events");
        const eventPath = this.config.eventsPath;
        const eventFiles = fs.readdirSync("dist/" + eventPath).filter(file => file.endsWith('.js'));

        const eventCapture = (callback: Function) => {
            return async (...args: any) => {
                try { await callback(...args); }
                catch (error) { logs.error(`Error in event callback: ${error}`); }
            }
        }

        eventFiles.forEach(async (file) => {
            const event = (await import(`../${eventPath}/${file}`)).default;
            if (event.once) {
                this.once(event.event, eventCapture(event.callback));
            } else {
                this.on(event.event, eventCapture(event.callback));
            }
            logs.info(`Registered event ${event.event}`);
        });
        logs.success("Events registered");
    }
};


const Nucleus = new NucleusClient(configFile);

export default Nucleus;
