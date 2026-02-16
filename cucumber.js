module.exports = {
  default: {
    paths: ['src/features/**/*.feature'],
    require: ['src/step-definitions/**/*.ts', "src/support/**/*.ts",],
    requireModule: ['ts-node/register'],
    format: ['progress', 'json:reports/report.json', 'html:reports/report.html'],
    formatOptions: { snippetInterface: 'async-await' }
  }
};