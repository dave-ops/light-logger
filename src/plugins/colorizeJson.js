const colors = require("../constants/colors");

function colorizeJson(jsonString, baseColor) {
  const PRIMARY_COLOR = baseColor ?? colors.SILVER;
  const lines = jsonString.split("\n");

  let result = lines.map((line) => {
      if (line.trim().startsWith('"') && line.includes('":')) {
        const [keyPart, valuePart] = line.split('":');
        const fmt = `${colors.CYAN}${keyPart}":${colors.YELLOW}${valuePart || ""}${colors.RESET}`;
        return fmt;
      } else if (line.startsWith('"') && !line.includes('":')) {
        return `${colors.BG_BEIGE}${line}${colors.RESET}`;
      } else if (/^\d+$/.test(line)) {
        return `${colors.YELLOW}${line}${colors.RESET}`;
      } else if (line === "true" || line === "false") {
        return `${colors.MAGENTA}${line}${colors.RESET}`;
      } else {
        return `${colors.GREY}${line}${colors.RESET}`;
      }
    })
    .join("\n");
  result = result.replaceAll('{', `${PRIMARY_COLOR}{${colors.RESET}`)
  result = result.replaceAll('}', `${PRIMARY_COLOR}}${colors.RESET}`)
  result +=`${colors.RESET}`;
  return result;
}

module.exports = colorizeJson;