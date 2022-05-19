import { RuleTester } from 'eslint';
import * as saasusPath from '../../lib';

const tester = new RuleTester();
const testRule = (tests) => () => tester.run('match', match, tests);

test('single regex', testRule({
  valid: [
    {
      code,
      filename: '/foo/bar/test.txt',
      options: [/^test(?:\..*)?$/],
    },
  ],
  invalid: [
    {
      code,
      filename: '/foo/bar/test_.txt',
      options: [/^test(?:\..*)?$/],
      errors: [
        { message: "Filename 'test_.txt' does not match /^test(?:\\..*)?$/.", column: 1, line: 1 },
      ],
    },
  ],
}));
