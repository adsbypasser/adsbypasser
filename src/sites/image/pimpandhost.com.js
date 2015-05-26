$.register({
  rule: {
    host: /^(www\.)?pimpandhost\.com$/,
    path: /^\/image\//,
  },
  ready: function () {
    'use strict';

    // Retrieve the normal-sized image
    var a = $('#image_original');

    // Grab its URL
    var el = document.createElement('div');
    el.innerHTML = a.value;
    var img = $('img', el);

    $.openImage(img.src);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
