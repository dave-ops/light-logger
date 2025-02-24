// logConfig.js
const Colors = require("./constants/colors");

class LogConfig {
    static Levels = {
        DEBUG: 0,
        INFO: 1,
        WARN: 2,
        ERROR: 3,
        CRITICAL: 4
    };

    static LevelConfig = {
        DEBUG: { NAME: 'DEBUG', ABBREVIATION: 'DBG', COLOR: Colors.BLUE },
        INFO: { NAME: 'INFO', ABBREVIATION: 'INF', COLOR: Colors.YELLOW },
        WARN: { NAME: 'WARN', ABBREVIATION: 'WRN', COLOR: Colors.ORANGE },
        ERROR: { NAME: 'ERROR', ABBREVIATION: 'ERR', COLOR: Colors.RED },
        CRITICAL: { NAME: 'CRITICAL', ABBREVIATION: 'CRT', COLOR: Colors.MAGENTA }
    };
}

module.exports = LogConfig;