const fs = require('fs');

module.exports = {
  isPathExists: (path) => {
    return fs.existsSync(path)
  }
}
