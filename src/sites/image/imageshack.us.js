(function () {

  const host = /^imageshack\.us$/;

  _.register({
    rule: {
      host: host,
      path: /^\/photo\/.+\/(.+)\/([^/]+)/,
    },
    async start (m) {
      await $.openImage(_.template('/f/{0}/{1}/')(m.path[1], m.path[2]));
    },
  });

  _.register({
    rule: {
      host: host,
      path: /^\/f\/.+\/[^/]+/,
    },
    async ready () {
      const i = $('#fullimg');
      await $.openImage(i.src);
    },
  });

})();
