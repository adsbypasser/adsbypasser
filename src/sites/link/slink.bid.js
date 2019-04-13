_.register({
  rule: {
    host: /^slink\.bid$/,
    path: /^\/short\//,
  },
  async ready () {
    const a = $('.text-center a#btn-main.btn.btn-main');
    await $.openLink(a.href);
  },
});
