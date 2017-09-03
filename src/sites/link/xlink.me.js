_.register({
  rule: {
    host: /^xlink\.me$/,
  },
  async ready () {
    const a = $('#main_form > center > a');
    if (!a) {
      return;
    }
    await $.openLink(a.href);
  },
});
