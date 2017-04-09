_.register({
  rule: {
    host: [
      /^imageheli\.com$/,
      /^imgtube\.net$/,
      /^pixliv\.com$/,
    ],
    path: /^\/img-([a-zA-Z0-9-]+)\..+$/,
  },
  async ready () {
    const a = $.$('a[rel="lightbox"]');
    if (!a) {
      await $.openLink('', {
        post: {
          browser_fingerprint: '',
          ads: '0',
        },
      });
      return;
    }
    await $.openImage(a.href);
  },
});
