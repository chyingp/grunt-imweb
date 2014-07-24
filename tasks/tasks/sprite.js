// JavaScript Document

module.exports = function(grunt){
	
	grunt.task.registerTask('sprite', '生成雪碧图', function(){
		grunt.log.writeln("生成雪碧图");
		var fs=require("fs");
		var conf,spriterConf;
		try{
			var confStr=fs.readFileSync(__dirname+"/conf.json",{encoding:"utf8"});
			
			if(confStr){
				//confStr=confStr.replace(/\/\*[\s\S]+?\*\//g,"");
				//console.log(confStr);
				var stripJson=require("strip-json-comments");
				confStr=stripJson(confStr);
				conf=JSON.parse(confStr);
				spriterConf=JSON.parse(confStr);
				//console.log("conf",conf);
			}
		}catch(ex){
			console.log("read conf file error!");
			console.log(confStr);
			console.log(ex);
			return;
		}

		var done = this.async();

		var spriter=require("imweb_ispriter2");
		
		var cssSources=conf.input.cssSource;
		var cssDists=conf.output.cssDist;
		
		var allFiles=[];
		var allDists=[];
		for(var i=0;i<cssSources.length;i++){
			var files=grunt.file.expand(cssSources[i]);
			for(var j=0;j<files.length;j++){
				allFiles.push(files[j]);//
				var cssDist=cssDists[i];
				allDists.push(cssDist);
			}
		}
			
		console.log(allFiles);

		var done_num=0;
		
		function taskDone(){
			if(done_num>=allFiles.length){
				grunt.log.writeln("雪碧图done");
				done();
			}
			else{
				doTask();
			}
		}
		
		var doTask=function(){
			var p=done_num;

			done_num++;
			console.log("done1:"+p);
			spriterConf.input.cssSource=allFiles[p];
			
			var cssDist=allDists[p];
			
			spriterConf.output.cssDist=cssDist;
			spriter(spriterConf,taskDone);
		}
		
		//逐个执行
		doTask();
	});

};
