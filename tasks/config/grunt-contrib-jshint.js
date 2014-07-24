module.exports = function(grunt) {
    grunt.config.merge({
        jshint: {    // jshint任务 , @todo 1、输出到jshint_report.txt里的内容稍多 2、需要再配置下，目前输出信息太多 3、单文件检查
            options: {

                reporter: 'tools/jshint/reporter.js',
                reporterOutput: 'tools/jshint/jshint.html',

                /*
                reporter: 'jshint',//jshint or checkstyle
                reporterOutput: 'build-logs/jshint.xml',
                */

                force: true,

                jshintrc: '.jshintrc'
            },
            all: ['<%= proj.src %>/js/**/*.js','!**/*/async.js']
            //all: ['jshint_test/**/*.js']
        }
    });
};