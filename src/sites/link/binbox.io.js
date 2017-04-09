// Binbox links
_.register({
  rule: {
    host: /^(www\.)?([a-zA-Z0-9]+\.)?binbox\.io$/,
    path: /\/o\/([a-zA-Z0-9]+)/,
  },
  async start (m) {
    const direct_link = window.atob(m.path[1]);
    await $.openLink(direct_link);
  },
});
