// second stage
$.register({
  rule: {
    host: /^imgbar\.net$/,
    path: /^\/img_show\.php$/,
    query: /^\?view_id=/,
  },
  ready: function () {
    'use strict';

    var i = $('center img');
    $.openImage(i.src);
  },
});

// first stage
$.register({
  rule: {
    host: /^imgbar\.net$/,
  },
  ready: function () {
    'use strict';

    var i = $('div.panel.top form input[name=sid]');
    $.openLink('/img_show.php?view_id=' + i.value);
  },
});
