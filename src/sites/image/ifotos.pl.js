_.register({
  rule: [
    'http://ifotos.pl/zobacz/*',
    'https://postimg.cc/*',
    'https://pixxxels.cc/*',
  ],
  async ready () {
    const m = $('meta[property="og:image"]');
    await $.openImage(m.content);
  },
});
