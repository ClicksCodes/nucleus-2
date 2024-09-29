// Get the log level from config.json
import configFile from "../../config.json" with { type: "json" };

const levels = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
    fatal: 4
};

const colours = {
    c: "\x1b[0m",
    red: "\x1b[91m",
    green: "\x1b[92m",
    yellow: "\x1b[93m",
    blue: "\x1b[94m"
};

const logLevel = (level: number) => {
    return levels[configFile.logLevel as keyof typeof levels] <= level;
};

const debug = (...messages: string[]) =>
    logLevel(0) && console.log(`[${colours.blue}DEBUGS${colours.c}] ${messages.join(" ")}`);
const info = (...messages: string[]) =>
    logLevel(1) && console.log(`[${colours.blue} INFO ${colours.c}] ${messages.join(" ")}`);
const success = (...messages: string[]) =>
    logLevel(1) && console.log(`[${colours.green}  OK  ${colours.c}] ${messages.join(" ")}`);
const warn = (...messages: string[]) =>
    logLevel(2) && console.log(`[${colours.yellow} WARN ${colours.c}] ${messages.join(" ")}`);
const error = (...messages: string[]) =>
    logLevel(3) && console.log(`[${colours.red}ERRORS${colours.c}] ${messages.join(" ")}`);
const fatal = (...messages: string[]) =>
    logLevel(4) && console.log(`[${colours.red} HALT ${colours.c}] ${messages.join(" ")}`);

export default { info, warn, error, debug, fatal, success };
