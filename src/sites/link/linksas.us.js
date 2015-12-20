$.register({
  rule: {
    host: /^linksas\.us$/,
    path: /^(\/\w+)$/,
  },
  ready: function (m) {
    'use strict';

    var token = $.getCookie('XSRF-TOKEN');
    var payload = JSON.stringify({
      ipAddress: $.generateRandomIP(),
      country: '',
      recaptcha: '',
    });

    $.post('/go' + m.path[1], payload, {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': token,
    }).then(function (data) {
      data = JSON.parse(data);
      $.openLink(data.message);
    }).catch(function (e) {
      _.warn(e);
    });
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
