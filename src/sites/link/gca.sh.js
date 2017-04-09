(function () {

  const hosts = /^gca\.sh|repla\.cr$/;

  _.register({
    rule: {
      host: hosts,
      path: /^\/adv\/\w+\/(.*)$/,
      query: /^(.*)$/,
      hash: /^(.*)$/,
    },
    async start (m) {
      const l = m.path[1] + m.query[1] + m.hash[1];
      await $.openLink(l);
    },
  });

  _.register({
    rule: {
      host: hosts,
    },
    async ready () {
      $.remove('iframe');

      const jQuery = $.window.$;
      await _.wait(1000);
      jQuery('#captcha-dialog').dialog('open');
    },
  });

})();
