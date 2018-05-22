_.register({
  rule: [
    {
      host: /^imagescream\.com$/,
      path: /^\/img\/(soft\/)?/,
    },
    {
      host: /^(www\.)?picturescream\.com$/,
      path: /^\/x\//,
    },
    {
      host: /^picturescream\.asia$/,
    },
    {
      host: /^postscreens\.info/,
      path: /^\/.*/,
    },
  ],
  async ready () {
    const i = $('#shortURL-content img');
    await $.openImage(i.src);
  },
});

_.register({
  rule: {
    host: [
      /^imagescream\.com$/,
      /^all-poster\.ru$/,
    ],
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
