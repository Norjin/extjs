'use strict';

module.exports = function(grunt) {

  //loading all tasks from plugins
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  //starting to config
  grunt.initConfig({
    clean: {
      dist: ['client/dist'],
      doc: ['public/apidoc', 'public/cov', 'public/doc'],
      public: ['public/css', 'public/js', 'public/images']
    },

    connect: {
      static: {
        options: {
          host: 'localhost',
          base: 'public',
          livereload: 1337,
          port: 9001
        }
      },
      server: {
        proxies: [
          {
            context: '/v1',
            host: 'localhost',
            port: 9292
          },
          {
            context: '/',
            host: 'localhost',
            port: 9001
          },
        ],
        options: {
          port: 9000,
          middleware: function (connect, options) {
            var middlewares=[];
            middlewares.push(require('connect-livereload')({port: 1337})),
            // Serve static files.
            connect.static(options.base[0])
            middlewares.push(require('grunt-connect-proxy/lib/utils').proxyRequest);
            return middlewares;
          }
        }
      }
    },

    sass: {
      dist: {
        options: {
          style: 'expanded',
          lineNumbers: true
        },
        files: [{
          expand: true,
          cwd: 'client/assets/scss',
          src: ['*.scss'],
          dest: 'public/css',
          ext: '.css'
        }]
      }
    },

    stylus: {
      options: {
        compress: true
      },
      compile: {
        files: [{
          expand: true,
          cwd: 'client/assets/stylus',
          src: ['*.styl'],
          dest: 'public/css',
          ext: '.css'
        }]
      }
    },

    cssmin: {
      all: {
        expand: true,
        cwd: 'public/css',
        src: ['*.css'],
        dest: 'client/dist/css',
        ext: '.css'
      }
    },

    uglify: {
      options: {
        mangle: true,
        preserveComments: false,
        compress: {
          drop_console: true
        }
      },
      all: {
        files: [{
          expand: true,
          cwd: 'public/js',
          src: '**/*.js',
          dest: 'client/dist/js',
          ext: '.js'
        }]
      }
    },

    copy: {
      images: {
        expand:true,
        cwd: 'client/assets/images',
        src: ['**'],
        dest: 'public/images'
      },
      vendor: {
        expand:true,
        cwd: 'client/vendor',
        src: ['**'],
        dest: 'public/vendor'
      },
      doc: {
        expand:true,
        cwd: 'doc/',
        src: ['**'],
        dest: 'public/apidoc'
      },
      html: {
        src: 'public/index.html',
        dest: 'client/dist/index.html'
      },
      swagger: {
        expand:true,
        cwd: 'bower_components/swagger-ui/dist/',
        src: ['**','!index.html'],
        dest: 'public/apidoc'
      }
    },

    shell: {
      options: {
        stderr: 'inherit'
      },
      test: {
        command: 'rspec .'
      },
      backend: {
        command: 'rubocop',
        options: {
          stdout: 'inherit'
        },
      },
      coverage: {
        command: 'COV=true rspec .'
      }
    },

    concat: {
      app: {
        src: [
          'client/app/**/*.js',
          '!client/app/app.js',
          'client/app/app.js',
        ],
        dest: 'public/app/app.js'
      }
    },

    filerev: {
      all: {
        src: 'client/dist/**/*.{jpg,jpeg,gif,png,webp,css,js}'
      }
    },

    userev: {
      options: {
        hash: /(\.[a-f0-9]{8})\.[a-z]+$/,
      },
      images: {
        src: [
          'client/dist/index.html',
          'client/dist/css/*.css'
        ],
        options: {
          patterns: {
            'versioned image assets': /(images\/[a-z0-9.-]*\.(jpg|png|jpeg|gif))/,
          }
        }
      },
      css: {
        src: [
          'client/dist/index.html',
          'client/dist/*.js'
        ],
        options: {
          patterns: {
            'versioned css assets': /(css\/[a-z0-9.-]*\.css)/,
          }
        }
      },
      js: {
        src: [
          'client/dist/index.html'
        ],
        options: {
          patterns: {
            'versioned javascript assets': /(js\/[a-z0-9.-]*\.js)/,
          }
        }
      }
    },

    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        jshintrc: '.jshintrc'
      },
      app: ['client/app/**/*.js'],
    },

    jsduck : {
      all: {
        src: [
          'client/app/**/*.js'
        ],
        dest: 'public/doc',
        options: {
          'external': ['XMLHttpRequest']
        }
      }
    },

    watch: {
      options: {
        livereload: 1337
      },
      sass: {
        files: 'client/assets/scss/**/*.scss',
        tasks: ['sass']
      },
      stylus: {
        files: 'client/assets/stylus/**/*.styl',
        tasks: ['stylus']
      },
      appScripts: {
        files: 'client/app/**/*.js',
        tasks: ['concat:app']
      }
    },

    jscs: {
      src: "client/app/**/*.js",
      options: {
        config: ".jscsrc"
      }
    },

    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['-a'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
      }
    }
  });

  grunt.registerTask('doc', [
    'clean:doc',
    'copy:doc',
    'shell:coverage',
    'copy:swagger',
    'jsduck',
    'connect:static',
    'configureProxies:server',
    'connect:server',
    'watch'
  ]);

  grunt.registerTask('test', [
    'shell:test'
  ]);

  grunt.registerTask('check:backend', [
    'shell:backend'
  ]);

  grunt.registerTask('check:front', [
    'jscs',
    'jshint:app'
  ]);

  grunt.registerTask('check', [
    'shell:backend',
    'jscs',
    'jshint:app'
  ]);

  grunt.registerTask('default', [
    'clean:dist',
    'clean:public',
    'sass',
    'stylus',
    'copy:images',
    'copy:vendor',
    'concat:app'
  ]);

  grunt.registerTask('build',[
    'default',
    'copy:html',
    'cssmin',
    'uglify',
    'filerev',
    'userev',
    'clean:tmp'
  ]);

  grunt.registerTask('server', ['default', 'connect:static', 'configureProxies:server', 'connect:server', 'watch' ]);

};
