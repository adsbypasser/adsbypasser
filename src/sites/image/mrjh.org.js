_.register({
  rule: {
    host: /^www\.mrjh\.org$/,
    path: /^\/gallery\.php$/,
    query: /^\?entry=(.+)$/,
  },
  async ready (m) {
    const url = m.query[1];
    await $.openImage('/' + url);
  },
});
