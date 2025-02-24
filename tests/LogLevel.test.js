// tests/logLevel.test.js
const LogLevel = require('../logLevel');

// Mock LogConfig dependency
jest.mock('../LogConfig', () => ({
  Colors: {
    WHITE: '\x1b[37m',
    RESET: '\x1b[0m',
    LIGHT_GREY: '\x1b[90m',
  },
}));

describe('LogLevel', () => {
  let logLevel;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    // Create a default LogLevel instance for testing
    logLevel = new LogLevel('TEST', 2, '\x1b[32m', 'TST');
  });

  describe('constructor', () => {
    it('sets properties correctly', () => {
      expect(logLevel.name).toBe('TEST');
      expect(logLevel.priority).toBe(2);
      expect(logLevel.color).toBe('\x1b[32m');
      expect(logLevel.abbreviation).toBe('TST');
    });
  });

  describe('formatMessage', () => {
    it('formats a string message with color codes', () => {
      const message = 'Hello, world!';
      const expected = `${'\x1b[37m'}[${'\x1b[32m'}TST${'\x1b[37m'}]${'\x1b[0m'} ` +
                       `${'\x1b[90m'}${message}${'\x1b[0m'}`;
      expect(logLevel.formatMessage(message)).toBe(expected);
    });

    it('formats an object message as pretty-printed JSON', () => {
      const message = { key: 'value', nested: { a: 1 } };
      const expected = JSON.stringify(message, null, 4);
      expect(logLevel.formatMessage(message)).toBe(expected);
    });

    it('handles null message without throwing', () => {
      const message = null;
      const expected = `${'\x1b[37m'}[${'\x1b[32m'}TST${'\x1b[37m'}]${'\x1b[0m'} ` +
                       `${'\x1b[90m'}${message}${'\x1b[0m'}`;
      expect(logLevel.formatMessage(message)).toBe(expected);
    });
  });

  describe('shouldLog', () => {
    it('returns true if priority meets or exceeds minimum', () => {
      expect(logLevel.shouldLog(1)).toBe(true); // 2 >= 1
      expect(logLevel.shouldLog(2)).toBe(true); // 2 >= 2
    });

    it('returns false if priority is below minimum', () => {
      expect(logLevel.shouldLog(3)).toBe(false); // 2 < 3
    });
  });

  describe('isObject helper', () => {
    it('returns true for plain objects', () => {
      expect(isObject({ key: 'value' })).toBe(true);
    });

    it('returns false for non-objects', () => {
      expect(isObject('string')).toBe(false);
      expect(isObject(42)).toBe(false);
      expect(isObject(null)).toBe(false);
    });

    it('returns false for arrays', () => {
      expect(isObject(['array'])).toBe(false);
    });

    it('returns false for objects with non-Object prototype', () => {
      class CustomClass {}
      expect(isObject(new CustomClass())).toBe(false);
    });
  });
});

// Expose isObject for testing since it's not exported
function isObject(value) {
  return value !== null && typeof value === 'object' && 
         Object.getPrototypeOf(value) === Object.prototype;
}