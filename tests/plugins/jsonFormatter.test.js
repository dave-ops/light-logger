// __tests__/jsonFormatter.test.js
const jsonFormatter = require('../../src/plugins/jsonFormatter');

// Mock Date to ensure consistent timestamps
const mockDate = new Date('2025-02-24T14:17:00Z');
jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

describe('jsonFormatter', () => {
  // Reset Date mock before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test with a simple string message
  test('formats a string message correctly', () => {
    const message = 'Test message';
    const logLevel = { name: 'INFO' };
    const result = jsonFormatter(message, logLevel);

    const expected = [
      '{',
      '    [KEY]"timestamp": "2025-02-24T14:17:00.000Z",',
      '    [KEY]"level": "INFO",',
      '    [KEY]"message": {',
      '    [KEY]"text": "Test message"',
      '    }',
      '}'
    ].join('\n');

    expect(result).toBe(expected);
  });

  // Test with an object message
  test('formats an object message correctly', () => {
    const message = { error: 'Something went wrong', code: 500 };
    const logLevel = { name: 'ERROR' };
    const result = jsonFormatter(message, logLevel);

    const expected = [
      '{',
      '    [KEY]"timestamp": "2025-02-24T14:17:00.000Z",',
      '    [KEY]"level": "ERROR",',
      '    [KEY]"message": {',
      '    [KEY]"error": "Something went wrong",',
      '    [KEY]"code": 500',
      '    }',
      '}'
    ].join('\n');

    expect(result).toBe(expected);
  });

  // Test with mixed data types in object
  test('handles mixed data types in object message', () => {
    const message = {
      status: 'failed',
      retries: 3,
      active: false,
    };
    const logLevel = { name: 'WARN' };
    const result = jsonFormatter(message, logLevel);

    const expected = [
      '{',
      '    [KEY]"timestamp": "2025-02-24T14:17:00.000Z",',
      '    [KEY]"level": "WARN",',
      '    [KEY]"message": {',
      '    [KEY]"status": "failed",',
      '    [KEY]"retries": 3,',
      '    [KEY]"active": false',
      '    }',
      '}'
    ].join('\n');

    expect(result).toBe(expected);
  });

  // Test annotation of JSON parts
  test('correctly annotates JSON components', () => {
    const message = 'Simple test';
    const logLevel = { name: 'DEBUG' };
    const result = jsonFormatter(message, logLevel);

    expect(result).toContain('"timestamp"');
    expect(result).toContain('"2025-02-24T14:17:00.000Z"');
    expect(result).toContain('"level"');
    expect(result).toContain('"DEBUG"');
    expect(result).toContain('"message"');
    expect(result).toContain('"text"');
    expect(result).toContain('"Simple test"');
  });

  // Test with empty string message
  test('handles empty string message', () => {
    const message = '';
    const logLevel = { name: 'INFO' };
    const result = jsonFormatter(message, logLevel);

    const expected = [
      '{',
      '    [KEY]"timestamp": "2025-02-24T14:17:00.000Z",',
      '    [KEY]"level": "INFO",',
      '    [KEY]"message": {',
      '    [KEY]"text": ""',
      '    }',
      '}'
    ].join('\n');

    expect(result).toBe(expected);
  });
});

// Clean up mocks after all tests
afterAll(() => {
  jest.restoreAllMocks();
});