(function () {

  const defaultAction = _.partial(action, '#continuetoimage > form input', 'img[class^=centred]');

  _.register({
    rule: [
      {
        host: [
          // com
          // starts with image
          /^image(ontime|corn|picsa|horse|decode)\.com$/,
          // ends with image
          /^(zonezeed|zelje|croft|myhot|bok|hostur|greasy|dam)image\.com$/,
          // starts with img
          /^img(icy|next|savvy|\.spicyzilla|twyti|xyz|devil|tzar|ban|pu|beer|wet|tornado|kicks|nimz|binbou|2share|22|cover|hit|main|trial|blank|reputa|fapper|reality|part)\.com$/,
          /^(i\.)?imgseeds?\.com$/,
          // starts with img-
          /^img-(zone|planet|pay|uploads)\.com$/,
          // starts with www
          /^www\.img(blow|lemon|4sharing)\.com$/,
          /^www\.imagefolks\.com$/,
          /^www\.freephotohostin\.com$/,
          /^(www\.)?imgult\.com$/,
          // starts with xxx
          /^xxx(imagenow|screens)\.com$/,
          /^xxxsparrow?\.com$/,
          /^xxxwebdlxxx\.org$/,
          // else
          /^(playimg|picstwist|ericsony|wpc8|uplimg|lexiit|thumbnailus|newimagepost|fapingpics|dimtus|tinizo)\.com$/,
          /^((i|hentai)\.)?imgslip\.com$/,
          /^(i|xxx)\.hentaiyoutube\.com$/,
          /^(go|er)imge\.com$/,
          /^nim(plus|zshare)\.com$/,
          /^nudeximg\.com$/,
          // net
          /^img(serve|coin|fap|candy|master|-view|run|boom|project|python|pics|pix)\.net$/,
          /^(imagesouls|naughtygate|gallerycloud|imagelaser|picture-bang|project-photo|pix-link|funimg|golfpit|xximg)\.net$/,
          // org
          /^(shot|adult)img\.org$/,
          /^image(\.adlock|on|team)\.org$/,
          /^(voyeur|teen|mega)image\.org$/,
          /^teenshot\.org$/,
          /^img(studio|spot)\.org$/,
          // else
          /^www\.hotimage\.uk$/,
          /^hotimages\.eu$/,
          /(^|\.)55888\.eu$/,
          /^imgcloud\.co$/,
          /^pixup\.us$/,
          /^(pop-img|ads-img)\.info$/,
          /^(domaink|porno-pirat)\.ru$/,
          /^xxx\.pornscreen\.xyz$/,
          /^picz\.site$/,
          /^darpix\.ga$/,
          /^ipicture\.su$/,
          /^acidimg\.cc$/,
          /^s\.imghost\.top$/,
          /^pic\.hotimg\.site$/,
        ],
        path: /^\/img-.*\.html/,
      },
      {
        host: [
          /^hentai-pop\.com$/,
          /^star-hentai\.com$/,
        ],
        path: /^\/[ti]\/img-.*\.html/,
      },
      {
        host: /^imgking\.co$/,
        path: /^\/img4?-.*\.html/,
      },
      {
        host: /^ima\.gy$/,
        path: /^\/i\/.+$/,
      },
    ],
    ready: defaultAction,
  });

  _.register({
    rule: {
      host: /^imgrat\.com$/,
      path: /^\/img-.*\.html/,
    },
    ready: _.partial(action, '#close', '#main_image img.center-block.img-responsive'),
  });

  // TODO need to refactor the cookie rule
  _.register({
    rule: {
      host: [
        /^(www\.)?imgfresh\.info$/,
      ],
      path: /^\/img-.*\.html$/,
    },
    async ready () {
      $.remove('iframe');

      let node = $.$('#continuetoimage > form input');
      if (node) {
        // first pass
        node.click();
        // somehow imgrun.net need to click twice
        node.click();
        return;
      }

      // the cookies are shared in the whole domain
      // we have to reset cookies to prevent wrong state
      $.resetCookies();

      // second pass
      node = $.$('img[class^=centred]');
      if (node) {
        await $.openImage(node.src);
        return;
      }

      // simulate session
      await $.post(window.location.href.toString(), {
        cti: 1,
        ref: '',
        rc: 1,
        rp: 1,
        bt: 0,
        bw: 'edge',
      });
      window.location.reload();
    },
  });

  _.register({
    rule: [
      {
        host: /^imgking\.co$/,
        path: /^\/imgs-.*\.html/,
      },
      {
        host: [
          /^img(kings|prime)\.com$/,
          /^imagerar\.com$/,
        ],
        path: /^\/img-.*\.html/,
      },
    ],
    async ready () {
      const url = $.window.linkid;
      await $.openImage(url);
    },
  });

  _.register({
    rule: {
      host: /^imgkings\.com$/,
      path: /^\/img2-.*\.html/,
    },
    ready: defaultAction,
  });

  _.register({
    rule: {
      host: /^imgprime\.com$/,
      path: /^\/imga-u\/(.+)\.jpeg\.html/,
    },
    async ready () {
      const path = window.location.href.replace('/imga-u', '/u').replace('.html', '');
      await $.openLink(path);
    },
  });

  _.register({
    rule: [
      {
        host: /^imagerar\.com$/,
        path: /^\/img2-/,
      },
      {
        host: /^imgking\.co$/,
        path: /^\/img[v3]-.*\.html/,
      },
      {
        host: /^imgprime\.com$/,
        path: /^\/img.*\.html$/,
      },
    ],
    async ready () {
      const i = $('img[alt]');
      await $.openImage(i.src);
    },
  });

  _.register({
    rule: {
      host: /^imx\.to$/,
      path: [
        /^\/img-.*\.html/,
        /^\/i\/.*/,
      ],
    },
    ready: _.partial(action, '#continuebutton, #continuetoimage input[type="submit"]', 'img[class^=centred]'),
  });

  _.register({
    rule: {
      host: [
        /^(www\.)?imgdrive\.net$/,
        /^(www\.)?img(taxi|wallet|adult)\.com$/,
      ],
      path: /^\/img-.*\.html$/,
    },
    async ready () {
      let m = $('meta[property="og:image"]');
      m = m.content.replace('small', 'big');
      await $.openImage(m);
    },
  });

  async function action (firstSelector, secondSelector) {
    $.remove('iframe, #adblock_detect, .popupOverlay');

    const node = $.$(firstSelector);
    if (node) {
      // first pass
      await _.wait(500);
      node.removeAttribute('disabled');
      await _.wait(500);
      // HACK some sites can not receive the click event without focus
      node.focus();
      // HACK some sites needs to click multiple times
      node.click();
      node.click();
      node.click();
      return;
    }

    // second pass
    const i = $(secondSelector);
    await $.openImage(i.src);
  }

})();
