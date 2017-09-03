_.register({
  rule: {
    host: /^durl\.me$/,
  },
  async ready () {
    const a = $('a[class="proceedBtn"]');
    await $.openLink(a.href);
  },
});
