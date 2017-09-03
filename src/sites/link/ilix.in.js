_.register({
  rule: {
    host: /^(www\.)?(ilix\.in|priva\.us)$/,
    path: /\/(\w+)/,
  },
  async ready (m) {
    const realHost = 'ilix.in';

    // If broken domain then redirect to real domain
    if (m.host[2] !== realHost) {
      const realURL = location.href.replace(m.host[2], realHost);
      await $.openLink(realURL);
      return;
    }

    // Iframe redirection
    const f = $.$('iframe[name=ifram]');
    if (f) {
      await $.openLink(f.src);
      return;
    }

    // Captcha not supported
    if (!$.$('img#captcha')) {
      // Auto-submit
      $('form[name=frm]').submit();
    }
  },
});
