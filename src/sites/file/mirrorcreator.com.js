_.register({
  rule: {
    host: [
      /^(www\.)?mirrorcreator\.com$/,
      /^(www\.)?mirrored\.to$/,
    ],
    path: /^\/downlink\//,
  },
  async ready () {
    const a = $('.col-sm.centered.highlight a');
    await $.openLink(a.href);
  },
});


_.register({
  rule: {
    host: [
      /^(www\.)?mirrorcreator\.com$/,
      /^(www\.)?mirrored\.to$/,
    ],
    path: /^\/files\//,
  },
  async ready () {
    const b = $('.col-sm.centered.highlight form button');
    b.click();
  },
});
