// levels/infoLevel.js
const LogLevel = require('../logLevel');
const LogConfig = require('../logConfig');

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

module.exports = InfoLevel;