import { jest } from '@jest/globals';
import { RuleTester } from 'eslint'
import * as rule from '../../lib'

jest.mock('../../lib/utils', () => {
  return {
    isPathExists: (path) => {
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
    {
      code: testCode,
      filename: 'src/domains/page-test/Login/index.tsx',
      options: [2, { rootDir: 'src', ignorePaths: [/page-test/] }],
    },
  ],
  invalid: [
    {
      code: testCode,
      filename: 'src/domains/page-test/Login/index.tsx',
      options: [2, { rootDir: 'src' }],
      errors: [
        { message: "The directorty name does not match saasus naming convention. Ex. src/domains/[pageName]" }
      ]
    },
  ],
})
