// levels/debugLevel.js
const LogLevel = require('../../LogLevel');
const LogConfig = require('../../LogConfig');

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