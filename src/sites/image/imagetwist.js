(function () {

  _.register({
    rule: {
      host: /^imagenpic\.com$/,
      path: /^\/.*\/.+\.html?$/,
    },
    ready: _.partial(run, true),
  });

  _.register({
    rule: {
      host: [
        /^imagetwist\.com$/,
        /^imagexport\.com$/,
      ],
    },
    ready: _.partial(run, false),
  });

  async function run (rp) {
    // dirty hack, prevent scripts appending elements
    if ($.window.jQuery) {
      $.window.jQuery.prototype.append = undefined;
    }
    const i = $('img.pic');
    await $.openImage(i.src, {
      replace: rp,
    });
  }

})();
