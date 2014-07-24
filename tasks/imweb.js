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
var minimatch = require('minimatch');

module.exports = function(grunt) {

	// 默认配置
	require('./config')(grunt);

	// 默认插件配置
	var configGlob = path.resolve(__dirname, 'config/**/*.js');
	grunt.file.expand(configGlob).forEach(function(filepath){
		require(filepath)(grunt);
	});

    grunt.registerTask('dev', [
        'clean:dev',
        'compass:dev',

        'copy:dev',
        'velocity:dev',
        'inline:dev',
        'generateTemplateConfig:dev',
        'tplComplie:dev',

        'watch'
    ]);
};
