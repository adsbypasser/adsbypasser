_.register({
  rule: {
    host: /^u\.go2\.me$/,
  },
  async ready () {
    const iframe = $('iframe');
    await $.openLink(iframe.src);
  },
});
