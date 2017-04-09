_.register({
  rule: {
    host: /^imagik\.fr$/,
    path: /^\/view(-rl)?\/(.+)/,
  },
  async start (m) {
    // mimetype is text/plain
    await $.openImage('/uploads/' + m.path[2]);
  },
});
