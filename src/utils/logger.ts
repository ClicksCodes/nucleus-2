// Get the log level from config.json
import configFile from "../../config.json" with { type: "json" };

const levels = {
    "debug": 0,
    "info": 1,
    "warn": 2,
    "error": 3,
    "fatal": 4
}

const logLevel = (level: number) => {
    return levels[configFile.logLevel as keyof typeof levels] <= level;
}

const debug = (message: string) => { logLevel(0) && console.log(`[ DEBUG] ${message}`); }
const info = (message: string) => { logLevel(1) && console.log(`[ INFO ] ${message}`); }
const success = (message: string) => { logLevel(1) && console.log(`[  OK  ] ${message}`); }
const warn = (message: string) => { logLevel(2) && console.log(`[ WARN ] ${message}`); }
const error = (message: string) => { logLevel(3) && console.log(`[ ERROR] ${message}`); }
const fatal = (message: string) => { logLevel(4) && console.log(`[ FATAL] ${message}`); }

export default {
    info,
    warn,
    error,
    debug,
    fatal,
    success
};
