_.register({
  rule: {
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

_.register({
  rule: {
    host: [
      /^shon\.xyz$/,
      /^shink\.me$/,
    ],
    path: /^\/[\w-]+$/,
  },
  async ready () {
    const f = $('#skip');
    f.submit();
  },
});
