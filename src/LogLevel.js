// logLevel.js
const LogConfig = require('./LogConfig');
const jsonFormatter = require('./plugins/jsonFormatter');

const isObject = (value) => {
    return value !== null && typeof value === 'object' && 
           Object.getPrototypeOf(value) === Object.prototype;
};

class LogLevel {
    constructor(name, priority, color, abbreviation) {
        this.name = name;
        this.priority = priority;
        this.color = color;
        this.abbreviation = abbreviation;
    }

    formatMessage(message) {
        if (isObject(message)) {
            let json = jsonFormatter(message);
            return json;
        }

        return `${LogConfig.Colors.WHITE}[${this.color}${this.abbreviation}` +
               `${LogConfig.Colors.WHITE}]${LogConfig.Colors.RESET} ` +
               `${LogConfig.Colors.LIGHT_GREY}${message}${LogConfig.Colors.RESET}`;
    }

    shouldLog(minimumPriority) {
        return this.priority >= minimumPriority;
    }
}

module.exports = LogLevel;