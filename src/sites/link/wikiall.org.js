_.register({
  rule: {
    host: /^wikiall\.org$/,
  },
  async ready () {
    const div = $('div#place.get-btn');

    const o = new MutationObserver(() => {
      const a = $.$('div#place.get-btn > a[href]');
      if (a && a.href) {
        $.openLink(a.href);
      }
    });
    o.observe(div, {
      childList: true
    });
  },
});
