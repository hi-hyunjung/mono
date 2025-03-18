const baseConfig = require('@config/eslint-config/base');
const nextjsConfig = require('@config/eslint-config/nextjs');
const reactConfig = require('@config/eslint-config/react');

/** @type {import('typescript-eslint').Config} */
module.exports = [
  {
    ignores: [
      '.next/**',
      '**/*.spec.ts',
      '**/*.spec.tsx',
      'jest.setup.ts',
      'next-env.d.ts',
      'jest.polyfills.js',
      '**/api.type.ts',
    ],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
];
