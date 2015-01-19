(function () {
  'use strict';

  var pathRule = /^\/([0-9a-z]+)(\.|\/|$)/;

  function helper (id, next) {
    var i = $.$('img.pic');
    if (i) {
      $.openImage(i.src);
      return;
    }
    // first stage
    $.openLinkByPost('', {
      op: 'view',
      id: id,
      pre: 1,
      next: next,
    });
  }

  $.register({
    rule: {
      host: [
        /^((img(paying|mega))|imzdrop)\.com$/,
        /^(www\.)?imgsee\.me$/,
        /^imgclick\.net$/,
        /^(uploadrr|imageeer)\.com$/,
      ],
      path: pathRule,
    },
    ready: function (m) {
      var f = $.$('form > input[name="next"]');
      helper(m.path[1], f && f.value);
    },
  });

  $.register({
    rule: {
      host: /^imgrock\.net$/,
      path: pathRule,
    },
    ready: function (m) {
      helper(m.path[1], 'Continue to Image...');
    },
  });

})();
// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
