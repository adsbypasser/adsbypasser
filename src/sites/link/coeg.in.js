(function () {

  _.register({
    rule: {
      host: [
        /^(coeg|disingkat)\.in$/,
        /^www\.(telondasmu|siotong|siherp)\.com$/,
        /^www\.greget\.space$/,
      ],
      path: /^\/\w+$/,
    },
    async ready (m) {
      const mapper = hostMapper(m.host[0]);
      const b64 = mapper().match(/\?r=([\w/]+={0,2})/);

      await $.openLink(atob(b64[1]));
    },
  });

  _.register({
    rule: {
      host: /^sipkur\.net$/,
      path: [
        /^\/\w+$/,
        /^\/menujulink\//,
      ],
    },
    async ready () {
      let d = $('#testapk > div');
      d = d.onclick.toString();
      d = d.match(/window\.open\('([^']+)'/);

      await $.openLink(d[1]);
    },
  });

  function hostMapper (host) {
    switch (host) {
    case 'disingkat.in':
      return () => {
        const a = $('a.btn-block.redirect');
        return a.href;
      };
    case 'coeg.in':
    case 'www.telondasmu.com':
    case 'www.siotong.com':
    case 'www.siherp.com':
    case 'www.greget.space':
      return () => {
        const a = $('.download-link a');
        return a.href;
      };
    default:
      return null;
    }
  }

})();
