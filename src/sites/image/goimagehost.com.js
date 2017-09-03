(function () {
  const hostRule = /^goimagehost\.com$/;

  _.register({
    rule: {
      host: hostRule,
      path: /^\/xxx\/images\//,
    },
  });

  _.register({
    rule: {
      host: hostRule,
      path: /^\/xxx\/(.+)/,
    },
    async start (m) {
      await $.openImage('/xxx/images/' + m.path[1]);
    },
  });

  _.register({
    rule: {
      host: hostRule,
      query: /^\?v=(.+)/,
    },
    async start (m) {
      await $.openImage('/xxx/images/' + m.query[1]);
    },
  });

})();
