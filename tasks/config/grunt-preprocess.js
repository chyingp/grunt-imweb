module.exports = function(grunt) {
    grunt.config.merge({
        preprocess: {
            tmp: {
                options: {
                    context: {
                        DIST_MODE: '<%= other.distMode %>',
                        EVN_TAG: '<%= other.EVN_TAG %>',
                        BUILD_TIME: '<%= other.BUILD_TIME %>'
                    }
                },
                files:[
                    {expand:true, cwd:'<%= proj.tmp %>', src:['**/*.html', 'js/common/inline.dist_mode.js', 'js/common/proj_cfg.js'], dest:'<%= proj.tmp %>'}
                ]
            }
        }
    });
}; 