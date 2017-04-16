$.register({
  rule: {
    host: [
      /^(www\.)?shink\.in$/,
      /^fas\.li$/,
      /^(www\.)?croco\.(me|site)$/,
    ],
    path: /^\/\w+$/,
  },
  ready: function () {
    'use strict';

    var f = $('#skip');

    if (!$.$('#captcha')) {
      // No captcha, we can redirect straight away
      f.submit();
      return;
    }

    // Remove the popup trigger area.
    // NOTE it will add the node back immediately, maybe it will becomes very
    // buzy.
    var o = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
          if (node.localName === 'div') {
            if (node.style.zIndex === '2147483647') {
              node.parentNode.removeChild(node);
              return;
            }
          }
        });
      });
    });

    o.observe(document.body, {
      childList: true,
      subtree: true,
    });
  },
});

$.register({
  rule: [
    {
      host: [
        /^(www\.)?shink\.in$/,
        /^fas\.li$/,
      ],
      path: /^\/go\/\w+$/,
    },
    {
      host: /^(www\.)?croco\.(me|site)$/,
      path: /^\/ok\/\w+$/,
    },
  ],
  ready: function () {
    'use strict';

    var a = $('#btn-main');
    var i = a.href.lastIndexOf('http');
    a = a.href.substr(i);
    $.openLink(a);
  },
});
