$.register({
  rule: 'http://www.lienscash.com/l/*',
  ready: function () {
    'use strict';

    var a = $('#redir_btn');
    $.openLink(a.href);
  },
});
