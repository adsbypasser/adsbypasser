_.register({
  rule: {
    host: /^mirrorace\.com$/,
    path: /^\/m\//,
  },
  async ready () {
    const ma = $('a.uk-button.uk-button-large.uk-button-primary');
    await $.openLink(ma.href);
  },
});
