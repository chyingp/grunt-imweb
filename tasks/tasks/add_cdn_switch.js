module.exports = function(grunt) {
    var URL = require('url');
    var path = require('path');
    var Util = require('../module/util.js');    // @todo review 改成 node module 的形式，就不用管相对路径了
    // cdn切换
    grunt.task.registerTask('add_cdn_switch', function(){
        var cdnVersion;
        var switchFilesPath = grunt.template.process('<%= proj.tmp %>/**/g_cfg_cdn_switch.js');
        var switchFiles = grunt.file.expand(switchFilesPath);
        var cdnPrefix = URL.resolve(grunt.config('cdn_switch.domain'), grunt.config('cdn_switch.path'));  // cdn切换的前缀

        grunt.log.subhead('CDN切换任务开始---------------------------------------');
        grunt.log.writeln('切换的文件为：' + switchFiles.join('\n'));

        switchFiles.forEach(function(filepath, index){

            grunt.log.subhead('处理文件: ' + filepath);

            var content = grunt.file.read(filepath);
            content = replaceWhenDist(content, cdnPrefix);
            grunt.file.write(filepath, content);
        });

        function replaceWhenDist(content, url) {
            var ret = content;
            url = url || '';
            return Util.textReplace(content, [{
                from: /__cdn_switch\(['"]([^'"]+)['"]\)/g,
                to: function (matchedWord, index, fullText, regexMatches) {

                    grunt.log.writeln('发现一个：' + matchedWord);
                    var src = regexMatches[0];
                    if(cdnVersion){  // 通过版本目录控制版本

                        ret = Util.insertVersion(URL.resolve(url, src), cdnVersion);
                        grunt.log.writeln('使用版本目录：' + cdnVersion);

                    }else{  // 通过md5控制版本

                        grunt.log.writeln('使用md5文件名！');
                        src = Util.getMD5Filepath(src, grunt.template.process('<%= proj.dist%>/'));
                        ret = URL.resolve(url, src);
                    }
                    ret = Util.wrap(ret);
                    grunt.log.writeln('替换后的路径：' + ret);
                    return ret;
                }
            }, {
                // 场景：<script src="http://xx.xx.com/require.js" data-main="modules/index/js/index"></script>
                // data-main 里的文件不添加.js后缀
                from: /__cdn_require\(['"]([^'"]+)['"]\)/g,
                to: function (matchedWord, index, fullText, regexMatches) {

                    grunt.log.writeln('发现一个：' + matchedWord);
                    var src = regexMatches[0] + '.js';
                    if(cdnVersion){  // 通过版本目录控制版本

                        ret = Util.insertVersion(URL.resolve(url, src), cdnVersion);
                        grunt.log.writeln('使用版本目录：' + cdnVersion);

                    }else{  // 通过md5控制版本

                        grunt.log.writeln('使用md5文件名！');
                        src = Util.getMD5Filepath(src, grunt.template.process('<%= proj.dist%>/'));
                        ret = URL.resolve(url, src);
                    }
                    ret = Util.wrap(ret.replace(/\.js$/, ''));
                    grunt.log.writeln('替换后的路径：' + ret);
                    return ret;
                }
            }]);
        }

        grunt.log.subhead('CDN切换任务结束---------------------------------------');
    });
};