// levels/infoLevel.js
const LogLevel = require('../../LogLevel');
const LogConfig = require('../../LogConfig');


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