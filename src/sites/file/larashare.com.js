_.register({
  rule: {
    host: /^(www\.)?larashare\.com$/,
    path: /^\/do\.php$/,
    query: /id=\d+/,
  },
  async start () {
    await $.openLink(document.location.href.replace('id=','down='));
  },
});
