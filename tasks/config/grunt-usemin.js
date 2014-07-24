module.exports = function(grunt) {
    grunt.config.merge({
        useminPrepare : {
            options: {
                dest: '<%= proj.dist %>',
                flow: {
                    steps: {
                        js: ['concat'],
                        css: ['concat']
                    },
                    post: {}
                },
            },
            html: ['<%= proj.tmp %>/**/*.html', '<%= proj.tmp %>/**/*.vm', '!<%= proj.tmp %>/**/template/**/*.html']
        },
        usemin: {

            html: ['<%= proj.dist %>/**/*.html', '!<%= proj.tmp %>/**/template/**/*.html', '<%= proj.dist %>/**/*.vm']
        }
    });
};