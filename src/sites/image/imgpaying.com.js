(function () {
  'use strict';

  var PATH_RULE = /^\/([0-9a-zA-Z]+)(\.|\/|$)/;

  $.register({
    rule: {
      host: [
        /^img(universal|paying|mega|zeus|monkey|trex|ve|dew|diamond)\.com$/,
        /^(www\.)?imgsee\.me$/,
        /^img(click|maid)\.net$/,
        /^(uploadrr|imageeer|imzdrop|www\.uimgshare|pic-maniac|hulkimge)\.com$/,
        /^imgdrive\.co$/,
        /^cuteimg\.cc$/,
        /^img(tiger|gold)\.org$/,
        /^myimg\.club$/,
        /^foxyimg\.link$/,
        /^(core|iron)img\.net$/,
      ],
      path: PATH_RULE,
    },
    ready: function (m) {
      helper(m.path[1], getNext1);
    },
  });

  $.register({
    rule: {
      host: [
        /^imgview\.net$/,
        /^img(maze|outlet)\.com$/,
      ],
      path: PATH_RULE,
    },
    ready: function () {
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
      host: /^img(rock|town)\.net$/,
      path: PATH_RULE,
    },
    ready: function () {
      var i = $.$('img.pic');
      if (i) {
        // second stage
        $.openImage(i.src);
        return;
      }

      var d = $('td:nth-child(2) > center > div[id]');
      var visibleClasses = null;
      waitDOM(d, function (node) {
        if (node.nodeName === 'STYLE') {
          visibleClasses = parseStyle(node);
          return false;
        }
        // making sure it is the correct node (form) and the only visible one
        // since it throws in a random number of "fake" ones
        if (node.nodeName === 'FORM' && node.offsetParent !== null) {
          return visibleClasses.some(function (class_) {
            var isVisible = node.classList.contains(class_);
            if (!isVisible) {
              return false;
            }
            var button = $.$('input[type="submit"]', node);
            if (!button) {
              return false;
            }
            return button.style.display !== 'none';
          });
        }
        return false;
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
      path: PATH_RULE,
    },
    ready: function (m) {
      helper(m.path[1], getNext2);
    },
  });

  $.register({
    rule: {
      host: /^imgfiles\.org$/,
      path: PATH_RULE,
    },
    ready: function (m) {
      var i = $.$('img.pic');
      if (i) {
        // second stage
        $.openImage(i.src);
        return;
      }

      var f = $('form');
      f.submit();
    },
  });

  $.register({
    rule: 'http://imgview.net/tpind.php',
    ready: function () {
      var i = $.$('img.pic');
      if (i) {
        // second stage
        $.openImage(i.src, {replace: true});
        return;
      }

      _.wait(500).then(function () {
        var d = $('div[id^="imageviewi"] input[type="submit"][style=""]');
        d = d.parentNode;
        d.submit();
      });
    },
  });

  $.register({
    rule: /^http:\/\/imgdragon\.com\/(getfil\.php|dl)$/,
    ready: function () {
      var i = $.$('img.pic');
      if (i) {
        // second stage
        $.openImage(i.src);
        return;
      }

      _.wait(500).then(function () {
        var f = $('#ContinueFRM');
        f.submit();
      });
    },
  });

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

  function parseStyle (style) {
    style = style.textContent;
    var pattern = /\.(\w+)\{visibility:initial;\}/g;
    var rv = null;
    var classes = [];
    while ((rv = pattern.exec(style)) !== null) {
      classes.push(rv[1]);
    }
    return classes;
  }

  function go (id, pre, next) {
    $.openLink('', {
      post: {
        op: 'view',
        id: id,
        pre: pre,
        next: next,
        adb: '0',
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
    var recaptcha = $.$('#recaptcha_widget, #captcha');
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

})();
