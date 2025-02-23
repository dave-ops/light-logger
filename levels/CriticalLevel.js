// levels/criticalLevel.js
const LogLevel = require('../logLevel');
const LogConfig = require('../logConfig');

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