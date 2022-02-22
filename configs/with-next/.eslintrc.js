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

const COMMON_RULES = {
  'operator-linebreak': [ERROR, 'before', { overrides: { '=': 'after' } }],
  'no-return-await': OFF,
  'comma-dangle': [ERROR, 'always-multiline'],
  'no-multiple-empty-lines': [ERROR, { max: 8, maxBOF: 1, maxEOF: 0 }],
  'no-console': OFF,
  'no-underscore-dangle': [ERROR, { allowAfterThis: true, allowFunctionParams: false }],
}


/** @type {import('eslint').ESLint.Options['baseConfig']} */
module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: ['standard', 'standard-jsx', 'next'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
  },
  ignorePatterns: ['src/graphql/**/*'],
  rules: {
    ...COMMON_RULES,
  },
  overrides: [
    {
      files: ['**/*.+(ts|tsx)'],
      extends: ['standard-with-typescript', 'standard-jsx', 'next'],
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
