// Karma configuration
// Generated on Sat Jun 08 2019 20:11:05 GMT-0400 (Eastern Daylight Time)

module.exports = function(config) {
  config.set({

    // trying to make ff shutodnw properly.
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 1,
    processKillTimeout: 100000,

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'typecodes.js',
      'track.js',
      'test/**/*.js',
    ],


    // list of files / patterns to exclude
    exclude: [
    ],

    coverageReporter: {
      type : 'lcov',
      dir : 'coverage/'
    },
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors:  { '*.js': ['coverage'] },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage', 'coveralls'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'FirefoxHeadless'],

    customLaunchers: {
      Chrome_without_security: {
        base: 'Chrome',
        flags: ['--disable-web-security', '--disable-site-isolation-trials']
      },
      'FirefoxHeadless': {
        base: 'Firefox',
        flags: [
          '-headless',
        ],
      }
    },
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
