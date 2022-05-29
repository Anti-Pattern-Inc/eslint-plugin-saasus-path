const path = require('path');
const { isPathExists } = require('./utils');

const meta = {
  docs: {
    description: 'Check if filename/directory names match saasus naming convention.',
  },
  fixable: false,
  messages: {
    saasusPath: "The directorty name does not match saasus naming convention. Ex. {{domainDir}}/[pageName]",
  },
};

module.exports = {
  meta,
  create: (context) => ({
    Program: (node) => {
      const filePath = context.getFilename()
      const currentDir = process.cwd()
      const dirnames = path.dirname(filePath.replace(currentDir, '')).split('/').filter((f) => (f.length > 0))
      const [options] = context.options
      const rootDir = options.rootDir || 'src'

      // TODO: check file name recursively
      if (!(dirnames.length > 2 &&
            dirnames[0] === rootDir &&
            (dirnames[1] === 'domains' || dirnames[1] === 'domain' || dirnames[1] === 'content' || dirnames[1] === 'contents')
            )) return;

      const pageName = dirnames[2]

      if (!isPathExists(`${rootDir}/pages/${pageName}.tsx`) && !isPathExists(`${rootDir}/pages/${pageName}`)) {
        context.report({
            node,
            messageId: 'saasusPath',
            data: {
              domainDir: `${rootDir}/${dirnames[1]}`,
            },
          });
      }
    },
  }),
}
