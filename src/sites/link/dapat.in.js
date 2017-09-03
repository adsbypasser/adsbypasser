_.register({
  rule: {
    host: /^(www\.)?dapat\.in$/,
  },
  async ready () {
    const f = $('iframe[name=pagetext]');
    await $.openLink(f.src);
  },
});
