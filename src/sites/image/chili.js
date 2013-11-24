$.register({
  rule: {
    host: /^imgchili\.(com|net)|www\.pixhost\.org$/,
    path: /^\/show\//,
  },
  ready: function () {
    'use strict';

    $.removeNodes('iframe, #ad');

    try {
      $('#all').style.display = '';
    } catch (e) {
      // do nothing
    }

    var o = $('#show_image');
    $.openImage(o.src);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
