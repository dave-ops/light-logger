// src/plugins/jsonFormatter.js
function jsonFormatter(message, logLevel) {
    const timestamp = new Date().toISOString();
    const formattedMessage = {
      timestamp,
      level: logLevel.name,
      message: typeof message === 'object' ? message : { text: message },
    };
    return JSON.stringify(formattedMessage, null, 4);
  }
  
  module.exports = jsonFormatter;