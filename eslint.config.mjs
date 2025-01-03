import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
          semi: true,
          singleQuote: true,
          trailingComma: 'es5',
          printWidth: 80,
        },
      ],
      indent: ['error', 2],
      '@typescript-eslint/indent': ['error', 2],
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: 'block',
          next: 'export',
        },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
  {
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
    ],
    plugins: ['@typescript-eslint', 'prettier'],
  },
];
