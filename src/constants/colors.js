module.exports = {
    // Foreground Colors (alphabetized)
    BEIGE:        '\x1b[38;5;223m',     // 256-color beige
    BLACK:        '\x1b[30m',           // Basic black
    BLUE:         '\x1b[34m',           // Basic blue
    BROWN:        '\x1b[38;5;94m',      // 256-color brown
    CYAN:         '\x1b[36m',           // Basic cyan
    DARK_BLUE:    '\x1b[38;5;18m',      // 256-color dark blue
    DARK_BROWN:   '\x1b[38;5;52m',      // 256-color dark brown
    DARK_CYAN:    '\x1b[38;5;30m',      // 256-color dark cyan
    DARK_GREEN:   '\x1b[38;5;22m',      // 256-color dark green
    DARK_GREY:    '\x1b[38;5;240m',     // 256-color dark grey
    DARK_PINK:    '\x1b[38;5;162m',     // 256-color dark pink
    DARK_PURPLE:  '\x1b[38;5;55m',      // 256-color dark purple
    DARK_RED:     '\x1b[38;5;88m',      // 256-color dark red
    DARK_YELLOW:  '\x1b[38;5;172m',     // 256-color dark yellow (more golden)
    GOLD:         '\x1b[38;5;220m',     // 256-color gold
    GREEN:        '\x1b[32m',           // Basic green
    GREY:         '\x1b[38;5;244m',     // 256-color medium grey
    INDIGO:       '\x1b[38;5;54m',      // 256-color indigo
    LIGHT_BLUE:   '\x1b[38;5;153m',     // 256-color light blue
    LIGHT_BROWN:  '\x1b[38;5;180m',     // 256-color light brown
    LIGHT_CYAN:   '\x1b[38;5;195m',     // 256-color light cyan
    LIGHT_GREEN:  '\x1b[38;5;120m',     // 256-color light green
    LIGHT_GREY:   '\x1b[38;5;252m',     // 256-color light grey
    LIGHT_PINK:   '\x1b[38;5;225m',     // 256-color light pink
    LIGHT_PURPLE: '\x1b[38;5;183m',     // 256-color light purple
    LIGHT_RED:    '\x1b[38;5;210m',     // 256-color light red (more pinkish)
    LIGHT_YELLOW: '\x1b[38;5;229m',     // 256-color light yellow
    LIME:         '\x1b[38;5;154m',     // 256-color lime
    MAGENTA:      '\x1b[35m',           // Basic magenta
    MAROON:       '\x1b[38;5;52m',      // 256-color maroon (similar to dark brown but redder)
    NAVY:         '\x1b[38;5;17m',      // 256-color navy blue
    OLIVE:        '\x1b[38;5;100m',     // 256-color olive
    ORANGE:       '\x1b[38;5;208m',     // 256-color orange
    PINK:         '\x1b[38;5;218m',     // 256-color pink
    PURPLE:       '\x1b[38;5;129m',     // 256-color purple
    RED:          '\x1b[31m',           // Basic red
    SILVER:       '\x1b[38;5;246m',     // 256-color silver
    TEAL:         '\x1b[38;5;37m',      // 256-color teal
    TURQUOISE:    '\x1b[38;5;45m',      // 256-color turquoise
    VIOLET:       '\x1b[38;5;163m',     // 256-color violet
    WHITE:        '\x1b[37m',           // Basic white (bright white in some terminals)
    YELLOW:       '\x1b[33m',           // Basic yellow

    // Background Colors (alphabetized)
    BG_BEIGE:        '\x1b[48;5;223m',  // 256-color background beige
    BG_BLACK:        '\x1b[40m',        // Basic background black
    BG_BLUE:         '\x1b[44m',        // Basic background blue
    BG_BROWN:        '\x1b[48;5;94m',   // 256-color background brown
    BG_CYAN:         '\x1b[46m',        // Basic background cyan
    BG_DARK_BLUE:    '\x1b[48;5;18m',   // 256-color background dark blue
    BG_DARK_BROWN:   '\x1b[48;5;52m',   // 256-color background dark brown
    BG_DARK_CYAN:    '\x1b[48;5;30m',   // 256-color background dark cyan
    BG_DARK_GREEN:   '\x1b[48;5;22m',   // 256-color background dark green
    BG_DARK_GREY:    '\x1b[48;5;240m',  // 256-color background dark grey
    BG_DARK_PINK:    '\x1b[48;5;162m',  // 256-color background dark pink
    BG_DARK_PURPLE:  '\x1b[48;5;55m',   // 256-color background dark purple
    BG_DARK_RED:     '\x1b[48;5;88m',   // 256-color background dark red
    BG_DARK_YELLOW:  '\x1b[48;5;172m',  // 256-color background dark yellow (more golden)
    BG_GOLD:         '\x1b[48;5;220m',  // 256-color background gold
    BG_GREEN:        '\x1b[42m',        // Basic background green
    BG_GREY:         '\x1b[48;5;244m',  // 256-color background medium grey
    BG_INDIGO:       '\x1b[48;5;54m',   // 256-color background indigo
    BG_LIGHT_BLUE:   '\x1b[48;5;153m',  // 256-color background light blue
    BG_LIGHT_BROWN:  '\x1b[48;5;180m',  // 256-color background light brown
    BG_LIGHT_CYAN:   '\x1b[48;5;195m',  // 256-color background light cyan
    BG_LIGHT_GREEN:  '\x1b[48;5;120m',  // 256-color background light green
    BG_LIGHT_GREY:   '\x1b[48;5;252m',  // 256-color background light grey
    BG_LIGHT_PINK:   '\x1b[48;5;225m',  // 256-color background light pink
    BG_LIGHT_PURPLE: '\x1b[48;5;183m',  // 256-color background light purple
    BG_LIGHT_RED:    '\x1b[48;5;210m',  // 256-color background light red (more pinkish)
    BG_LIGHT_YELLOW: '\x1b[48;5;229m',  // 256-color background light yellow
    BG_LIME:         '\x1b[48;5;154m',  // 256-color background lime
    BG_MAGENTA:      '\x1b[45m',        // Basic background magenta
    BG_MAROON:       '\x1b[48;5;52m',   // 256-color background maroon (similar to dark brown but redder)
    BG_NAVY:         '\x1b[48;5;17m',   // 256-color background navy blue
    BG_OLIVE:        '\x1b[48;5;100m',  // 256-color background olive
    BG_ORANGE:       '\x1b[48;5;208m',  // 256-color background orange
    BG_PINK:         '\x1b[48;5;218m',  // 256-color background pink
    BG_PURPLE:       '\x1b[48;5;129m',  // 256-color background purple
    BG_RED:          '\x1b[41m',        // Basic background red
    BG_SILVER:       '\x1b[48;5;246m',  // 256-color background silver
    BG_TEAL:         '\x1b[48;5;37m',   // 256-color background teal
    BG_TURQUOISE:    '\x1b[48;5;45m',   // 256-color background turquoise
    BG_VIOLET:       '\x1b[48;5;163m',  // 256-color background violet
    BG_WHITE:        '\x1b[47m',        // Basic background white
    BG_YELLOW:       '\x1b[43m',        // Basic background yellow

    // Styles (alphabetized)
    BLINK:       '\x1b[5m',             // Blinking text
    BRIGHT:      '\x1b[1m',             // Bright or bold text
    DIM:         '\x1b[2m',             // Dim or faint text
    HIDDEN:      '\x1b[8m',             // Hidden text
    RESET:       '\x1b[0m',             // Reset all styles
    REVERSE:     '\x1b[7m',             // Reverse video (swap foreground and background)
    UNDERSCORE:  '\x1b[4m'              // Underlined text
};