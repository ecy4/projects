import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } }
    },
    rules: {
      // Reglas de estilo StandardJS
      'semi': ['error', 'never'],
      'quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      'indent': ['error', 2, { SwitchCase: 1 }],
      'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
      'comma-dangle': ['error', 'never'],
      'space-before-function-paren': ['error', 'always'],
      'space-before-blocks': ['error', 'always'],
      'space-infix-ops': 'error',
      'keyword-spacing': ['error', { before: true, after: true }],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'eqeqeq': ['error', 'always', { null: 'ignore' }],
      'no-trailing-spaces': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'eol-last': ['error', 'always'],
      'no-undef': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'react-refresh/only-export-components': ['warn', { allowExportNames: ['FiltersContext', 'CartContext'], allowConstantExport: true }]
    }
  }
])
