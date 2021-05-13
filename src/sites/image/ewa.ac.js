_.register({
  rule: {
    host: [
      /^ewa\.ac$/,
      /^elil\.cc$/,
    ],
    path: /^\/(.*)$/,
  },
  async ready (m) {
    await _.wait(5000);

    const url = await $.post('/site/get-new-redirect-link', {
      code: m.path[1],
      ads_blocked: false,
    });

    await $.openImage(url);
  },
});

_.register({
  rule: {
    host: [
      /^img(viv|fsh)\.xyz$/,
      /^imgbrd\.xyz$/,
    ],
    path: /^\/.*$/,
  },
  async ready () {
    const d = $('.main-content-box');
    const rv = $.searchFromScripts(/document\.location\.href="([^"]+)"/, d);
    await $.openImage(rv[1]);
  },
});
