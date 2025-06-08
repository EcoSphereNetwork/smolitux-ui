const { createRequire } = require('module');
const requireFromCwd = createRequire(process.cwd());
const eslint = requireFromCwd('@eslint/js');
const tseslint = requireFromCwd('typescript-eslint');
const reactPlugin = requireFromCwd('eslint-plugin-react');
const reactHooksPlugin = requireFromCwd('eslint-plugin-react-hooks');
const jsxA11yPlugin = requireFromCwd('eslint-plugin-jsx-a11y');

module.exports = [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-case-declarations': 'off',
      'jsx-a11y/anchor-is-valid': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
];
