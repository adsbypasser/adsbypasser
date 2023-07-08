(function () {

  _.register({
    rule: {
      host: /^imagetwist\.netlify\.app$/,
    },
    async ready () {
      const a = $('form > center > h2 > p > a');
      await $.openLink(d.href);
    },
  });

  _.register({
    rule: [
      {
        host: /^imagenpic\.com$/,
        path: /^\/.*\/.+\.html?$/,
      },
      {
        host: [
          /^imagetwist\.com$/,
          /^vipr\.im$/,
        ]
      },
    ],
    ready: run,
  });

  _.register({
    rule: {
      host: /^(imagexport|imageshimage)\.com$/,
    },
    ready: run,
  });

  async function run () {
    const i = $('img.pic');
    await $.openImage(i.src, {
      replace: true,
    });
  }

})();
