// logger.js
const LogConfig = require('./LogConfig');
const LogLevelConfig = require('./LogLevelConfig');
const DebugLevel = require('./core/levels/DebugLevel');
const InfoLevel = require('./core/levels/InfoLevel');
const WarnLevel = require('./core/levels/WarnLevel');
const ErrorLevel = require('./core/levels/ErrorLevel');
const CriticalLevel = require('./core/levels/CriticalLevel');
const Colors = require('./constants/colors');

class Logger {
    constructor(env = process.env.NODE_ENV || 'development') {
        this._env = env;
        this._minimumLevel = LogLevelConfig.determineLogLevel(process.env.LOG_LEVEL, env);
        this.levels = {
            debug: new DebugLevel(),
            info: new InfoLevel(),
            warn: new WarnLevel(),
            error: new ErrorLevel(),
            critical: new CriticalLevel()
        };
    }

    static get Levels() {
        return LogConfig.Levels;
    }

    get Levels() {
        return LogConfig.Levels;
    }

    get env() {
        return this._env;
    }

    get minimumLevel() {
        return this._minimumLevel;
    }

    get level() {
        return this._minimumLevel;
    }

    set level(level) {
        this._minimumLevel = level;
    }
    
    toLevel(levelNumber) {
        switch (levelNumber) {
            case LogConfig.Levels.DEBUG:
                return this.levels.debug;
            case LogConfig.Levels.INFO:
                return this.levels.info;
            case LogConfig.Levels.WARN:
                return this.levels.warn;
            case LogConfig.Levels.ERROR:
                return this.levels.error;
            case LogConfig.Levels.CRITICAL:
                return this.levels.critical;
            default:
                return this.levels.error;
        }
    }

    log(logLevel, message, formatter) {
        if (logLevel.shouldLog(this._minimumLevel)) {
            if (formatter) {
                console.log(formatter(message));
            } else {
                console.log(logLevel.formatMessage(message));
            }
        }
    }

    raw(message) {
        console.log(message);
    }

    timestamp() {
        const ts = new Date().toISOString();
        this.log(this.levels.debug, ts);
    }

    debug(message) {
        this.log(this.levels.debug, message);
    }

    info(message) {
        this.log(this.levels.info, message);
    }

    warn(message) {
        this.log(this.levels.warn, message);
    }

    error(message, err) {
        const formatter = (msg) => `${Colors.WHITE}[${Colors.RED}ERR${Colors.WHITE}] ` +
                                   `${Colors.DARK_RED}${msg}${Colors.RESET}`;
        if (err && err.name) {
            this.log(this.levels.error, err.name, formatter);
        } else {
            this.log(this.levels.error, new Date().toISOString(), formatter);
            this.log(this.levels.error, message, formatter);    
        }
    }


    critical(message, err) {
        const formatter = (msg) => `${Colors.WHITE}[${Colors.MAGENTA}CRT${Colors.WHITE}] ` +
                                   `${Colors.DARK_PURPLE}${msg}${Colors.RESET}`;
        if (err && err.name) {
            this.log(this.levels.error, err.name, formatter);
        }
        this.log(this.levels.error, new Date().toISOString(), formatter);
        this.log(this.levels.critical, message, formatter);
        this.log(this.levels.critical, err);
    }
}

module.exports = Logger;