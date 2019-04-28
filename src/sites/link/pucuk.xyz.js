_.register({
  rule: {
    host: /^pucuk\.xyz$/,
    path: /^\/\w+/,
  },
  async ready () {
    const px = $('#content article center a.button.icon.fa-link');
    await $.openLink(px.href);
  },
});
