(function () {

  _.register({
    rule: {
      host: /^imgspice\.com$/,
    },
    ready: run,
  });

  async function run () {
    const o = $('#download_box img[id]');
    await $.openImage(o.src);
  }

})();
