module.exports = function(grunt) {
    grunt.config.merge({
        filerev: {
            dist: {
                options: {
                    algorithm: 'sha1',
                    length: 4
                },
                src: [
                    '<%= proj.dist %>/**/*.js',
                    '<%= proj.dist %>/**/*.css',
                    // '<%= cfg.distPath %>/**/*.{jpg,jpeg,bmp,png,gif,htc}'
                ]
            }
        }
    });
};