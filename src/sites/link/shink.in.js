_.register({
  rule: {
    host: [
      /^(www\.)?shink\.in$/,
      /^fas\.li$/,
      /^(www\.)?croco\.(me|site)$/,
      /^cpmlink\.net$/,
    ],
    path: /^\/\w+$/,
  },
  async ready () {
    const f = $('#skip');

    if (!$.$('#captcha')) {
      // No captcha, we can redirect straight away
      f.submit();
    }

    // Remove the popup trigger area.
    // NOTE The site will add the node back immediately, so maybe it will
    // becomes very busy.
    const o = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
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

_.register({
  rule: [
    {
      host: [
        /^fas\.li$/,
        /^cpmlink\.net$/,
      ],
      path: /^\/go\/\w+$/,
    },
    {
      host: /^(www\.)?croco\.(me|site)$/,
      path: /^\/ok\/\w+$/,
    },
  ],
  async ready () {
    let a = $('#btn-main');
    const i = a.href.lastIndexOf('http');
    a = a.href.substr(i);
    await $.openLink(a);
  },
});

_.register({
  rule: {
    host: /^(www\.)?shink\.in$/,
    path: /^\/go\/\w+$/,
  },
  async ready () {
    const f = $('#skip');
    f.submit();
  },
});
