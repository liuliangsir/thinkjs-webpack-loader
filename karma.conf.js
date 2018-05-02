'use strict';

module.exports = function (config) {
    config.set({
        frameworks: ['mocha'],
        files: [
            './node_modules/should/should.js',
            'src/**/*.js',
            'test/**/*.js'
        ],
        preprocessors: {
            'src/**/*.js': ['coverage']
        },
        plugins: ['karma-mocha', 'karma-phantomjs-launcher', 'karma-chrome-launcher', 'karma-firefox-launcher', 'karma-coverage', 'karma-spec-reporter'],
        browsers: ['PhantomJS', 'Firefox', 'Chrome'],
        reporters: ['spec', 'coverage'],
        coverageReporter: {
            dir: 'coverage',
            reporters: [{
                type: 'json',
                subdir: '.',
                file: 'coverage.json',
            }, {
                type: 'lcov',
                subdir: '.'
            }, {
                type: 'text-summary'
            }]
        }
    });
};
