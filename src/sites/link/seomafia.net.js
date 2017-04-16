_.register({
  rule: {
    host: /^(www\.)?(apploadz\.ru|seomafia\.net)$/
  },
  async ready () {
    $.remove('iframe');
    const a = $('table a');
    await $.openLink(a.href);
  },
});
