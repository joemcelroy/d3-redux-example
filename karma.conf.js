'use strict';

var coverOptions = {
  ignore: ['**/*.spec.js'],
  defaultIgnore: true
};


var babelOpts = {
  presets: ['es2015', 'react']
}

module.exports = function(karma){
  karma.set({
    basePath: '',
    frameworks: ['browserify', 'jasmine'],
    files: [
        'test/**/*.spec.js'
    ],
    browserify: {
        debug: true,
        transform: [
          ["babelify", babelOpts]
        ]
    },
    reporters: ['spec'],
    coverageReporter: {
      type: 'text'
    },
    preprocessors: {
      'src/**/*.js': [ 'browserify'],
      'test/**/*.spec.js': [ 'browserify']
    },
    browsers: ['PhantomJS'],
    colors: true,
    singleRun: false
  });
};
