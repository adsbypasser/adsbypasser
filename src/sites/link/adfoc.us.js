$.register({
  rule: 'http://adfoc.us/*',
  ready: function () {
    'use strict';

    var root = document.body;
    var observer = new MutationObserver(function (mutations) {
      var o = $.$('#showSkip');
      if (o) {
        observer.disconnect();
        o = o.querySelector('a');
        $.openLink(o.href);
      }
    });
    observer.observe(root, {
      childList: true,
      subtree: true,
    });
  },
});
