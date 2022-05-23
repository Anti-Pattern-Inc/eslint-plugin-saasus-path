import { jest } from '@jest/globals';
import { RuleTester } from 'eslint'
import * as rule from '../../lib'

jest.mock('../../lib/utils', () => {
  return {
    isFileExists: (path) => {
      return path.includes('page.tsx')
    },
  }
})

const tester = new RuleTester({ parserOptions: { ecmaVersion: 2015 } })
const testCode = "var foo = 'bar';"

tester.run("saasus-path", rule, {
  valid: [
    {
      code: testCode,
      filename: 'src/domains/page/Login/index.tsx',
      options: [2, { rootDir: 'src' }],
    },
  ],
  invalid: [
    {
      code: testCode,
      filename: 'src/domains/page-test/Login/index.tsx',
      options: [2, { rootDir: 'src' }],
      errors: [
        { message: "'src/domains/page-test/Login/index.tsx' is invalid." }
      ]
    },
  ],
})
