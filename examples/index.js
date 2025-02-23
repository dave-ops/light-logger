const Logger = require("../index");
const logger = new Logger();
logger.debug("Debug message");
logger.info("Info message");
logger.warn("Warning message");
logger.error("Error message");
logger.critical("System failure detected");
