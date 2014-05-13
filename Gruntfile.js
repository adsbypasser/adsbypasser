module.exports = function (grunt) {
  'use strict';

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
    clean: ['dest'],
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

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('default', ['clean', 'strip', 'concat']);
  grunt.registerTask('test', 'mochaTest');

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
