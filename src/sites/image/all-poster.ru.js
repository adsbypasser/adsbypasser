_.register({
  rule: {
    host: /^all-poster\.ru$/,
    query: /^\?v=/,
  },
  async ready () {
    const i = $('#imagen img');
    await $.openImage(i.src);
  },
});

_.register({
  rule: {
    host: /^bunnyforum\.org$/,
    query: /^\?v=/,
  },
  async ready () {
    const i = $('img[title^=Click]');
    await $.openImage(i.src);
  },
});
