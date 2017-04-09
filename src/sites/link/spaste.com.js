$.register({
  rule: {
    host: /^www\.spaste\.com$/,
    path: /^\/go\/\w+$/,
  },
  ready: function () {
    'use strict';

    var id = $.searchScripts(/\{id:'(\d+)'\}/);
    _.wait(3000).then(function () {
      return $.post('/site/getRedirectLink', {
        id: id,
      }).then(function (url) {
        $.openLink(url);
      });
    });
  },
});
