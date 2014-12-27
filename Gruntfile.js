module.exports = function(grunt) {

    var myconfig = {
        sourcepath: "assets/",
        targetpath: "dist/",
    };
    var sourcejs = [
        myconfig.sourcepath + "js/jquery-1.11.2.min.js",
        myconfig.sourcepath + "js/bootstrap.min.js",
    ];
    var sourcecss = [
        //myconfig.sourcepath + "css/bootstrap.css",
        myconfig.sourcepath + "css/main.css"
    ];
    var sourceless = [
        myconfig.sourcepath + "less/*.less"
    ];

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        //编译less
        less: {
            devolopment: {
                options: {

                },
                files: {
                    "assets/css/main.css": "assets/less/*.less"
                }
            }
        },

        uglify: {

            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: {
                    "dist/js/ghymovie.min.js": sourcejs
                }
            }
        },
        //合并压缩css
        cssmin: {
            options: {
                keepSpecialComments:0,

            },
            combine: {
                options:{
                    banner:"/*ghymovie BY Cookie MIT*/"
                },
                files: {
                    "dist/css/ghymovie.min.css": sourcecss
                }
            }

        },
        watch:{
            js:{
                files:sourcejs,
                tasks:['uglify']
            },
            css:{
                files:sourceless,
                tasks:['less','cssmin']
            }
        }
    });
    //console.log(sourcejs);
    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-contrib-watch');

    // 默认被执行的任务列表。
    grunt.registerTask('default', ['less', 'cssmin', 'uglify','watch']);

};