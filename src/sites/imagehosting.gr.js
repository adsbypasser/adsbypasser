// this two are not homogeneous but do have same action
$.register({
  rule: [
    'http://imagehosting.gr/*.html',
    'http://www.bilder-hochladen.net/files/*.html',
  ],
  ready: function () {
    'use strict';

    var i = $('td > img');
    $.openImage(i.src);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
