// Base configuration classes with all constants
class LogConfig {
    static Levels = {
        DEBUG: 0,
        INFO: 1,
        WARN: 2,
        ERROR: 3
    };

    static Colors = {
        RESET: '\x1b[0m',
        WHITE: '\x1b[37m',
        BLUE: '\x1b[34m',
        YELLOW: '\x1b[33m',
        ORANGE: '\x1b[38;5;208m',
        RED: '\x1b[31m'
    };

    static LevelConfig = {
        DEBUG: { NAME: 'DEBUG', ABBREVIATION: 'DBG', COLOR: LogConfig.Colors.BLUE },
        INFO: { NAME: 'INFO', ABBREVIATION: 'INF', COLOR: LogConfig.Colors.YELLOW },
        WARN: { NAME: 'WARN', ABBREVIATION: 'WRN', COLOR: LogConfig.Colors.ORANGE },
        ERROR: { NAME: 'ERROR', ABBREVIATION: 'ERR', COLOR: LogConfig.Colors.RED }
    };
}

// Abstract LogLevel class for polymorphic behavior
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

// Concrete log level implementations using constants
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

// Logger class using polymorphism
class Logger {
    constructor(minimumLevel = LogConfig.Levels.DEBUG) {
        this.minimumLevel = minimumLevel;
        this.levels = {
            debug: new DebugLevel(),
            info: new InfoLevel(),
            warn: new WarnLevel(),
            error: new ErrorLevel()
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
}

module.exports = Logger;