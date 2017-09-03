_.register({
  rule: [
    {
      host: /^imagescream\.com$/,
      path: /^\/img\/(soft\/)?/,
    },
    {
      host: /^(www\.)?(picturescream|picturevip)\.com$/,
      path: /^\/x\//,
    },
    {
      host: [
        /^picturescream\.asia$/,
        /^uploadimage\.eu$/,
      ],
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
      /^(imagescream|anonpic)\.com$/,
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
