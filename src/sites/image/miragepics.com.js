(function () {
  _.register({
    rule: {
      host: /^miragepics\.com$/,
      path: /^\/viewer\.php$/,
      query: /file=([^&]+)/,
    },
    start: helper,
  });
  async function helper (m) {
    await $.openImage('/images/' + m.query[1]);
  }
})();
