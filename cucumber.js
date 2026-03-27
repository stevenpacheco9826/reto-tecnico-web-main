const common = {
  paths: ['src/features/**/*.feature'],
  require: ['src/step-definitions/**/*.ts', 'src/support/**/*.ts'],
  requireModule: ['ts-node/register'],
  format: ['progress-bar', 'json:reports/report.json', 'html:reports/report.html'],
  formatOptions: { snippetInterface: 'async-await' },
  dryRun: false,
  failFast: false,
  strict: true,
  retry: process.env.CI ? 1 : 0,
  parallel: process.env.PARALLEL ? 2 : 1,
};

module.exports = {
  default: common,
  debug: {
    ...common,
    format: ['@cucumber/pretty'],
    parallel: 1,
  },
};