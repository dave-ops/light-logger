const { log } = require("../index");


log.timestamp();
log.debug("Debug message");
log.info("Info message");
log.warn("Warning message");
log.error("Error message");
log.critical("System failure detected");

const obj = {
    "a": 1,
    "b": {
        "c": "x",
    }
};

log.debug(obj);
