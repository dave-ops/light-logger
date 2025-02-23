// Base configuration classes
class LogConfig {
    static Levels = {
        DEBUG: 0,
        INFO: 1,
        WARN: 2,
        ERROR: 3
    };

    static Colors = {
        Reset: '\x1b[0m',
        White: '\x1b[37m',
        Blue: '\x1b[34m',
        Yellow: '\x1b[33m',
        Orange: '\x1b[38;5;208m',
        Red: '\x1b[31m'
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
        return `${LogConfig.Colors.White}[${this.color}${this.abbreviation}${LogConfig.Colors.White}]${LogConfig.Colors.Reset} ${LogConfig.Colors.White}${message}${LogConfig.Colors.Reset}`;
    }

    shouldLog(minimumPriority) {
        return this.priority >= minimumPriority;
    }
}

// Concrete log level implementations
class DebugLevel extends LogLevel {
    constructor() {
        super('DEBUG', LogConfig.Levels.DEBUG, LogConfig.Colors.Blue, 'DBG');
    }
}

class InfoLevel extends LogLevel {
    constructor() {
        super('INFO', LogConfig.Levels.INFO, LogConfig.Colors.Yellow, 'INF');
    }
}

class WarnLevel extends LogLevel {
    constructor() {
        super('WARN', LogConfig.Levels.WARN, LogConfig.Colors.Orange, 'WRN');
    }
}

class ErrorLevel extends LogLevel {
    constructor() {
        super('ERROR', LogConfig.Levels.ERROR, LogConfig.Colors.Red, 'ERR');
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