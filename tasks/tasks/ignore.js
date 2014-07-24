module.exports = function(grunt) {
	grunt.task.registerTask('ignore', '移除ignore文件', function(){

        var htmlFiles = grunt.file.expand(grunt.template.process('<%= proj.dist %>/**/ignore.*.html'));
        htmlFiles.forEach(function(filepath, index){
            console.info('delete the ignore file: '+filepath);
            grunt.file.delete(filepath);
        });
    });
};