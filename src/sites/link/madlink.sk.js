$.register({
  rule: [
    'http://madlink.sk/',
    'http://madlink.sk/*.html',
  ],
});

$.register({
  rule: 'http://madlink.sk/*',
  start: function (m) {
    'use strict';

    $.removeNodes('iframe');
    $.post('/ajax/check_redirect.php', {
      link: m[1],
    }).then(function (text) {
      $.openLink(text);
    });
  },
});
