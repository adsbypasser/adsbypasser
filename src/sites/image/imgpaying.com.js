(function () {
  'use strict';

  var pathRule = /^\/([^\/]+)\/[^\/]+\.[^\/]{3,4}$/;

  $.register({
    rule: {
      host: [
        /^((img(paying|mega))|imzdrop)\.com$/,
        /^(www\.)?imgsee\.me$/,
        /^imgclick\.net$/,
      ],
      path: pathRule,
    },
    ready: function () {
      var i = $.$('img.pic');
      if (!i) {
        // first stage
        i = $('form');
        i.submit();
        return;
      }
      $.openImage(i.src);
    },
  });

  $.register({
    rule: {
      host: /^imgrock\.net$/,
      path: pathRule,
    },
    ready: function (m) {
      var i = $.$('img.pic');
      if (!i) {
        // first stage
        $.openLinkByPost('', {
          op: 'view',
          id: m.path[1],
          pre: 1,
          next: 'Continue to Image...',
        });
        return;
      }
      $.openImage(i.src);
    },
  });

  $.register({
    rule: {
      host: /^(uploadrr|imageeer)\.com|imgsee\.me$/,
      path: /^\/([^\/]+)$/,
    },
    ready: function (m) {
      var i = $.$('img.pic');
      if (i) {
        $.openImage(i.src);
        return;
      }
      // first stage
      $.openLinkByPost('', {
        op: 'view',
        id: m.path[1],
        pre: 1,
        next: 'Continue to image...',
      });
    },
  });

})();
// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
