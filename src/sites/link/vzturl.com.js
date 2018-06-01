_.register({
  rule: {
    host: /^(www\.)?vzturl\.com$/,
  },
  async ready () {
    const frame = $('frame[scrolling=yes]');
    await $.openLink(frame.src);
  },
});
