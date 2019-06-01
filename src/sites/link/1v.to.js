_.register({
  rule: {
    host: /^1v\.to$/,
    path: /^\/t\/[a-zA-Z0-9/=]+/,
  },
  async start () {
    const path = window.location.href.replace('/t/', '/saliendo/');
    await $.openLink(path);
  },
});
