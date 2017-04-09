_.register({
  rule: {
    host: /^(www\.)?dereferer\.website$/,
    query: /^\?(.+)/,
  },
  async start (m) {
    await $.openLink(m.query[1]);
  },
});
