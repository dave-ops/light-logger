// logLevel.js
const LogConfig = require('./LogConfig');
const colorizeJson = require('./plugins/colorizeJson');

const isObject = (value) => {
    return value !== null && typeof value === 'object' && 
           Object.getPrototypeOf(value) === Object.prototype;
};

const isTimestamp = (strMsg) => {
    // Regular expression for ISO 8601 timestamp format: YYYY-MM-DDTHH:MM:SS.SSSZ
    const timestampRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    return timestampRegex.test(strMsg);
}

class LogLevel {
    constructor(name, priority, color, abbreviation) {
        this.name = name;
        this.priority = priority;
        this.color = color;
        this.abbreviation = abbreviation;
    }

    formatMessage(message) {
        if (isObject(message)) {
            let json = JSON.stringify(message, null, 4);
            json = json.replaceAll("\\n", "\n");
            json = colorizeJson(json);
            return json;
        }

        if (isTimestamp(message)) {
            return `${LogConfig.Colors.WHITE}[${this.color}${this.abbreviation}` +
            `${LogConfig.Colors.WHITE}]${LogConfig.Colors.RESET} ` +
            `${this.color}${message}${LogConfig.Colors.RESET}`;

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