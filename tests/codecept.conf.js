const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

exports.config = {
  tests: './scenarios/*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      url: 'http://localhost:8080',
      show: false,
      browser: 'chromium'
    }
  },
  include: {
    I: './steps_file.js',
    LoginPage: './pages/LoginPage.js',
    UpdateUserPage: './pages/UpdateUserPage.js',

  },
  bootstrap: null,
  mocha: {},
  name: 'tests'
}