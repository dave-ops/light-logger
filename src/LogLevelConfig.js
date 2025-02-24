// logLevel.js
const LogConfig = require('./LogConfig');

class LogLevelConfig {
    static DEFAULT_ENV = 'development';
    static DECIMAL_RADIX = 10;

    static getDefaultLevel(env) {
        return env === 'production' 
            ? LogConfig.Levels.ERROR 
            : LogConfig.Levels.DEBUG;
    }

    static determineLogLevel(envLogLevel, env = LogLevelConfig.DEFAULT_ENV) {
        if (envLogLevel !== undefined && envLogLevel !== null) {
            const levelNum = parseInt(envLogLevel, LogLevelConfig.DECIMAL_RADIX);
            if (!isNaN(levelNum) && 
                levelNum >= 0 && 
                levelNum <= LogConfig.Levels.CRITICAL) {
                return levelNum;
            }
        }
        return this.getDefaultLevel(env);
    }
}

module.exports = LogLevelConfig;