(function () {

  _.register({
    rule: {
      host: [
        /^img(fantasy|leech|\.pornleech|smile|nemo|sense|curl)\.com$/,
        /^(imagedomino|lovechix|imagebic)\.com$/,
        /^0img\.net$/,
        /^daily-img\.com$/,
        /^picangel\.in$/,
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
