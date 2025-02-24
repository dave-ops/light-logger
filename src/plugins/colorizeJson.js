const colors = require("../constants/colors");

// Function to colorize the JSON
function colorizeJson(json) {
  let jsonString = JSON.stringify(json, null, 4);
  jsonString
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();

      if (!trimmed) return line; // Preserve empty lines

      // Apply colors based on content
      if (trimmed.startsWith('"') && trimmed.includes('":')) {
        // Color the key (everything before ':')
        const [keyPart, valuePart] = trimmed.split('":');
        return `    ${colors.BEIGE}${keyPart}":${colors.RESET}${
          valuePart || ""
        }`;
      } else if (trimmed.startsWith('"') && !trimmed.includes('":')) {
        // Color string values
        return `    ${colors.BG_BEIGE}${trimmed}${colors.RESET}`;
      } else if (/^\d+$/.test(trimmed)) {
        // Color numbers
        return `    ${colors.YELLOW}${trimmed}${colors.RESET}`;
      } else if (trimmed === "true" || trimmed === "false") {
        // Color booleans
        return `    ${colors.MAGENTA}${trimmed}${colors.RESET}`;
      } else {
        // Color structural elements ({, }, etc.)
        return `    ${colors.GREY}${trimmed}${colors.RESET}`;
      }
    })
    .join("\n");

  return jsonString;
}

module.exports = colorizeJson;
