import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigAirbnbTypescript from 'eslint-config-airbnb-typescript';

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  {
    plugins: {
      eslintConfigAirbnbTypescript,
    },
    rules: {
      '@typescript-eslint/comma-dangle': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/indent': 'off',
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
