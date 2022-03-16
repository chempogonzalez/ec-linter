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
  '@typescript-eslint/consistent-type-imports': [ERROR, { prefer: 'type-imports', disallowTypeAnnotations: true },
  ],
}




const COMMON_RULES = {
  'operator-linebreak': [ERROR, 'before', { overrides: { '=': 'after' } }],
  'no-return-await': OFF,
  'comma-dangle': [ERROR, 'always-multiline'],
  'no-multiple-empty-lines': [ERROR, { max: 8, maxBOF: 1, maxEOF: 0 }],
  'no-console': [
    process.env.NODE_ENV === 'production' ? ERROR : WARNING,
    { allow: ['warn', 'error'] },
  ],
  'no-underscore-dangle': [ERROR, { allowFunctionParams: false }],
  'import/order': [ERROR,
    {
      'newlines-between': 'always',
      alphabetize: { order: 'asc', caseInsensitive: true },
      warnOnUnassignedImports: false,
      groups: [
        ['builtin', 'external'],
        ['internal'],
        ['parent', 'sibling'],
        ['index'],
        ['object'],
        ['type'],
      ],
    },
  ],
}




module.exports = { COMMON_RULES, TYPESCRIPT_RULES }
