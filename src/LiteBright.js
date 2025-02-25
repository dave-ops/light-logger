const readline = require('readline');
const keypress = require('keypress');
const colors = require('./constants/colors'); // Assuming this file exists
const Logger = require('./plugins/fileLogger');
const log = new Logger();

log.log('begin');

// Define colors for Lite-Brite
const COLORS = {
    W: colors.WHITE,
    B: colors.BLUE,
    P: colors.PURPLE,
    Y: colors.YELLOW,
    O: colors.ORANGE,
    G: colors.DARK_GREY,
    V: colors.DARK_PURPLE,
};

// Define the grid dimensions for 1967 Lite-Brite
const GRID_HEIGHT = 39; // 39 rows as per 1967 design

// Initialize grid and pegs with alternating row lengths (45, 44, 45, ...)
let grid = Array(GRID_HEIGHT).fill().map((_, i) => Array(i % 2 === 0 ? 45 : 44).fill('G'));
let pegs = Array(GRID_HEIGHT).fill().map((_, i) => Array(i % 2 === 0 ? 45 : 44).fill(false));

// Define a modified mountain pattern for the new dimensions (trimmed to 44/45 width)
const mountainPattern = [
  'YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY', // 45
  'YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY',  // 44
  'YYYYYYYYYYYYYYYYYYYYYYYYYOYYYYYYYYYYYYYYYYYYY', // 45
  'YYYYYYYYYYYYYYYYYYYYYYYYOYOYYYYYYYYYYYYYYYYY',  // 44
  'YYYYYYYYYYYYYYYYYYYYYYYYOYOYYYYYYYYYYYYYYYYY',  // 45
  'YYYYYYYYYYYYYYYYYYYYYYYYOYYYYYYYYYYYYYYYYYYY',  // 44
  'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW', // 45
  'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',  // 44
  'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW', // 45
  'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 45 (expanding to 39 rows)
  'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV',  // 44
  'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 45
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB', // 45
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',  // 44
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB', // 45
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB', // 45
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',  // 44
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB', // 45
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',  // 44
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB', // 45
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',  // 44
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB', // 45
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',  // 44
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB', // 45
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',  // 44
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB', // 45
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',  // 44
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB', // 45
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',  // 44
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB', // 45
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',  // 44
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB', // 45
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',  // 44
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB', // 45
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',  // 44
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB', // 45
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',  // 44
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB', // 45
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB'   // 44 (39th row)
];

// Cursor position
let cursor = { row: 0, col: 0 };

// Function to display the grid with cursor
function displayGrid() {
    console.clear();
    console.log('Lite-Brite CLI - Use arrow keys to move, Enter to place peg, "q" to quit\n');

    grid.forEach((row, y) => {
      let rowStr = '';
      // Add slight offset for even-indexed rows (44 holes) to suggest honeycomb
      if (y % 2 === 1) rowStr += ' ';

      row.forEach((cell, x) => {
        if (y === cursor.row && x === cursor.col) {
          rowStr += COLORS[cell] + cell + colors.DARK_GREY + ' ';
        } else {
          if (pegs[y][x]) {
            rowStr += COLORS[cell] + '●' + colors.DARK_GREY + ' ';
          } else {
            rowStr += colors.DARK_GREY + cell + colors.RESET + ' ';
          }
        }
      });
      console.log(rowStr + colors.RESET);
    });
}

// Function to initialize or reset the grid with the mountain pattern
function resetGrid() {
  for (let i = 0; i < GRID_HEIGHT; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = mountainPattern[i][j] || 'G';
    }
  }
}

// Function to move cursor
function moveCursor(direction) {
  switch (direction) {
    case 'up':
      cursor.row = Math.max(0, cursor.row - 1);
      break;
    case 'down':
      cursor.row = Math.min(GRID_HEIGHT - 1, cursor.row + 1);
      break;
    case 'left':
      cursor.col = Math.max(0, cursor.col - 1);
      break;
    case 'right':
      cursor.col = Math.min(grid[cursor.row].length - 1, cursor.col + 1);
      break;
  }
  displayGrid();
}

// Function to place a peg with specified color
function placePeg() {
  log.log(pegs[cursor.row][cursor.col]);
  if (!pegs[cursor.row][cursor.col]) { // If no peg is present
    pegs[cursor.row][cursor.col] = true; // Mark peg as placed
  } else { // If peg is present, remove it
    pegs[cursor.row][cursor.col] = false; // Mark peg as removed
  }
  log.log(pegs[cursor.row][cursor.col]);
  displayGrid();
}

// Set up keypress to capture arrow keys and inputs
keypress(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();

// Handle keypress events
process.stdin.on('keypress', (ch, key) => {
  log.log(JSON.stringify(key, null, 4));
  if (!key) return;

  if (key.name === 'q') {
    pegs = Array(GRID_HEIGHT).fill().map((_, i) => Array(i % 2 === 0 ? 45 : 44).fill(true));
    displayGrid();
    console.log(`\n${colors.RESET}Thanks for playing Lite-Brite CLI!`);
    process.stdin.setRawMode(false);
    process.stdin.pause();
    process.exit();
  }

  if (key.name === 'up') moveCursor('up');
  else if (key.name === 'down') moveCursor('down');
  else if (key.name === 'left') moveCursor('left');
  else if (key.name === 'right') moveCursor('right');
  else if (key.name === 'return') placePeg();
});

// Start the game
console.log('Welcome to Lite-Brite CLI!');
resetGrid();
displayGrid();