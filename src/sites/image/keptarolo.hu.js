_.register({
  rule: {
    host: /^keptarolo\.hu$/,
    path: /^(\/[^/]+\/[^/]+)$/,
  },
  async start (m) {
    await $.openImage('http://www.keptarolo.hu/kep' + m.path[1]);
  },
});
