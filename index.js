class Logger {
    static Levels = {
        'DEBUG': 0,
        'INFO': 1,
        'WARN': 2,
        'ERROR': 3
    };

    static Colors = {
        Reset: '\x1b[0m',
        White: '\x1b[37m',
        Blue: '\x1b[34m',
        Gray: '\x1b[90m',
        Green: '\x1b[32m',
        Yellow: '\x1b[33m',
        Red: '\x1b[31m',
        Orange: '\x1b[38;5;208m',
    };

    constructor(level = Logger.Levels.DEBUG) {
        this.level = level;
    }

    log(level, message) {
        if (Logger.Levels[level] >= this.level) {
            let formattedLevel;

            switch (level) {
                case 'DEBUG':
                    formattedLevel = `${Logger.Colors.White}[${Logger.Colors.Blue}DBG${Logger.Colors.White}]${Logger.Colors.Reset}`;
                    break;
                case 'INFO':
                    formattedLevel = `${Logger.Colors.White}[${Logger.Colors.Yellow}INF${Logger.Colors.White}]${Logger.Colors.Reset}`;
                    break;
                case 'WARN':
                    formattedLevel = `${Logger.Colors.White}[${Logger.Colors.Orange}WRN${Logger.Colors.White}]${Logger.Colors.Reset}`;
                    break;
                case 'ERROR':
                    formattedLevel = `${Logger.Colors.White}[${Logger.Colors.Red}ERR${Logger.Colors.White}]${Logger.Colors.Reset}`;
                    break;
                default:
                    formattedLevel = `[${level}]`;
            }

            console.log(`${formattedLevel} ${Logger.Colors.White}${message}${Logger.Colors.Reset}`);
        }
    }

    debug(message) {
        this.log('DEBUG', message);
    }

    info(message) {
        this.log('INFO', message);
    }

    warn(message) {
        this.log('WARN', message);
    }

    error(message) {
        this.log('ERROR', new Date().toISOString());
        this.log('ERROR', message);
    }
}

module.exports = Logger;