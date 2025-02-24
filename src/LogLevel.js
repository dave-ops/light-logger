// logLevel.js
const Colors = require("./constants/colors");
const colorizeJson = require('./plugins/colorizeJson');
const LogConfig = require("./LogConfig")

const isObject = (value) => {
    return value !== null && typeof value === 'object' && 
           Object.getPrototypeOf(value) === Object.prototype;
};

const isTimestamp = (strMsg) => {
    // Regular expression for ISO 8601 timestamp format: YYYY-MM-DDTHH:MM:SS.SSSZ
    const timestampRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    return timestampRegex.test(strMsg);
}

const getCurrentFilePath = () => {
    try {
        // Throw an error to capture the stack trace
        throw new Error('Getting stack trace');
    } catch (error) {
        // Split the stack trace into lines
        const stackLines = error.stack.split('\n');
        
        // Get the second line (first line is the error message)
        // This points to the line that called this function
        const callerLine = stackLines[2];
        
        // Extract the file path using regex
        // Matches pattern like "at /full/path/to/file.js:line:column"
        const filePathMatch = callerLine.match(/\s+at\s+(.*:\d+:\d+)/);
        
        if (filePathMatch) {
            // Extract just the full path (remove line and column numbers)
            const fullPathWithPosition = filePathMatch[1];
            const fullPath = fullPathWithPosition.replace(/:\d+:\d+$/, '');

            const slots = fullPath.split('.');
            return slots[0];
        }
        
        // Fallback if regex fails
        return 'Unable to determine file path';
    }
};

class LogLevel {
    constructor(name, priority, color, abbreviation) {
        this.name = name;
        this.priority = priority;
        this.color = color;
        this.abbreviation = abbreviation;

        this.onInstantiated({name, priority, color, abbreviation});
    }

    onInstantiated(data) {
        const msg = `${Colors.WHITE}${getCurrentFilePath()}${Colors.GREY} log level set to ${data.color}${this.name}${Colors.RESET}`;
        console.log(msg);
    }


    formatMessage(message) {
        if (isObject(message)) {
            let json = JSON.stringify(message, null, 4);
            json = json.replaceAll("\\n", "\n");
            json = colorizeJson(json);
            return json;
        }

        if (isTimestamp(message)) {
            return `${Colors.WHITE}[${this.color}${this.abbreviation}` +
            `${Colors.WHITE}]${Colors.RESET} ` +
            `${this.color}${message}${Colors.RESET}`;

        }

        return `${Colors.WHITE}[${this.color}${this.abbreviation}` +
               `${Colors.WHITE}]${Colors.RESET} ` +
               `${Colors.LIGHT_GREY}${message}${Colors.RESET}`;
    }

    shouldLog(minimumPriority) {
        return this.priority >= minimumPriority;
    }
}

module.exports = LogLevel;