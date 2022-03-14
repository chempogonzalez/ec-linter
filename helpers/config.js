// @ts-check
const { COMMON_RULES, TYPESCRIPT_RULES } = require('../configs/shared/rules')



/* [start] ------------------ BASE CONFIG ---------------------------------- */
const eslintJSConfigExtensions = ['standard', 'standard-jsx']
const eslintTSConfigExtensions = ['standard-with-typescript', 'standard-jsx']
const baseIgnorePatterns = ['src/graphql/**/*']
/* [end] -------------------- BASE CONFIG ---------------------------------- */




/**
 * Gets the eslintConfig depending on options passed
 *
 * @returns Eslint config object
 */
const getEslintConfig = ({ isNextJS = false } = {}) => {
  const jsConfigExtensions = isNextJS
    ? [...eslintJSConfigExtensions, 'next']
    : eslintJSConfigExtensions

  const tsConfigExtensions = isNextJS
    ? [...eslintTSConfigExtensions, 'next']
    : eslintTSConfigExtensions

  const ignorePatterns = isNextJS
    ? [...baseIgnorePatterns, 'next-env.d.ts']
    : baseIgnorePatterns

  return {
    env: {
      es6: true,
      browser: true,
      node: true,
    },
    extends: jsConfigExtensions,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
    },
    ignorePatterns,
    rules: {
      ...COMMON_RULES,
    },
    overrides: [
      {
        files: ['**/*.+(ts|tsx)'],
        extends: tsConfigExtensions,
        parserOptions: {
          project: './tsconfig.json',
          sourceType: 'module',
          ecmaFeatures: {
            jsx: true,
          },
          warnOnUnsupportedTypeScriptVersion: true,
        },
        rules: {
          ...COMMON_RULES,
          ...TYPESCRIPT_RULES,
        },
      },
    ],
  }
}

module.exports = { getEslintConfig }
