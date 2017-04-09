$.register({
  rule: [
    'http://pics-money.ru/allpicfree/*',
    'http://www.pics-money.ru/allimage/*',
  ],
});

$.register({
  rule: {
    host: /^pics-money\.ru$/,
    path: /^\/v\.php$/,
  },
  ready: function () {
    'use strict';

    $.removeNodes('iframe');

    var i = $('center img:not([id])');
    $.openImage(i.src);
  },
});

$.register({
  rule: {
    host: /^www\.pics-money\.ru$/,
  },
  ready: function () {
    'use strict';

    $.removeNodes('iframe');

    var i = $('#d1 img');
    i = i.onclick.toString();
    i = i.match(/mshow\('(.+)'\)/);
    i = i[1];
    $.openImage(i);
  },
});
