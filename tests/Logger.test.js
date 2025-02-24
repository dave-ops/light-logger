// tests/Logger.test.js
const Logger = require('../src/Logger');  // Updated to reflect the path from tests to src/Logger.js
const LogLevelConfig = require('../src/LogLevelConfig');  // Updated to reflect the path from tests to src/LogLevelConfig.js

// Mock console.log to verify logging behavior
console.log = jest.fn();

describe('Logger', () => {
  let logger;

  beforeEach(() => {
    // Clear mock calls before each test
    console.log.mockClear();
    // Reset environment variables
    delete process.env.NODE_ENV;
    delete process.env.LOG_LEVEL;
  });

  describe('constructor', () => {
    it('sets default environment to development when NODE_ENV is not set', () => {
      logger = new Logger();
      expect(logger.env).toBe(LogLevelConfig.DEFAULT_ENV);
    });

    it('uses NODE_ENV when provided', () => {
      process.env.NODE_ENV = 'production';
      logger = new Logger();
      expect(logger.env).toBe('production');
    });

    it('sets minimumLevel from LOG_LEVEL when valid', () => {
      process.env.LOG_LEVEL = '2'; // Assuming WARN is 2
      logger = new Logger();
      expect(logger.minimumLevel).toBe(2);
    });

    it('sets default minimumLevel for development', () => {
      logger = new Logger('development');
      expect(logger.minimumLevel).toBe(Logger.Levels.DEBUG);
    });

    it('sets default minimumLevel for production', () => {
      logger = new Logger('production');
      expect(logger.minimumLevel).toBe(Logger.Levels.ERROR);
    });
  });

  describe('level getters and setters', () => {
    beforeEach(() => {
      logger = new Logger();
    });

    it('gets Levels statically', () => {
      expect(Logger.Levels).toBeDefined();
      expect(Logger.Levels.DEBUG).toBeDefined();
    });

    it('gets Levels from instance', () => {
      expect(logger.Levels).toBeDefined();
      expect(logger.Levels.INFO).toBeDefined();
    });

    it('gets and sets level', () => {
      logger.level = Logger.Levels.WARN;
      expect(logger.level).toBe(Logger.Levels.WARN);
      expect(logger.minimumLevel).toBe(Logger.Levels.WARN);
    });
  });

  describe('toLevel', () => {
    beforeEach(() => {
      logger = new Logger();
    });

    it('returns correct level objects', () => {
      expect(logger.toLevel(Logger.Levels.DEBUG)).toBe(logger.levels.debug);
      expect(logger.toLevel(Logger.Levels.INFO)).toBe(logger.levels.info);
      expect(logger.toLevel(Logger.Levels.WARN)).toBe(logger.levels.warn);
      expect(logger.toLevel(Logger.Levels.ERROR)).toBe(logger.levels.error);
      expect(logger.toLevel(Logger.Levels.CRITICAL)).toBe(logger.levels.critical);
    });

    it('defaults to error level for invalid input', () => {
      expect(logger.toLevel(999)).toBe(logger.levels.error);
    });
  });

  describe('logging methods', () => {
    beforeEach(() => {
      logger = new Logger();
      logger.level = Logger.Levels.DEBUG; // Allow all logging
    });

    it('debug logs message', () => {
      const message = 'test debug';
      logger.debug(message);
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining(message)
      );
    });

    it('info logs message', () => {
      const message = 'test info';
      logger.info(message);
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining(message)
      );
    });

    it('warn logs message', () => {
      const message = 'test warn';
      logger.warn(message);
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining(message)
      );
    });

    it('error logs timestamp and message', () => {
      const message = 'test error';
      logger.error(message);
      expect(console.log).toHaveBeenCalledTimes(2);
      expect(console.log).toHaveBeenCalledWith(
        expect.stringMatching(/\d{4}-\d{2}-\d{2}T/)
      );
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining(message)
      );
    });

    it('critical logs timestamp and message', () => {
      const message = 'test critical';
      logger.critical(message);
      expect(console.log).toHaveBeenCalledTimes(2);
      expect(console.log).toHaveBeenCalledWith(
        expect.stringMatching(/\d{4}-\d{2}-\d{2}T/)
      );
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining(message)
      );
    });

    it('timestamp logs current time', () => {
      logger.timestamp();
      expect(console.log).toHaveBeenCalledWith(
        expect.stringMatching(/\d{4}-\d{2}-\d{2}T/)
      );
    });

    it('respects minimum level', () => {
      logger.level = Logger.Levels.WARN;
      logger.debug('should not log');
      logger.info('should not log');
      logger.warn('should log');
      expect(console.log).toHaveBeenCalledTimes(1);
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('should log')
      );
    });
  });
});