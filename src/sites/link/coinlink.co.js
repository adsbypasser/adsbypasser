_.register({
  rule: {
    host: /^coinlink\.co$/,
    path: /^\/i\//,
  },
  async ready () {
    // this site frequently changes its style, just keep all pattern here
    const a = $('a#btn-main, a.btn.btn-block.btn-warning, a.btn.btn-block.btn-success');
    await $.openLink(a.href);
  },
});
