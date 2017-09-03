_.register({
  rule: {
    host: /^(www\.)?1tiny\.net$/,
    path: /\/\w+/,
  },
  async ready () {
    const directUrl = $.searchFromScripts(/window\.location='([^']+)';/);
    if (!directUrl) {
      throw new _.AdsBypasserError('script content changed');
    }
    await $.openLink(directUrl[1]);
  },
});
