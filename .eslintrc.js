// @ts-check

const RULES = {
  OFF: 0,
  WARNING: 1,
  ERROR: 2,
}

const { OFF, WARNING, ERROR } = RULES


const TYPESCRIPT_RULES = {
  '@typescript-eslint/strict-boolean-expressions': OFF,
  '@typescript-eslint/no-extraneous-class': [ERROR, { allowStaticOnly: true }],
  '@typescript-eslint/array-type': [ERROR, { default: 'generic', readonly: 'generic' }],
  '@typescript-eslint/return-await': [WARNING, 'never'],
  '@typescript-eslint/no-non-null-assertion': OFF,
  '@typescript-eslint/explicit-function-return-type': WARNING,
  '@typescript-eslint/prefer-nullish-coalescing': WARNING,
}


/** @type {import('eslint').ESLint.Options['baseConfig']} */
module.exports = {
  extends: ['standard', 'standard-jsx', 'next'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
  },
  ignorePatterns: ['src/graphql/**/*'],
  rules: {
    'operator-linebreak': [ERROR, 'before', { overrides: { '=': 'after' } }],
    'no-return-await': OFF,
    'comma-dangle': [ERROR, 'always-multiline'],
    'no-multiple-empty-lines': [ERROR, { max: 8, maxBOF: 1, maxEOF: 0 }],
    'no-console': OFF,
    'no-underscore-dangle': [ERROR, { allowAfterThis: true, allowFunctionParams: false }],
  },
  overrides: [
    {
      files: ['**/*.+(ts|tsx|astro)'],
      extends: ['standard-with-typescript', 'standard-jsx', 'next'],
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        ...TYPESCRIPT_RULES,
      },
    },
  ],
}
