// Get the log level from config.json
import configFile from "../../config.json" with { type: "json" };

const levels = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
    fatal: 4
};

const logLevel = (level: number) => {
    return levels[configFile.logLevel as keyof typeof levels] <= level;
};

const debug = (...messages: string[]) => logLevel(0) && console.log(`[ DEBUG] ${messages.join(" ")}`);
const info = (...messages: string[]) => logLevel(1) && console.log(`[ INFO ] ${messages.join(" ")}`);
const success = (...messages: string[]) => logLevel(1) && console.log(`[  OK  ] ${messages.join(" ")}`);
const warn = (...messages: string[]) => logLevel(2) && console.log(`[ WARN ] ${messages.join(" ")}`);
const error = (...messages: string[]) => logLevel(3) && console.log(`[ ERROR] ${messages.join(" ")}`);
const fatal = (...messages: string[]) => logLevel(4) && console.log(`[ FATAL] ${messages.join(" ")}`);

export default {
    info,
    warn,
    error,
    debug,
    fatal,
    success
};
