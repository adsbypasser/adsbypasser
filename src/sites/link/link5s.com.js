(function () {
  'use strict';

  function sendRequest (opts) {
    return $.post('/ajax/r.php', opts).then(function (data) {
      if (data.length <= 1) {
        return sendRequest(opts);
      }
      var a = $.toDOM(data);
      a = $('a', a);
      return a.href;
    });
  }

  $.register({
    rule: {
      host: /^link5s\.com$/,
      path: /^\/([^\/]+)$/,
    },
    ready: function (m) {
      // disable page ajax
      $.window.$ = null;

      var i = $('#iframeID');
      var opts = {
        page: m.path[1],
        advID: i.dataset.cmp,
        u: i.dataset.u,
      };
      $.removeNodes('iframe');

      sendRequest(opts).then(function (url) {
        $.openLink(url);
      });
    },
  });

})();
