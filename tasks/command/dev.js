
'use strict';

module.exports = function(grunt) {
    
    grunt.registerTask('dev', [
        'clean:dev',
        'compass:dev',

        'copy:dev',
        'velocity:dev',
        'inline:dev',
        'generateTemplateConfig:dev',
        'tplComplie:dev',

        'watch'
    ]);
};