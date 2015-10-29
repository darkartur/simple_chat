module.exports = function(config) {
    config.set({
        basePath: './src',
        frameworks: ['jasmine'],
        browsers: ['Chrome'],
        files: [
            '*.js'
        ],
        singleRun: true
    });
};
