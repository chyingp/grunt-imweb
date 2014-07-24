module.exports = function(grunt) {
	var path = require('path'),
        basicConfig = grunt.template.process('<%= other.requirejs.basicConfig %>'),
        buildConfig = grunt.template.process('<%= other.requirejs.buildConfig %>'),
        basicConfigPath = path.relative(__dirname, basicConfig),
        buildConfigPath = path.relative(__dirname, buildConfig),
        src = grunt.template.process('<%= proj.src %>'),
        configFiles = [],
        pattern = path.resolve(process.cwd(), src, '**/require.config.*.js');

    // 加载reqirejs配置：公共
    // 备注：这里是为了让 gruntfile、web页面公用一份require配置
    // require.config 会往 global 下面挂一个 requirejs 变量
    require(basicConfigPath);

    // 加载requirejs配置：模块相关
    // @todo review 这里需要设置个规则，达到两个目的：1、避免不同模块之间冲突
    grunt.file.expand(pattern).forEach(function(filepath){
        filepath = path.relative(__dirname, filepath);
        require(filepath);
    });

    // require('./src/qqlive/js/common/require.config.qqlive');
	// require('./src/video/js/common/require.config.video');	
    
    grunt.config.merge({
        requirejs: {
            index: {
                options: grunt.util._.extend({}, requirejs, require(buildConfigPath))
            }
        }
    });
};