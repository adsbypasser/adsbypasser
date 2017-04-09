$.register({
  rule: {
    host: /^url\.ie$/,
  },
  ready: function () {
    'use strict';

    var a = $('a[title="Link to original URL"]');
    $.openLink(a.href);
  },
});
