# Light-Bright Logger

A lightweight, colorful ANSI console logging utility for Node.js.

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

## Publish
```
npm publish --access public
```