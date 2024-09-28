import { Events, Message } from "discord.js";

export default {
    event: Events.MessageCreate,
    once: false,
    callback: async (message: Message) => {
        console.log(`Message from ${message.author.tag}: ${message.content}`);
    }
}
