/** @type {import("prettier").Config} */
const config = {
  trailingComma: "all",
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  bracketSpacing: true,
  printWidth: 100,
  endOfLine: "lf",
  plugins: [require.resolve("prettier-plugin-organize-imports")],
};

module.exports = config;
