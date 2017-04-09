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
