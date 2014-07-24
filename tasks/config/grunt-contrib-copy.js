module.exports = function(grunt) {
    var Util = {
        getJSON: function( filepath ){
            var ret = null,
                str = grunt.file.exists(filepath) &&  grunt.file.read( filepath );

            ret = eval('('+str+')');

            return ret;
        },
        getUrlRelativeToCertainFilepath: function (filepath, filepathOfContainingFile, filepathToGetRelativeResult){
            var localAbsoluteFilepath = path.resolve( path.dirname(filepathOfContainingFile), filepath );    // css文件的本地真实绝对路径
            var ret = path.relative( filepathToGetRelativeResult, localAbsoluteFilepath );
            return ret.replace(/\\/g, '/');
        },
        copyDir: function(src, dest){
            if(!grunt.file.exists(src)){
                grunt.log.error('目录 '+src+' 不存在！');
                return;
            }
            if(!grunt.file.exists(dest)) grunt.file.mkdir(dest);

            grunt.file.recurse(src, function(abspath, rootdir, subdir, filename){
                grunt.file.copy(abspath, abspath.replace(src, dest));
            });
        },
        textReplace: function(text, arr){
            arr = arr || [];
            arr.forEach(function(obj, index){
                text = text.replace(obj.from, function(){
                    return obj.to(arguments[0], 0, '', Array.prototype.slice.call(arguments, 1));
                });
            });
            return text;
        },
        formatDate: function(pattern,date){
            function formatNumber(data,format){//3
                format = format.length;
                data = data || 0;
                //return format == 1 ? data : String(Math.pow(10,format)+data).substr(-format);//IE6有bug
                //return format == 1 ? data : (data=String(Math.pow(10,format)+data)).substr(data.length-format);
                return format == 1 ? data : String(Math.pow(10,format)+data).slice(-format);
            }

            return pattern.replace(/([YMDhsm])\1*/g,  function(format){
                switch(format.charAt()){
                    case 'Y' :
                        return formatNumber(date.getFullYear(),format);
                    case 'M' :
                        return formatNumber(date.getMonth()+1,format);
                    case 'D' :
                        return formatNumber(date.getDate(),format);
                    case 'w' :
                        return date.getDay()+1;
                    case 'h' :
                        return formatNumber(date.getHours(),format);
                    case 'm' :
                        return formatNumber(date.getMinutes(),format);
                    case 's' :
                        return formatNumber(date.getSeconds(),format);
                }
            });
        },
        fileType: function(filepath){
            return require('path').extname(filepath).toLowerCase().slice(1);
        },
        wrap: function(str, flag){
            flag = flag || "'";
            return flag + str + flag;
        },
        getMD5Filepath: function(src, relativeTo){
            // var fullpath = path.resolve(relativeTo || '', src);
            var fullpath = src.replace(/\\/g, '/');
            var filename = path.basename(fullpath);
            var dirname = path.dirname(fullpath);

            console.log('src = ' + src + ', relativeTo = ' + relativeTo);
            console.log('filename = ' + filename);
            console.log('dirname = ' + dirname);

            var pattern = dirname + '/*.' + filename;
            console.log('pattern = ' + pattern);

            var matchFile = grunt.file.expand({
                cwd: relativeTo || ''
            }, pattern);
            console.log('matchFile = ' + matchFile);

            if(matchFile.length){
                return matchFile[0].replace(/\\/g, '/');
            }else{
                return src;
            }
        },
        insertVersion: function(url, version){
            var type = Util.fileType(url);
            var ret = url;
            var arr = url.split('/');

            switch(type){
                case 'css':
                    ret = url.replace(/([^\/]+\.css)$/, version+'/$1');
                    break;
                case 'js':
                    ret = url.replace(/([^\/]+\.js)$/, version+'/$1');
                    break;
                default:
                    arr.splice(arr.length-1, 0, version);
                    ret = arr.join('/');
                    break;
            }
            return ret;
        }
    };

    //preprocess
    function handleProcessContent(content, srcpath){
        // @todo review 这段代码是不是可以去掉
        // if($config.runStripTask){
        //     //content = content.replace(/var\s+logcat\s*=\s*g_monitor\.createLogger\s*\(\s*m_name\s*,\s*arguments\.callee\s*\)\s*;?\s*$/gm,'0;');
        // }
        var distMode = grunt.config('other.distMode');
        var isLocal = grunt.config('other.isLocal');
        var buildDate = grunt.config('other.buildDate');
        var pp = require("preprocess");

        content = pp.preprocess(content, {
            DIST_MODE: distMode,
            EVN_TAG: 'v1.0.0('+distMode+ (isLocal?'-local':'') + ')',
            BUILD_TIME: Util.formatDate('MM-DD hh:mm:ss',buildDate)
        });

        return content;
    }

    grunt.config.merge({
        copy: {
            dist:{
                files: [
                    {expand: true, cwd: '<%= proj.tmp %>', src: ['**/*.html','!base_script.html','!**/template/**/*.html','!**/_template/**/*.html'], dest: '<%= proj.dist %>'}, // makes all src relative to cwd
                    {expand:true, cwd:'<%= proj.tmp %>', src:['**/*.{<%= proj.fileType.image %>,htc}','!bower_components/ckeditor/**/*.{<%= proj.fileType.image %>,htc}'], dest: '<%= proj.dist %>'},
                    {expand:true, cwd:'<%= proj.src %>', src:['readme.txt', 'data/**/*', '**/*.swf', '**/*.xml', 'bower_components/**/*','!bower_components/ckeditor/**/*'], dest: '<%= proj.dist %>'},// html文件// img文件
                ]
            },
            dev: {
                files: [
                    {expand:true, cwd:'<%= proj.src %>', src:['**/*.html','**/*.xml','!**/template/**/*.html','!**/_template/**/*.html','**/*.json'], dest: '<%= proj.dev %>'},// html文件
                    {expand:true, cwd:'<%= proj.src %>', src:'**/*.{<%= proj.fileType.image %>,htc}', dest: '<%= proj.dev %>'},    // img文件
                    {expand:true, cwd:'<%= proj.src %>', src:'**/*.{js,css,swf}', dest: '<%= proj.dev %>'}    // modules
                ]
            },
            dev_inline : {
                options:{
                    processContent: function(content, srcpath){

                        content = handleProcessContent(content, srcpath);

                        return content;
                    },
                    processContentExclude: '**/*.{jpg,jpeg,bmp,png,gif,ico,htc,css}'
                },
                files : [
                    {expand:true, cwd:'<%= proj.src %>', src:['**/*.html','!template/**/*.html','!_template/**/*.html'], dest: '<%= proj.dev %>'}
                ]
            },
            tmp: {
                // options:{
                //     processContent: function(content, srcpath){

                //         content = handleProcessContent(content, srcpath);

                //         return content;
                //     },
                //     // processContentExclude: '!**/*.html'
                //     processContentExclude: '**/*.{jpg,jpeg,bmp,png,gif,ico,htc,css}'
                // },
                files: [
                    {expand:true, cwd:'<%= proj.src %>', src:['**/*.html','!bower_components/ckeditor/**/*.html','!**/*.distignore.html'], dest: '<%= proj.tmp %>'},// html文件
                    {expand:true, cwd:'<%= proj.src %>', src:['**/*.{jpg,jpeg,bmp,png,gif,ico,htc}','!design.distignore/**/*.jpg'], dest: '<%= proj.tmp %>'},    // img文件
                    {expand:true, cwd:'<%= proj.src %>', src:['**/*.{js,css}', '!bower_components/ckeditor/**/*.{js,css}'], dest: '<%= proj.tmp %>'}// modules
                ]
            },
            test: {
                // options: {
                //     processContent: function(content, srcpath){
                //         console.log('srcpath: '+srcpath);
                        
                //         var processContentInclude = this.options().processContentInclude;                       
                //         console.log('processContentInclude:'+processContentInclude);
                        
                //         var match = grunt.file.isMatch(processContentInclude, srcpath);
                //         console.log('isMatch: '+match);

                //         if(match){
                //             return 'hello\n'+content;    
                //         }else{
                //             return content;
                //         }                        
                //     },
                //     processContentInclude: 'src/index.html'
                //     // processContentExclude: '!**/*.html'
                //     // processContentExclude: '!src/index.html'
                // },
                files: [
                    {expand:true, cwd:'<%= proj.src %>', src:['404.html'], dest: 'fuck/'}
                ]
            },
        }
    });
};