_.register({
  rule: {
    host: /^keptarolo\.hu$/,
    path: /^(\/[^/]+\/[^/]+\.jpg)$/,
  },
  async start (m) {
    await $.openImage('http://www.keptarolo.hu/kep' + m.path[1]);
  },
});
