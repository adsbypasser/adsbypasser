(function () {
  'use strict';

  function waitDOM (element, fn) {
    return _.D(function (resolve, reject) {
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.type !== 'childList') {
            return;
          }
          var result = _.C(mutation.addedNodes).find(function (child) {
            return fn(child) ? child : _.none;
          });
          if (!result) {
            return;
          }
          observer.disconnect();
          resolve(result.payload);
        });
      });
      observer.observe(element, {
        childList: true,
      });
    });
  }

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
    var recaptcha = $.$('#recaptcha_widget');
    if (recaptcha) {
      _.info('stop because recaptcha');
      return;
    }

    var i = $.$('input[name="next"]');
    if (i) {
      // first stage
      var next = getNext(i);
      go(id, $('input[name="pre"]').value, next);
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
        /^img(paying|mega|zeus|monkey|trex|ve)\.com$/,
        /^(www\.)?imgsee\.me$/,
        /^img(click|maid)\.net$/,
        /^(uploadrr|imageeer|imzdrop|www\.uimgshare)\.com$/,
        /^imgdrive\.co$/,
        /^cuteimg\.cc$/,
        /^img(tiger|gold)\.org$/,
        /^myimg\.club$/,
        /^foxyimg\.link$/,
        /^hulkimge\.com$/,
      ],
      path: pathRule,
    },
    ready: function (m) {
      helper(m.path[1], getNext1);
    },
  });

  $.register({
    rule: {
      host: [
        /^img(rock|town)\.net$/,
        /^imgmaze\.com$/,
      ],
      path: pathRule,
    },
    ready: function (m) {

      var i = $.$('img.pic');
      if (i) {
        // second stage
        $.openImage(i.src);
        return;
      }

      var d = $('div[id^="imageviewi"]');
      waitDOM(d, function (node) {
        return node.nodeName === 'FORM' && $.$('input[name="id"]', node);
      }).then(function (node) {
        node.submit();
      }).catch(function (e) {
        _.warn(e);
      });
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
