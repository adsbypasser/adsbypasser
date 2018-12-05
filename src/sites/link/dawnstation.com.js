_.register({
  rule: {
    host: /^dawnstation\.com$/,
  },
  async ready () {
    const a = $('#tidakakanselamanya > a');
    await $.openLink(a.href);
  },
});
