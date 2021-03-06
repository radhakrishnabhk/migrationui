//Gruntfile
module.exports = function(grunt) {

  // requirejs compile options
  var compileOptions = {
      mainConfigFile: 'app/main.js',
      baseUrl: 'app',
      include: ['main'],
      out: 'dist/main.min.js',
      removeCombined: false,
      findNestedDependencies: true,

      //Removes console.logs for production
      onBuildWrite: function (moduleName, path, contents) {
          if(/(.*)js\/modules\/(.*)/.test(path)) return contents.replace(/console.log(.*);/g, ';');
          return contents;
      }
  };

  //Initializing the configuration object
  grunt.initConfig({
    // Task server
    //pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
            port: 3030, // custom port
            base: 'app/', // current directory for 'index.html' is root
            keepalive: true, // keep the server alive indefinitely
            open: {
              target: 'http://localhost:3030',
            }
          }
        }
    },
    // Jasmine
    jasmine: {
      src: ['app/**/*.js', '!**/assets/vendor/**', '!**/main.js'],
      specs: 'specs/**/*Spec.js'
    },
    // Task configuration
    // less: {
    //     development: {
    //         options: {
    //           compress: false,  // no minification in dev
    //         },
    //         files: {
    //           //compiling base.less into styles.css
    //           "./app/assets/css/styles.css":"./app/assets/css/base.less"
    //         }
    //     },
    //     production: {
    //       options: {
    //         cleancss: true, // minify css
    //         // compress: true, // minify css
    //       },
    //       files: {
    //         //compiling base.less into main.min.css
    //         "./dist/main.min.css": "./app/assets/css/base.less"
    //       }
    //     }
    // },
    sass:{
      dist:{
        options:{

        },
        files:{
          "./app/assets/css/main.css":'./app/assets/css/base.scss',
          "./app/assets/css/style.css":'./app/assets/css/customstyle.scss'
        }
      },dev: {
        options: {
          style: 'expanded'
        },
        files: {
          "./app/assets/css/main.css":'./app/assets/css/base.scss',
          "./app/assets/css/style.css":'./app/assets/css/customstyle.scss'
        }
      }
    },
    requirejs: {
        compile: {
            options : compileOptions
        },
        paths: {
          handlebars: "../vendor/js/libs/handlebars.runtime"
        }
    },
    auto_install: {
      local: {}
      
    },
    watch: {
        // less: {
        //     // Watch all .less files from the styles directory)
        //     files: ['app/assets/css/*.less'],
        //     tasks: ['less'],
        //     // Reloads the browser
        //     options: {
        //       livereload: true  
        //     }
        // },
        scss:{
          files: ['app/assets/css/*.scss'],
          tasks: ['sass'],
          // Reloads the browser
          options: {
            livereload: true  
          }
        },
        requirejs: {
            // Watch only main.js so that we do not constantly recompile the .js files
            files: [ 'app/main.js' ],
            tasks: [ 'requirejs' ],
            // Reloads the browser
            options: {
              livereload: true  
            }
        },
     },
     handlebars: {
      "dist/templates.js": ["app/templates/*.html"]
    },
   
    
  });

  // Plugin loading
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-auto-install');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  // Task definition
  grunt.registerTask('default', ['sass','auto_install','handlebars']);
  grunt.task.run('default');
};
