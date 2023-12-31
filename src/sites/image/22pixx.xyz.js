_.register({
  rule: {
    host: /^22pixx\.xyz$/,
    path: /^\/ia-[aio]\/(.+)\.jpeg\.html/,
  },
  async start () {
    const path = window.location.href.replace('/ia-', '/').replace('.html', '');
    await $.openLink(path);
  },
});

_.register({
  rule: {
    host: /^22pixx\.xyz$/,
    path: /^\/ib-[aior]\/(.+)\.jpeg\.html/,
  },
  async start () {
    const path = window.location.href.replace('/ib-', '/').replace('.html', '');
    await $.openLink(path);
  },
});

_.register({
  rule: {
    host: /^22pixx\.xyz$/,
    path: /^\/i-[1a]\/(.+)\.jpeg\.html/,
  },
  async start () {
    const path = window.location.href.replace('/i-', '/').replace('.html', '');
    await $.openLink(path);
  },
});

_.register({
  rule: {
    host: /^22pixx\.xyz$/,
    path: /^\/x-[ior]\/(.+)\.jpeg\.html/,
  },
  async start () {
    const path = window.location.href.replace('/x-', '/').replace('.html', '');
    await $.openLink(path);
  },
});

_.register({
  rule: {
    host: /^22pixx\.xyz$/,
    path: /^\/y-[1aio]\/(.+)\.jpeg\.html/,
  },
  async start () {
    const path = window.location.href.replace('/y-', '/').replace('.html', '');
    await $.openLink(path);
  },
});
