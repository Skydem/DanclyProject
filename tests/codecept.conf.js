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
    "AssertWrapper" : {
      "require": "codeceptjs-assert"
    },
    Playwright: {
      url: 'http://localhost:8080',
      show: false,
      browser: 'chromium',
      windowSize: '1600x960',
    }
  },
  include: {
    I: './steps_file.js',
    LoginPage: './pages/LoginPage.js',
    UpdateUserPage: './pages/UpdateUserPage.js',
    MainPage: './pages/MainPage.js',

  },
  bootstrap: null,
  mocha: {},
  name: 'tests'
}