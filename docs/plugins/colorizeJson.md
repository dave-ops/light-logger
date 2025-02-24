# colorizeJson plugin

## default colors:
1. **Dark background: `#2D2D2D` (dark gray/black)**
   - Closest match: `BG_SILVER: '\x1b[48;5;246m'` (256-color background silver, which is a light gray but can represent a dark neutral background in contrast).

2. **Light blue: `#569CD6`**
   - Closest match: No direct match in your list, but it’s similar to a teal or turquoise shade. I’ll approximate with `BG_TEAL: '\x1b[48;5;37m'` (256-color background teal), as it’s a blue-green shade that could represent a lighter blue.

3. **Orange: `#D69D85`**
   - Closest match: No direct match in your list, but it’s a warm, light orange-brown. I’ll approximate with `BG_YELLOW: '\x1b[43m'` (basic background yellow), as it’s the closest warm color available.

4. **Purple: `#C586C0`**
   - Closest match: `BG_VIOLET: '\x1b[48;5;163m'` (256-color background violet), which closely matches the purple shade.

5. **Yellow: `#DCDCAA`**
   - Closest match: `BG_YELLOW: '\x1b[43m'` (basic background yellow), as it directly corresponds to a yellow tone.

### Notes:
- The matches are approximate because ANSI 256-color and basic ANSI codes don’t perfectly align with RGB hex codes. The 256-color palette (e.g., `48;5;XXX`) offers more granularity than basic ANSI (e.g., `47m` for white), but some colors (like the light blue or orange) may not have exact equivalents in your list.
- If you need more precise matches or additional ANSI codes, I can refine this further, but I’m limited to the codes you provided.

Let me know if you’d like me to adjust or explore other ANSI color options!