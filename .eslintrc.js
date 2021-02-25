module.exports = {
  extends: ['google', 'plugin:react/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
  },
  plugins: ['react'],
  rules: {
    'indent': ['error', 2],
    // suppress errors for missing 'import React' in files
    'react/react-in-jsx-scope': 'off',
    // allow jsx syntax in js files (for next.js project)
    'react/jsx-filename-extension': [
      1,
      { 'extensions': ['.js', '.jsx'] },
    ], // should add ".ts" if typescript project
    'react/jsx-filename-extension': 'off',
    'object-curly-spacing': [1, 'always'],
    'require-jsdoc': 'off',
    'no-console': 'error',
    'no-empty-function': 'error',
    'no-floating-decimal': 'error',
    'no-irregular-whitespace': 'off',
    'no-param-reassign': 'error',
    'no-template-curly-in-string': 'error',
    'no-unused-expressions': 'error',
    'no-unused-vars': ['error', { args: 'none' }],
    'no-var': 'error',
    'object-shorthand': 'error',
    'one-var': ['error', 'never'],
    'prefer-const': 'error',
  },
  settings: {
    react: {
      version: 'latest',
    },
  },
};
