_.register({
  rule: {
    host: /^ilovebanten\.com$/,
  },
  async ready () {
    const p = $('.notblocked');
    await $.openLink(p.textContent);
  },
});
