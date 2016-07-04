$.register({
  rule: [
    {
      host: /^imagescream\.com$/,
      path: /^\/img\/(soft\/)?/,
    },
    {
      host: /^(www\.)?(picturescream|picturevip)\.com$/,
      path: /^\/x\//,
    },
    {
      host: [
        /^picturescream\.asia$/,
        /^uploadimage\.eu$/,
      ],
    },
    {
      host: /^postscreens\.info/,
      path: /^\/.*/,
    },
  ],
  ready: function () {
    'use strict';

    var i = $('#shortURL-content img');
    $.openImage(i.src);
  },
});

$.register({
  rule: {
    host: /^(imagescream|anonpic)\.com|all-poster\.ru$/,
    query: /^\?v=/,
  },
  ready: function () {
    'use strict';

    var i = $('#imagen img');
    $.openImage(i.src);
  },
});

$.register({
  rule: {
    host: /^bunnyforum\.org$/,
    query: /^\?v=/,
  },
  ready: function () {
    'use strict';

    var i = $('img[title^=Click]');
    $.openImage(i.src);
  },
});

$.register({
  rule: {
    host: /^xxx\.porn0day.\.com$/,
    path: /^\/image\/[A-Za-z0-9]{3,}/,
  },
  ready: function () {
    'use strict';

    var i = $('link[rel^=image_src]');
    $.openImage(i.href);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
