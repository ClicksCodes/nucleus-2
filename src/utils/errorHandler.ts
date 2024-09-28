import logs from '@/utils/logger.js';


const handle = (error: Error & {code?: string}) => {
    if (error.code === "InteractionAlreadyReplied") {
        logs.error("Discord.js: Interaction already replied (or deferred)");
        logs.info(`> ${error.message}`);
        return;
    }
    logs.error("Unhandled error in command callback");
    logs.info(`> ${error.message}`);
}

export default handle;
