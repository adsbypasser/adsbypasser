_.register({
  rule: {
    host: [
      /^(www\.)?apploadz\.ru$/,
      /^(www\.)?seomafia\.net$/,
    ],
  },
  async ready () {
    $.remove('iframe');
    const a = $('table a');
    await $.openLink(a.href);
  },
});
