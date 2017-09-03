_.register({
  rule: {
    host: /^nutshellurl\.com$/,
  },
  async ready () {
    const iframe = $('iframe');
    await $.openLink(iframe.src);
  },
});
