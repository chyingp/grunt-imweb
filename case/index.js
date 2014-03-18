/*
 * grunt-imweb
 * https://github.com/chyingp/grunt-imweb
 *
 * Copyright (c) 2013 chyingp
 * Licensed under the MIT license.
 */

'use strict';

var minimatch = require('minimatch');

module.exports = function(grunt) {
	// 初始化
/*
	可用上的插件
	grunt-concurrent 并发运行任务

	grunt-inline 文件内联
	grunt-rev 文件md5生成
	
	grunt-contrib-copy 文件拷贝
	grunt-contrib-clean 文件清除
	
	grunt-contrib-jshint 文件校验
	grunt-contrib-concat 文件合并
	grunt-contrib-requirejs require打包(这货如何结合到流程里是个大问题！)

	grunt-contrib-uglify js文件压缩
	grunt-contrib-cssmin css文件压缩
	grunt-contrib-htmlmin html文件压缩
	grunt-contrib-imagemin 图片压缩
	
	grunt-contrib-compass sass文件编译

	需要支持特性：
		资源定位（资源内联的基础）
		资源内联
		资源打包

	从“源码目录”到“发布目录”
		1、资源定位：将资源路径替换成发布目录的路径（根据配置可选择是否添加CDN前缀）
		2、资源内联：将资源内联到页面（htm、css、js中）
		3、requre、sea如何平滑支持

	需要思考的问题：
		1、文件如何合并
			1.1、普通文件合并
			1.2、支持willow的打包（专业名词是啥？）
			1.3、require、sea打包
		2、CDN切换的支持
		3、开发版、测试版、发布版的切换
		4、


*/


};