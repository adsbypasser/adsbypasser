_.register({
  rule: 'http://rijaliti.info/*.php',
  async ready () {
    const a = $('#main td[align="center"] a');
    await $.openLink(a.href);
  },
});
