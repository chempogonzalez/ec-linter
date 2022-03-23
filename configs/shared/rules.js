// @ts-check

const RULES = {
  OFF: 0,
  WARNING: 1,
  ERROR: 2,
}

const { OFF, WARNING, ERROR } = RULES




const TYPESCRIPT_RULES = {
  // To allow checks for types which are string | null and use if (variable). It's simpler
  '@typescript-eslint/strict-boolean-expressions': OFF,
  // Allow only class with statics to allow to define a factory pattern
  '@typescript-eslint/no-extraneous-class': [ERROR, { allowStaticOnly: true }],
  // Array-type to be Array<Type> because reading from left to right is easier to indentify if it's an array or not
  '@typescript-eslint/array-type': [ERROR, { default: 'generic', readonly: 'generic' }],
  // Needs overwrite to ensure typescript-eslint is who manage the rule properly
  'no-return-await': OFF,
  // warning instead of error because await in return could provide more information on errors but avoid to use it
  '@typescript-eslint/return-await': [WARNING, 'never'],
  // Simplify code blocks where typescript mark as possible null or undefined and you are sure that it's not a falsy variable
  '@typescript-eslint/no-non-null-assertion': OFF,
  // warning to enhance to type all functions in order to have a better understanding when they are collapsed but not forcing always to have one
  '@typescript-eslint/explicit-function-return-type': WARNING,
  // There are some cases where you don't prefer to use nullish coalescing but you should avoid it. That's because it's marked as warning
  '@typescript-eslint/prefer-nullish-coalescing': WARNING,
  // Enforce to use import type { Type } when it's a type and not a value to distinguish properly the imports
  '@typescript-eslint/consistent-type-imports': [ERROR, { prefer: 'type-imports', disallowTypeAnnotations: true },
  ],
}




const COMMON_RULES = {
  // Enforce new wide screens length
  'max-len': [ERROR, { code: 150, tabWidth: 2 }],
  // Enforce to have the operator before the code to make it more readable in a left-to-right read
  'operator-linebreak': [ERROR, 'before', { overrides: { '=': 'after' } }],
  // warning instead of error because await in return could provide more information on errors but avoid to use it
  'no-return-await': WARNING,
  // ensure file diffs in commits are properly set and just mark the change and not the line before because of a new comma added
  'comma-dangle': [ERROR, 'always-multiline'],
  // Allow to separate things in blocks to make code more readable for code in the middle of the file
  'no-multiple-empty-lines': [ERROR, { max: 8, maxBOF: 1, maxEOF: 0 }],
  // Not allow underscore variables because you don't need it and in case you need a private one in classes, you can use "#"
  'no-underscore-dangle': [ERROR, { allowFunctionParams: false }],
  // Ensure code after imports is separated so you have a quick overview of the starting line of the actual code
  'import/newline-after-import': ['error', { count: 3 }],
  // Mark as error console.logs in production mode
  'no-console': [
    process.env.NODE_ENV === 'production' ? ERROR : WARNING,
    { allow: ['warn', 'error'] },
  ],
  // Order the imports separated with a blank line between blocks to make them more readable
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
