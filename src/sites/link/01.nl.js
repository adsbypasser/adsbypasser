_.register({
  rule: {
    host: /^01\.nl$/,
  },
  async ready () {
    const f = $('iframe#redirectframe');
    await $.openLink(f.src);
  },
});
