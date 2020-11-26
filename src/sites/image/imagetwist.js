(function () {

  _.register({
    rule: [
      {
        host: /^imagenpic\.com$/,
        path: /^\/.*\/.+\.html?$/,
      },
      {
        host: /^imagetwist\.com$/,
      },
      {
        host: /^vipr\.im$/,
      },
    ],
    ready: _.partial(run, true),
  });

  _.register({
    rule: {
      host: /^(imagexport|imageshimage)\.com$/,
    },
    ready: _.partial(run, false),
  });

  async function run (rp) {
    const i = $('img.pic');
    await $.openImage(i.src);
  }

})();
