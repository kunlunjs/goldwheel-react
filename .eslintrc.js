/**
 * @type {import('eslint').Linter.Config}
 * @see https://github.com/kunlunjs/kunlun-fabric/blob/main/src/eslint.ts
 */
module.exports = {
  extends: [require.resolve('@kunlunjs/fabric/dist/eslint')]
  // extends: [require.resolve('../../GitHub/kunlun-fabric/dist/eslint')]
}
