_.register({
  rule: {
    host: /^oxyl\.me$/,
  },
  async ready () {
    // If the list contains only one link
    const l = $.$$('.links-container.result-form > a.result-a');
    // If only one link, we redirect to it
    if (l.length > 1) {
      return;
    }
    await $.openLink(l[0].href);
  },
});
