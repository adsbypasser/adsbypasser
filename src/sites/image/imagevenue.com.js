/**
 * @domain imagevenue.com
 */
_.register({
  rule: {
    host: /^www\.imagevenue\.com$/,
  },
  async ready() {
    const i = $.$("#main-image");
    if (i) {
     await $.openImage(i.src);
     return;
    }
    const a = $('a[title="Continue to ImageVenue"]');
    await $.openLink(a.href);
  },
});
