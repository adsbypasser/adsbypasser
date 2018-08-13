_.register({
  rule: {
    host: [
      /^ujv\.al$/,
    ],
    path: /^\/[a-zA-Z]+/,
  },
  async ready () {
    const u = $('.col-sm-6 a.redirect');
    await $.openLink(u.href);
  },
});
