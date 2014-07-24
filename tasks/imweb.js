/*
 * grunt-imweb
 * https://github.com/chyingp/grunt-imweb
 *
 * Copyright (c) 2014 chyingp
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var url = require('url');

module.exports = function(grunt) {
	// 
	var cwd = process.cwd();
	grunt.file.setBase(__dirname, '../');
	require('matchdep').filter('grunt-*').forEach(grunt.loadNpmTasks);
	grunt.file.setBase(cwd);

	// 默认配置
	require('./config')(grunt);

	// 默认插件配置
	var configGlob = path.resolve(__dirname, 'config/**/*.js');
	grunt.file.expand(configGlob).forEach(function(filepath){
		require(filepath)(grunt);
	});

	// 本地任务
	grunt.task.loadTasks(path.resolve(__dirname, 'tasks'));
	grunt.task.loadTasks(path.resolve(__dirname, 'proj-task/core/grunt-cdn/tasks'));


	// 对外暴露命令
    require('./command/dev')(grunt);
    require('./command/dist')(grunt);
};
