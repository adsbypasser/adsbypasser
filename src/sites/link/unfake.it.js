_.register({
  rule: {
    host: /^unfake\.it$/,
  },
  async ready () {
    const frame = $('frame');
    const i = frame.src.lastIndexOf('http://');
    await $.openLink(frame.src.substr(i));
  },
});
