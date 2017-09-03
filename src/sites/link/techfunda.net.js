_.register({
  rule: {
    host: /^techfunda\.net$/,
    path: [
      /^\/link\//,
      /^\/safe\//,
    ],
  },
  async ready () {
    const a = $('.hide a.btn');
    await $.openLink(a.href);
  },
});
