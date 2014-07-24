'use strict';

var path = require('path');
var url = require('url');
var Util = require('../module/util');

module.exports = function(grunt) {

    var filterTasks = function(task){ return !!task; };

    var distTasks = [
        grunt.option('jshint') && 'jshint',
        'clean:dist',

        'clean:tmp',
        'velocity:dist',    // (src/下)normolize：vm -- html (到 dist/)
        'compass:tmp',  // （src/下）normolize: scss -- css （到 .tmp/）
        
        'generateTemplateConfig:tmp',  // （src/下）normolize: html(template) -- js  （备注：生成tplCompile:tmp的配置）
        'tplComplie:tmp',  // （src/下）normolize: html(template) -- js

        'copy:tmp', // （src/下）move: html、css、js 拷贝 到 .tmp/
        'preprocess:tmp',

        'useminPrepare',  // （./tmp下）生成concat、uglify配置（dest 为 dist/）

        'requirejs',    // 打包合并

        'copy:dist',  // 文件拷贝： html、css、js（从 .tmp/ 到 dist/）
                      // 文件拷贝： data/、ckeditor/、readme/、*.swf（从 .tmp/ 到 dist/）

        'add_cdn_switch', // cdn切换任务:处理cfg文件内的字符串（@todo，后面再整合）

        'inline:dist',  // (dist/下)资源内嵌，htm文件的inline操作（文件源为.tmp/）

        'concat',   // （dist/下）合并文件，合并js、css（文件源为 .tmp/ ）

        'sprite',   //自动合并雪碧图，（@todo 可否利用compass的能力？）
        'filerev',
        'usemin',   // （dist/下）修改html页面里的静态资源路径，配置rev，dist/ 下，（文件源为 .tmp/ ）

        'cdn:dist', // （dist/下）将css文件 相对路径修改为CDN路径（@todo 可否利用compass的能力？）

        'imweb_abs:dist',    // （dist/下）将相对路径修改为CDN路径，将html文件里的 link、script、img、data-main 等修改成CDN路径
        'replace:combine_inline_script',//合并连续多个script标签
        'velocity_position_reset',
        //'crossorigin',//测试环境 cdn的header未完成增加 access-control前不能使用 !!!
        'index_cms'//新增任务 用于生成index_cms.vm文件
    ].filter(filterTasks);;

    grunt.registerTask('dist', function(md){

        var map = {
            d: {distMode:'dev', wording:'用于  联调  的build', runStripTask:false, inlineJSCompress:false, cleanCopy:false},
            t: {distMode:'test', wording:'用于  提测(功能测试)  的build', runStripTask:false, inlineJSCompress:true, cleanCopy:true},
            p: {distMode:'public', wording:'用于  回归测试 + 发布  的build', runStripTask:true, inlineJSCompress:true, cleanCopy:true}
        };
        var obj =  map[md] || map['p'];
        var distMode = obj.distMode;
        var wording = obj.wording;

        grunt.config.merge({
            other: {
                distMode: obj.distMode,
                EVN_TAG: 'v1.0.0('+ obj.distMode + (grunt.config('other.isLocal')?'-local':'') + ')',
                buildDate: Util.formatDate('MM-DD hh:mm:ss',new Date())
            }
        });

        console.info('\n*****  distMode='+distMode+'  *****\n*\n*  ' + wording + '\n*\n******************************\n');

        if(obj.cleanCopy){
            distTasks = distTasks.concat([
                'clean:clean_dist'
            ]);
        }

       grunt.task.run(distTasks);
    });
};