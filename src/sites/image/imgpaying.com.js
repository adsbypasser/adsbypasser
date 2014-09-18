$.register({
  rule: [
    {
      host: [
        /^imgpaying\.com$/,
        /^(www\.)?imgsee\.me$/,
        /^imagebucks\.biz$/,
        /^imgmega\.com$/,
      ],
      path: /^\/([^\/]+)\/[^\/]+\.[^\/]{3,4}$/,
    },
    {
      host: /^pic\.re$/,
      path: /^\/([^\/]+)$/,
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
