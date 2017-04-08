(function () {
  'use strict';

  $.register({
    rule: {
      host: [
        /^(www\.)?adb\.ug$/,
        /^(www\.)?lynk\.my$/,
        /^adyou\.me$/,
      ],
      // Match everything but empty, privacy, terms, contact, contact/whatever or path beginning with #
      path: /^(?!\/(?:privacy|terms|contact(\/.*)?|#.*)?$).*$/
    },
    ready: function () {
      'use strict';

      $.removeNodes('iframe');

      // pattern 1
      var m = $.searchScripts(/top\.location\.href="([^"]+)"/);
      if (m) {
        $.openLink(m[1]);
        return;
      }

      // pattern 2
      getArguments().then(function (args) {
        tryLink(args);
      });
    },
  });

  function getArguments () {
    var PATTERN = /\{\s*_args[^}]+\}[^}]+\}/;

    return _.D(function (resolve, reject) {
      var m = $.searchScripts(PATTERN);
      if (m) {
        resolve(m);
        return;
      }
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          mutation.addedNodes.forEach(function (node) {
            if (node.localName === 'script') {
              var m = node.textContent.match(PATTERN);
              if (m) {
                resolve(m);
                observer.disconnect();
              }
            }
          });
        });
      });
      observer.observe(document.body, {
        childList: true,
      });
    }).then(function (m) {
      return eval('(' + m[0] + ')');
    });
  }

  function tryLink (args) {
    var url = window.location.pathname + '/skip_timer';

    var i = setInterval(function () {
      $.post(url, args).then(function (text) {
        var jj = _.parseJSON(text);
        if (!jj.errors && jj.messages) {
          clearInterval(i);
          $.openLink(jj.messages.url);
        }
      });
    }, 1000);
  }

})();
