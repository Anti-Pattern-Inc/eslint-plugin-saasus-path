const fs = require('fs');
const path = require('path')

module.exports = {
  isPathExists: (filePath) => {
    const dirname = path.dirname(filePath)
    const parsedPath = path.parse(filePath)
    const fileNames = fs.readdirSync(dirname)

    for (const fileName of fileNames) {
      if (fileName === `${parsedPath.name}` || fileName === `${parsedPath.base}`) {
        return true
      }
    }

    return false
  }
}
