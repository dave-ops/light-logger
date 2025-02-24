// logLevel.js
const Colors = require("./constants/colors");
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

const formatJson = (obj) => {
    let json = JSON.stringify(obj, null, 4);
    json = json.replaceAll("\\n", "\n");
    json = colorizeJson(json);
    return json;

}

class LogLevel {
    constructor(name, priority, color, abbreviation) {
        this.name = name;
        this.priority = priority;
        this.color = color;
        this.abbreviation = abbreviation;

        this.onInstantiated({name, priority, color, abbreviation});
    }

    onInstantiated(data) {
        const msg = `${Colors.WHITE}${__filename}${Colors.GREY} log level set to ${data.color}${this.name}${Colors.RESET}`;
        console.log(msg);
    }


    formatMessage(msg) {
        if (isObject(msg)) {
            return formatJson(msg);
        }

        if (isTimestamp(msg)) {
            return `${Colors.WHITE}[${this.color}${this.abbreviation}` +
            `${Colors.WHITE}]${Colors.RESET} ` +
            `${this.color}${msg}${Colors.RESET}`;

        }

        if (msg instanceof Error) {
            const name = msg.name;
            const message = msg.message;
            const stack = msg.stack;
            const code = msg.code;
            const data = msg.data;
            const num = msg.number;

            return formatJson({ name, code, message, data, stack, num, });
        }

        return `${Colors.WHITE}[${this.color}${this.abbreviation}` +
               `${Colors.WHITE}]${Colors.RESET} ` +
               `${Colors.LIGHT_GREY}${msg}${Colors.RESET}`;
    }

    shouldLog(minimumPriority) {
        return this.priority >= minimumPriority;
    }
}

module.exports = LogLevel;