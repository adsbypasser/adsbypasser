(function () {
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
