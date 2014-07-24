module.exports = function(grunt) {
    var path = require('path');
    grunt.task.registerTask('velocity', 'velocity_complier', function(type){
        //return;

        if (type== 'dist') {
            console.log('velocity copy start....');
            var htmlFiles = grunt.file.expand(grunt.template.process('<%= proj.src %>/vm/*.vm'));
            htmlFiles.forEach(function(filepath){

                var rawTmpl = grunt.file.read(filepath, {encoding: 'utf8'});
                rawTmpl = rawTmpl.replace(/xinline\((.*)\)/g, function (match, $1) {
                    var inlineText = match;
                    try {
                        inlineText = grunt.file.read(path.dirname(filepath) + '/'+ $1, {encoding: 'utf8'});
                    } catch (e) {

                    }
                    return inlineText;
                });

                // grunt.file.write(grunt.template.process('<%= proj.src %>/') + filepath.match(/\/([^\/]+)\.vm$/)[1] + '.html', rawTmpl, {encoding: 'utf8'});
                grunt.file.write(grunt.template.process('<%= proj.tmp %>/') + filepath.match(/\/([^\/]+)\.vm$/)[1] + '.vm', rawTmpl, {encoding: 'utf8'});

            });

            console.log('velocity copy end....');
            return;
        }

        try {
            var engine = require('velocityjs');
        } catch (e) {

            console.log(e.message);

            return;
        }

        if (type == 'dev') {
            console.log('velocity compiler start....');

            var htmlFiles = grunt.file.expand(grunt.template.process('<%= proj.src %>/vm*/*.vm'));
            htmlFiles.forEach(function(filepath){
                var dataPath = filepath.replace(/vm$/, 'data');
                if (grunt.file.exists(dataPath)) {
                    //console.log(new Date - 0, dataPath);

                    var json = grunt.file.readJSON(dataPath, {encoding: 'utf8'});

                    json.date = {
                        format : function(pattern,date){

                            date = new Date(date);

                            function formatNumber(data,format){//3
                                format = format.length;
                                data = data || 0;
                                return format == 1 ? data : String(Math.pow(10,format)+data).slice(-format);
                            }

                            return pattern.replace(/([YMdHsm])\1*/g,  function(format){
                                switch(format.charAt()){
                                    case 'Y' :
                                        return formatNumber(date.getFullYear(),format);
                                    case 'M' :
                                        return formatNumber(date.getMonth()+1,format);
                                    case 'd' :
                                        return formatNumber(date.getDate(),format);
                                    case 'w' :
                                        return date.getDay()+1;
                                    case 'H' :
                                        return formatNumber(date.getHours(),format);
                                    case 'm' :
                                        return formatNumber(date.getMinutes(),format);
                                    case 's' :
                                        return formatNumber(date.getSeconds(),format);
                                }
                            });
                        }
                    }

                    json.escape = {
                        html : function(str){return str;}
                    }

                    var rawTmpl = grunt.file.read(filepath, {encoding: 'utf8'});
                    rawTmpl = rawTmpl.replace(/xinline\((.*)\)/g, function (match, $1) {
                        var inlineText = match;
                        try {
                            //console.log($1);
                            inlineText = grunt.file.read(path.dirname(filepath) + '/'+ $1, {encoding: 'utf8'});
                        } catch (e) {
                             console.log(e);
                        }
                        console.log(inlineText);
                        return inlineText;
                    });
                    var html = engine.render(rawTmpl, json);
                    console.log('velocity:dev target is: '+grunt.template.process('<%= proj.dev %>/') + filepath.match(/\/([^\/]+)\.vm$/)[1] + '.html');
                    grunt.file.write(grunt.template.process('<%= proj.dev %>/') + filepath.match(/\/([^\/]+)\.vm$/)[1] + '.html', html, {encoding: 'utf8'});
                }
            });
            console.log('velocity compiler end....');
        }

    });
};