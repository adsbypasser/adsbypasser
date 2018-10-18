(function () {

  const defaultAction = _.partial(action, '#continuetoimage > form input', 'img[class^=centred]');

  _.register({
    rule: [
      {
        host: [
          // com
          /^(imagecorn|imagedecode|imageko)\.com$/,
          /^(hosturimage|greasyimage|damimage)\.com$/,
          /^(imgicy|imgsavvy|imgtzar|imgtornado|imgkicks|img2share|imghit|imgmain)\.com$/,
          /^(imgtrial|imgreputa|imgfapper|imgpart|imgbalana|imgjazz)\.com$/,
          /^(i\.)?imgseeds?\.com$/,
          /^(img-planet|img-pay)\.com$/,
          /^(www\.)?(imglemon|imageblinks)\.com$/,
          /^xxxscreens\.com$/,
          /^(wpc8|dimtus|tinizo|erimge|nimzshare|hdmoza)\.com$/,
          /^(i|xxx)\.hentaiyoutube\.com$/,
          // org
          /^(xxxwebdlxxx|teenshot)\.org$/,
          /^(imageon|imageteam)\.org$/,
          /^(voyeurimage|teenimage|megaimage)\.org$/,
          /^(imgstudio|imgspot)\.org$/,
          // net
          /^(imgserve|imgproject|imgpython|imgpix)\.net$/,
          /^img-view\.net$/,
          /^(naughtygate|gallerycloud)\.net$/,
          /^(funimg|xximg)\.net$/,
          // eu
          /^hotimages\.eu$/,
          /(^|\.)55888\.eu$/,
          // site
          /^picz\.site$/,
          /^pic\.hotimg\.site$/,
          // else
          /^www\.hotimage\.uk$/,
          /^imgcloud\.co$/,
          /^pixup\.us$/,
          /^(pop-img|ads-img)\.info$/,
          /^(domaink|porno-pirat)\.ru$/,
          /^xxx\.pornscreen\.xyz$/,
          /^darpix\.ga$/,
          /^ipicture\.su$/,
          /^acidimg\.cc$/,
          /^s\.imghost\.top$/,
          /^xxx\.sexex\.xyz$/,
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
      {
        host: /^picmoza\.com$/,
        path: /^\/\/?img-.*\.html$/,
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
      host: /^(www\.)?imgfresh\.info$/,
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
          /^imgkings\.com$/,
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
    rule: {
      host: /^22pixx\.xyz$/,
      path: /^\/ia-i\/(.+)\.jpeg\.html/,
    },
    async ready () {
      const path = window.location.href.replace('/ia-i', '/i').replace('.html', '');
      await $.openLink(path);
    },
  });

  _.register({
    rule: {
      host: /^22pixx\.xyz$/,
      path: /^\/x-i\/(.+)\.jpeg\.html/,
    },
    async ready () {
      const path = window.location.href.replace('/x', '/y');
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
    ],
    async ready () {
      const i = $('img[alt]');
      await $.openImage(i.src);
    },
  });

  _.register({
    rule: {
      host: /^imgprime\.com$/,
      path: /^\/img.*\.html$/,
    },
    async ready () {
      let a = $.$('#continuetoimage a');
      if (a) {
        await $.openLink(a.href);
        return;
      }
      a = $('img[alt]');
      await $.openImage(a.src);
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
        /^(www\.)?(imgtaxi|imgwallet|imgadult)\.com$/,
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
