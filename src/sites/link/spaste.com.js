$.register({
  rule: {
    host: /^www\.spaste\.com$/,
    path: /^\/go\/\w+$/,
  },
  ready: function () {
    'use strict';

    var id = $.searchScripts(/\{id:'(\d+)'\}/);
    _.wait(2000).then(function () {
      return $.post('/site/getRedirectLink', {
        id: id,
      }).then(function (url) {
        $.openLink(url);
      });
    });
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
