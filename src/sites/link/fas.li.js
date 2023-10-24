_.register({
  rule: {
    host: [
      /^shink\.me$/,
      /^shon\.xyz$/,
    ],
    path: /^\/[\w-]+$/,
  },
  async ready () {
    if (!$.$('#captcha')) {
      // no captcha, we can redirect straight away

      // stage 1
      let f = $.$('#skip');
      if (f) {
        f.submit();
        return;
      }

      // stage 2
      f = $('#btn-main');
      await $.openLink(f.href);
      return;
    }

    // Remove the popup trigger area.
    // NOTE The site will add the node back immediately, so maybe it will
    // becomes very busy.
    $.remove('div[class$=Overlay]');
    $.block((node) => {
      if (node.className.match(/Overlay$/)) {
        return true;
      }
      if (node.localName === 'div') {
        return [
          '2147483647',
          '2',
        ].some((z) => {
          return z === node.style.zIndex;
        });
      }
      return false;
    }, document.body);
  },
});

_.register({
  rule: 
    {
      host: /^cpmlink\.net$/,
      path: /^\/go\/[\w-]+$/,
    },
  async ready () {
    let a = $('#btn-main');
    const i = a.href.lastIndexOf('http');
    a = a.href.substr(i);
    await $.openLink(a);
  },
});
