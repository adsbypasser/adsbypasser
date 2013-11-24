$.register({
  rule: function (uri_1, uri_3, uri_6) {
    if (!/^pics-money\.ru$/.test(uri_6.host) || /^\/allpicfree\//.test(uri_6.path)) {
      return null;
    }
    return /^\/v\.php$/.test(uri_6.path);
  },
  ready: function () {
    'use strict';

    $.removeNodes('iframe');

    var i = $('center img:not([id])');
    $.openImage(i.src);
  },
});

$.register({
  rule: function (uri_1, uri_3, uri_6) {
    if (!/^www\.pics-money\.ru$/.test(uri_6.host) || /^\/allimage\//.test(uri_6.path)) {
      return null;
    }
    return true;
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

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
