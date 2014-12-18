module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({

    // Copy FontAwesome files to the fonts/ directory
    copy: {
      fonts: {
        src: 'bower_components/font-awesome/fonts/**',
        dest: 'fonts/',
        flatten: true,
        expand: true
      }
    },

    // Pre-compile Handlebars templates
    handlebars: {
      options: {
        processName: function(filePath) {
          var path = filePath.toLowerCase(),
          pieces = path.split("/");
          return pieces[pieces.length - 1].split(".")[0];
        }
      },
      compile: {
        files: {
          "build/templates.js": "src/templates/**.hbs"
        }
      }
    },

    // Transpile LESS
    less: {
      options: {
        sourceMap: true,
        paths: ['bower_components/bootstrap/less']
      },
      prod: {
        options: {
          compress: true,
          cleancss: true
        },
        files: {
          "dist/style.css": "src/less/style.less"
        }
      }
    }

  });

  // Load the task plugins
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-handlebars');

  grunt.registerTask('default', ['copy', 'handlebars', 'less']);

};
