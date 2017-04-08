$.register({
  rule: {
    host: /^(rd?)lnk\.co|reducelnk\.com$/,
    path: /^\/[^.]+$/,
  },
  ready: function () {
    'use strict';

    var f = $.$('iframe#dest');
    if (f) {
      $.openLink(f.src);
      return;
    }

    $.removeNodes('iframe');

    var o = $.$('#urlholder');
    if (o) {
      $.openLink(o.value);
      return;
    }

    o = $.$('#skipBtn');
    if (o) {
      o = o.querySelector('a');
      $.openLink(o.href);
      return;
    }

    o = document.title.replace(/(LNK.co|Linkbee)\s*:\s*/, '');
    $.openLink(o);
  },
});
