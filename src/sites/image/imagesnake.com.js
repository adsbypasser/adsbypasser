(function () {

  _.register({
    rule: [
      {
        host: /^imageban\.(ru|net)$/,
        path: /^\/show\/\d{4}\/\d{2}\/\d{2}\/.+/,
      },
    ],
    ready: run,
  });

  async function run () {
    const i = $('#img_obj');
    await $.openImage(i.src, {
      referer: true,
    });
  }

})();
