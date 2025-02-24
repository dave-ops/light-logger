// logConfig.js
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
        MAGENTA: '\x1b[35m',
        LIGHT_GREY: '\x1b[38;5;252m',
        GREY: '\x1b[38;5;244m',
        DARK_GREY: '\x1b[38;5;240m',
        BLINKING: '\x1b[5m',         // Slow blink modifier
        BLINKING_RED: '\x1b[31;5m'   // Red text with slow blink
    };

    static LevelConfig = {
        DEBUG: { NAME: 'DEBUG', ABBREVIATION: 'DBG', COLOR: LogConfig.Colors.BLUE },
        INFO: { NAME: 'INFO', ABBREVIATION: 'INF', COLOR: LogConfig.Colors.YELLOW },
        WARN: { NAME: 'WARN', ABBREVIATION: 'WRN', COLOR: LogConfig.Colors.ORANGE },
        ERROR: { NAME: 'ERROR', ABBREVIATION: 'ERR', COLOR: LogConfig.Colors.RED },
        CRITICAL: { NAME: 'CRITICAL', ABBREVIATION: 'CRT', COLOR: LogConfig.Colors.MAGENTA }
    };
}

module.exports = LogConfig;