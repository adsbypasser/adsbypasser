_.register({
  rule: {
    host: /^(www\.)?coolrom\.com$/,
    path: /^\/dlpop\.php$/,
  },
  async ready () {
    const matches = $.searchFromScripts(/<form method="POST" action="([^"]+)">/);
    await $.openLink(matches[1]);
  },
});
