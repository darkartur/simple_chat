module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-karma');

    grunt.initConfig({
        karma: {
            client: {
                configFile: 'karma.conf.js'
            }
        }
    });
    
    grunt.registerTask('test', ['karma:client']);

};
