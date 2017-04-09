_.register({
  rule: {
    host: /^(www\.)?\w+\.link-protector\.com$/,
  },
  async ready () {
    const f = $('form[style="font-weight:normal;font-size:12;font-family:Verdana;"]');
    await $.openLink(f.action);
  },
});
