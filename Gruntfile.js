module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sites: {
      split: {
        src: ['src/sites/*.js'],
        dest: 'dest/sites',
      },
      strip: {
        src: ['src/utils/*.js'],
        dest: 'dest/utils',
      },
    },
    concat: {
      metadata: {
        options: {
          banner: '// ==UserScript==\n' + grunt.file.read('src/utils/metadata.js'),
          footer: '\n// ==/UserScript==\n',
        },
        src: ['dest/sites/*.metadata.js'],
        dest: 'dest/metadata.js',
      },
      script: {
        src: ['dest/utils/sugar.js', 'dest/utils/dom.js', 'dest/sites/*.script.js'],
        dest: 'dest/script.js',
      },
      nopicads: {
        src: ['dest/metadata.js', 'dest/script.min.js'],
        dest: 'dest/nopicads.user.js',
      },
      debug: {
        src: ['dest/metadata.js', 'dest/script.js'],
        dest: 'dest/nopicads.debug.js',
      },
    },
    uglify: {
      script: {
        src: 'dest/script.js',
        dest: 'dest/script.min.js',
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
            var script = removeModelines(m[2]).trim() + '\n';

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
            var script = removeModelines(source).trim() + '\n';

            grunt.file.write(script_file, script);
          });
        });
      },

    };

    handler[this.target].call(this);
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['sites', 'concat:metadata', 'concat:script', 'uglify', 'concat:nopicads']);
  grunt.registerTask('debug', ['sites', 'concat:metadata', 'concat:script', 'concat:debug']);

  function removeModelines (s) {
    return s.replace(/^\/\/\s*.+:.*[\r\n]/gm, '');
  }

  function baseName (s) {
    var m = s.match(/([^\/]+)\.js$/);
    return m[1];
  }

};

// vim: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
