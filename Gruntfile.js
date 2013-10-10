module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sites: {
      split: {
        src: ['src/util/config.js', 'src/sites/*.js'],
        dest: 'dest/sites',
      },
      strip: {
        src: ['src/util/*.js'],
        dest: 'dest/util',
      },
    },
    concat: {
      metadata: {
        options: {
          banner: '// ==UserScript==\n' + grunt.file.read('src/util/metadata.js'),
          footer: '\n// ==/UserScript==\n',
        },
        src: ['dest/sites/*.metadata.js'],
        dest: 'dest/metadata.js',
      },
      script: {
        src: ['dest/util/core.js', 'dest/util/dom.js', 'dest/sites/*.script.js'],
        dest: 'dest/script.js',
      },
      nopicads: {
        src: ['dest/metadata.js', 'dest/script.js'],
        dest: 'dest/nopicads.user.js',
      },
    },
    clean: ['dest'],
    mochaTest: {
      test: {
        src: ['test/**/*.js'],
      },
    },
  });

  grunt.registerMultiTask('sites', function () {
    var handler = {

      split: function () {
        this.files.forEach(function (f) {
          grunt.file.mkdir(f.dest);

          f.src.forEach(function (filepath) {
            var basename = baseName(filepath);
            var metadata_file = f.dest + '/' + basename + '.metadata.js';
            var script_file = f.dest + '/' + basename + '.script.js';

            var source = grunt.file.read(filepath);
            var m = source.match(/\/\/ ==UserScript==([\s\S]*)\/\/ ==\/UserScript==([\s\S]*)/m);
            var metadata = m[1].trim();
            var script = removeModelines(m[2]);
            script = removeSingleLineComments(script);
            script = removeEmptyLines(script);
            script = script.trim();

            grunt.file.write(metadata_file, metadata);
            grunt.file.write(script_file, script);
          });
        });
      },

      strip: function () {
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
      },

    };

    handler[this.target].call(this);
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('default', ['clean', 'sites', 'concat:metadata', 'concat:script', 'concat:nopicads']);
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
