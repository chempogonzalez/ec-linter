// @ts-check
const { getEslintConfig } = require('../../helpers/config')


/** @type {import('eslint').ESLint.Options['baseConfig']} */
module.exports = {
  ...getEslintConfig({ isNextJS: true }),
}
