$.register({
  rule: {
    host: /^imgtorrnt.in$/,
    path: /^\/view\.php$/,
    query: /^\?id=.*/,
  },
  ready: function () {
    'use strict';

    let img = $('center div table.tg tbody tr td center img');
    $.openImage(img.src);
  }
});
