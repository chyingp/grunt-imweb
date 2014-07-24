/**
 * 默认配置
 */
module.exports = function(grunt) {
	grunt.config.merge({
		// 项目配置
		proj: {
			src: 'src',	// 源文件目录
			dev: 'dev',	// 开发目录
			tmp: '.tmp',    // 临时目录
			dist: 'dist',  // 发布目录
			fileType: {
				image: 'jpg,jpeg,bmp,png,gif,ico',
				text: 'js,css,htc,txt,xml,json'
			}
		},
		// CDN部署
		cdn: {
			js: 'http://7.url.cn/edu/',
			css: 'http://8.url.cn/edu/',
			img: 'http://9.url.cn/edu/'
		},
		"cdn_switch": {// cdn切换用
			"domain": "http://ke.qq.com",
			"path": ""
		},
		other: {
//			requirejs: {
//				basicConfig: '<%= proj.src %>/js/common/require.config.js',
//				buildConfig: 'require-build.js'
//			},
			srcInlinePath: 'src/',
			distMode: 'public',
			inlineJSCompress: true,
			isLocal: false,
			buildDate: new Date()
		}
	});
};