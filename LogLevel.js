// logLevel.js
const LogConfig = require('./logConfig');

class LogLevel {
    constructor(name, priority, color, abbreviation) {
        this.name = name;
        this.priority = priority;
        this.color = color;
        this.abbreviation = abbreviation;
    }

    formatMessage(message) {
        return `${LogConfig.Colors.WHITE}[${this.color}${this.abbreviation}${LogConfig.Colors.WHITE}]${LogConfig.Colors.RESET} ${LogConfig.Colors.WHITE}${message}${LogConfig.Colors.RESET}`;
    }

    shouldLog(minimumPriority) {
        return this.priority >= minimumPriority;
    }
}

module.exports = LogLevel;