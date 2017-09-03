_.register({
  rule: {
    host: /^hotshorturl\.com$/,
  },
  async ready () {
    const frame = $('frame[scrolling=yes]');
    await $.openLink(frame.src);
  },
});
