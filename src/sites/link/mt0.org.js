_.register({
  rule: {
    host: /^mt0\.org$/,
    path: /^\/[^/]+\/$/,
  },
  async ready () {
    $.remove('frame[name=bottom]');
    const f = $('frame[name=top]');
    // XXX threw away promise
    const i = setInterval(() => {
      const a = $.$('div a', f.contentDocument);
      if (!a) {
        return;
      }
      clearInterval(i);
      $.openLink(a.href);
    }, 1000);
  },
});
