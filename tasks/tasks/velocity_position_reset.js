module.exports = function(grunt) {
	// 作用：将之前 生成的临时文件 dist/xxx.html 重新恢复成 dist/xxx.html
    // 备注：velocity:dist 处理了 xinline 后，将文件名后缀改成 html，拷贝到 dist目录
    // 原因：cdn、inline 等一堆操作，.vm 文件里也需要做
    // 涉及任务：'preprocess:tmp'、useminPrepare、add_cdn_switch、inline:dist、filerev、usemin、imweb_abs、replace:combine_inline_script
    // add_cdn_switch先不做处理
    grunt.task.registerTask('velocity_position_reset', 'velocity_position_reset', function(type){
        var files = grunt.file.expand({
            expand:true,
            cwd:grunt.template.process('<%= proj.dist %>')
        }, '*.vm');
        files.forEach(function(filepath){
            var from = grunt.template.process('<%= proj.dist %>/'+filepath);
            var to = grunt.template.process('<%= proj.dist %>/vm/'+filepath);
            grunt.file.copy(from, to);
            grunt.file.delete(from);
        });
    });
};