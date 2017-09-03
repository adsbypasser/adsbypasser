_.register({
  rule: {
    host: /^(www\.)?(buz|vzt)url\.com$/,
  },
  async ready () {
    const frame = $('frame[scrolling=yes]');
    await $.openLink(frame.src);
  },
});
