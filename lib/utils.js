const fs = require('fs');

export function isFileExists(path) {
  return fs.existsSync(path)
}
