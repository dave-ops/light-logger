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
lite-bright/
├── levels/
│   ├── debugLevel.js
│   ├── infoLevel.js
│   ├── warnLevel.js
│   ├── errorLevel.js
│   └── criticalLevel.js
├── tests/
│   ├── levels/
│   │   ├── debugLevel.test.js
│   │   ├── infoLevel.test.js
│   │   ├── warnLevel.test.js
│   │   ├── errorLevel.test.js
│   │   └── criticalLevel.test.js
│   ├── logConfig.test.js
│   ├── logLevel.test.js
│   ├── logger.test.js
│   └── index.test.js
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
const { log } = require("lite-bright");
log.timestamp();
log.debug("Debug message");
log.info("Info message");
log.warn("Warning message");
log.error("Error message");
log.critical("System failure detected");

const obj = {
    "id": 1,
    "child": {
        "code": "x",
        "value": 12345
    }
};
log.debug(obj);

```
![alt text](https://github.com/dave-ops/light-bright/blob/main/examples/image.png)

## Publish
```
npm publish --access public
```
