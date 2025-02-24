// tests/logger.test.js
const Logger = require('../logger');

// Mock dependencies
jest.mock('../LogConfig', () => ({
  Levels: {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
    CRITICAL: 4,
  },
}));

jest.mock('../levels/DebugLevel', () => jest.fn(() => ({
  shouldLog: jest.fn((minLevel) => minLevel <= 0),
  formatMessage: jest.fn((msg) => `[DEBUG] ${msg}`),
})));
jest.mock('../levels/InfoLevel', () => jest.fn(() => ({
  shouldLog: jest.fn((minLevel) => minLevel <= 1),
  formatMessage: jest.fn((msg) => `[INFO] ${msg}`),
})));
jest.mock('../levels/WarnLevel', () => jest.fn(() => ({
  shouldLog: jest.fn((minLevel) => minLevel <= 2),
  formatMessage: jest.fn((msg) => `[WARN] ${msg}`),
})));
jest.mock('../levels/ErrorLevel', () => jest.fn(() => ({
  shouldLog: jest.fn((minLevel) => minLevel <= 3),
  formatMessage: jest.fn((msg) => `[ERROR] ${msg}`),
})));
jest.mock('../levels/CriticalLevel', () => jest.fn(() => ({
  shouldLog: jest.fn((minLevel) => minLevel <= 4),
  formatMessage: jest.fn((msg) => `[CRITICAL] ${msg}`),
})));

// Mock console.log
console.log = jest.fn();

describe('Logger', () => {
  let logger;

  beforeEach(() => {
    // Reset mocks and environment variables before each test
    jest.clearAllMocks();
    delete process.env.NODE_ENV;
    delete process.env.LOG_LEVEL;
  });

  describe('constructor', () => {
    it('sets minimumLevel to DEBUG in development by default', () => {
      logger = new Logger('development');
      expect(logger.minimumLevel).toBe(0); // LogConfig.Levels.DEBUG
    });

    it('sets minimumLevel to ERROR in production by default', () => {
      logger = new Logger('production');
      expect(logger.minimumLevel).toBe(3); // LogConfig.Levels.ERROR
    });

    it('uses valid LOG_LEVEL from environment if provided', () => {
      process.env.LOG_LEVEL = '2';
      logger = new Logger('development');
      expect(logger.minimumLevel).toBe(2); // LogConfig.Levels.WARN
    });

    it('falls back to default if LOG_LEVEL is invalid', () => {
      process.env.LOG_LEVEL = 'invalid';
      logger = new Logger('development');
      expect(logger.minimumLevel).toBe(0); // LogConfig.Levels.DEBUG
    });
  });

  describe('toLevel', () => {
    beforeEach(() => {
      logger = new Logger('development');
    });

    it('returns debug level for DEBUG number', () => {
      const level = logger.toLevel(0);
      expect(level.formatMessage('test')).toBe('[DEBUG] test');
    });

    it('returns error level for invalid level number', () => {
      const level = logger.toLevel(999);
      expect(level.formatMessage('test')).toBe('[ERROR] test');
    });
  });

  describe('log', () => {
    beforeEach(() => {
      logger = new Logger('development');
    });

    it('logs message if level meets minimum', () => {
      logger.log(logger.levels.info, 'Test info');
      expect(console.log).toHaveBeenCalledWith('[INFO] Test info');
    });

    it('does not log if level is below minimum', () => {
      logger.level = 2; // WARN
      logger.log(logger.levels.debug, 'Test debug');
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe('convenience methods', () => {
    beforeEach(() => {
      logger = new Logger('development');
    });

    it('debug logs debug messages', () => {
      logger.debug('Debug message');
      expect(console.log).toHaveBeenCalledWith('[DEBUG] Debug message');
    });

    it('info logs info messages', () => {
      logger.info('Info message');
      expect(console.log).toHaveBeenCalledWith('[INFO] Info message');
    });

    it('error logs timestamp and message', () => {
      logger.error('Error message');
      expect(console.log).toHaveBeenCalledTimes(2);
      expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/\[ERROR\] \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z/));
      expect(console.log).toHaveBeenCalledWith('[ERROR] Error message');
    });

    it('critical logs timestamp and message', () => {
      logger.critical('Critical message');
      expect(console.log).toHaveBeenCalledTimes(2);
      expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/\[CRITICAL\] \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z/));
      expect(console.log).toHaveBeenCalledWith('[CRITICAL] Critical message');
    });
  });

  describe('timestamp', () => {
    it('logs current timestamp at debug level', () => {
      logger = new Logger('development');
      logger.timestamp();
      expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/\[DEBUG\] \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z/));
    });
  });
});