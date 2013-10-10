// I don't think these sites are the same
$.register({
  rule: [
    'http://*.imagevenue.com/img.php?*',
    'http://hotchyx.com/d/adult-image-hosting-view-08.php?id=*',
    'http://www.freeporndumpster.com/show.php?*',
    'http://www.hostingfailov.com/photo/*',
  ],
  ready: function () {
    'use strict';

    var i = $('#thepic');
    $.openImage(i.src);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
