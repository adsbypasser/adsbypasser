(function () {

  const defaultAction = _.partial(action, '#continuetoimage > form input', 'img[class^=centred]');

  _.register({
    rule: [
      {
        host: [
          // com
          /^imghit\.com$/,
          /^imgdawgknuttz\.com$/,
          /^(i|xxx)\.hentaiyoutube\.com$/,
          // eu
          /(^|\.)55888\.eu$/,
          // site
          /^picz\.site$/,
          // else
          /^acidimg\.cc$/,
          /^s\.imghost\.top$/,
          /^xxxwebdlxxx\.(org|top)$/,
        ],
        path: /\/img-.*\.html/,
      },
      {
        host: /^imgking\.co$/,
        path: /^\/img4?-.*\.html/,
      },
    ],
    ready: defaultAction,
  });

  _.register({
    rule: [
      {
        host: /^imgking\.co$/,
        path: /^\/imgs-.*\.html/,
      },
      {
        host: /^imgkings\.com$/,
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
      path: /^\/y-[ao1]\/(.+)\.jpeg\.html/,
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
    rule: [
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
      host: [
        /^imgcloud\.pw$/,
        /^pilot007\.org$/,
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
