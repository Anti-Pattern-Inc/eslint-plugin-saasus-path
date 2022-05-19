const path = require('path');

const meta = {
  type: 'layout',
  docs: {
    description: 'checks that filenames match a chosen pattern',
  },
  fixable: false,
  messages: {
    noMatch: "Filename '{{name}}' does not match {{value}}.",
  },
};

const getRegex = (value, filename) => {
  if (value instanceof RegExp) return [value, value.toString()];
  if (typeof value === 'string') {
    const regex = aliases[value];
    if (!regex) throw new Error(`Unrecognized option "${value}"`);
    return [regex, value];
  }

  const extension = filename.substr(filename.lastIndexOf('.'));
  const valueForExtension = value[extension];
  return valueForExtension ? getRegex(valueForExtension) : [];
};

module.exports = {
  meta,
  create: (context) => ({
    Program: (node) => {
      const filename = context.getFilename();
      console.log(filename)
      // const basename = path.basename(filename);
      // const [regex, regexStr] = getRegex(context.options[0], basename);
      // if (!regex) return;
      // if (!regex.test(basename)) {
      //   context.report({
      //     node,
      //     messageId: 'noMatch',
      //     data: {
      //       name: basename,
      //       value: regexStr,
      //     },
      //   });
      // }
    },
  }),
};
