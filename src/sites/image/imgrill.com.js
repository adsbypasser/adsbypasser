(function () {
  'use strict';

  function handler () {
    var node = $.$('#continuetoimage > form input');
    if (node) {
      // first pass
      node.click();
      return;
    }

    // second pass
    var o = $('img[alt="image"]');
    $.openImage(o.src);
  }

  $.register({
    rule: {
      host: /^(img(rill|next|savvy|\.spicyzilla)|image(corn|picsa)|www\.imagefolks|hosturimage|img-zone)\.com|img(candy|master)\.net|imgcloud\.co|pixup\.us|(www\.)?\.imgult\.com|(bulkimg|imgskull)\.info|image\.adlock\.org$/,
      path: /^\/img-.*\.html$/,
    },
    ready: handler,
  });

  $.register({
    rule: {
      host: /^08lkk\.com$/,
      path: /^\/\d+\/img-.*\.html$/,
    },
    ready: handler,
  });

})();

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
