$.register({
  rule: {
    host: /^cl\.my$/,
  },
  ready: function () {
    'use strict';

    unsafeWindow.document.body.onload = null;
    unsafeWindow.document.body.onunload = null;

    var content = $.$$('script').find(function (script) {
      return script.innerHTML.indexOf('callAjax') >= 0;
    });
    var matches = content.innerHTML.match(/'id': '([^']+)'/);
    content = matches[1];

    unsafeWindow.$.post('get_security_status.html', {
      context: 'url',
      cmd: 'chk',
      id: content,
    }, function (data) {
      $.openLink(data.data.u);
    }, 'json');
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
