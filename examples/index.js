const { log } = require("../src/index");

log.timestamp();
log.debug("Debug message");
log.info("Info message");
log.warn("Warning message");
log.error("Error message");
log.critical("System failure detected");

const json = { id: 1, name: 'jepedo', child: { id: 2, name: 'pinoccio' } };
log.debug(json);
