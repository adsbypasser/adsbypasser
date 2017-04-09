_.register({
  rule: 'http://www.lienscash.com/l/*',
  async ready () {
    const a = $('#redir_btn');
    await $.openLink(a.href);
  },
});
