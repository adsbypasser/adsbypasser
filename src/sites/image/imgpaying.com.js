(function () {
  'use strict';

  var pathRule = /^\/([0-9a-z]+)(\.|\/|$)/;

  function go (id, pre, next) {
    $.openLink('', {
      post: {
        op: 'view',
        id: id,
        pre: pre,
        next: next,
      },
    });
  }

  function getNext1 (i) {
    return i.value;
  }

  function getNext2 (i) {
    var next = i.onclick && i.onclick.toString().match(/value='([^']+)'/);
    if (next) {
      next = next[1];
      return next;
    } else {
      return i.value;
    }
  }

  function helper (id, getNext) {
    var i = $.$('form input[name="next"]');
    if (i) {
      // first stage
      var next = getNext(i);
      go(id, $('form input[name="pre"]').value, next);
      return;
    }

    i = $.$('img.pic');
    if (i) {
      // second stage
      $.openImage(i.src);
      return;
    }

    // other page
    _.info('do nothing');
  }

  $.register({
    rule: {
      host: [
        /^img(paying|mega|zeus|monkey|trex)\.com$/,
        /^(www\.)?imgsee\.me$/,
        /^imgclick\.net$/,
        /^(uploadrr|imageeer|imzdrop)\.com$/,
        /^imgdrive\.co$/,
        /^cuteimg\.cc$/,
        /^imgtiger\.org$/,
      ],
      path: pathRule,
    },
    ready: function (m) {
      helper(m.path[1], getNext1);
    },
  });

  $.register({
    rule: {
      host: /^imgrock\.net$/,
      path: pathRule,
    },
    ready: function (m) {
      // they have random invalid forms here
      var d = $.$('#imageviewir input[type=submit]:not([style])');
      if (!d) {
        helper(m.path[1], getNext1);
        return;
      }
      // the form has a random field, directly use this form
      d = d.parentNode;
      d.submit();
    },
  });

  $.register({
    rule: {
      host: /^chronos\.to$/,
      path: pathRule,
    },
    ready: function (m) {
      helper(m.path[1], getNext2);
    },
  });

})();
// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
