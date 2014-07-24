module.exports = function(grunt) {
    var path = require('path');
    grunt.config.merge({
        tplComplie:{
            options: {
				namespace: 'TmplInline',
				processName: function (filename){
					return path.basename(filename,".html");
				}
            },
            dev : {
                files: {
                  
                }
            },
            tmp : {
                files : {
                  
                }
            }
        }
    });
};