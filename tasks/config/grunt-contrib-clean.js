module.exports = function(grunt) {
    grunt.config.merge({
        clean: {
            test: ['<%= proj.test %>'],
            dev: ['<%= proj.dev %>/**/*.*', '!<%= proj.dev %>/**/*.css'],
            dist: ['<%= proj.dist %>'],
            tmp: ['<%= proj.tmp %>/**/*.*', '!<%= proj.tmp %>/**/*.css'],
            clean_dist: [
                "<%= proj.dist %>/template/",
                "<%= proj.dist %>/tools.distignore/",
                "<%= proj.dist %>/datepicker/", //一定要确认dist里没有对该目录资源的引用!!
                "<%= proj.dist %>/bower_components/ckeditor/", //一定要确认dist里没有对该目录资源的引用!!
                "<%= proj.dist %>/inline/",
                "<%= proj.dist %>/readme.txt",
                "<%= proj.dist %>/build.txt",
                "<%= proj.dist %>/baseScript.html",
                "<%= proj.dist %>/scriptStart.html",
                "<%= proj.dist %>/scriptEnd.html"
            ]
        }
    });
};