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
      sites: {
        src: ['src/sites/*/*.js'],
        dest: 'dest/sites',
      },
    },
    concat: {
      meta: {
        options: {
          banner: '// ==UserScript==\n',
          footer: '// ==/UserScript==\n',
          process: true,
        },
        src: ['src/util/metadata.js'],
        dest: 'dest/nopicads.meta.js',
      },
      user: {
        src: ['dest/nopicads.meta.js', 'dest/util/core.js', 'dest/util/dom.js', 'dest/sites/*.js', 'src/util/main.js'],
        dest: 'dest/nopicads.user.js',
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
        userjs: 'dest/nopicads.user.js',
        metajs: 'dest/nopicads.meta.js',
      },
    },
  });

  grunt.registerMultiTask('strip', function () {
    this.files.forEach(function (f) {
      grunt.file.mkdir(f.dest);

      f.src.forEach(function (filepath) {
        var script_file = f.dest + '/' + baseName(filepath) + '.js';

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
      cmd: 'deploy/summary.py',
    }, function (error, result, code) {
      if (error) {
        throw error;
      }
      done();
    });
  });

  grunt.registerTask('ghpages', function () {
    var options = this.options();
    var rootPath = 'deploy/ghpages/contents';
    var releasePath = path.join(rootPath, 'releases');
    var outPath = 'dest/nopicads';
    var done = this.async();

    // copy summary
    grunt.file.copy(options.summary, path.join(rootPath, path.basename(options.summary)));
    // copy compiled files
    grunt.file.copy(options.userjs, path.join(releasePath, path.basename(options.userjs)));
    grunt.file.copy(options.metajs, path.join(releasePath, path.basename(options.metajs)));

    var env = wintersmith(options.config);
    env.build(outPath, function (error) {
      if (error) {
        throw error;
      }

      // clean files
      grunt.file.delete(path.join(rootPath, path.basename(options.summary)));
      grunt.file.delete(path.join(releasePath, path.basename(options.userjs)));
      grunt.file.delete(path.join(releasePath, path.basename(options.metajs)));

      done();
    });
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('default', ['clean', 'strip', 'concat']);
  grunt.registerTask('test', 'mochaTest');
  grunt.registerTask('deploy', ['default', 'summary', 'ghpages']);

  function removeModelines (s) {
    return s.replace(/^\/\/\s*.+:.*[\r\n]+/gm, '');
  }

  function removeSingleLineComments (s) {
    return s.replace(/^\s*\/\/.*[\r\n]+/gm, '');
  }

  function removeEmptyLines (s) {
    return s.replace(/^\s*[\r\n]+/gm, '');
  }

  function baseName (s) {
    var m = s.match(/([^\/]+)\.js$/);
    return m[1];
  }

};


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
