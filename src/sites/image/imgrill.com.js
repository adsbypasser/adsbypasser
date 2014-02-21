$.register({
  rule: {
    host: /^(img(rill|corn|next|savvy|\.spicyzilla|coco)|image(corn|picsa)|www\.imagefolks|hosturimage)\.com|img(candy|tube|master)\.net|imgcloud\.co|pixup\.us|(www\.)?\.imgult\.com|bulkimg\.info$/,
    path: /^\/img-.*\.html$/,
  },
  ready: function () {
    'use strict';

    var node = $.$('#continuetoimage > form input');
    if (node) {
      // first pass
      node.click();
      return;
    }

    // second pass
    var o = $('img[alt="image"]');
    $.openImage(o.src);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
