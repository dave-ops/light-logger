// levels/criticalLevel.js
const LogLevel = require('../LogLevel');
const LogConfig = require('../LogConfig');

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

module.exports = CriticalLevel;