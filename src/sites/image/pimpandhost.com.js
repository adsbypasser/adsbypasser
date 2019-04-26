_.register({
  rule: {
    host: /^(www\.)?pimpandhost\.com$/,
    path: /^\/image\/\d+/,
    query: /^\?size=original/,
  },
  async ready () {
    const img = $('#overflow-wrapper img.original');
    await $.openImage(img.src);
  },
});

_.register({
  rule: {
    host: /^(www\.)?pimpandhost\.com$/,
    path: /^\/image\/\d+/,
  },
  async start (m) {
    await $.openLink(m.path + '?size=original');
  },
});
