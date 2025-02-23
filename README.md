# Light Logger

A lightweight, colorful console logging utility for Node.js.

## Installation

```bash
npm install light-logger
```

## Usage
```
const Logger = require('light-logger');

const logger = new Logger(); // Default level is DEBUG

// Log messages at different levels
logger.debug('Debug message');
logger.info('Info message');
logger.warn('Warning message');
logger.error('Error message');

// Set specific log level
const errorOnlyLogger = new Logger(Logger.Levels.ERROR);
errorOnlyLogger.debug('This won\'t show');
errorOnlyLogger.error('This will show');
```