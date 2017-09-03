(function () {

  _.register({
    rule: {
      host: /^link5s\.com$/,
      path: /^\/([^/]+)$/,
    },
    async ready (m) {
      // disable page ajax
      $.window.$ = null;

      const i = $('#iframeID');
      const opts = {
        page: m.path[1],
        advID: i.dataset.cmp,
        u: i.dataset.u,
      };
      $.remove('iframe');

      const url = await sendRequest(opts);
      await $.openLink(url);
    },
  });

  async function sendRequest (opts) {
    const data = await $.post('/ajax/r.php', opts);
    if (data.length <= 1) {
      return await sendRequest(opts);
    }
    let a = $.toDOM(data);
    a = $('a', a);
    return a.href;
  }

})();
