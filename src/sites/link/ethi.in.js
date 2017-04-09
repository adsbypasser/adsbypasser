$.register({
  rule: {
    host: [
    	/^ethi\.in$/,
    	/^st\.wardhanime\.net$/,
    ],
    path: /^\/i\/\d+$/,
  },
  ready: function () {
    'use strict';

    var a = $('#wrapper > [class^="tombo"] > a[target="_blank"]');
    $.openLink(a.href);
  },
});
