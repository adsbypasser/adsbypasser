_.register({
  rule: {
    host: [
      /^semprot\.com$/,
      /^46\.166\.167\.16$/,
    ],
    path: /^\/ahli\.php/,
    query: /^\?url=(.*)/,
  },
  async ready () {
    const sem = $.searchFromScripts(/var the_url = '([^']+)';/);
    await $.openLink(sem[1]);
  },
});
