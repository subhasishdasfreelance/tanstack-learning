import { tanstackConfig } from '@tanstack/eslint-config'
import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'

export default defineConfig([
  ...tanstackConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      js,
      'react-hooks': /** @type {any} */ (reactHooks),
    },
    extends: ['js/recommended'],
    rules: {
      'import/no-cycle': 'off',
      'import/order': 'off',
      'sort-imports': 'off',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/require-await': 'off',

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
])
