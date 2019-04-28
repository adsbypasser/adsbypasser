// TODO actually a variant of linkdrop.net
// needs to fake some data to "wi.cr/links/go"
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
