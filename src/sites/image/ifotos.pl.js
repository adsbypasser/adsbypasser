_.register({
  rule: 'http://ifotos.pl/zobacz/*',
  rule: 'https://postimg.cc/*',
  async ready () {
    const m = $('meta[property="og:image"]');
    await $.openImage(m.content);
  },
});
