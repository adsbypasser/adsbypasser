module.exports = function (grunt) {
  'use strict';

  var wintersmith = require('wintersmith');
  var os = require('os');
  var path = require('path');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    strip: {
      util: {
        src: ['src/util/core.js', 'src/util/dom.js'],
        dest: 'dest/util',
      },
      link_sites: {
        src: ['src/sites/link/*.js'],
        dest: 'dest/sites/link',
      },
      image_sites: {
        src: ['src/sites/image/*.js'],
        dest: 'dest/sites/image',
      },
      file_sites: {
        src: ['src/sites/file/*.js'],
        dest: 'dest/sites/file',
      },
      paste_sites: {
        src: ['src/sites/paste/*.js'],
        dest: 'dest/sites/paste',
      },
    },
    concat: {
      meta: {
        options: {
          banner: '// ==UserScript==\n',
          footer: '// ==/UserScript==\n',
          process: {
            data: {
              pkg: grunt.file.readJSON('package.json'),
              lite: false,
            },
          },
        },
        src: ['src/util/metadata.js'],
        dest: 'dest/adsbypasser.meta.js',
      },
      lite_meta: {
        options: {
          banner: '// ==UserScript==\n',
          footer: '// ==/UserScript==\n',
          process: {
            data: {
              pkg: grunt.file.readJSON('package.json'),
              lite: true,
            },
          },
        },
        src: ['src/util/metadata.js'],
        dest: 'dest/adsbypasserlite.meta.js',
      },
      user: {
        src: [
          'dest/adsbypasser.meta.js',
          'dest/util/core.js',
          'dest/util/dom.js',
          'dest/sites/*/*.js',
          'src/util/main.js',
        ],
        dest: 'dest/adsbypasser.user.js',
      },
      lite_user: {
        src: [
          'dest/adsbypasserlite.meta.js',
          'dest/util/core.js',
          'dest/util/dom.js',
          'dest/sites/link/*.js',
          'dest/sites/file/*.js',
          'dest/sites/paste/*.js',
          'src/util/main.js',
        ],
        dest: 'dest/adsbypasserlite.user.js',
      },
    },
    clean: ['dest/sites', 'dest/util'],
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          require: 'tests/misc/coverage',
        },
        src: ['tests/*.js'],
      },
      coverage: {
        options: {
          reporter: 'html-cov',
          quiet: true,
          captureFile: 'dest/coverage.html',
        },
        src: ['tests/*.js'],
      },
    },
    ghpages: {
      options: {
        config: 'deploy/ghpages/config.json',
        summary: 'dest/summary.md',
        userjs: 'dest/adsbypasser.user.js',
        metajs: 'dest/adsbypasser.meta.js',
        lite_userjs: 'dest/adsbypasserlite.user.js',
        lite_metajs: 'dest/adsbypasserlite.meta.js',
      },
    },
  });

  grunt.registerMultiTask('strip', function () {
    this.files.forEach(function (f) {
      grunt.file.mkdir(f.dest);

      f.src.forEach(function (filepath) {
        var script_file = f.dest + '/' + path.basename(filepath);

        var source = grunt.file.read(filepath);
        var script = removeModelines(source);
        script = removeSingleLineComments(script);
        script = removeEmptyLines(script);
        script = script.trim() + '\n';

        grunt.file.write(script_file, script);
      });
    });
  });

  grunt.registerTask('summary', function () {
    var done = this.async();


    grunt.util.spawn({
      cmd: 'python2',
      args: ['-m', 'mirrors.summary'],
      opts: {
        cwd: 'deploy',
      },
    }, function (error, result, code) {
      if (error) {
        throw error;
      }
      done();
    });
  });

  grunt.registerTask('clone', function () {
    var done = this.async();
    var data = grunt.file.readJSON('.deploy.json');

    if (grunt.file.exists('dest/adsbypasser')) {
      done();
      return;
    }

    grunt.util.spawn({
      cmd: 'git',
      args: ['clone', data.ghpages.REPO, 'dest/adsbypasser'],
    }, function (error, result, code) {
      if (error) {
        throw error;
      }

      grunt.util.spawn({
        cmd: 'git',
        args: ['checkout', 'master'],
        opts: {
          cwd: 'dest/adsbypasser',
        },
      }, function (error, result, code) {
        if (error) {
          throw error;
        }

        done();
      });
    });
  });

  grunt.registerTask('ghpages', function () {
    var options = this.options();
    var rootPath = 'deploy/ghpages/contents';
    var releasePath = path.join(rootPath, 'releases');
    var outPath = 'dest/adsbypasser';
    var done = this.async();

    // copy summary
    grunt.file.copy(options.summary, path.join(rootPath, path.basename(options.summary)));
    // copy compiled files
    grunt.file.copy(options.userjs, path.join(releasePath, path.basename(options.userjs)));
    grunt.file.copy(options.metajs, path.join(releasePath, path.basename(options.metajs)));
    grunt.file.copy(options.lite_userjs, path.join(releasePath, path.basename(options.lite_userjs)));
    grunt.file.copy(options.lite_metajs, path.join(releasePath, path.basename(options.lite_metajs)));

    var env = wintersmith(options.config);
    env.build(outPath, function (error) {
      if (error) {
        throw error;
      }

      // clean files
      grunt.file.delete(path.join(rootPath, path.basename(options.summary)));
      grunt.file.delete(path.join(releasePath, path.basename(options.userjs)));
      grunt.file.delete(path.join(releasePath, path.basename(options.metajs)));
      grunt.file.delete(path.join(releasePath, path.basename(options.lite_userjs)));
      grunt.file.delete(path.join(releasePath, path.basename(options.lite_metajs)));

      done();
    });
  });

  grunt.registerTask('mirrors', function () {
    var done = this.async();

    grunt.util.spawn({
      cmd: 'python2',
      args: ['-m', 'mirrors'],
      opts: {
        cwd: 'deploy',
      },
    }, function (error, result, code) {
      if (error) {
        throw error;
      }
      done();
    });
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('default', ['clean', 'strip', 'concat']);
  grunt.registerTask('test', 'mochaTest');
  grunt.registerTask('deploy', ['default', 'summary', 'clone', 'ghpages']);
  grunt.registerTask('mirror', ['default', 'summary', 'mirrors']);

  function removeModelines (s) {
    return s.replace(/^\/\/\s*.+:.*[\r\n]*/gm, '');
  }

  function removeSingleLineComments (s) {
    return s.replace(/^\s*\/\/.*[\r\n]*/gm, '');
  }

  function removeEmptyLines (s) {
    return s.replace(/^\s*[\r\n]+/gm, '');
  }

};


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
