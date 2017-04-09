$.register({
  rule: {
    host: /^link(4ad|ajc)\.com$/,
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
