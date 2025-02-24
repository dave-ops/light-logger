// levels/errorLevel.js
const LogLevel = require('../../LogLevel');
const LogConfig = require('../../LogConfig');


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

module.exports = ErrorLevel;