module.exports = function(grunt) {
    grunt.config.merge({
        replace: {
            combine_inline_script: {
                src: ['<%= proj.dist %>/*.html', '<%= proj.dist %>/*.vm', '!<%= proj.dist %>/latelyCourse.vm', '<%= proj.dist %>/qqlive/*.html'],
                overwrite: true,                 // overwrite matched source files
                replacements: [{
                    from: /\s*<\/script>\s*<script>\s*/g,
                    to: ""
                }]
            }
        }
    });
};