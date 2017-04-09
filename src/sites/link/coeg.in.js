(function () {
  'use strict';

  function hostMapper (host) {
    switch (host) {
    case 'disingkat.in':
      return function () {
        var a = $('a.btn-block.redirect');
        return a.href;
      };
    case 'link.animagz.org':
      return function () {
        var a = $('a.redirect');
        a = a.onclick.toString();
        a = a.match(/window\.open \('([^']+)'\)/);
        return a[1];
      };
    case 'coeg.in':
      return function () {
        var a = $('.download-link a');
        return a.href;
      };
    case 'gunting.in':
      return function () {
        var a = $('div.col-sm-6:nth-child(1) > center:nth-child(1) > a:nth-child(1)');
        return a.href;
      };
    default:
      return null;
    }
  }

  $.register({
    rule: {
      host: [
        /^link\.animagz\.org$/,
        /^coeg\.in$/,
        /^disingkat\.in$/,
        /^gunting\.in$/,
      ],
      path: /^\/\w+$/,
    },
    ready: function (m) {
      var mapper = hostMapper(m.host[0]);
      var b64 = mapper().match(/\?r=(\w+={0,2}?)/);

      $.openLink(atob(b64[1]));
    },
  });

  $.register({
    rule: {
      host: /^sipkur\.(net|us)$/,
      path: [
        /^\/\w+$/,
        /^\/menujulink\//,
      ],
    },
    ready: function () {
      var d = $('#testapk > div');
      d = d.onclick.toString();
      d = d.match(/window\.open\('([^']+)'/);

      $.openLink(d[1]);
    },
  });

})();
