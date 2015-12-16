$.register({
  rule: {
    host: /^link4ad\.com$/,
    path: /^\/(.+)$/,
  },
  ready: function (m) {
    'use strict';

    var d = $('div[id^=module_]');
    d = d.id.match(/module_(\d+)/);
    d = d[1];

    $.post('form.php?block_id=' + d, {
      cmd: 'get_source',
      act: 'waiting',
      id: m.path[1],
    }).then(function (url) {
      $.openLink(url);
    }).catch(function (e) {
      _.warn(e);
    });
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
