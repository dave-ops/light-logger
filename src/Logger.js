// src/Logger.js
const LogConfig = require('./LogConfig');
const LogLevelConfig = require('./LogLevelConfig');  // Updated to match the actual file name and location
const DebugLevel = require('./core/levels/DebugLevel');
const InfoLevel = require('./core/levels/InfoLevel');
const WarnLevel = require('./core/levels/WarnLevel');
const ErrorLevel = require('./core/levels/ErrorLevel');
const CriticalLevel = require('./core/levels/CriticalLevel');

class Logger {
    constructor(env = process.env.NODE_ENV || LogLevelConfig.DEFAULT_ENV) {
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

    log(logLevel, message) {
        if (logLevel.shouldLog(this._minimumLevel)) {
            console.log(logLevel.formatMessage(message));
        }
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

    error(message) {
        this.log(this.levels.error, new Date().toISOString());
        this.log(this.levels.error, message);
    }

    critical(message) {
        this.log(this.levels.critical, new Date().toISOString());
        this.log(this.levels.critical, message);
    }
}

module.exports = Logger;