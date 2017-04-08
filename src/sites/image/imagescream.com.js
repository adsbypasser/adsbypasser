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
