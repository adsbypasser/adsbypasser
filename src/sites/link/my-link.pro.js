_.register({
  rule: 'http://my-link.pro/*',
  async ready () {
    // Find the iframe that is used to display the real link
    const i = $('iframe[scrolling=auto]');
    if (i) {
      await $.openLink(i.src);
    }
  },
});
