_.register({
  rule: {
    host: /^(www\.)?uskip\.me$/,
    path: /^\/go\/\w+$/,
  },
  async ready () {
    const a = $('#btn-main');
    await $.openLink(a.href);
  },
});
