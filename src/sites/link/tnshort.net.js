/**
 * @domain go.tnshort.net
 */
_.register({
  rule: {
    host: /^go\.tnshort\.net$/,
  },
  async ready() {
    await _.wait(3000);
    const a = $('a[class="btn btn-success btn-lg get-link"]');
    await $.openLink(a.href);
  },
});
