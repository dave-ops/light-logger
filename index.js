// Base configuration classes with all constants
class LogConfig {
    static Levels = {
        DEBUG: 0,
        INFO: 1,
        WARN: 2,
        ERROR: 3,
        CRITICAL: 4  // Added CRITICAL level
    };

    static Colors = {
        RESET: '\x1b[0m',
        WHITE: '\x1b[37m',
        BLUE: '\x1b[34m',
        YELLOW: '\x1b[33m',
        ORANGE: '\x1b[38;5;208m',
        RED: '\x1b[31m',
        MAGENTA: '\x1b[35m'  // Added for CRITICAL (you can choose a different color)
    };

    static LevelConfig = {
        DEBUG: { NAME: 'DEBUG', ABBREVIATION: 'DBG', COLOR: LogConfig.Colors.BLUE },
        INFO: { NAME: 'INFO', ABBREVIATION: 'INF', COLOR: LogConfig.Colors.YELLOW },
        WARN: { NAME: 'WARN', ABBREVIATION: 'WRN', COLOR: LogConfig.Colors.ORANGE },
        ERROR: { NAME: 'ERROR', ABBREVIATION: 'ERR', COLOR: LogConfig.Colors.RED },
        CRITICAL: { NAME: 'CRITICAL', ABBREVIATION: 'CRT', COLOR: LogConfig.Colors.MAGENTA }  // Added CRITICAL config
    };
}

// Abstract LogLevel class (unchanged)
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

// Existing concrete log level implementations (unchanged)
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

// New CRITICAL level implementation
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

// Logger class with CRITICAL level support
class Logger {
    constructor(minimumLevel = LogConfig.Levels.DEBUG) {
        this.minimumLevel = minimumLevel;
        this.levels = {
            debug: new DebugLevel(),
            info: new InfoLevel(),
            warn: new WarnLevel(),
            error: new ErrorLevel(),
            critical: new CriticalLevel()  // Added critical level
        };
    }

    log(logLevel, message) {
        if (logLevel.shouldLog(this.minimumLevel)) {
            console.log(logLevel.formatMessage(message));
        }
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

    critical(message) {  // Added critical method
        this.log(this.levels.critical, new Date().toISOString());
        this.log(this.levels.critical, message);
    }
}

module.exports = Logger;