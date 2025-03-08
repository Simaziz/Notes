// eslint.config.mjs
import js from '@eslint/js';
import next from 'eslint-plugin-next';
import prettier from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  next.configs.recommended,
  {
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
    },
  },
];
