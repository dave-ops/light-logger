// src/plugins/fileLogger.js
const fs = require('fs');
const path = require('path');

class FileLogger {
  constructor(filePath = 'app.log') {
    this.filePath = path.resolve(filePath);
    this.stream = fs.createWriteStream(this.filePath, { flags: 'a' });
  }

  log(message) {
    this.stream.write(`${message}\n`);
  }

  close() {
    this.stream.end();
  }
}

module.exports = FileLogger;