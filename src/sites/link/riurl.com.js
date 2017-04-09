$.register({
  rule: {
    host: /^riurl\.com$/,
    path: /^\/.+/,
  },
  ready: function () {
    'use strict';

    var s = $.$('body script');
    if (s) {
      s = s.innerHTML.indexOf('window.location.replace');
      if (s >= 0) {
        // let inline script redirect
        return;
      }
    }
    $.openLink('', {
      path: {
        hidden: '1',
        image: ' ',
      },
    });
  },
});
