/*
 * grunt-imweb
 * https://github.com/chyingp/grunt-imweb
 *
 * Copyright (c) 2013 chyingp
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var URL = require('url');
var minimatch = require('minimatch');

module.exports = function(grunt) {

	// 加载依赖的package
	var packagePath = path.resolve(process.cwd(),'node_modules/grunt-imweb/package.json');	
	var packageConfig = require( packagePath );
	var search = Object.keys( packageConfig.dependencies );
	var packageList = minimatch.match(search, '{grunt,casper}-*', {});
	packageList.forEach(function(name){
		grunt.task.loadTasks( tt );
	});


	var $config = {
		supportImgType: ['jpg', 'jpeg', 'png', 'gif', 'bmp'],
		srcPath: 'src/',	// 源码目录
		devPath: 'dev/',	//开发目录
		distPath: 'dist/',	// 发布目录
		
		destBasePath: 'htdocs/',	// 开发目录
		modulesPath: 'src/modules/',	// 功能模块存放目录
		
		concatConfigPath: 'config.qzmin',	// js文件合并规则的文件路径
		projConf: 'proj-conf.json',
		scssDependRulePath: '.proj/.scssDep.json'	// scss文件的依赖规则
	};

    // 项目配置
	var $projConfng = {

	};

    (function(){
        var projConf = getJSON( $config.projConf );
        $projConfng.imgCdnRoot = projConf.cdnRoot.img + projConf.name + '/';

    })();

	var $preConcatConfig = null;

	var $changedScssFilePath = '';
	var $changedScssAction = '';
	
	// 取得 filepath2 相对于Gruntfile.js的相对路径
	function getPathRelativeToGruntfile(filepath1, filepath2){
		var abs = path.resolve(path.dirname(filepath1, filepath2));
		var rtv = path.relative('./', abs);	
		grunt.log.writeln('getPathRelativeTo>abs: '+ abs);
		grunt.log.writeln('getPathRelativeTo>abs: '+ rtv);	
		return rtv;
	}

	function isEmptyObj( obj ){
		var ret = true;
		for(var key in obj){
			if(obj.hasOwnProperty(key)){
				ret = false;
			}
		}
		return ret;
	}

	//
	function isRemotePath( url ){
		return url.match(/^https?:\/\//);
	}

	function getJSON( filepath ){
		var ret = null,
			str = grunt.file.exists(filepath) &&  grunt.file.read( filepath );

		ret = eval('('+str+')');
		return ret;
	}

	// 项目配置信息——@TODO pkg、banner是否去掉
	// grunt.initConfig({
	var cfg_obj = {
	    cfg: $config,
		clean: {
			dev: [$config.devPath],
			dist: [$config.distPath],
			tmp: ['.tmp/']
		},
		concurrent: {
		    dev: [
                'compass:dev',
                'copy:dev'
		    ],
		    dist: [
                //'compass:dev',
                'copy:dist'
		    ],
		    tmp: [
		    	'compass:tmp',
                'copy:tmp'
		    ]
		},
		copy: {
            dist:{
                files: [
                    {expand: true, cwd: '.tmp/', src: ['**/*.html'], dest: $config.distPath}, // makes all src relative to cwd
                    {expand:true, cwd:'.tmp/', src:'**/*.{jpg,jpeg,bmp,png,gif,ico}', dest: $config.distPath}	// img文件
                    // {expand: true, cwd: $config.srcPath, src: ['**/*.js'], dest: $config.distPath}, // makes all src relative to cwd
                    // {expand: true, cwd: $config.srcPath, src: ['**/*.css'], dest: $config.distPath} // makes all src relative to cwd
                ]
            },
            dev: {
                files: [
                    {expand:true, cwd:$config.srcPath, src:'**/*.html', dest: $config.devPath},// html文件
                    {expand:true, cwd:$config.srcPath, src:'**/*.{jpg,jpeg,bmp,png,gif,ico}', dest: $config.devPath},	// img文件
                    {expand:true, cwd:$config.srcPath, src:'**/*.{js,css}', dest: $config.devPath}	// modules
                    //{expand:true, cwd:$config.srcPath + 'jslib/', src:'**', dest: $config.devPath+'jslib/'}	// jslib，都是js文件
                ]
            },
            tmp: {
                files: [
                    {expand:true, cwd:$config.srcPath, src:'**/*.html', dest: '.tmp/'},// html文件
                    {expand:true, cwd:$config.srcPath, src:'**/*.{jpg,jpeg,bmp,png,gif,ico}', dest: '.tmp/'},	// img文件
                    {expand:true, cwd:$config.srcPath, src:'**/*.{js,css}', dest: '.tmp/'}	// modules
                    //{expand:true, cwd:$config.srcPath + 'jslib/', src:'**', dest: $config.devPath+'jslib/'}	// jslib，都是js文件
                ]
            }
		},

		// 资源内嵌
		// @todo 目前只处理了html，css、js等还没处理
        inline: {
            dist: {
                options: {
                    relativeTo: $config.srcPath
                },
                src: [$config.distPath+'**/*.html']
            }
        },
        compass: {
            options: {
            	noLineComments: true
//                generatedImagesDir: '.tmp/images/generated',    // The directory where generated images are kept. It is relative to the projectPath.
//                imagesDir: '<%= yeoman.app %>/images',  // The directory where you keep your images.
//                javascriptsDir: '<%= yeoman.app %>/scripts',    // The directory where you keep your JavaScript files.
//                fontsDir: '<%= yeoman.app %>/styles/fonts', // The directory where you keep your fonts.
//                importPath: '<%= yeoman.app %>/bower_components',   // Makes files under the specified folder findable by Sass's @import directive.
//                httpImagesPath: '/images',  // Default: httpPath + "/" + imagesDir
//                                            // The full http path to images on the web server.
//                httpGeneratedImagesPath: '/images/generated',   // The full http path to generated images on the web server.
//                                                                // Default: httpPath + "/" + generatedImagesDir
//                httpFontsPath: '/styles/fonts', // The full http path to font files on the web server.
//                relativeAssets: false   // Make Compass asset helpers generate relative urls to assets.
            },
            dist: {
                options: {
                    sassDir: $config.srcPath,
                    cssDir: $config.distPath
                }
            },
            tmp: {
                options: {
                    sassDir: $config.srcPath,
                    cssDir: '.tmp/'
                }
            },
            dev: {
                options: {
                    noLineComments: false,
                    sassDir: $config.srcPath,
                    cssDir: $config.devPath
                }
            }
        },
        cdn: {
            // 目前修改了img的cdn路径
            // @todo js里的绝对路径
            dist: {
                options: {
	                cwd: 'dist/',
	                fuck: 'dist/',
                    cdn: $projConfng.imgCdnRoot
                },
                src: ['<%= cfg.distPath %>/**/*.css']
            }
        },
        jshint: {	// jshint任务 , @todo 1、输出到jshint_report.txt里的内容稍多 2、需要再配置下，目前输出信息太多 3、单文件检查
			options: {
				reporterOutput: './jshint_report.txt'
			},
			all: [$config.destBasePath + 'js/**/*.js']
		},
        watch: {
	        options:{
		        spawn: false
	        },
            main: {
                files: ['<%= cfg.srcPath %>/**/**.*']
                // tasks:['copy:dev']
            },
            compass: {
                files: ['<%= cfg.srcPath %>/**/**.scss'],
                tasks: ['compass:dev']
            }
        },
		rev: {
			dist: {
				options: {
					algorithm: 'sha1',
					length: 4
				},
				src: [
					'<%= cfg.distPath %>/**/*.js',
					'<%= cfg.distPath %>/**/*.css',
					'<%= cfg.distPath %>/**/*.{jpg,jpeg,bmp,png,gif}'
				]	
			}
		},
		useminPrepare: {
            options: {
                dest: $config.distPath
            },
            html: ['.tmp/**/*.html']
            // dist: ['<%= cfg.srcPath %>/**/*.html']
		},
		usemin: {

			html: [$config.distPath+'**/*.html']
		},
		requirejs: {
		    options: {
                optimize: 'none',
                useStrict: true,
                wrap: true
		    }/*,
		    dist: {
                options: {
                    optimize: 'none',
                    useStrict: true,
                    wrap: true
                }
		    }*/
		}
		// ,grunt.config.set('requirejs', {
		// 	dist: {
		// 		options: {
		// 			optimize: 'none',
		// 			name: 'index/js/index',
		// 			baseUrl: 'dist/modules',
		// 			out: 'dist/modules/index/js/main.js',
		// 			mainConfigFile: 'build.js'
		// 		}
		// 	}
		// });
	// });
	};

	for(var key in cfg_obj){
		grunt.config.set(key, cfg_obj[key]);
	}

	function getReversePath(filepath){
		var arr = filepath.replace($config.srcPath, $config.destBasePath).split('/');
		return [arr[0], arr[2], arr[1], arr[3]].join('/');
	}

	// 拷贝目录：grunt本身不支持？
	function copyDir(src, dest){
		if(!grunt.file.exists(src)){
			grunt.log.error('目录 '+src+' 不存在！');
			return;
		}
		if(!grunt.file.exists(dest)) grunt.file.mkdir(dest);

		grunt.file.recurse(src, function(abspath, rootdir, subdir, filename){
			grunt.file.copy(abspath, abspath.replace(src, dest));
		});
	}

	function getUrlRelativeToCertainFilepath(filepath, filepathOfContainingFile, filepathToGetRelativeResult){
		var localAbsoluteFilepath = path.resolve( path.dirname(filepathOfContainingFile), filepath );	// css文件的本地真实绝对路径
		var ret = path.relative( filepathToGetRelativeResult, localAbsoluteFilepath );
		return ret.replace(/\\/g, '/');
	}

	function textReplace(text, arr){
		arr = arr || [];
		arr.forEach(function(obj, index){
			text = text.replace(obj.from, function(){
				return obj.to(arguments[0], 0, '', Array.prototype.slice.call(arguments, 1));
			});
		});
		return text;
	}

	// event类型：added deleted renamed changed
	grunt.event.on('watch', function(action, filepath, target){
		filepath = filepath.replace(/\\/g, '/');
		grunt.log.writeln(grunt.file.isDir(target + ': ' + filepath)?'文件夹':'文件' + filepath + ' has ' + action);

		var destPath = filepath.replace($config.srcPath, $config.devPath);
		if(action==='deleted'){
			grunt.file.exists(destPath) && grunt.file.delete(destPath);
		}else{
			if(grunt.file.isDir(filepath)){
				copyDir(filepath, destPath);
			}else{
				grunt.file.copy(filepath, destPath);
			}
		}
	});


	grunt.task.registerTask('img_md5', function(){
		var files = grunt.file.expand('dist/**/*.{jpg,jpeg,bmp,png,gif,ico}');
		var map = {};
		files.forEach(function(file, index){
			var basename = path.basename(file);
			var oriFile = file.replace( basename, basename.replace(/^[^\.]+\./, '') );
			map[ path.relative('dist/', oriFile)] = path.relative('dist/', file);
			// map-> 源文件名：md5后的文件名
		});

		var cssFiles = grunt.file.expand('dist/**/*.css');
		cssFiles.forEach(function(cssFilePath, index){

			var cssFileContent = grunt.file.read(cssFilePath);
			
			cssFileContent = cssFileContent.replace(/url\(([^)]+)\)/g, function(matchedWord, imgUrl){
				var imgFileFullPath = path.resolve( path.dirname(cssFilePath), imgUrl );	// 将参数去掉	

				for(var originalImgPath in map){
					// console.log('originalImgPath:'+originalImgPath);
					if(imgFileFullPath.indexOf(originalImgPath)!=-1){
						// console.log('hello world!');
						return matchedWord.replace(path.basename(originalImgPath), path.basename(map[originalImgPath]) );
					}
				}
				return matchedWord;			
			});
			grunt.file.write(cssFilePath, cssFileContent);
		});

		var htmlFiles = grunt.file.expand('dist/**/*.html');
		htmlFiles.forEach(function(filepath){

			var fileContent = grunt.file.read(filepath);
			fileContent = textReplace(fileContent, [{
				// 图片路径
				from: /<img.+src=["']([^"']+)["'].*\/?\s*>/,
				to: function (matchedWord, index, fullText, regexMatches) {
					var src = regexMatches[0];
					var imgFileFullPath = getUrlRelativeToCertainFilepath(src, filepath, 'dist');
					// var imgFileFullPath = path.resolve( path.dirname(cssFilePath), imgUrl );	// 将参数去掉	
					if(matchedWord.match('data:') || grunt.file.isPathAbsolute(matchedWord) || matchedWord.match(/https?/)){
						return matchedWord;
					}else{
						for(var originalImgPath in map){
							// console.log('originalImgPath:'+originalImgPath);
							if(imgFileFullPath.indexOf(originalImgPath)!=-1){
								return matchedWord.replace(path.basename(originalImgPath), path.basename(map[originalImgPath]) );
							}
						}
						return matchedWord;
						// return matchedWord.replace(regexMatches[0], imgCDNRoot + regexMatches[0]);
					}
				}
			}]);
			grunt.file.write(filepath, fileContent);
		});
	});


	grunt.task.registerTask('toAbsolutePath', '将相对路径改成绝对路径', function(){

		var options = getJSON( $config.projConf );
		grunt.log.writeflags( options );

		var jsCDNRoot = options.cdnRoot.js + options.name + '/';
		var cssCDNRoot = options.cdnRoot.css + options.name + '/';
		var imgCDNRoot = options.cdnRoot.img + options.name + '/';
		var jsVersion = options.cdnVersion && (options.cdnVersion.js || options.cdnVersion.js.toString()===0) && options.cdnVersion.js;
		var cssVersion = options.cdnVersion && (options.cdnVersion.css || options.cdnVersion.css.toString()===0) && options.cdnVersion.css;
		
		grunt.log.debug('将相对路径改成绝对路径！-----------------------');

		var htmlFiles = grunt.file.expand($config.distPath+'**/*.html');
		htmlFiles.forEach(function(filepath, index){
			var fileContent = grunt.file.read(filepath);	// html文件内容

			fileContent = textReplace(fileContent, [{
				// 替换script路径
				from: /<script(.+)src=["'](([^\/]+)\/([^"']+))["']/g,
				to: function (matchedWord, index, fullText, regexMatches) {

					var src = regexMatches[1],
						ret = '';

					grunt.log.debug('HTML replace: find a <script> in '+filepath);
					grunt.log.debug('matchedWord: ' + matchedWord);
					grunt.log.debug('index: ' + index);
					// grunt.log.debug('regexMatches: ' + regexMatches);
					grunt.log.debug('before replace: '+ matchedWord);

					if(src.match(/^https?/)){
						grunt.log.debug('绝对路径，不进行替换！');
						ret = matchedWord;
					}else{
						ret = ('<script'+ regexMatches[0] + 'src="' + jsCDNRoot + src + '"')

						if(jsVersion){
							ret = ret.replace(/\/js\//, '/js/'+jsVersion+'/');
						}
						
					}
					grunt.log.debug('after replace: '+ret + '\n');
					
					return ret;					
				}
			}, {
				from: /<link(.+)href=["']([^"']+)["']/g,
				to: function (matchedWord, index, fullText, regexMatches) {
					var href = regexMatches[1],
						ret = '';

					grunt.log.debug('HTML replace: find a <link> in '+filepath);
					grunt.log.debug('matchedWord: ' + matchedWord);
					grunt.log.debug('index: ' + index);
					// grunt.log.debug('regexMatches: ' + regexMatches);
					grunt.log.debug('before replace: '+ matchedWord);

					if(href.match(/^https?/)){
						grunt.log.debug('绝对路径，不进行替换！');
						ret = matchedWord;
					}else{
						
						ret = ('<link'+ regexMatches[0] + 'href="' + cssCDNRoot + href + '"');

						if(cssVersion){
							ret = ret.replace(/\/css\//, '/css/'+cssVersion+'/');
						}
					}
					grunt.log.debug('after replace: '+ret + '\n');
					
					return ret;							
				}
			}, {
				// 图片路径
				from: /<img.+src=["']([^"']+)["'].*\/?\s*>/g,
				to: function (matchedWord, index, fullText, regexMatches) {
					if(matchedWord.match('data:') || grunt.file.isPathAbsolute(matchedWord) || matchedWord.match(/https?/)){
						return matchedWord;
					}else{
						var src = regexMatches[0];
						var imgFileFullPath = getUrlRelativeToCertainFilepath(src, filepath, 'dist');
						// return 	imgCDNRoot + imgFileFullPath;
						return matchedWord.replace(regexMatches[0], imgCDNRoot + imgFileFullPath);
					}
				}
			}, {
				// data-main="modules/index/js/cb10.index"
				from: /(data\-main\=["'])([^"']+)(["'])/g,
				to: function(matchedWord, index, fullText, regexMatches) {
					if(matchedWord.match('data:') || grunt.file.isPathAbsolute(matchedWord) || matchedWord.match(/https?/)){
						return matchedWord;
					}
					var ret = (regexMatches[0] + jsCDNRoot + regexMatches[1] + regexMatches[2])
					
					if(jsVersion){
						ret = ret.replace(/\/js\//, '/js/'+jsVersion+'/');
					}

					return ret;
				}
			}]);
			grunt.file.write(filepath, fileContent);
		});
	});

	grunt.task.registerTask('ignore', '移除ignore文件', function(){

		var htmlFiles = grunt.file.expand($config.distPath+'**/ignore.*.html');
		htmlFiles.forEach(function(filepath, index){
			console.info('delete the ignore file: '+filepath);
			grunt.file.delete(filepath);
		});
	});

    grunt.registerTask('_dev', [
        'clean:dev',
        'concurrent:dev',
        'watch'
    ]);

    grunt.registerTask('_dist', [
        'clean:dist',

        'clean:tmp',
        'concurrent:tmp',
        
        'useminPrepare',
        'concurrent:dist',  // css文件编译、html、css、img拷贝

        'inline:dist',  // 资源内嵌
        'requirejs',    // 打包合并
        'concat',   // 合并文件
        'ignore',
        // 'rev',
        'usemin',   // 修改html页面里的静态资源路径，配置rev
        // 'img_md5',
        'cdn:dist', // 将相对路径修改为CDN路径
        // 'toAbs' // 将html页面的js、css路径替换成绝对路径
        'toAbsolutePath'
    ]);

    grunt.registerMultiTask('dev', "dev", function () {
    	grunt.task.run('_dev');
	});
    
	grunt.registerMultiTask('dist', "dist", function () {
    	grunt.task.run('_dist');
	});

    grunt.registerTask('default', ['dev']);

	// grunt.task.loadTasks('third-party/grunt-usemin/tasks/');
	// grunt.task.loadTasks('third-party/grunt-cdn/tasks/');
};
