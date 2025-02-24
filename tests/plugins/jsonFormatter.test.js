const jsonFormatter = require('../../src/plugins/jsonFormatter');
const LogLevel = require('../../src/logLevel');

describe('jsonFormatter', () => {
  const logLevel = new LogLevel('INFO', 1, '\x1b[33m', 'INF');

  it('formats string messages as JSON', () => {
    const result = jsonFormatter('Test message', logLevel);
    const parsed = JSON.parse(result);
    expect(parsed).toHaveProperty('timestamp');
    expect(parsed.level).toBe('INFO');
    expect(parsed.message).toEqual({ text: 'Test message' });
  });

  it('formats object messages as JSON', () => {
    const result = jsonFormatter({ key: 'value' }, logLevel);
    const parsed = JSON.parse(result);
    expect(parsed.message).toEqual({ key: 'value' });
  });
});