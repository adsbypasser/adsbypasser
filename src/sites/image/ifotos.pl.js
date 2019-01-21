_.register({
  rule: [
    'http://ifotos.pl/zobacz/*',
    'https://postimg.cc/*',
  ],
  async ready () {
    const m = $('meta[property="og:image"]');
    await $.openImage(m.content);
  },
});
