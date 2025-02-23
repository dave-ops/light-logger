// Base configuration classes with all constants
class LogConfig {
    static Levels = {
        DEBUG: 0,
        INFO: 1,
        WARN: 2,
        ERROR: 3,
        CRITICAL: 4
    };

    static Colors = {
        RESET: '\x1b[0m',
        WHITE: '\x1b[37m',
        BLUE: '\x1b[34m',
        YELLOW: '\x1b[33m',
        ORANGE: '\x1b[38;5;208m',
        RED: '\x1b[31m',
        MAGENTA: '\x1b[35m'
    };

    static LevelConfig = {
        DEBUG: { NAME: 'DEBUG', ABBREVIATION: 'DBG', COLOR: LogConfig.Colors.BLUE },
        INFO: { NAME: 'INFO', ABBREVIATION: 'INF', COLOR: LogConfig.Colors.YELLOW },
        WARN: { NAME: 'WARN', ABBREVIATION: 'WRN', COLOR: LogConfig.Colors.ORANGE },
        ERROR: { NAME: 'ERROR', ABBREVIATION: 'ERR', COLOR: LogConfig.Colors.RED },
        CRITICAL: { NAME: 'CRITICAL', ABBREVIATION: 'CRT', COLOR: LogConfig.Colors.MAGENTA }
    };
}

// Abstract LogLevel class
class LogLevel {
    constructor(name, priority, color, abbreviation) {
        this.name = name;
        this.priority = priority;
        this.color = color;
        this.abbreviation = abbreviation;
    }

    formatMessage(message) {
        return `${LogConfig.Colors.WHITE}[${this.color}${this.abbreviation}${LogConfig.Colors.WHITE}]${LogConfig.Colors.RESET} ${LogConfig.Colors.WHITE}${message}${LogConfig.Colors.RESET}`;
    }

    shouldLog(minimumPriority) {
        return this.priority >= minimumPriority;
    }
}

// Concrete log level implementations
class DebugLevel extends LogLevel {
    constructor() {
        super(
            LogConfig.LevelConfig.DEBUG.NAME,
            LogConfig.Levels.DEBUG,
            LogConfig.LevelConfig.DEBUG.COLOR,
            LogConfig.LevelConfig.DEBUG.ABBREVIATION
        );
    }
}

class InfoLevel extends LogLevel {
    constructor() {
        super(
            LogConfig.LevelConfig.INFO.NAME,
            LogConfig.Levels.INFO,
            LogConfig.LevelConfig.INFO.COLOR,
            LogConfig.LevelConfig.INFO.ABBREVIATION
        );
    }
}

class WarnLevel extends LogLevel {
    constructor() {
        super(
            LogConfig.LevelConfig.WARN.NAME,
            LogConfig.Levels.WARN,
            LogConfig.LevelConfig.WARN.COLOR,
            LogConfig.LevelConfig.WARN.ABBREVIATION
        );
    }
}

class ErrorLevel extends LogLevel {
    constructor() {
        super(
            LogConfig.LevelConfig.ERROR.NAME,
            LogConfig.Levels.ERROR,
            LogConfig.LevelConfig.ERROR.COLOR,
            LogConfig.LevelConfig.ERROR.ABBREVIATION
        );
    }
}

class CriticalLevel extends LogLevel {
    constructor() {
        super(
            LogConfig.LevelConfig.CRITICAL.NAME,
            LogConfig.Levels.CRITICAL,
            LogConfig.LevelConfig.CRITICAL.COLOR,
            LogConfig.LevelConfig.CRITICAL.ABBREVIATION
        );
    }
}

// Logger class
class Logger {
    constructor(env = process.env.NODE_ENV || 'development') {
        this._env = env;
        // Check environment variable LOG_LEVEL first
        const envLogLevel = process.env.LOG_LEVEL;
        if (envLogLevel !== undefined && envLogLevel !== null) {
            const levelNum = parseInt(envLogLevel, 10);
            if (!isNaN(levelNum) && levelNum >= 0 && levelNum <= LogConfig.Levels.CRITICAL) {
                this._minimumLevel = levelNum;
            } else {
                // If LOG_LEVEL is invalid, fall back to production check
                this._minimumLevel = env === 'production' ? LogConfig.Levels.ERROR : LogConfig.Levels.DEBUG;
            }
        } else {
            // No LOG_LEVEL specified, use production check
            this._minimumLevel = env === 'production' ? LogConfig.Levels.ERROR : LogConfig.Levels.DEBUG;
        }
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