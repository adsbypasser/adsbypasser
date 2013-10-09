(function () {
  'use strict';

  // picshare
  $.register({
    rule: 'http://picshare.geenza.com/pics/*',
    run: function () {
      var i = $('#picShare_image_container');
      $.redirect(i.src);
    },
  });

  // alabout
  $.register({
    rule: {
      host: /(alabout|alafs)\.com$/,
    },
    run: function () {
      $.$$('a').each(function (a) {
        if (/http:\/\/(www\.)?(alabout|alafs)\.com\/j\.phtml\?url=/.test(a.href)) {
          a.href = a.textContent;
        }
      });
    },
  });

  // turboimagehost
  $.register({
    rule: {
      host: /^www\.turboimagehost\.com$/,
    },
    run: function () {
      var i = $('#imageid');
      $.redirect(i.src);
    },
  });

  // zpag
  $.register({
    rule: {
      host: /^zpag\.es$/,
    },
    run: function () {
      var matches = document.head.innerHTML;
      matches = matches.match(/window\.location\s*=\s*(['"])((?:\\\1|[^\1])*?)\1/);
      if (matches) {
        $.redirect(matches[2]);
      }
    },
  });

  // ichan (image)
  $.register({
    rule: {
      host: /^ichan\.org$/,
      path: /^\/image\.php$/,
      query: /path=(.+)$/,
    },
    run: function (m) {
      $.redirect('/' + m.query[1]);
    },
  });

  // ichan (board)
  $.register({
    rule: {
      host: /ichan\.org$/,
    },
    run: function () {
      $.$$('a').each(function (a) {
        if (a.href.indexOf('/url/http://') > -1) {
          a.href = a.href.replace(/http:\/\/.+\/url\/(?=http:\/\/)/, '');
        }
      });
    },
  });

  // viidii
  $.register({
    rule: {
      host: /^www\.viidii\.com$/,
    },
    run: function () {
      var o = $('#directlink');
      $.redirect(o.href);
    },
  });

  // adfoc
  $.register({
    rule: 'http://adfoc.us/serve/?id=*',
    run: function () {
      // FIXME mutation events has been deprecated, consider rewrite with
      // mutation observer
      document.addEventListener('DOMNodeInserted', function () {
        var o = $.$('#showSkip');
        if (o) {
          o = o.querySelector('a');
          $.redirect(o.href);
        }
      }, null);
    },
  });

  // madlink
  $.register({
    rule: function (uri_1, uri_3, uri_6) {
      if (!/^madlink\.sk$/.test(uri_6.host) || /\.html$/.test(uri_6.path)) {
        return null;
      }
      return uri_6.path.match(/^\/(.+)/);
    },
    run: function (m) {
      $.removeNodes('iframe');
      $.post('/ajax/check_redirect.php', {
        link: m.path[1],
      }, function (text) {
        $.redirect(text);
      });
    },
  });

  // stash-coins.com
  $.register({
    rule: {
      host: /^stash-coins\.com$/,
    },
    run: function () {
      var url = window.location.toString();
      var i = url.lastIndexOf('http');
      url = url.substr(i);
      $.redirect(url);
    },
  });

  // chevereto
  $.register({
    rule: [
      'http://www.4owl.info/*',
      'http://javelite.tk/viewer.php?id=*',
    ],
    run: function () {
      var i = $('table img');
      $.redirect(i.src);
    },
  });

  // directupload.net
  $.register({
    rule: 'http://*.directupload.net/file/*.htm',
    run: function () {
      var i = $('#showimage');
      $.redirect(i.src);
    },
  });

  // pixhub.eu
  $.register({
    rule: {
      host: /^pixhub\.eu$/,
    },
    run: function () {
      $.removeNodes('.adultpage, #FFN_Banner_Holder');
      $.enableScrolling();
    },
  });

  // imgah.com
  $.register({
    rule: {
      host: /^imgah\.com$/,
    },
    run: function () {
      // first stage
      var o = $.$('input[type=submit]');
      if (o) {
        o.click();
        return;
      }

      // second stage
      o = $('img.pic');
      $.replace(o.src);
    },
  });

  // imagebam.com
  $.register({
    rule: 'http://www.imagebam.com/image/*',
    run: function () {
      var o = $('#imageContainer img[id]');
      // somehow the server send image as an attachment
      // so I replace whole document.body with single img
      $.replace(o.src);
    },
  });

  // imgbar.net
  // second stage
  $.register({
    rule: {
      host: /^imgbar\.net$/,
      path: /^\/img_show\.php$/,
      query: /^\?view_id=/,
    },
    run: function () {
      var i = $('center img');
      $.redirect(i.src);
    },
  });

  // imgbar.net
  // first stage
  $.register({
    rule: {
      host: /^imgbar\.net$/,
    },
    run: function () {
      var i = $('div.panel.top form input[name=sid]');
      $.redirect('/img_show.php?view_id=' + i.value);
    },
  });

  // www.sexyimg.com
  $.register({
    rule: {
      host: /www\.sexyimg\.com/,
      path: /\/s\/.*\.html/,
    },
    run: function () {
      var f = $('#imgbox form');
      $.redirect(f.action);
    },
  });
  $.register({
    rule: {
      host: /www\.sexyimg\.com/,
      path: /\/b\/.*\.html/,
    },
    run: function () {
      var i = $('#imgbox img.bigimg');
      $.replace(i.src);
    },
  });

  // pics-money.ru
  $.register({
    rule: function (uri_1, uri_3, uri_6) {
      if (!/^pics-money\.ru$/.test(uri_6.host) || /^\/allpicfree\//.test(uri_6.path)) {
        return null;
      }
      return /^\/v\.php$/.test(uri_6.path);
    },
    run: function () {
      $.removeNodes('iframe');

      var i = $('center img:not([id])');
      $.redirect(i.src);
    },
  });

  // www.pics-money.ru
  $.register({
    rule: function (uri_1, uri_3, uri_6) {
      if (!/^www\.pics-money\.ru$/.test(uri_6.host) || /^\/allimage\//.test(uri_6.path)) {
        return null;
      }
      return true;
    },
    run: function () {
      $.removeNodes('iframe');

      var i = $('#d1 img');
      i = i.onclick.toString();
      i = i.match(/mshow\('(.+)'\)/);
      i = i[1];
      $.redirect(i);
    },
  });

  // goimagehost.com
  $.register({
    rule: {
      host: /goimagehost\.com/,
      path: /^\/xxx\/(.+)/,
    },
    run: function (m) {
      $.redirect('/xxx/images/' + m.path[1]);
    },
  });
  $.register({
    rule: {
      host: /goimagehost\.com/,
      query: /^\?v=(.+)/,
    },
    run: function (m) {
      $.redirect('/xxx/images/' + m.query[1]);
    },
  });

  // imagescream.com
  $.register({
    rule: {
      host: /^imagescream\.com$/,
      path: /^\/img\/soft\//,
    },
    run: function () {
      var i = $('#shortURL-content img');
      $.redirect(i.src);
    },
  });
  $.register({
    rule: {
      host: /^imagescream\.com$/,
      query: /^\?v=/,
    },
    run: function () {
      var i = $('#imagen img');
      $.redirect(i.src);
    },
  });

  // imgnip.com
  $.register({
    rule: {
      host: /^(www\.)?imgnip\.com$/,
      path: /^\/viewer.*\.php$/,
      query: /^\?file=.*/,
    },
    run: function () {
      var i = $('#main_image');
      $.redirect(i.src);
    },
  });

  // 1be.biz
  $.register({
    rule: {
      host: /^1be\.biz$/,
      path: /^\/s\.php$/,
      query: /^\?(.+)/,
    },
    run: function (m) {
      $.redirect(m.query[1]);
    },
  });

  // qrrro.com
  $.register({
    rule: {
      host: /^qrrro\.com$/,
      path: /^(\/images\/.+)\.html$/,
    },
    run: function (m) {
      $.redirect(m.path[1]);
    },
  });

  // pic-upload.de
  $.register({
    rule: 'http://www.pic-upload.de/view-*.html',
    run: function () {
      var i = $('#content + img');
      $.redirect(i.src);
    },
  });

  // bilder-hochladen.net
  // imagehosting.gr
  // this two are not homogeneous but do have same action
  $.register({
    rule: [
      'http://imagehosting.gr/*.html',
      'http://www.bilder-hochladen.net/files/*.html',
    ],
    run: function () {
      var i = $('td > img');
      $.redirect(i.src);
    },
  });

  // bayimg.com
  $.register({
    rule: {
      host: /^bayimg\.com$/,
    },
    run: function () {
      var i = $('#mainImage');
      $.redirect(i.src);
    },
  });

  // www.bild.me
  $.register({
    rule: 'http://www.bild.me/bild.php?file=*',
    run: function () {
      var i = $('#Bild');
      $.redirect(i.src);
    },
  });

  // www.bilder-upload.eu
  $.register({
    rule: 'http://www.bilder-upload.eu/show.php?file=*',
    run: function () {
      var i = $('input[type=image]');
      $.redirect(i.src);
    },
  });

  // bildr.no
  $.register({
    rule: 'http://bildr.no/view/*',
    run: function () {
      var i = $('img.bilde');
      $.redirect(i.src);
    },
  });

  // imagearn.com
  $.register({
    rule: 'http://imagearn.com/image.php?id=*',
    run: function () {
      var i = $('#img');
      $.redirect(i.src);
    },
  });

  // tinypic.com
  $.register({
    rule: 'http://tinypic.com/view.php?pic=*',
    run: function () {
      var i = $('#imgElement');
      $.redirect(i.src);
    },
  });

  // adlock
  $.register({
    rule: {
      host: /^adlock\.in$/,
    },
    run: function () {
      var a = $.$('#xre a.xxr');
      if (a) {
        $.redirect(a.href);
        return;
      }

      a = unsafeWindow.fileLocation;
      if (a) {
        $.redirect(a);
      }
    },
  });

  // p.pw
  $.register({
    rule: {
      host: /^p\.pw$/,
    },
    run: function () {
      $.removeNodes('iframe');

      var url = null;
      $.$$('script').find(function (script) {
        var m = script.innerHTML.match(/window\.location = "(.*)";/);
        if (m) {
          url = m[1];
          return true;
        }
      });

      $.redirect(url);
    },
  });

  // 3ra.be
  $.register({
    rule: {
      host: /^3ra\.be$/,
    },
    run: function () {
      $.removeNodes('iframe');

      var f = unsafeWindow.fc;
      if (!f) {
        throw new _.NoPicAdsError('window.fc is undefined');
      }
      f = f.toString();
      f = f.match(/href="([^"]*)/);
      if (!f) {
        throw new _.NoPicAdsError('url pattern outdated');
      }
      $.redirect(f[1]);
    },
  });

  // bilurl
  $.register({
    rule: {
      host: /^bilurl\.com$/,
    },
    run: function () {
      var d = $('#event');
      $.redirect(d.getAttribute('rel'));
    },
  });

  // adv.li
  $.register({
    rule: {
      host: /adv\.li$/,
    },
    run: function () {
      $.removeNodes('iframe');
      $.redirect(unsafeWindow._url);
    },
  });

  // cf.ly
  $.register({
    rule: {
      host: /^cf\.ly$/,
      path: /^\/[^\/]+$/,
    },
    run: function (m) {
      $.removeNodes('iframe');
      $.redirect('/skip' + m.path[0]);
    },
  });

  // seomafia.net
  $.register({
    rule: {
      host: /^seomafia\.net$/,
    },
    run: function () {
      $.removeNodes('iframe');
      var a = $('table a');
      $.redirect(a.href);
    },
  });

  // 4fun.tw
  $.register({
    rule: {
      host: /^4fun\.tw$/,
    },
    run: function () {
      var i = $('#original_url');
      $.redirect(i.value);
    },
  });

  // imgbabes.com
  $.register({
    rule: {
      host: /^www\.imgbabes\.com$/,
    },
    run: function () {
      var i = $('#this_image');
      $.redirect(i.src);
    },
  });

  // ulmt.in
  $.register({
    rule: {
      host: /^ulmt\.in$/,
    },
    run: function () {
      var s = unsafeWindow.CountdownTimer.toString();
      s = s.match(/href="([^"]+)"/);
      if (s) {
        $.redirect(s[1]);
        throw new _.NoPicAdsError('function changed');
      }
      s = $('#iframe_win');
      $.redirect(s.src);
    },
  });

  // cl.my
  $.register({
    rule: {
      host: /^cl\.my$/,
    },
    run: function () {
      unsafeWindow.document.body.onload = null;
      unsafeWindow.document.body.onunload = null;

      var content = $.$$('script').find(function (script) {
        return script.innerHTML.indexOf('callAjax') >= 0;
      });
      var matches = content.innerHTML.match(/'id': '([^']+)'/);
      content = matches[1];

      unsafeWindow.$.post('get_security_status.html', {
        context: 'url',
        cmd: 'chk',
        id: content,
      }, function (data) {
        $.redirect(data.data.u);
      }, 'json');
    },
  });

  // yfrog
  $.register({
    rule: {
      host: /\.yfrog\.com$/,
    },
    run: function () {
      if (/^\/z/.test(window.location.pathname)) {
        var i = $('#the-image img');
        $.redirect(i.src);
        return;
      }
      var a = $.$('#continue-link a, #main_image');
      if (a) {
        $.redirect('/z' + window.location.pathname);
        return;
      }
    },
  });

  // dumppix
  $.register({
    rule: 'http://www.dumppix.com/viewer.php?*',
    run: function () {
      var i = $.$('#boring');
      if (i) {
        $.redirect(i.src);
        return;
      }
      i = $('table td:nth-child(1) a');
      $.redirect(i.href);
    },
  });

  // subirimagenes
  $.register({
    rule: 'http://www.subirimagenes.com/*.html',
    run: function () {
      var i = $('#ImagenVisualizada');
      $.redirect(i.src);
    },
  });

  // ibunker
  $.register({
    rule: {
      host: /^ibunker\.us$/,
    },
    run: function () {
      var i = $('#picture');
      // FIXME somehow the mime type is text/html
      $.replace(i.src);
    },
  });

  // hotimg
  $.register({
    rule: {
      host: /^www\.hotimg\.com$/,
      path: /\/image(\/.*)/,
    },
    run: function (m) {
      $.redirect('/direct' + m.path[1]);
    },
  });

  // lienscash
  $.register({
    rule: 'http://www.lienscash.com/l/*',
    run: function () {
      $.removeNodes('iframe');

      var a = $('#time a');
      $.redirect(a.id);
    },
  });

  // urlz.so
  $.register({
    rule: 'http://urlz.so/l/*',
    run: function () {
      var i = $.$('td > a');
      if (i) {
        i = i.href;
        var m = i.match(/javascript:declocation\('(.+)'\);/);
        if (m) {
          i = atob(m[1]);
        }
        $.redirect(i);
        return;
      }
      i = $('img');
      $.captcha(i.src, function (a) {
        var b = $('input[name=captcha]');
        var c = $('input[name=submit]');
        b.value = a;
        c.click();
      });
    },
  });

  // ity.im
  $.register({
    rule: {
      host: /^ity\.im$/,
    },
    run: function () {
      var f = $.$('#main');
      if (f) {
        $.redirect(f.src);
      }
      f = $.$$('frame').find(function (frame) {
        return frame.src.indexOf('interheader.php') >= 0;
      });
      if (f) {
        $.redirect(f.src);
      }

      var data = null;
      $.$$('script').find(function (script) {
        data = script.innerHTML.match(/krypted=([^&]+)/);
        return !!data;
      });
      if (!data) {
        return;
      }
      data = data[1];
      f = unsafeWindow.des('ksnslmtmk0v4Pdviusajqu', unsafeWindow.hexToString(data), 0, 0);
      if (f) {
        $.redirect('http://ity.im/1104_21_50846_' + f);
      }
    },
  });

  // imgpony.com
  $.register({
    rule: {
      host: /^imgpony\.com$/,
      path: /^\/viewer3\.php$/,
      query: /^\?img=(.+)/,
    },
    run: function (m) {
      $.redirect('/images/' + m.query[1]);
    },
  });

  // www.fotolink.su
  $.register({
    rule: 'http://www.fotolink.su/v.php?id=*',
    run: function () {
      var i = $('#content img');
      $.redirect(i.src);
    },
  });

  // x.pixfarm.net
  $.register({
    rule: {
      host: /^x\.pixfarm\.net$/,
      path: /^\/sexy\/\d+\/\d+\/.+\.html$/,
    },
    run: function () {
      var i = $('img');
      $.redirect(i.src);
    },
  });

  // riurl.com
  $.register({
    rule: {
      host: /^riurl\.com$/,
      path: /^\/.+/,
    },
    run: function () {
      var s = $.$('body script');
      if (s) {
        s = s.innerHTML.indexOf('window.location.replace');
        if (s >= 0) {
          // let inline script redirect
          return;
        }
      }
      $.postAndGo('', {
        hidden: '1',
        image: ' ',
      });
    },
  });

  // tinyarrows.com
  $.register({
    rule: {
      host: /^tinyarrows\.com$/,
      path: /^\/preview\.php$/,
      query: /^\?page=([^&]+)/,
    },
    run: function (m) {
      $.redirect(decodeURIComponent(m.query[1]));
    },
  });

  // iiiii.in
  $.register({
    rule: {
      host: /^iiiii\.in$/,
    },
    run: function () {
      var script = $.$$('script').find(function (v) {
        return v.innerHTML.indexOf('href=') >= 0;
      });
      script = script.innerHTML.match(/href=(\S+)/);
      script = script[1];
      $.redirect(script);
    },
  });

  // www.adultf.ly
  $.register({
    rule: {
      host: /^www\.adultf\.ly$/,
      path: /\/(.+)/,
    },
    run: function (m) {
      var i = $('#iframeID');
      var advID = i.dataset.cmp;
      var u = i.dataset.u;
      $.removeNodes('iframe');
      unsafeWindow.$ = null;

      function fetch () {
        $.post('/ajax/r.php', {
          advID: advID,
          page: m.path[1],
          u: u,
        }, function (data) {
          if (/^\d+/.test(data)) {
            fetch();
            return;
          }
          var m = data.match(/href="([^"]+)"/);
          m = m[1];
          $.redirect(m);
        });
      }
      fetch();
    },
  });

  // robo.us
  $.register({
    rule: {
      host: /^robo\.us$/,
    },
    run: function () {
      $.removeNodes('iframe');
      var url = atob(unsafeWindow.fl);
      $.redirect(url);
    },
  });

  // zo.mu
  $.register({
    rule: 'http://zo.mu/redirector/process?link=*',
    run: function () {
      $.removeNodes('iframe');
      window.location.reload();
    },
  });

  // anonpic.com
  $.register({
    rule: 'http://anonpic.com/?v=*',
    run: function () {
      var i = $('#imagen img');
      $.redirect(i.src);
    },
  });

  // cyberpics.net
  $.register({
    rule: 'http://www.cyberpics.net/pm/*.html',
    run: function () {
      var a = $('#content a.lightbox');
      $.redirect(a.href);
    },
  });

})();

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
