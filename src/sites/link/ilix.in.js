$.register({
  rule: {
    host: /^(www\.)?(ilix\.in|priva\.us)$/,
    path: /\/(\w+)/,
  },
  ready: function (m) {
    'use strict';

    var realHost = 'ilix.in';

    // If broken domain then redirect to real domain
    if (m.host[2] !== realHost) {
      var realURL = location.href.replace(m.host[2], realHost);
      $.openLink(realURL);
      return;
    }

    // Iframe redirection
    var f = $.$('iframe[name=ifram]');
    if (f) {
      $.openLink(f.src);
      return;
    }

    // Captcha not supported
    if (!$.$('img#captcha')) {
      // Auto-submit
      $('form[name=frm]').submit();
    }
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
