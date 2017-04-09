_.register({
  rule: {
    host: /^lnk\.in$/,
  },
  async ready () {
    const a = $('#divRedirectText a');
    await $.openLink(a.innerHTML);
  },
});
