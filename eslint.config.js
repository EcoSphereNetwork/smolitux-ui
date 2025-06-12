// ESLint 9 flat configuration
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-config-prettier';

const baseConfig = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: [process.env.ESLINT_TSCONFIG || './tsconfig.json'],
        sourceType: 'module',
        ecmaVersion: 'latest'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react: reactPlugin,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      'no-case-declarations': 'off',
      'no-prototype-builtins': 'off',
      '@typescript-eslint/no-unnecessary-type-constraint': 'off',
      'prefer-const': 'off'
    },
    settings: {
      react: { version: 'detect' }
    }
  },
  prettier,
  {
    ignores: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.tsx', '**/*.stories.tsx']
  }
];

export default baseConfig;
