(function () {

  const defaultAction = _.partial(action, '#continuetoimage > form input', 'img[class^=centred]');

  _.register({
    rule: [
      {
        host: [
          // com
          /^(imagecorn|imagedecode|imageko|imageshtorm|imageraven)\.com$/,
          /^(imgicy|imgsavvy|imgtzar|imgtornado|imgkicks|img2share)\.com$/,
          /^(imgtrial|imgreputa|imgfapper|imgpart|imgbalana|imgjazz)\.com$/,
          /^(hosturimage|greasyimage|damimage|xxxscreens|wpc8|dimtus)\.com$/,
          /^(imgixxx|imghit|imgmain|img-planet|img-pay)\.com$/,
          /^(tinizo|erimge|nimzshare|hdmoza|imgdawgknuttz)\.com$/,
          /^(www\.)?(imglemon|imageblinks|multiimg)\.com$/,
          /^(i|xxx)\.hentaiyoutube\.com$/,
          /^(i\.)?imgseeds?\.com$/,
          // eu
          /^hotimages\.eu$/,
          /(^|\.)55888\.eu$/,
          // net
          /^(imgserve|imgproject|imgpython|imgpix|naughtygate|gallerycloud|xximg|img-view)\.net$/,
          // org
          /^(xxxwebdlxxx|teenshot|imageon|imageteam|voyeurimage|teenimage|megaimage)\.org$/,
          /^(imgstudio|imgspot)\.org$/,
          // site
          /^(picz|unporn)\.site$/,
          /^pic\.hotimg\.site$/,
          // xyz
          /^(dalezobux|ecoimages|uvonahaze)\.xyz$/,
          /^xxx\.(sexex|pornscreen)\.xyz$/,
          // else
          /^acidimg\.cc$/,
          /^underpic\.club$/,
          /^imgcloud\.co$/,
          /^darpix\.ga$/,
          /^(pop-img|ads-img)\.info$/,
          /^cubonaw\.ml$/,
          /^(domaink|porno-pirat)\.ru$/,
          /^ipicture\.su$/,
          /^imagespublic\.tk$/,
          /^s\.imghost\.top$/,
          /^www\.hotimage\.uk$/,
          /^pixup\.us$/,
        ],
        path: /\/img-.*\.html/,
      },
      {
        host: /^(hentai-pop|star-hentai)\.com$/,
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
        host: /^(imgkings|imagerar)\.com$/,
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
    async start () {
      const path = window.location.href.replace('/imga-u', '/u').replace('.html', '');
      await $.openLink(path);
    },
  });

  _.register({
    rule: {
      host: /^pornyfap\.com$/,
      path: /\/pic\//,
    },
    async ready () {
      const p = $('img#myImg');
      await $.openImage(p.src);
    },
  });

  _.register({
    rule: {
      host: /^funimg\.net$/,
      path: /\/img-.*\.html/,
    },
    async start () {
      const path = window.location.href.replace('/img-', '/img3-');
      await $.openLink(path);
    },
  });

  _.register({
    rule: {
      host: /^funimg\.net$/,
      path: /\/img3-.*\.html/,
    },
    async ready () {
      const i = $('#continuetoimage img');
      await $.openImage(i.src);
    },
  });

  _.register({
    rule: {
      host: /^22pixx\.xyz$/,
      path: /^\/ia-[io]\/(.+)\.jpeg\.html/,
    },
    async start () {
      const path = window.location.href.replace('/ia-', '/').replace('.html', '');
      await $.openLink(path);
    },
  });

  _.register({
    rule: {
      host: /^22pixx\.xyz$/,
      path: /^\/i-a\/(.+)\.jpeg\.html/,
    },
    async start () {
      const path = window.location.href.replace('/i-', '/').replace('.html', '');
      await $.openLink(path);
    },
  });

  _.register({
    rule: {
      host: /^22pixx\.xyz$/,
      path: /^\/x-[or]\/(.+)\.jpeg\.html/,
    },
    async start () {
      const path = window.location.href.replace('/x-', '/').replace('.html', '');
      await $.openLink(path);
    },
  });

  _.register({
    rule: {
      host: /^22pixx\.xyz$/,
      path: /^\/y-[ao]\/(.+)\.jpeg\.html/,
    },
    async start () {
      const path = window.location.href.replace('/y-', '/').replace('.html', '');
      await $.openLink(path);
    },
  });

  _.register({
    rule: {
      host: /^22pixx\.xyz$/,
      path: /^\/x-i\/(.+)\.jpeg\.html/,
    },
    async start () {
      const path = window.location.href.replace('/x', '/y');
      await $.openLink(path);
    },
  });

  _.register({
    rule: {
      host: /^trueimg\.xyz$/,
      path: /^\/u-b\/(.+)\.jpeg\.html/,
    },
    async start () {
      const path = window.location.href.replace('/u-', '/').replace('.html', '');
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
        host: /^picstate\.com$/,
        path: /^\/view\/full\/.*/,
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

  _.register({
    rule: {
      host: /^imagescanner\.cc$/,
      path: /^\/.*\.jpg\.html/,
    },
    async start () {
      const path = window.location.href.replace('.html', '');
      await $.openLink(path);
    },
  });

  _.register({
    rule: {
      host: [
        /^imgcloud\.pw$/,
        /^pspic\.org$/,
      ],
      path: /^\/image\/.*/,
    },
    async ready () {
      const l = $('link[rel="image_src"]');
      await $.openImage(l.href);
    },
  });

  async function action (firstSelector, secondSelector) {
    $.remove('iframe, #adblock_detect, .popupOverlay');

    let node = $.$(firstSelector);
    if (node) {
      node = findFirstForm(node);
      // clone the form and replace it to body to strip events
      document.body.innerHTML = node.outerHTML;
      node = $('form input');
      node.click();
      return;
    }

    // second pass
    node = $(secondSelector);
    await $.openImage(node.src);
  }

  function findFirstForm (child) {
    while (child && child.localName !== 'form') {
      child = child.parentElement;
    }
    return child;
  }

})();
