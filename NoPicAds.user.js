// ==UserScript==
// @name           NoPicAds
// @namespace      FoolproofProject
// @description    No Picture Advertisements
// @copyright      2012+, legnaleurc (https://github.com/legnaleurc/nopicads)
// @version        2.18.2
// @license        BSD
// @updateURL      https://userscripts.org/scripts/source/154858.meta.js
// @downloadURL    https://userscripts.org/scripts/source/154858.user.js
// @grant          unsafeWindow
// @grant          GM_xmlhttpRequest
// @run-at         document-start
// ==adfly==
// @match          http://adf.ly/*
// @match          http://9.bb/*
// @match          http://u.bb/*
// @match          http://j.gs/*
// @match          http://q.gs/*
// ==/adfly==
// ==linkbucks==
// @match          http://*.allanalpass.com/*
// @match          http://*.amy.gs/*
// @match          http://*.any.gs/*
// @match          http://*.baberepublic.com/*
// @match          http://*.deb.gs/*
// @match          http://*.drstickyfingers.com/*
// @match          http://*.dyo.gs/*
// @match          http://*.fapoff.com/*
// @match          http://*.filesonthe.net/*
// @match          http://*.freean.us/*
// @match          http://*.galleries.bz/*
// @match          http://*.hornywood.tv/*
// @match          http://*.linkbabes.com/*
// @match          http://*.linkbucks.com/*
// @match          http://*.linkgalleries.net/*
// @match          http://*.linkseer.net/*
// @match          http://*.miniurls.co/*
// @match          http://*.picbucks.com/*
// @match          http://*.picturesetc.net/*
// @match          http://*.poontown.net/*
// @match          http://*.qqc.co/*
// @match          http://*.qvvo.com/*
// @match          http://*.realfiles.net/*
// @match          http://*.rqq.co/*
// @match          http://*.seriousdeals.net/*
// @match          http://*.seriousfiles.com/*
// @match          http://*.seriousurls.com/*
// @match          http://*.sexpalace.gs/*
// @match          http://*.theseblogs.com/*
// @match          http://*.thesefiles.com/*
// @match          http://*.theseforums.com/*
// @match          http://*.thesegalleries.com/*
// @match          http://*.thosegalleries.com/*
// @match          http://*.tinybucks.net/*
// @match          http://*.tinylinks.co/*
// @match          http://*.tnabucks.com/*
// @match          http://*.tubeviral.com/*
// @match          http://*.uberpicz.com/*
// @match          http://*.ubervidz.com/*
// @match          http://*.ubucks.net/*
// @match          http://*.ugalleries.net/*
// @match          http://*.ultrafiles.net/*
// @match          http://*.urlbeat.net/*
// @match          http://*.urlpulse.net/*
// @match          http://*.whackyvidz.com/*
// @match          http://*.youfap.com/*
// @match          http://*.youfap.me/*
// @match          http://*.yyv.co/*
// @match          http://*.zff.co/*
// @match          http://*.zxxo.net/*
// ==/linkbucks==
// ==Mihalism Multi Host v1==
// @match          http://freeuploadimages.org/viewer.php?file=*
// @match          http://hentai-hosting.com/viewer.php?file=*
// @match          http://imagepremium.com/viewer.php?file=*
// @match          http://pornpicuploader.com/viewer.php?file=*
// @match          http://shareimage.ro/viewer.php?file=*
// ==/Mihalism Multi Host v1==
// ==Mihalism Multi Host v2==
// @match          http://image69.us/x/viewer.php?file=*
// @match          http://jpdown.info/viewer.php?file=*
// @match          http://picjav.net/x/viewer.php?file=*
// ==/Mihalism Multi Host v2==
// ==Mihalism Multi Host v3==
// @match          http://gzvd.info/viewer.php?file=*
// @match          http://hentaita.com/viewer.php?file=*
// ==/Mihalism Multi Host v3==
// ==Mihalism Multi Host==
// @match          http://gallery.jpavgod.com/viewer.php?file=*
// @match          http://image69.us/viewer.php?file=*
// @match          http://picjav.net/picjav2/viewer.php?file=*
// @match          http://picjav.net/viewer.php?file=*
// @match          http://preview.jpavgod.com/*.html
// ==/Mihalism Multi Host==
// ==CF Image Host==
// @match          http://*.imgjav.tk/?pm=*
// @match          http://imgurban.info/?pm=*
// ==/CF Image Host==
// ==imgonion==
// @match          http://imagecorn.com/img-*.html
// @match          http://imagepicsa.com/img-*.html
// @match          http://imgcandy.net/img-*.html
// @match          http://imgcloud.co/img-*.html
// @match          http://imgcorn.com/img-*.html
// @match          http://imgmoney.com/img-*.html
// @match          http://imgonion.com/img-*.html
// @match          http://imgrill.com/img-*.html
// @match          http://imgtube.net/img-*.html
// @match          http://imgwoot.com/img-*.html
// @match          http://pixup.us/img-*.html
// @match          http://www.imagefolks.com/img-*.html
// ==/imgonion==
// ==imageporter==
// @match          http://*.imagecarry.com/*
// @match          http://*.imagedunk.com/*
// @match          http://*.imageporter.com/*
// @match          http://*.imageswitch.com/*
// @match          http://*.piclambo.net/*
// @match          http://*.picleet.com/*
// @match          http://*.picturedip.com/*
// @match          http://*.pictureturn.com/*
// @match          http://*.yankoimages.net/*
// ==/imageporter==
// ==reklama==
// @match          http://comicalpic.net/img-*.html
// @match          http://croftimage.com/img-*.html
// @match          http://hosterbin.com/img-*.html
// @match          http://image.torrentjav.net/img-*.html
// @match          http://imagedecode.com/img-*.html
// @match          http://imgserve.net/img-*.html
// @match          http://ligasampiona.com/img-*.html
// @match          http://zeljeimage.com/img-*.html
// @match          http://zonezeedimage.com/img-*.html
// ==/reklama==
// ==picfox==
// @match          http://amateurfreak.org/share-*.html
// @match          http://picfox.org/*
// ==/picfox==
// ==imagecherry==
// @match          http://imagecherry.com/*
// @match          http://imagejumbo.com/*
// @match          http://imgpo.st/*
// ==/imagecherry==
// ==imgdino==
// @match          http://imgdino.com/viewer.php?file=*
// @match          http://imgtiger.com/viewer.php?file=*
// ==/imgdino==
// ==imgpony==
// @match          http://imgpony.com/viewer3.php?img=*
// @match          http://imgtrick.com/viewer3.php?img=*
// ==imgpony==
// ==imgchili==
// @match          http://imgchili.com/show/*
// @match          http://imgchili.net/show/*
// ==/imgchili==
// ==hanimes==
// @match          http://www.adultmove.info/*/*/*.html
// @match          http://www.h-animes.info/*/*/*.html
// ==hanimes==
// ==imageback==
// @match          http://imageback.info/view-image/*
// @match          http://imagepong.info/view-image/*
// ==/imageback==
// ==abload==
// @match          http://*.abload.de/image.php?img=*
// @match          http://abload.de/image.php?img=*
// @match          http://fastpic.ru/view/*.html
// @match          http://funkyimg.com/viewer.php?img=*
// ==/abload==
// ==adcrun==
// @match          http://4ks.net/*
// @match          http://adcrun.ch/*
// @match          http://bih.cc/*
// @match          http://fly2url.com/*
// @match          http://link.tl/*
// @match          http://mhz.me/*
// @match          http://short.pk/*
// @match          http://shortit.in/*
// @match          http://ssl.gs/*
// @match          http://tr5.in/*
// @match          http://wwy.me/*
// @match          http://youlinking.com/*
// @match          http://zpoz.net/*
// @exclude        http://4ks.net/
// @exclude        http://adcrun.ch/
// @exclude        http://bih.cc/
// @exclude        http://fly2url.com/
// @exclude        http://link.tl/
// @exclude        http://mhz.me/
// @exclude        http://short.pk/
// @exclude        http://short.pk/*.php
// @exclude        http://shortit.in/
// @exclude        http://ssl.gs/
// @exclude        http://tr5.in/
// @exclude        http://wwy.me/
// @exclude        http://youlinking.com/
// @exclude        http://zpoz.net/
// ==/adcrun==
// ==lnxlu==
// @match          http://lnx.lu/*
// @match          http://url.fm/*
// @match          http://z.gs/*
// ==/lnxlu==
// ==coinurl==
// @match          http://coinurl.com/*
// @match          http://cur.lv/*
// ==/coinurl==
// ==else==
// @match          http://*.4owl.info/*
// @match          http://*.alabout.com/*
// @match          http://*.alafs.com/*
// @match          http://*.directupload.net/file/*.htm
// @match          http://*.imagebam.com/image/*
// @match          http://*.imagevenue.com/img.php?*
// @match          http://*.urlcash.net/*
// @match          http://1be.biz/s.php?*
// @match          http://adfoc.us/*
// @match          http://adfoc.us/serve/?id=*
// @match          http://adjoin.me/*
// @match          http://adlock.in/*
// @match          http://advertisingg.com/*
// @match          http://bayimg.com/*
// @match          http://bc.vc/*
// @match          http://bildr.no/view/*
// @match          http://goimagehost.com/xxx/*
// @match          http://ichan.org/*
// @match          http://imagearn.com/image.php?id=*
// @match          http://imagescream.com/img/soft/*
// @match          http://imagetwist.com/*
// @match          http://imgah.com/*
// @match          http://imgbar.net/*
// @match          http://imgfantasy.com/?p=*
// @match          http://imgwiev.tk/?pm=*
// @match          http://javelite.tk/*
// @match          http://linkbee.com/*
// @match          http://lnk.co/*
// @match          http://pixhub.eu/*
// @match          http://pushba.com/*
// @match          http://qrrro.com/images/*.html
// @match          http://tinypic.com/view.php?pic=*
// @match          http://www.bild.me/bild.php?file=*
// @match          http://www.bilder-hochladen.net/files/*.html
// @match          http://www.bilder-upload.eu/show.php?file=*
// @match          http://www.hostpics.info/view.php?filename=*
// @match          http://www.imgnip.com/viewerr*.php?file=*
// @match          http://www.madlink.sk/*
// @match          http://www.pic-upload.de/view-*.html
// @match          http://www.pics-money.ru/*
// @match          http://www.pixhost.org/show/*
// @match          http://www.sexyimg.com/*
// @match          http://www.turboimagehost.com/*
// @match          http://www.viidii.com/*
// @match          http://www.x45x.info/?pt=*
// @match          http://zpag.es/*
// ==/else==
// @exclude        http://adf.ly/*market.php?*
// @exclude        http://adf.ly/?default_ad*
// @exclude        http://linkbee.com/
// @exclude        http://lnk.co/
// @exclude        http://www.linkbucks.com/
// @exclude        http://www.pics-money.ru/allimage/*
// ==/UserScript==

(function () {
  'use strict';

  function DomNotFoundError (selector) {
    this.message = '"' + selector + '" not found';
    if (Error.captureStackTrace) {
      // V8-like
      Error.captureStackTrace(this, DomNotFoundError);
    } else {
      // fallback to Mozilla-like
      var e = Error();
      var stack = e.stack.split('\n').slice(1);
      e = stack[0].match(/^.*@(.*):(\d*)$/);
      this.fileName = e[1];
      this.lineNumber = e[2];
      this.stack = stack.join('\n');
    }
  }

  DomNotFoundError.prototype = Object.create(Error.prototype);
  DomNotFoundError.prototype.constructor = DomNotFoundError;
  DomNotFoundError.prototype.name = 'DomNotFoundError';

  function $ (selector, context) {
    if (!context || !context.querySelector) {
      context = document;
    }
    var n = context.querySelector(selector);
    if (!n) {
      throw new DomNotFoundError(selector);
    }
    return n;
  }

  var NoPicAds = {

    exec: function () {
      // <scheme>//<host>:<port><path><query><hash>
      var runner = NoPicAds.find({
        scheme: window.location.protocol,
        host: window.location.hostname,
        port: window.location.port,
        path: window.location.pathname,
        query: window.location.search,
        hash: window.location.hash,
      });
      if (runner) {
        NoPicAds.disableWindowOpen();
        document.addEventListener('DOMContentLoaded', function () {
          runner[0].call(this, runner[1]);
        }.bind(this));
      }
    },

    find: function (uri) {
      for (var i = 0; i < NoPicAds.patterns.length; ++i) {
        var pattern = NoPicAds.patterns[i];
        for (var j = 0; j < pattern.rule.length; ++j) {
          var rule = pattern.rule[j];
          var matched = {};
          for (var part in rule) {
            matched[part] = rule[part].exec(uri[part]);
            if (!matched[part]) {
              matched = null;
              break;
            }
          }
          if (matched) {
            return [pattern.run, matched];
          }
        }
      }
      return null;
    },

    redirect: function (uri) {
      console.info('NoPicAds: redirect to ' + uri);
      window.top.location.replace(uri);
    },

    nop: function () {
    },

    removeAllTimer: function () {
      var intervalID = window.setInterval(NoPicAds.nop, 10);
      while (intervalID > 0) {
        window.clearInterval(intervalID--);
      }
    },

    disableWindowOpen: function () {
      if (unsafeWindow) {
        unsafeWindow.open = NoPicAds.nop;
      }
      if (window) {
        window.open = NoPicAds.nop;
      }
    },

    replaceBody: function (imgSrc) {
      NoPicAds.removeAllTimer();
      var i = document.createElement('img');
      i.setAttribute('src', imgSrc);
      document.body = document.createElement('body');
      document.body.style.textAlign = 'center';
      document.body.appendChild(i);
    },

    ajax: function (method, url, data, callback) {
      function toQuery (data) {
        if (typeof data === 'string') {
          return data;
        }
        if (data instanceof String) {
          return data.toString();
        }
        var tmp = [];
        for (var key in data) {
          tmp.push(key + '=' + data[key]);
        }
        return tmp.join('&');
      }

      var controller = GM_xmlhttpRequest({
        method: method,
        url: url,
        data: encodeURI(toQuery(data)),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        onload: function (response) {
          callback(response.responseText);
        }
      });

      return controller;
    },

    post: function (url, data, callback) {
      return NoPicAds.ajax('POST', url, data, callback);
    },

    get: function (url, data, callback) {
      return NoPicAds.ajax('GET', url, data, callback);
    },

    removeNodes: function (selector) {
      var es = document.querySelectorAll(selector);
      Array.prototype.forEach.call(es, function (e) {
        e.parentNode.removeChild(e);
      });
    },

    patterns: [

      // linkbucks
      {
        rule: [
          {
            host: /^[\w]{8}\..*\.(com?|net|gs|me|tv|bz|us)/,
          },
        ],
        run: function () {
          NoPicAds.removeAllTimer();

          if (unsafeWindow && unsafeWindow.Lbjs && unsafeWindow.Lbjs.TargetUrl) {
            NoPicAds.redirect(unsafeWindow.Lbjs.TargetUrl);
            return;
          }

          var matches = document.body.innerHTML.match(/TargetUrl\s*=\s*['"]([^'"]+)['"]/);
          if (matches) {
            NoPicAds.redirect(matches[1]);
          }
        },
      },

      // alabout
      {
        rule: [
          {
            host: /(alabout|alafs)\.com/,
          },
        ],
        run: function () {
          var o = document.querySelectorAll('a');
          Array.prototype.forEach.call(o, function (a) {
            if (/http:\/\/(www\.)?(alabout|alafs)\.com\/j\.phtml\?url=/.test(a.href)) {
              a.href = a.textContent;
            }
          });
        },
      },

      // imageporter
      {
        rule: [
          {
            host: /(imagecarry|imagedunk|imageporter|imageswitch|picleet|picturedip|pictureturn)\.com|(piclambo|yankoimages)\.net/,
          },
        ],
        run: function () {
          var o = $('center img[id]');
          NoPicAds.redirect(o.src);
        },
      },

      // adf.ly
      {
        rule: [
          {
            host: /adf\.ly|[u9]\.bb|[jq]\.gs/,
          },
        ],
        run: function () {
          NoPicAds.removeNodes('iframe');

          var h = unsafeWindow.eu, b64 = unsafeWindow.Base64;
          if (!h) {
            h = $('#adfly_bar');
            unsafeWindow.close_bar();
            return;
          }
          var a = h.indexOf('!HiTommy'), b = '';
          if (a >= 0) {
            h = h.substring(0, a);
          }
          a = '';
          for (var i = 0; i < h.length; ++i) {
            if (i % 2 === 0) {
              a = a + h.charAt( i );
            } else {
              b = h.charAt( i ) + b;
            }
          }
          h = b64.decode(a + b);
          h = h.substr(2);
          if (location.hash) {
            h += location.hash;
          }
          NoPicAds.redirect(h);
        },
      },

      // turboimagehost
      {
        rule: [
          {
            host: /turboimagehost\.com/,
          },
        ],
        run: function () {
          var o = document.querySelector('#blanket');
          if (o) {
            o.style.width = '0px';
          }
          o = document.querySelector('#popUpDiv1');
          if (o) {
            o.style.visibility = 'hidden';
          }
        },
      },

      // imagevenue
      {
        rule: [
          {
            host: /imagevenue\.com/,
          },
        ],
        run: function () {
          var o = document.querySelector('#interContainer');
          if (o) {
            o.style.display = 'none';
          }
          o = document.querySelector('#interVeil');
          if (o) {
            o.style.display = 'none';
          }
        },
      },

      // linkbee
      {
        rule: [
          {
            host: /(linkbee\.com|lnk\.co)/,
          },
        ],
        run: function () {
          var o = document.querySelector('#urlholder');
          if (o) {
            NoPicAds.redirect(o.value);
            return;
          }

          o = document.querySelector('#skipBtn');
          if (o) {
            o = o.querySelector('a');
            NoPicAds.redirect(o.href);
            return;
          }

          o = document.title.replace(/(LNK.co|Linkbee)\s*:\s*/, '');
          NoPicAds.redirect(o);
        },
      },

      // zpag
      {
        rule: [
          {
            host: /zpag\.es/,
          },
        ],
        run: function () {
          var matches = document.querySelector('head').innerHTML;
          matches = matches.match(/window\.location\s*=\s*(['"])((?:\\\1|[^\1])*?)\1/);
          if (matches) {
            NoPicAds.redirect(matches[2]);
          }
        },
      },

      // pixhost
      {
        rule: [
          {
            host: /www\.pixhost\.org/,
          },
        ],
        run: function () {
          var o = document.querySelector('#web');
          if (o) {
            o.style.display = 'block';
          }
          NoPicAds.removeNodes('#js, #chatWindow, #taskbar');
        },
      },

      // ichan
      {
        rule: [
          {
            host: /ichan\.org/,
          },
        ],
        run: function () {
          var o = document.querySelectorAll('a');
          Array.prototype.forEach.call(o, function (a) {
            if (a.href.indexOf('/url/http://') > -1) {
              a.href = a.href.replace(/http:\/\/.+\/url\/(?=http:\/\/)/, '');
            }
          });
        },
      },

      // urlcash
      {
        rule: [
          {
            host: /urlcash\.net/,
          },
        ],
        run: function () {
          if (unsafeWindow && unsafeWindow.linkDestUrl) {
            NoPicAds.redirect(unsafeWindow.linkDestUrl);
            return;
          }

          var matches = document.body.innerHTML.match(/linkDestUrl = '(.+)'/);
          if (matches) {
            NoPicAds.redirect(matches[1]);
            return;
          }
        },
      },

      // pushba
      {
        rule: [
          {
            host: /pushba\.com/,
          },
        ],
        run: function () {
          var o = $('#urlTextBox');
          NoPicAds.redirect(o.value);
        },
      },

      // imgchili
      {
        rule: [
          {
            host: /imgchili\.(com|net)/,
          },
        ],
        run: function () {
          var o = $('#show_image');
          NoPicAds.redirect(o.src);
        },
      },

      // viidii
      {
        rule: [
          {
            host: /www\.viidii\.com/,
          },
        ],
        run: function () {
          var o = $('#directlink');
          NoPicAds.redirect(o.href);
        },
      },

      // adfoc
      {
        rule: [
          {
            host: /adfoc\.us/,
          },
        ],
        run: function () {
          // FIXME mutation events has been deprecated, consider rewrite with
          // mutation observer
          document.addEventListener('DOMNodeInserted', function () {
            var o = document.querySelector('#showSkip');
            if (o) {
              o = o.querySelector('a');
              NoPicAds.redirect(o.href);
            }
          }, null);
        },
      },

      // imagetwist
      {
        rule: [
          {
            host: /imagetwist\.com/,
          },
        ],
        run: function () {
          var o = $('img.pic');
          NoPicAds.redirect(o.src);
        },
      },

      // imagecherry
      {
        rule: [
          {
            host: /imagecherry\.com|imgpo\.st|imagejumbo\.com/,
          },
        ],
        run: function () {
          var o = $('img.pic');
          // somehow the server send image as an attachment
          // so I replace whole document.body with single img
          NoPicAds.replaceBody(o.src);
        },
      },

      // adjoin
      {
        rule: [
          {
            host: /adjoin\.me/,
          },
        ],
        run: function () {
          var uri = document.location.toString().replace(/adjoin\.me\/\d+\//, '');
          NoPicAds.redirect(uri);
        },
      },

      // madlink
      {
        rule: [
          {
            host: /www\.madlink\.sk/,
          },
        ],
        run: function () {
          var o = $('#gosterbeni .button');
          o.click();
        },
      },

      // lnxlu
      {
        rule: [
          {
            host: /^lnx\.lu|url\.fm|z\.gs$/,
          },
        ],
        run: function () {
          var a = $('#clickbtn a');
          NoPicAds.redirect(a.href);
        },
      },

      // adcrun
      {
        rule: [
          {
            host: /adcrun\.ch|(youlinking|fly2url)\.com|(4ks|zpoz)\.net|(shortit|tr5)\.in|(wwy|mhz)\.me|ssl\.gs|link\.tl|bih\.cc|short\.pk/,
          },
        ],
        run: function () {
          // prevent redirection by iframe
          NoPicAds.removeNodes('iframe');

          var scripts = document.querySelectorAll('script');
          for (var i = 0; i < scripts.length; ++i) {
            var content = scripts[i].innerHTML;
            var matches = content.indexOf('make_log');
            if (matches >= 0) {
              break;
            }
          }
          matches = content.match(/eval(.*)/);
          matches = matches[1];
          content = eval(matches);

          // inject AJAX into body
          matches = content.match(/\$.post\('([^']*)'[^{]+(\{opt:'make_log'[^}]+\}\}),/i);
          var url = matches[1];
          var opts = eval('(' + matches[2] + ')');
          function bc () {
            unsafeWindow.$.post(url, opts, function (text) {
              var jj = JSON.parse(text);
              if (jj.message) {
                NoPicAds.redirect(jj.message.url);
              }
            });
          }
          unsafeWindow.bc = bc;
          content = 'setInterval(bc,1000);';
          matches = document.createElement('script');
          matches.textContent = content;
          document.body.appendChild(matches);
        },
      },

      // bc.vc, shortcut, dirty hack
      {
        rule: [
          {
            host: /bc\.vc/,
            query: /^.+(https?:\/\/.+)/,
          },
        ],
        run: function (m) {
          NoPicAds.redirect(m.query[1]);
        },
      },

      // bc.vc, shortcut
      // FIXME may cut hash or query string
      {
        rule: [
          {
            host: /^bc\.vc$/,
            path: /^.+(https?:\/\/.+)$/,
          },
        ],
        run: function (m) {
          NoPicAds.redirect(m.path[1]);
        },
      },

      // bc.vc
      {
        rule: [
          {
            host: /bc\.vc/,
          },
        ],
        run: function () {
          NoPicAds.removeNodes('iframe');

          var scripts = document.querySelectorAll('script');
          for (var i = 0; i < scripts.length; ++i) {
            var content = scripts[i].innerHTML;
            var matches = content.indexOf('make_log');
            if (matches >= 0) {
              break;
            }
          }

          // inject AJAX into body
          matches = content.match(/\$.post\('([^']*)'[^{]+(\{opt:'make_log'[^}]+\}\}),/i);
          var url = matches[1];
          var opts = eval('(' + matches[2] + ')');
          function bc () {
            unsafeWindow.$.post(url, opts, function (text) {
              var jj = JSON.parse(text);
              if (jj.message) {
                NoPicAds.redirect(jj.message.url);
              }
            });
          }
          unsafeWindow.bc = bc;
          content = 'setInterval(bc,1000);';
          matches = document.createElement('script');
          matches.textContent = content;
          document.body.appendChild(matches);
        },
      },

      // mihalism v1
      {
        rule: [
          {
            host: /(pornpicuploader|imagepremium|hentai-hosting)\.com|freeuploadimages\.org|shareimage\.ro/,
          },
        ],
        run: function () {
          var uri = window.location.href.toString();
          uri = uri.replace('viewer.php?file=', 'images/');
          NoPicAds.redirect(uri);
        },
      },

      // mihalism v2
      {
        rule: [
          {
            host: /picjav\.net/,
            path: /\/x\/.+/,
          },
          {
            host: /jpdown\.info/,
          },
          {
            host: /image69\.us/,
            path: /\/x\/.+/,
          },

        ],
        run: function () {
          // for jpdown.info
          NoPicAds.removeNodes('#divExoLayerWrapper, #fadeinbox');

          var a = $('#page_body a');
          NoPicAds.redirect(a.href);
        },
      },

      // mihalism v3
      {
        rule: [
          {
            host: /gzvd\.info|hentaita\.com/,
          },
        ],
        run: function () {
          var a = $('#page_body a');
          var s = a.href;
          // the real link is diffirent from original host
          a = s.lastIndexOf('http://');
          if (a >= 0) {
            NoPicAds.redirect(s.substr(a));
          }
        },
      },

      // image69
      {
        rule: [
          {
            host: /image69\.us/,
          },
        ],
        run: function (m) {
          var a = $('#page_body .text_align_center a');
          var s = a.href;
          // the real link does not immediately appears after http://
          a = s.lastIndexOf(m.host[0]);
          NoPicAds.redirect('http://' + s.substr(a));
        },
      },

      // picjav.net/picjav2
      {
        rule: [
          {
            host: /picjav\.net/,
            path: /\/picjav2\/.+/,
          },
        ],
        run: function (m) {
          var a = document.querySelectorAll('#page_body a');
          if (a.length < 2) {
            console.info( 'NoPicAds: "#page_body a" not enough' );
            return;
          }
          a = a[1];
          var s = a.href;
          // the real link does not immediately appears after http://
          a = s.lastIndexOf(m.host[0]);
          if (a < 0) {
            console.info('NoPicAds: a.href does not contains location.host');
            return;
          }
          NoPicAds.redirect('http://' + s.substr(a));
        },
      },

      // picjav.net
      {
        rule: [
          {
            host: /picjav\.net/,
          },
        ],
        run: function (m) {
          var a = $('#page_body a');
          NoPicAds.redirect(a.href);
        },
      },

      // gallery.jpavgod.com
      {
        rule: [
          {
            host: /gallery\.jpavgod\.com/,
          },
        ],
        run: function () {
          var a = document.querySelectorAll('#page_body a');
          a = a[1];
          NoPicAds.redirect(a.href);
        },
      },

      // preview.jpavgod.com
      {
        rule: [
          {
            host: /preview\.jpavgod\.com/,
          },
        ],
        run: function () {
          var i = $('#page_body div.text_align_center img');
          NoPicAds.redirect(i.src);
        },
      },

      // imgonion
      // FEATURE: continue to image link, POST same URL
      {
        rule: [
          {
            host: /(img(onion|rill|money|woot|corn)|image(corn|picsa)|www\.imagefolks)\.com|img(candy|tube)\.net|imgcloud\.co|pixup\.us/,
          },
        ],
        run: function () {
          NoPicAds.disableWindowOpen();
          var node = document.querySelector('#continuetoimage > form input');
          if (node) {
            // first pass
            node.click();
            return;
          }

          // second pass
          var o = $('#container img[alt="image"]');
          NoPicAds.redirect(o.src);
        },
      },

      // advertisingg.com
      {
        rule: [
          {
            host: /advertisingg\.com/,
          },
        ],
        run: function () {
          function postToUrl (path, params, method) {
            // Set method to post by default, if not specified.
            method = method || 'post';

            // The rest of this code assumes you are not using a library.
            // It can be made less wordy if you use one.
            var form = document.createElement('form');
            form.setAttribute('method', method);
            form.setAttribute('action', path);

            for (var key in params) {
              if (params.hasOwnProperty(key)) {
                var hiddenField = document.createElement('input');
                hiddenField.setAttribute('type', 'hidden');
                hiddenField.setAttribute('name', key);
                hiddenField.setAttribute('value', params[key]);

                form.appendChild(hiddenField);
              }
            }

            document.body.appendChild(form);
            form.submit();
          }

          var script = $('body script');
          var i = script.innerHTML.indexOf('window.location.replace');
          if (i >= 0) {
            // let inline script redirect
            return;
          }
          postToUrl( '', {
            hidden: '1',
            image: ' ',
          } );
        },
      },

      // chevereto
      {
        rule: [
          {
            host: /www\.4owl\.info|javelite\.tk/,
          },
        ],
        run: function () {
          var i = $('table img');
          NoPicAds.redirect(i.src);
        },
      },

      // imgdino.com
      {
        rule: [
          {
            host: /img(dino|tiger)\.com/,
          },
        ],
        run: function () {
          var o = $('#cursor_lupa');
          NoPicAds.redirect(o.src);
        },
      },

      // CF Image Host
      {
        rule: [
          {
            host: /www\.imgjav\.tk|imgurban\.info/,
          },
        ],
        run: function () {
          var a = $('div.img_box a');
          NoPicAds.redirect(a.href);
        },
      },

      // directupload.net
      {
        rule: [
          {
            host: /.+\.directupload\.net/,
          },
        ],
        run: function () {
          var i = $('#showimage');
          NoPicAds.redirect(i.src);
        },
      },

      // picfox.org
      {
        rule: [
          {
            host: /(picfox|amateurfreak)\.org/,
          },
        ],
        run: function () {
          var o = $('#iimg');
          NoPicAds.redirect(o.src);
        },
      },

      // pixhub.eu
      {
        rule: [
          {
            host: /pixhub\.eu/,
          },
        ],
        run: function () {
          NoPicAds.removeNodes('.adultpage, #FFN_Banner_Holder');

          var o = (document.compatMode === 'CSS1Compat') ? document.documentElement : document.body;
          o.style.overflow = 'auto';
        },
      },

      // reklama
      {
        rule: [
          {
            host: /(imagedecode|zonezeedimage|zeljeimage|ligasampiona|hosterbin|croftimage)\.com|(comicalpic|image\.torrentjav|imgserve)\.net/,
          },
        ],
        run: function () {
          var o = $('#container img[class^=centred]');
          NoPicAds.redirect(o.src);
        },
      },

      // imgah.com
      {
        rule: [
          {
            host: /imgah\.com/,
          },
        ],
        run: function () {
          // first stage
          var o = document.querySelector('input[type=submit]');
          if (o) {
            o.click();
            return;
          }

          // second stage
          o = $('img.pic');
          NoPicAds.replaceBody(o.src);
        },
      },

      // imagebam.com
      {
        rule: [
          {
            host: /www\.imagebam\.com/,
          },
        ],
        run: function () {
          var o = $('#imageContainer img[id]');
          // somehow the server send image as an attachment
          // so I replace whole document.body with single img
          NoPicAds.replaceBody(o.src);
        },
      },

      // imgbar.net
      // second stage
      {
        rule: [
          {
            host: /imgbar\.net/,
            path: /\/img_show\.php/,
          },
        ],
        run: function () {
          var i = $('a.pic1 img');
          NoPicAds.redirect(i.src);
        },
      },

      // imgbar.net
      // first stage
      {
        rule: [
          {
            host: /imgbar\.net/,
          },
        ],
        run: function () {
          var i = $('div.panel.top form input[name=sid]');
          NoPicAds.redirect('/img_show.php?view_id=' + i.value);
        },
      },

      // abload.de
      {
        rule: [
          {
            host: /^(.+\.)?abload\.de|fastpic\.ru|funkyimg\.com$/,
          },
        ],
        run: function () {
          var i = $('#image');
          NoPicAds.redirect(i.src);
        },
      },

      // www.sexyimg.com
      {
        rule: [
          {
            host: /www\.sexyimg\.com/,
            path: /\/s\/.*\.html/,
          },
        ],
        run: function () {
          var a = $('#imgbox a.divclick');
          NoPicAds.redirect(a.href);
        },
      },

      // www.sexyimg.com
      {
        rule: [
          {
            host: /www\.sexyimg\.com/,
            path: /\/b\/.*\.html/,
          },
        ],
        run: function () {
          var i = $('#imgbox img.bigimg');
          NoPicAds.replaceBody(i.src);
        },
      },

      // www.pics-money.ru
      {
        rule: [
          {
            host: /www\.pics-money\.ru/,
          },
        ],
        run: function () {
          var i = $('#d1 img');
          i = i.onclick.toString();
          i = i.match(/mshow\('(.+)'\)/);
          i = i[1];
          NoPicAds.redirect(i);
        },
      },

      // imgwiev.tk
      {
        rule: [
          {
            host: /imgwiev\.tk/,
            query: /\?pm=(.+)/,
          },
        ],
        run: function (m) {
          NoPicAds.redirect('/image.php?di=' + m.query[1]);
        },
      },

      // goimagehost.com
      {
        rule: [
          {
            host: /goimagehost\.com/,
            path: /\/xxx\/(.+)/,
          },
        ],
        run: function (m) {
          NoPicAds.redirect('/xxx/images/' + m.path[1]);
        },
      },

      // www.hostpics.info
      {
        rule: [
          {
            host: /www\.hostpics\.info/,
            query: /\?filename=(.+)/,
          },
        ],
        run: function (m) {
          NoPicAds.redirect('/images/' + m.query[1]);
        },
      },

      // imagescream.com
      {
        rule: [
          {
            host: /imagescream\.com/,
          },
        ],
        run: function () {
          var i = $('#shortURL-content img');
          NoPicAds.redirect(i.src);
        },
      },

      // imgfantasy.com
      {
        rule: [
          {
            host: /imgfantasy\.com/,
          },
        ],
        run: function () {
          var i = $('#container-home img');
          NoPicAds.redirect(i.src);
        },
      },

      // www.imgnip.com
      {
        rule: [
          {
            host: /www\.imgnip\.com/,
          },
        ],
        run: function () {
          var i = $('#main_image');
          NoPicAds.redirect(i.src);
        },
      },

      // www.x45x.info
      {
        rule: [
          {
            host: /www\.x45x\.info/,
          },
        ],
        run: function () {
          var a = $('#content a.lightbox');
          NoPicAds.redirect(a.href);
        },
      },

      // www.h-animes.info
      {
        rule: [
          {
            host: /www\.(h-animes|adultmove)\.info/,
          },
        ],
        run: function () {
          var a = $('.dlbutton2 > a');
          NoPicAds.redirect(a.href);
        },
      },

      // imgpony.com
      {
        rule: [
          {
            host: /img(pony|trick)\.com/,
            query: /\?img=(.+)/,
          },
        ],
        run: function (m) {
          NoPicAds.redirect('/images/' + m.query[1]);
        },
      },

      // 1be.biz
      {
        rule: [
          {
            host: /1be\.biz/,
            query: /\?(.+)/,
          },
        ],
        run: function (m) {
          NoPicAds.redirect(m.query[1]);
        },
      },

      // qrrro.com
      {
        rule: [
          {
            host: /qrrro\.com/,
            path: /^(\/images\/.+)\.html$/,
          },
        ],
        run: function (m) {
          NoPicAds.redirect(m.path[1]);
        },
      },

      // pic-upload.de
      {
        rule: [
          {
            host: /www\.pic-upload\.de/,
          },
        ],
        run: function () {
          var i = $('#content + img');
          NoPicAds.redirect(i.src);
        },
      },

      // bilder-hochladen.net
      {
        rule: [
          {
            host: /www\.bilder-hochladen\.net/,
          },
        ],
        run: function () {
          var i = $('td > img');
          NoPicAds.redirect(i.src);
        },
      },

      // imageback.info
      {
        rule: [
          {
            host: /image(back|pong)\.info/,
          },
        ],
        run: function () {
          NoPicAds.removeNodes('#popupOverlay, #divExoLayerWrapper');
          var a = $('div.span7 a');
          NoPicAds.redirect(a.href);
        },
      },

      // bayimg.com
      {
        rule: [
          {
            host: /^bayimg\.com$/,
          },
        ],
        run: function () {
          var i = $('#mainImage');
          NoPicAds.redirect(i.src);
        },
      },

      // www.bild.me
      {
        rule: [
          {
            host: /^www\.bild\.me$/,
          },
        ],
        run: function () {
          var i = $('#Bild');
          NoPicAds.redirect(i.src);
        },
      },

      // www.bilder-upload.eu
      {
        rule: [
          {
            host: /^www\.bilder-upload\.eu$/,
          },
        ],
        run: function () {
          var i = $('input[type=image]');
          NoPicAds.redirect(i.src);
        },
      },

      // bildr.no
      {
        rule: [
          {
            host: /^bildr\.no$/,
          },
        ],
        run: function () {
          var i = $('img.bilde');
          NoPicAds.redirect(i.src);
        },
      },

      // imagearn.com
      {
        rule: [
          {
            host: /^imagearn\.com$/,
          },
        ],
        run: function () {
          var i = $('#img');
          NoPicAds.redirect(i.src);
        },
      },

      // tinypic.com
      {
        rule: [
          {
            host: /^tinypic\.com$/,
          },
        ],
        run: function () {
          var i = $('#imgElement');
          NoPicAds.redirect(i.src);
        },
      },

      // coinurl
      {
        rule: [
          {
            host: /^coinurl\.com|cur\.lv$/,
          },
        ],
        run: function () {
          var a = $('#skip-ad');
          NoPicAds.redirect(a.href);
        },
      },

      // adlock
      {
        rule: [
          {
            host: /^adlock\.in$/,
          },
        ],
        run: function () {
          var a = $('#xre a.xxr');
          NoPicAds.redirect(a.href);
        },
      },

    ],

  };

  NoPicAds.exec();

}());

// vim: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
