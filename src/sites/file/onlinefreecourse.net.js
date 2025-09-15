/**
 * @domain onlinefreecourse.net
 */
_.register({
  rule: {
    host: /^www\.onlinefreecourse\.net$/,
  },
  async ready() {
    const a = $('a[class="btn btn-success"]');
    await $.openLink(a);
  },
});
