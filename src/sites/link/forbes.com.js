$.register({
  rule: {
    host: /^www\.forbes\.com$/,
  },
  ready: function () {
    'use strict';

    var o = $.window.ox_zones;
    if (o) {
      $.openLink(o.page_url);
    }
  },
});
