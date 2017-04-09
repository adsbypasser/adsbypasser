_.register({
  rule: {
    host: /^urlinn\.com$/,
  },
  async ready () {
    const m = $('META[HTTP-EQUIV=refresh]').getAttribute('CONTENT').match(/url='([^']+)'/);
    if (m) {
      await $.openLink(m[1]);
    }
  },
});
