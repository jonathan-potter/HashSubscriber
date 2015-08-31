
var path = require('path');
var webpackConfig = require('./webpack.config');
var merge = require('lodash/object/merge');

module.exports = function(config) {
  config.set({
    reporters: ['nyan', 'coverage'],

    browsers: ['PhantomJS'],

    frameworks: ['jasmine'],

    files: [
      'test/*.js',
      'test/**/*.js'
    ],

    preprocessors: {
      'test/*.js': ['webpack', 'coverage'],
      'test/**/*.js': ['webpack', 'coverage']
    },

    webpack: {
      resolve: merge(webpackConfig.resolve, {
        alias: {
          javascript: path.resolve(__dirname, 'javascript'),
        }
      }),
      module: webpackConfig.module
    },

    webpackMiddleware: {
      noInfo: true
    },

    plugins: [
      'karma-coverage',
      'karma-webpack',
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-nyan-reporter'
    ]
    
  });
};
