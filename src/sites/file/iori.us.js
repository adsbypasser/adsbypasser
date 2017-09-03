_.register({
  rule: {
    host: /^iori\.us$/,
  },
  async ready () {
    const a = $('#wrapper .tombol a');
    await $.openLink(a.href);
  },
});
