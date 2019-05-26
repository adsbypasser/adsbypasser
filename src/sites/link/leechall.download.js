_.register({
  rule: {
    host: /^leechall\.download$/,
    path: /^\/file\/([a-zA-Z0-9/=]+)/,
  },
  async start (m) {
    await $.openLink(decodeURIComponent(atob(m.path[1])));
  },
});
