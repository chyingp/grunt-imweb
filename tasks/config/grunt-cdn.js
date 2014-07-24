module.exports = function(grunt) {
    grunt.config.merge({
        cdn: {
            // 目前修改了img的cdn路径
            // @todo js里的绝对路径
            dist: {
                options: {
                    cwd: '<%= proj.dist %>',
                    fuck: '<%= proj.dist %>',
                    cdn: '<%= cdn.img %>'
                },
                src: ['<%= proj.dist %>/**/*.css']
            }
        }
    });
};