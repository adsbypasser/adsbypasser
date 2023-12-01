_.register({
  rule: {
    host: /^22pixx\.xyz$/,
    path: /^\/ia-[io]\/(.+)\.jpeg\.html/,
  },
  async start () {
    const path = window.location.href.replace('/ia-', '/').replace('.html', '');
    await $.openLink(path);
  },
});

_.register({
  rule: {
    host: /^22pixx\.xyz$/,
    path: /^\/i-a\/(.+)\.jpeg\.html/,
  },
  async start () {
    const path = window.location.href.replace('/i-', '/').replace('.html', '');
    await $.openLink(path);
  },
});

_.register({
  rule: {
    host: /^22pixx\.xyz$/,
    path: /^\/x-[or]\/(.+)\.jpeg\.html/,
  },
  async start () {
    const path = window.location.href.replace('/x-', '/').replace('.html', '');
    await $.openLink(path);
  },
});

_.register({
  rule: {
    host: /^22pixx\.xyz$/,
    path: /^\/y-[ao1]\/(.+)\.jpeg\.html/,
  },
  async start () {
    const path = window.location.href.replace('/y-', '/').replace('.html', '');
    await $.openLink(path);
  },
});

_.register({
  rule: {
    host: /^22pixx\.xyz$/,
    path: /^\/x-i\/(.+)\.jpeg\.html/,
  },
  async start () {
    const path = window.location.href.replace('/x', '/y');
    await $.openLink(path);
  },
});
