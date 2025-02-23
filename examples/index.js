const Logger = require("../index");
const logger = new Logger();

logger.level = logger.Levels.DEBUG;

logger.timestamp();
logger.debug("Debug message");

logger.timestamp();
logger.info("Info message");

logger.timestamp();
logger.warn("Warning message");

logger.timestamp();
logger.error("Error message");

logger.timestamp();
logger.critical("System failure detected");
