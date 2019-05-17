_.register({
  rule: {
    host: /^hen-tay\.net$/,
    path: /^\/go\//,
  },
  async ready () {
    const h = $('#download_url div a');
    await $.openLink(h.href);
  },
});
