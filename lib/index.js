const path = require('path');
const { isFileExists } = require('./utils');

const meta = {
  type: 'layout',
  docs: {
    description: 'checks that filenames match a chosen pattern',
  },
  fixable: false,
  messages: {
    saasusPath: "'{{filename}}' is invalid.",
  },
};

module.exports = {
  meta,
  create: (context) => ({
    Program: (node) => {
      const filename = context.getFilename()
      const dirnames = path.dirname(filename).split('/')
      const [reportLevel, options] = context.options
      const { rootDir } = options

      if (!(dirnames.length > 2 &&
            dirnames[0] === rootDir &&
            (dirnames[1] === 'domains' || dirnames[1] === 'domain' || dirnames[1] === 'content' || dirnames[1] === 'contents')
            )) return;

      const pageName = dirnames[2]

      if (!isFileExists(`${rootDir}/pages/${pageName}.tsx`)) {
        context.report({
            node,
            messageId: 'saasusPath',
            data: {
              filename,
            },
          });
      }
    },
  }),
}
