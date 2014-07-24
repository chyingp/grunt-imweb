module.exports = function(grunt) {
    grunt.config.merge({
        compass: {
            options: {
                noLineComments: true
            },
            tmp: {
                options: {
                    sassDir: '<%= proj.src%>',
                    cssDir: '<%= proj.tmp %>/'
                }
            },
            dev: {
                options: {
                    noLineComments: false,
                    sassDir: '<%= proj.src %>',
                    cssDir: '<%= proj.dev %>'
                }
            }
        }
    });
};