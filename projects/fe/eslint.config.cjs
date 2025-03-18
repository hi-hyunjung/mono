const baseConfig = require('@config/eslint-config/base');
const reactConfig = require('@config/eslint-config/react');

/** @type {import('typescript-eslint').Config} */
module.exports = [
  {
    ignores: ['dist', '**/*.spec.ts', '**/*.spec.tsx'],
  },
  ...baseConfig,
  ...reactConfig,
];
