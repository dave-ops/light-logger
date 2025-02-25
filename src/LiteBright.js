const readline = require('readline');
const keypress = require('keypress');
const colors = require('./constants/colors')

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

// Define the grid dimensions
const GRID_HEIGHT = 15;
const GRID_WIDTH = 30;

// Initialize a blank grid with 'G' (grey) for unlit spots
let grid = Array(GRID_HEIGHT).fill().map(() => Array(GRID_WIDTH).fill('G'));
let pegs = Array(GRID_HEIGHT).fill().map(() => Array(GRID_WIDTH).fill(false));

console.log(pegs);

// Define the mountain pattern
const mountainPattern = [
  'YYYYYYYYYYYYYYYYYYYYYYYYYYYYYY',
  'YYYYYYYYYYYYYYYYYYYYYYYYYYYYYY',
  'YYYYYYYYYOYYYYYYYYYYYYYYYYYYYY',
  'YYYYYYYYOYOYYYYYYYYYYYYYYYYYYY',
  'YYYYYYYYOYOYYYYYYYYYYYYYYYYYYY',
  'YYYYYYYYOYYYYYYYYYYYYYYYYYYYYY',
  'WWWWWWWWWWWWWWWWWWWWWPPPPPPPPP',
  'WWWWWWWWWWWWWWWWWWWWWPPPPPPPPP',
  'WWWWWWWWWWWWWWWWWWWWWPPPPPPPPP',
  'VVVVVVVVVVVVVVVVVVVBBBBBBBBBB',
  'VVVVVVVVVVVVVVVVVVVBBBBBBBBBB',
  'VVVVVVVVVVVVVVVVVVVBBBBBBBBBB',
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB'
];

// Cursor position
let cursor = { row: 0, col: 0 };

// Function to display the grid with cursor
function displayGrid() {
    console.clear();
    console.log('Lite-Brite CLI - Use arrow keys to move, W/B/P/Y/O to place peg, "q" to quit');
    console.log('Available colors: W(White), B(Blue), P(Purple), Y(Yellow), O(Orange)');
  
    grid.forEach((row, y) => {
      let rowStr = '';
      row.forEach((cell, x) => {
        if (y === cursor.row && x === cursor.col) {
          rowStr += COLORS[cell] + cell + colors.DARK_GREY + ' ';
        } else {
            if (pegs[y][x] === true) {  // This should work now
                rowStr += COLORS[cell] + cell + colors.DARK_GREY + ' ';
            } else {
                rowStr += cell + ' ';
            }
        }
      });
      console.log(rowStr);
    });
  }

// Function to initialize or reset the grid with the mountain pattern
function resetGrid() {
  for (let i = 0; i < GRID_HEIGHT; i++) {
    for (let j = 0; j < GRID_WIDTH; j++) {
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
      cursor.col = Math.min(GRID_WIDTH - 1, cursor.col + 1);
      break;
  }
  displayGrid();
}

// Function to place a peg with specified color
function placePeg() {
    pegs[cursor.row][cursor.col] = !pegs[cursor.row][cursor.col];
    displayGrid();
}

// Set up keypress to capture arrow keys and color letters
keypress(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();

// Handle keypress events
process.stdin.on('keypress', (ch, key) => {
  if (!key) return;

  if (key.name === 'q') {
    console.log('\nThanks for playing Lite-Brite CLI!');
    process.stdin.setRawMode(false);
    process.stdin.pause();
    process.exit();
  }

  if (key.name === 'up') moveCursor('up');
  else if (key.name === 'down') moveCursor('down');
  else if (key.name === 'left') moveCursor('left');
  else if (key.name === 'right') moveCursor('right');
  else if (key.name === 'enter') placePeg();
});

// Start the game
console.log('Welcome to Lite-Brite CLI!');
resetGrid();
displayGrid();



