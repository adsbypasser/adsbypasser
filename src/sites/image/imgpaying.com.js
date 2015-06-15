(function () {
  'use strict';

  var pathRule = /^\/([0-9a-z]+)(\.|\/|$)/;

  function helper (id, next) {
    var f = $.$('form > input[name="next"]');
    var i = $.$('img.pic');
    if (!(next || f) && !i) {
      // other page
      _.info('do nothing');
    } else if (next || f) {
      // first stage
      $.openLink('', {
        post: {
          op: 'view',
          id: id,
          pre: 1,
          next: next || f.value,
        },
      });
    } else {
      // second stage
      $.openImage(i.src);
    }
  }

  $.register({
    rule: {
      host: [
        /^img(paying|mega|zeus|monkey|trex)\.com$/,
        /^(www\.)?imgsee\.me$/,
        /^imgclick\.net$/,
        /^(uploadrr|imageeer|imzdrop)\.com$/,
        /^chronos\.to$/,
        /^imgdrive\.co$/,
      ],
      path: pathRule,
    },
    ready: function (m) {
      helper(m.path[1]);
    },
  });

  $.register({
    rule: {
      host: /^imgrock\.net$/,
      path: pathRule,
    },
    ready: function (m) {
      var d = $.$('#imageviewir');
      helper(m.path[1], d ? 'Continue to Image...' : null);
    },
  });

})();
// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
