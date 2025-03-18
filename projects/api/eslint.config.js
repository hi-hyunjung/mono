const baseConfig = require('@config/eslint-config/base');
const nestjsConfig = require('@config/eslint-config/nestjs');

const tsParser = require('@typescript-eslint/parser');
const globals = require('globals');

module.exports = [
  { ignores: ['dist/**', '**/*.js'] },
  ...baseConfig,
  ...nestjsConfig,
  {
    languageOptions: {
      globals: { ...globals.node },
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { projectService: true, tsconfigRootDir: __dirname },
    },
  },
];
