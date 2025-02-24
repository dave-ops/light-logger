const fs = require('fs');
const FileLogger = require('../../src/plugins/fileLogger');

describe('FileLogger', () => {
  afterEach(() => {
    if (fs.existsSync('test.log')) fs.unlinkSync('test.log');
  });

  it('writes messages to file', () => {
    const logger = new FileLogger('test.log');
    logger.log('Test message');
    logger.close();
    const content = fs.readFileSync('test.log', 'utf8');
    expect(content).toBe('Test message\n');
  });
});