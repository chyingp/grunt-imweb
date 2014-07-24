module.exports = function(grunt) {
    // @todo review 相当乱的代码，需要梳理watch target之间的关系
    grunt.config.merge({
        watch: {
            options:{
                spawn: false
            },

            main: {
                files: ['<%= proj.src %>/**/**.*']
                // tasks:['copy:dev']
            },
            compass: {
                files: ['<%= proj.src %>/**/**.scss'],
                tasks: ['compass:dev']
            },
            template : {
                 files : ['<%= proj.src %>/**/template/**/*.html'],
                 tasks : [
                    'templates:dev',//watch的时候执行templates
                    'tplComplie:dev'
                ]
             },
             inline_html : {
                options : {
                    spawn : false
                },
                files : ['<%= proj.dev %>/*.html'],
                tasks : ['inline:dev']
            },
            inline : {
                options : {
                    spawn : false
                },
                files : ['<%= proj.src %>/inline/*.html'],
                tasks : ['copy:dev_inline','inline:dev']
            },
            velocity_template: {
                files : ['<%= proj.src %>/vm/*.*'],
                tasks: ['velocity:dev', 'inline:dev_vm']
            }
        }
    });

    // event类型：added deleted renamed changed
    // @todo review 这段代码需要review下，好像最初是因为 watch 插件的bug才这么写的
    grunt.event.on('watch', function(action, filepath, target){
        filepath = filepath.replace(/\\/g, '/');
        grunt.log.writeln(grunt.file.isDir(target + ': ' + filepath)?'文件夹':'文件' + filepath + ' has ' + action);

        var destPath = filepath.replace(grunt.template.process('<%= proj.src %>'), grunt.template.process('<%= proj.dev %>'));
        if(action==='deleted'){
            grunt.file.exists(destPath) && grunt.file.delete(destPath);
        }else{

            if(grunt.file.isDir(filepath)){
                Util.copyDir(filepath, destPath);
            }else{
                var extName = path.extname(filepath);
                if (extName !== '.data' && extName !== '.vm') grunt.file.copy(filepath, destPath);
            }
        }
    });
};