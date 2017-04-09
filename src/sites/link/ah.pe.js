(function () {
  'use strict';

  function decodeScript (encoded) {
    var a = encoded.match(/^\s*;eval\((.+)\);\s*$/);
    a = a[1];
    var b = a.match(/^(.+)\('([^']+)','([^']+)','([^']+)','([^']+)'\)$/);
    var c = eval('(' + b[1] + ')');
    return c(b[2], b[3], b[4], b[5]);
  }

  $.register({
    rule: {
      host: /^ah\.pe$/,
    },
    ready: function () {
      $.removeNodes('iframe');

      var script = $.searchScripts('eval');
      script = decodeScript(script);
      script = decodeScript(script);
      script = decodeScript(script);

      var path = script.match(/'(g\/[^']+)'/);
      path = path[1];

      _.wait(3000).then(function () {
        $.get(path).then(function (url) {
          $.openLink(url);
        });
      });
    },
  });

})();
