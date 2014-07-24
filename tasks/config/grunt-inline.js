module.exports = function(grunt) {
    grunt.config.merge({
        // 资源内嵌
        // @todo 目前只处理了html，css、js等还没处理
        inline: {
            dev: {
                src: ['<%= proj.dev %>/**/*.html']
            },
            dev_vm: {
                options: {
                    relativeTo: '<%= other.srcInlinePath %>'
                },
                src: ['<%= proj.dev %>/*.html']
            },
            dist: {
                options: {
                    exts: ['vm'],
                    relativeTo: '<%= proj.tmp %>/',
                    cssmin : true,
                    uglify : '<%= other.inlineJSCompress %>'
                },
                src: ['<%= proj.dist %>/**/*.html', '<%= proj.dist %>/**/*.vm']
            }
        }
    });
};