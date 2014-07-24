module.exports = function(grunt) {
    grunt.config.merge({
        imweb_abs: {
            options: {
                root: '<%= proj.dist %>',
                jsCDNRoot: '<%= cdn.js %>',
                cssCDNRoot: '<%= cdn.css %>',
                imgCDNRoot: '<%= cdn.img %>'
            },
            dist: {
                src: ['<%= proj.dist %>/**/*.html', '<%= proj.dist %>/**/*.vm']
            }
        },
    });
};