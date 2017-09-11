(function () {

  _.register({
    rule: {
      host: /^ah\.pe$/,
    },
    async ready () {
      let script = $.searchFromScripts('eval');
      script = decodeScript(script);
      script = decodeScript(script);
      script = decodeScript(script);

      let path = script.match(/([^;= ]+)=([^+ ;]+)\+"\."\+([^+ ]+)\+"\."\+([^; ]+);/);
      if (!path) {
        throw new _.AdsBypasserError('script changed');
      }
      if (typeof $.window[path[2]] === 'undefined') {
        // recaptcha page
        _.info('recaptcha');
        return;
      }
      path = [$.window[path[2]], $.window[path[3]], $.window[path[4]]].join('.');

      await $.openLink(path);
    },
  });

  function decodeScript (encoded) {
    let a = encoded.match(/^\s*;eval\((.+)\);\s*$/);
    a = a[1];
    const b = a.match(/^(.+)\('([^']+)','([^']+)','([^']+)','([^']+)'\)$/);
    const c = eval('(' + b[1] + ')');
    return c(b[2], b[3], b[4], b[5]);
  }

})();
