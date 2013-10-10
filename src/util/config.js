// ==UserScript==
// @match          http://legnaleurc.github.io/nopicads/configure.html
// ==/UserScript==

$.register({
  rule: {
    host: /^legnaleurc\.github\.io$/,
  },
  run: function () {
    'use strict';

    unsafeWindow.commit = function (data) {
      data.version = $.config.version;
      _.C(data).each(function (v, k) {
        $.config[k] = v;
      });
      // protection hack
      setTimeout(function () {
        save(data);
      }, 0);
    };

    unsafeWindow.render({
      version: $.config.version,
      options: {
        alignCenter: {
          type: 'checkbox',
          value: $.config.alignCenter,
          label: 'Align Image',
          help: 'If this is enabled, NoPicAds will align image to the center and change background color if possible. (default: enabled)',
        },
        redirectImage: {
          type: 'checkbox',
          value: $.config.redirectImage,
          label: 'Redirect Image',
          help: 'If this is enabled, NoPicAds will open target image if possible. (default: enabled)',
        },
      },
    });

  },
});

// vim: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
