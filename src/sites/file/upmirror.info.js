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

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
