(function () {

  _.register({
    rule: {
      host: [
        /^img(fantasy|smile|nemo|curl)\.com$/,
        /^(imagedomino|lovechix)\.com$/,
        /^0img\.net$/,
        /^bunnyforum\.org$/,
      ],
      query: /^\?[pv]=/,
    },
    ready: _.partial(helper, false),
  });

  _.register({
    rule: {
      host: /^imgsay\.com$/,
      query: /^\?[pv]=/,
    },
    ready: _.partial(helper, true),
  });

  async function helper (doReplace) {
    if ($.window.confirmAge) {
      $.window.confirmAge(1);
      return;
    }
    const i = $('#container-home img[onclick]');
    await $.openImage(i.src, {
      replace: doReplace,
    });
  }

})();
