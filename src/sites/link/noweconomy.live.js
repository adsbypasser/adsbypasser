_.register({
  rule: {
    host: /^noweconomy\.live$/,
  },
  async ready () {
    const a = $('[class="btn-main get-link"]');
    await $.openLink(a.href);
  },
});
