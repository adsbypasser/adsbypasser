$.register({
  rule: [
    {
      host: [
        /^img(paying|mega)\.com$/,
        /^(www\.)?imgsee\.me$/,
        /^imgclick\.net$/,
      ],
      path: /^\/([^\/]+)\/[^\/]+\.[^\/]{3,4}$/,
    },
  ],
  ready: function () {
    'use strict';

    var i = $.$('img.pic');
    if (!i) {
      // first stage
      i = $('form');
      i.submit();
      return;
    }
    $.openImage(i.src);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
