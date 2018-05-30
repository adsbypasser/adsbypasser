_.register({
  rule: {
    host: [
      /^(b4he|fullimg)\.com$/,
    ],
    query: /^\?v=([^&]+)/,
  },
  async start (m) {
    await $.openImage('/images/' + m.query[1]);
  },
});

_.register({
  rule: {
    host: /^imagep2p\.com$/,
    query: /^\?v=([^&]+)/,
  },
  async start (m) {
    await $.openImage('/images/' + m.query[1] + '.jpeg');
  },
});
