/** @typedef {import("prettier").Config} PrettierConfig */

/**
 * @type {PrettierConfig}
 */
const config = {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
  printWidth: 120,
  bracketSpacing: true,
  arrowParens: 'always',
  experimentalTernaries: true,
  endOfLine: 'auto',
};

export default config;
