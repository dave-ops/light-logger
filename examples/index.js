const { log } = require("../src/index");

log.timestamp();
log.debug("Debug message");
log.info("Info message");
log.warn("Warning message");
log.error("Error message");
log.critical("System failure detected", new Error("womp womp"));
log.raw("raw message");
log.raw("");

const json = { id: 1, name: 'jepedo', child: { id: 2, name: 'pinoccio' } };
log.debug(json);
