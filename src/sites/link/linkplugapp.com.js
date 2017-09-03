_.register({
  rule: {
    host: /^(www\.)?linkplugapp\.com$/,
  },
  async ready () {
    const a = $('#mc_embed_signup_scroll a');
    await $.openLink(a.href);
  },
});
