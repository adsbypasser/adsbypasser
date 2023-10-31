(function () {

  const PATH_RULE = /^\/([0-9a-zA-Z-_]+)(\.|\/|$)/;

  _.register({
    rule: {
      host: [
        /^imgmonkey\.com$/,
        /^(imgsen|imgsto|kvador|kropic|picdollar|silverpic)\.com$/,
        /^(imgclick|pics4you)\.net$/,
        /^imgstar\.eu$/,
      ],
      path: PATH_RULE,
    },
    async ready (m) {
      await helper(m.path[1], getNext1);
    },
  });

  _.register({
    rule: {
      host: /^(picbaron|imgbaron|kvador|fotokiz)\.com$/,
      path: PATH_RULE,
    },
    async ready () {
      const i = $.$('img.pic');
      if (i) {
        // second stage
        await $.openImage(i.src);
        return;
      }

      const f = $('form');
      f.submit();
    },
  });

  function getNext1 (i) {
    return i.value;
  }

  async function helper (id, getNext) {
    const recaptcha = $.$('#recaptcha_widget, #captcha');
    if (recaptcha) {
      _.info('stop because recaptcha');
      return;
    }

    let i = $.$('input[name="next"]');
    if (i) {
      // first stage
      const next = getNext(i);
      await go(id, $('input[name="pre"]').value, next);
      return;
    }

    i = $.$('img.picview, img.pic');
    if (i) {
      // second stage
      await $.openImage(i.src);
      return;
    }

    // other page
    _.info('do nothing');
  }

  async function go (id, pre, next) {
    await $.openLink('', {
      post: {
        op: 'view',
        id: id,
        pre: pre,
        next: next,
        adb: '0',
      },
    });
  }

})();
