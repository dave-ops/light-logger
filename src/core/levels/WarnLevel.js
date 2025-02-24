// levels/warnLevel.js
const LogLevel = require('../../LogLevel');
const LogConfig = require('../../LogConfig');


class WarnLevel extends LogLevel {
    constructor() {
        super(
            LogConfig.LevelConfig.WARN.NAME,
            LogConfig.Levels.WARN,
            LogConfig.LevelConfig.WARN.COLOR,
            LogConfig.LevelConfig.WARN.ABBREVIATION
        );
    }
}

module.exports = WarnLevel;