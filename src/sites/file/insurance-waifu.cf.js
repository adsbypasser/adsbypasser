_.register({
  rule: {
    host: /^insurance-waifu\.cf$/,
    query: /u=(.+)$/,
  },
  async ready () {
    const f = $('form');
    const args = {};
    _.forEach(f, (v) => {
      args[v.name] = v.value;
    });
    const response = await $.post(f.getAttribute('action'), args);
    const l = response.match(/window\.location\.href.'([^']+)';/);
    await $.openLink(l[1]);
  },
});
