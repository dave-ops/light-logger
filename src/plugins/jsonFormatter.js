const LogLevel = require("../LogLevel");

// src/plugins/jsonFormatter.js
function jsonFormatter(message, logLevel) {
  const timestamp = new Date().toISOString();
  const formattedMessage = {
    timestamp,
    level: LogLevel.name,
    message: typeof message === "object" ? message : { text: message },
  };

  // Convert to JSON with 4 spaces indentation
  let jsonString = JSON.stringify(formattedMessage, null, 4)
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();

      if (!trimmed) return line; // Preserve empty lines

      // Annotate different parts of the JSON
      if (trimmed.startsWith('"') && trimmed.includes('":')) {
        // Key annotation
        return `    [KEY]${trimmed}`;
      } else if (trimmed.startsWith('"') && !trimmed.includes('":')) {
        // String value annotation
        return `    [STRING]${trimmed}`;
      } else if (/^\d+$/.test(trimmed)) {
        // Number annotation
        return `    [NUMBER]${trimmed}`;
      } else if (trimmed === "true" || trimmed === "false") {
        // Boolean annotation
        return `    [BOOLEAN]${trimmed}`;
      }
      return line; // Structural lines ({, }, etc.)
    })
    .join("\n");

  jsonString = jsonString.replaceAll("\\n", "\n");

  return jsonString;
}

module.exports = jsonFormatter;
