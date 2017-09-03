_.register({
  rule: 'http://ifotos.pl/zobacz/*',
  async ready () {
    const m = $('meta[property="og:image"]');
    await $.openImage(m.content);
  },
});
