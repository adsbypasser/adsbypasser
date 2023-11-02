_.register({
  rule: {
    host: /^link\.turkdown\.com$/,
  },
  async ready () {
    await _.wait(5000);
    const a = $('.btn-success.btn-lg.get-link');
    await $.openLink(a.href);
  },
});
