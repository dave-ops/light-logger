# Lite-Bright Logger
A lightweight, colorful ANSI console logging utility for Node.js.

## Features
- **Colorful Logging**: Adds vibrant, ANSI-colored output to console logs for easy visual distinction between log levels (DEBUG, INFO, WARN, ERROR, CRITICAL) using blue, yellow, orange, red, and magenta colors.
- **Multiple Log Levels**: Supports five distinct log levels—DEBUG, INFO, WARN, ERROR, and CRITICAL—with configurable priority and formatting for flexible logging needs.
- **Lightweight Design**: Minimal dependencies and a small footprint, making it ideal for both small projects and large applications without adding unnecessary bloat.
- **Environment-Aware**: Automatically adjusts the minimum log level based on the environment (e.g., DEBUG in development, ERROR in production) or customizes it via environment variables (LOG_LEVEL).
- **Timestamp Support**: Includes optional timestamp logging for debugging and tracking with ISO-formatted dates.
- **Customizable Output**: Extensible architecture allows developers to modify log formats, colors, and levels to suit specific project requirements.
- **Simple API**: Easy-to-use methods (debug(), info(), warn(), error(), critical()) for quick integration into any Node.js application.
- **Cross-Platform Compatibility**: Works seamlessly across different operating systems, ensuring consistent logging behavior in any environment.

## Folder Structure
```
light-bright/
├── levels/
│   ├── debugLevel.js
│   ├── infoLevel.js
│   ├── warnLevel.js
│   ├── errorLevel.js
│   └── criticalLevel.js
├── logConfig.js
├── logLevel.js
├── logger.js
└── index.js
```

## Installation

```bash
npm install lite-bright
```

## Usage

**Set LOG_LEVEL to 1 (INFO)**
falls back to env === 'production' ? 3 : 0
```
export LOG_LEVEL=1
node examples\index.js
```

```
const Logger = require("../index");
const logger = new Logger();
console.log(logger.minimumLevel); // 1
logger.debug("Debug message");    // Won't log (0 < 1)
logger.info("Info message");      // Will log (1 >= 1)
logger.warn("Warning message");   // Will log (2 >= 1)
logger.error("Error message");    // Will log (3 >= 1)
logger.critical("Critical");      // Will log (4 >= 1)
```
![alt text](https://github.com/dave-ops/light-bright/blob/main/examples/image.png)

## Publish
```
npm publish --access public
```
