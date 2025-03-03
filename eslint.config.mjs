// eslint.config.mjs
import js from '@eslint/js';
import next from 'eslint-plugin-next';
import prettier from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,          // Base JavaScript rules
  next.configs.recommended,        // Next.js-specific rules
  {
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error', // Ensure Prettier formatting
      'semi': ['error', 'always'],  // Enforce semicolons
      'quotes': ['error', 'single'], // Use single quotes
    },
  },
];
