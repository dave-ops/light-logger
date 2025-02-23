// levels/debugLevel.js
const LogLevel = require('../logLevel');
const LogConfig = require('../logConfig');

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

module.exports = DebugLevel;