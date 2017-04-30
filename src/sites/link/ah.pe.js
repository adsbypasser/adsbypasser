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
      var script = $.searchScripts('eval');
      script = decodeScript(script);
      script = decodeScript(script);
      script = decodeScript(script);

      var path = script.match(/([^;= ]+)=([^+ ;]+)\+"\."\+([^+ ]+)\+"\."\+([^; ]+);/);
      if (!path) {
        throw new _.AdsBypasserError('script changed');
      }
      if (typeof $.window[path[2]] === 'undefined') {
        // recaptcha page
        _.info('recaptcha');
        return;
      }
      path = _.T('{0}.{1}.{2}')($.window[path[2]], $.window[path[3]], $.window[path[4]]);

      $.openLink(path);
    },
  });

})();
