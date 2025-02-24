// Define ANSI color codes for the terminal
const colors = {
    reset: '\x1b[0m',
    cyan: '\x1b[36m',   // For keys
    green: '\x1b[32m',  // For strings
    yellow: '\x1b[33m', // For numbers
    magenta: '\x1b[35m', // For booleans
    gray: '\x1b[90m',   // For structural symbols ({, }, etc.)
  };
  
  // Function to colorize the JSON
  function colorizeJson(formattedMessage) {
    let jsonString = JSON.stringify(formattedMessage, null, 4)
      .split('\n')
      .map(line => {
        const trimmed = line.trim();
  
        if (!trimmed) return line; // Preserve empty lines
  
        // Apply colors based on content
        if (trimmed.startsWith('"') && trimmed.includes('":')) {
          // Color the key (everything before ':')
          const [keyPart, valuePart] = trimmed.split('":');
          return `    ${colors.cyan}${keyPart}":${colors.reset}${valuePart || ''}`;
        } else if (trimmed.startsWith('"') && !trimmed.includes('":')) {
          // Color string values
          return `    ${colors.green}${trimmed}${colors.reset}`;
        } else if (/^\d+$/.test(trimmed)) {
          // Color numbers
          return `    ${colors.yellow}${trimmed}${colors.reset}`;
        } else if (trimmed === 'true' || trimmed === 'false') {
          // Color booleans
          return `    ${colors.magenta}${trimmed}${colors.reset}`;
        } else {
          // Color structural elements ({, }, etc.)
          return `    ${colors.gray}${trimmed}${colors.reset}`;
        }
      })
      .join('\n');
  
    return jsonString;
  }
  
  // Example usage
  const formattedMessage = { name: "Alice", age: 25, active: true };
  console.log(colorizeJson(formattedMessage));