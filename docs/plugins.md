# plugins

## example
```js
const { Logger, plugins } = require('lite-bright');

// Default logger (console output)
const defaultLogger = new Logger();
defaultLogger.debug('Debug message');

// JSON-formatted logger to console
const jsonLogger = new Logger('development', { formatter: plugins.jsonFormatter });
jsonLogger.info('User logged in');

// File logger with default formatting
const fileLogger = new Logger('development', { output: new plugins.FileLogger('logs/app.log') });
fileLogger.warn('Something might be wrong');
fileLogger.close();

// Combine JSON formatting and file output
const jsonFileLogger = new Logger('development', {
  formatter: plugins.jsonFormatter,
  output: new plugins.FileLogger('logs/app.json.log'),
});
jsonFileLogger.error('Critical error occurred');
jsonFileLogger.close();
```

## index.js
```
// src/index.js
const Logger = require('./logger');
const jsonFormatter = require('./plugins/jsonFormatter');
const FileLogger = require('./plugins/fileLogger');

module.exports = {
  Logger,
  plugins: {
    jsonFormatter,
    FileLogger,
  },
};
```

## logger.js
```
// src/logger.js
const LogConfig = require('./logConfig');
const DebugLevel = require('./levels/debugLevel');
// Import other levels...

class Logger {
  constructor(env = process.env.NODE_ENV || 'development', options = {}) {
    this._env = env;
    const envLogLevel = process.env.LOG_LEVEL;
    if (envLogLevel !== undefined && envLogLevel !== null) {
      const levelNum = parseInt(envLogLevel, 10);
      if (!isNaN(levelNum) && levelNum >= 0 && levelNum <= LogConfig.Levels.CRITICAL) {
        this._level = levelNum;
      } else {
        this._level = env === 'production' ? LogConfig.Levels.ERROR : LogConfig.Levels.DEBUG;
      }
    } else {
      this._level = env === 'production' ? LogConfig.Levels.ERROR : LogConfig.Levels.DEBUG;
    }
    this.levels = {
      debug: new DebugLevel(),
      // Initialize other levels...
    };
    // Plugin options
    this.formatter = options.formatter || ((msg, level) => level.formatMessage(msg));
    this.output = options.output || { log: console.log.bind(console) };
  }

  get level() {
    return this.toLevel(this._level);
  }

  set level(level) {
    this._level = level;
  }

  toLevel(levelNumber) {
    // Existing implementation...
  }

  log(logLevel, message) {
    if (logLevel.shouldLog(this._level)) {
      const formattedMessage = this.formatter(message, logLevel);
      this.output.log(formattedMessage);
    }
  }

  debug(message) {
    this.log(this.levels.debug, message);
  }

  // Other methods (info, warn, etc.) remain unchanged...

  close() {
    if (this.output.close) {
      this.output.close();
    }
  }
}

module.exports = Logger;
```