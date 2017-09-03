_.register({
  rule: {
    host: /^mylinkgen\.com$/,
    path: /^\/p\/(.+)$/,
  },
  async start (m) {
    await $.openLink('/g/' + m.path[1]);
  },
});

_.register({
  rule: {
    host: /^mylinkgen\.com$/,
    path: /^\/g\//,
  },
  async ready () {
    const a = $('#main-content a.btn.btn-default');
    await $.openLink(a.href);
  },
});
