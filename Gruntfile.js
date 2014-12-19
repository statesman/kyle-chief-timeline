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

    // Use Uglify to bundle up a pym file for the home page
    uglify: {
      homepage: {
        files: {
          'dist/scripts.js': [
            "src/data/timeline.js",
            "bower_components/jquery/dist/jquery.js",
            "bower_components/handlebars/handlebars.runtime.js",
            "src/js/helpers.js",
            "bower_components/imagesloaded/imagesloaded.pkgd.js",
            "bower_components/moment/moment.js",
            "bower_components/underscore/underscore.js",
            "build/templates.js",
            "src/js/script.js"
          ]
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
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['copy', 'uglify', 'handlebars', 'less']);

};
