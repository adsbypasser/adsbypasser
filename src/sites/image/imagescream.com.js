$.register({
  rule: [
    {
      host: /^imagescream\.com$/,
      path: /^\/img\/(soft\/)?/,
    },
    {
      host: /^(www\.)?picturescream\.com$/,
      path: /^\/x\//,
    },
    {
      host: [
        /^picturescream\.asia$/,
        /^uploadimage\.eu$/,
      ],
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
    host: /^(imagescream|anonpic|picturevip)\.com|all-poster\.ru$/,
    query: /^\?v=/,
  },
  ready: function () {
    'use strict';

    var i = $('#imagen img');
    $.openImage(i.src);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
