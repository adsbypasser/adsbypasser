$.register({
  rule: {
    host: /^(www\.)?upmirror\.info$/,
  },
  ready: function () {
    'use strict';

    // We set it everywhere to avoid a potential page reload (this is unset each time the user accesses a download page)
    $.setCookie('user', 'ppp');

    // If we are on the waiting page, reload
    if ($.$('#countDownText')) {
        $.openLink(document.location.toString());
    }
  },
});
