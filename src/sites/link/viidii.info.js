_.register({
  rule: {
    host: /^www\.viidii\.info$/,
  },
  async ready () {
    const o = $('#directlink');
    await $.openLink(o.href);
  },
});
