_.register({
  rule: {
    host: /^kimochi\.info$/,
    path: /^\/inter$/,
  },
  async ready() {
    const ma = $("a#next");
    await $.openLink(ma.href);
  },
});
