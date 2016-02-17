module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/main/*.js'],
                dest: 'dist/js/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                mangle: true
            },
            dist: {
                files: {
                    'dist/js.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        cssmin: {
            dist: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
                },
                files: {
                    'dist/css.min.css': ['src/**/*.css']
                }
            }
        },
        uncss: {
            dist: {
                options: {
                    ignore: [/js-.+/, '.special-class'],
                    ignoreSheets: [/fonts.googleapis/]
                },
                files: {
                    'dist/css/unused-removed.css': ['src/index.html', 'src/contact.html', 'src/service.html']
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: '*.html',
                    dest: 'dist/'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);

};