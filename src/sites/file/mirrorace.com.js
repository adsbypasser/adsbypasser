_.register({
  rule: {
    host: /^mirrorace\.com$/,
    path: /^\/m\//,
  },
  async ready () {
    const ma = $('.uk-text-center a.uk-button.uk-button-large.uk-button-primary');
    await $.openLink(ma.href);
  },
});
