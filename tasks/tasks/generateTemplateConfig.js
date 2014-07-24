module.exports = function(grunt) {
    var path = require('path');
    var $config = {

        srcPath: 'src/',    // 源码目录
        tmpPath: '.tmp/',   // 临时目录
        devPath: 'dev/',    //开发目录
        distPath: 'dist/',    // 发布目录
        projConfPath: 'proj-conf.json',

        needTemplates : ['qqlive','video'],//需要执行template的子目录,add by herbertliu
        srcInlinePath : 'src/',

        buildDate: new Date(),
        isLocal: false, //本地化前的grunt dist需要将此开关打开
        // distMode: getDistMode() //'test': 提测阶段, 'dev': 开发,联调阶段, 'public': 发布阶段
    };

    //编译template文件
    grunt.task.registerTask('generateTemplateConfig','开始批编译模版文件',function(type){
        type = type == 'tmp'?'tmp':'dev';//默认是dev参数
        //console.log('compilerTemplate:' + type);
        compilerTemplate({type:type});
    });

    //编译template文件
    /*
        @author herbertliu
        @param options Object
                    templatePath  String  //模版路径
    */
    function compilerTemplate(options){
        grunt.log.writeln('开始批量编译template模版文件!');
        options = options || {};
        var type = options.type || 'dev';
        var srcTemplatePath = options.srcTemplatePath || $config.srcTemplatePath || 'template';
        var devTemplatePath = options.devTemplatePath || $config.devTemplatePath || 'js/template';

        var _srcBasePath = _srcTemplatePath = grunt.template.process('<%= proj.src %>');
        var _devBasePath = (type=='dev'?grunt.template.process('<%= proj.dev %>'):grunt.template.process('<%= proj.tmp %>'));

        var needTemplates = $config.needTemplates || [];
        needTemplates.unshift('');
        var srcTemplatePaths = [];
        var devTemplatePaths = [];
        for(var t = 0 ,len = needTemplates.length ; t < len ; t++){
            srcTemplatePaths.push(_srcBasePath + '/' + needTemplates[t] + '/' + srcTemplatePath + '/');
            devTemplatePaths.push(_devBasePath + '/' + needTemplates[t] + '/' + devTemplatePath + '/');
        }

        //var srcTemplatePaths = [_srcTemplatePath = $config.srcPath + '/' + srcTemplatePath + '/'];
        //var devTemplatePaths = [(type=='dev'?$config.devPath:'.tmp') + '/' + devTemplatePath + '/'];

        var needTemplates = $config.needTemplates;

        var _fileObj = {};
        for(var mn = 0 ,len = srcTemplatePaths.length; mn < len; mn ++ ){
            var _srcTemplatePath = srcTemplatePaths[mn],
                _devTemplatePath = devTemplatePaths[mn];
            console.log(_srcTemplatePath,_devTemplatePath);
            grunt.file.recurse(_srcTemplatePath, function(abspath, rootdir, subdir, filename){//绝对路径，根目录，文件名字，文件
                //console.log(arguments);
                var _templateJs =  subdir || 'default';//根目录下文件生成对应列表
                var devTmp = _devTemplatePath + '/' + _templateJs + '.js';
                if(!_fileObj[devTmp]){
                    var srcTmp = _srcTemplatePath + '/' + (subdir || '') + '/*.html';
                    _fileObj[devTmp] = [srcTmp];
                    grunt.log.writeln('template模版文件列表:文件' + devTmp + '对应的模版文件是：' + srcTmp);
                }
            });
        }

        /*
        _fileObj = {
            'dev///js/template//agency.js': ['src///template//agency/*.html'],
            'dev///js/template//agencyBillInfo.js': ['src///template//agencyBilling/*.html'],
            ...
        }
        */
        //grunt.config.set('template_inline.'+ type +'.files',_fileObj);//设置file对象内容
        grunt.config.set('tplComplie.'+ type +'.files',_fileObj);
    }
};