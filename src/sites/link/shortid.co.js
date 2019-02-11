_.register({
  rule: {
    host: /^shortid\.co$/,
    path: /^\/[a-zA-Z0-9]+/,
  },
  async ready () {
    const s = $('a#makingdifferenttimer');
    await $.openLink(s.href);
  },
});
