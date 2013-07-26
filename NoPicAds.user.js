// ==UserScript==
// @name           NoPicAds
// @namespace      FoolproofProject
// @description    No Picture Advertisements
// @copyright      2012+, legnaleurc (https://github.com/legnaleurc/nopicads)
// @version        2.15.0
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
// @match          http://imagerabbit.com/viewer.php?file=*
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
// @match          http://imagerabbit.com/*.html
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
// ==else==
// @match          http://*.4owl.info/*
// @match          http://*.abload.de/image.php?img=*
// @match          http://*.alabout.com/*
// @match          http://*.alafs.com/*
// @match          http://*.directupload.net/file/*.htm
// @match          http://*.imagebam.com/image/*
// @match          http://*.imagevenue.com/img.php?*
// @match          http://*.urlcash.net/*
// @match          http://1be.biz/s.php?*
// @match          http://abload.de/image.php?img=*
// @match          http://adcrun.ch/*
// @match          http://adfoc.us/*
// @match          http://adfoc.us/serve/?id=*
// @match          http://adjoin.me/*
// @match          http://advertisingg.com/*
// @match          http://bc.vc/*
// @match          http://goimagehost.com/xxx/*
// @match          http://ichan.org/*
// @match          http://imagescream.com/img/soft/*
// @match          http://imagetwist.com/*
// @match          http://imgah.com/*
// @match          http://imgbar.net/*
// @match          http://imgfantasy.com/?p=*
// @match          http://imgwiev.tk/?pm=*
// @match          http://javelite.tk/*
// @match          http://linkbee.com/*
// @match          http://lnk.co/*
// @match          http://lnx.lu/*
// @match          http://pixhub.eu/*
// @match          http://pushba.com/*
// @match          http://qrrro.com/images/*.html
// @match          http://www.bilder-hochladen.net/files/*.html
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
// ==dead==
// @match          http://games8y.com/viewer.php?file=*
// @match          http://s21.imgtube.us/viewer.php?file=*
// ==/dead==
// @exclude        http://adcrun.ch/
// @exclude        http://adf.ly/*market.php?*
// @exclude        http://adf.ly/?default_ad*
// @exclude        http://linkbee.com/
// @exclude        http://lnk.co/
// @exclude        http://www.linkbucks.com/
// @exclude        http://www.pics-money.ru/allimage/*
// ==/UserScript==

(function () {
  'use strict';

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
      window.location.replace(uri);
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
          var o = document.querySelector('center img[id]');
          if (!o) {
            console.info('NoPicAds: "center img[id]" not found');
            return;
          }
          NoPicAds.redirect(o.src);
        },
      },

      // adf.ly
      {
        rule: [
          {
            host: /adf.ly|[u9]\.bb|[jq]\.gs/,
          },
        ],
        run: function () {
          NoPicAds.removeNodes('iframe');

          var h = unsafeWindow.eu, b64 = unsafeWindow.Base64;
          if (!h) {
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
          var o = document.querySelector('#urlTextBox');
          if (o) {
            NoPicAds.redirect(o.value);
          }
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
          var o = document.querySelector('#show_image');
          if (!o) {
            console.info('NoPicAds: "#show_image" not found');
            return;
          }
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
          var o = document.querySelector('#directlink');
          if (!o) {
            console.info('NoPicAds: "#directlink" not found');
            return;
          }
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
          var o = document.querySelector('img.pic');
          if (!o) {
            console.info('NoPicAds: "img.pic" not found');
            return;
          }
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
          var o = document.querySelector('img.pic');
          if (!o) {
            console.info('NoPicAds: "img.pic" not found');
            return;
          }
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
          var o = document.querySelector('#gosterbeni .button');
          o.click();
        },
      },

      // lnxlu
      {
        rule: [
          {
            host: /lnx\.lu/,
          },
        ],
        run: function () {
          var a = document.querySelector('#clickbtn a');
          NoPicAds.redirect(a.href);
        },
      },

      // adcrun
      {
        rule: [
          {
            host: /adcrun\.ch/,
          },
        ],
        run: function () {
          var opts = {}, scripts = document.querySelectorAll('script');

          scripts = Array.prototype.some.call(scripts, function (script) {
            var content = script.innerHTML;
            if (content.indexOf('eval') < 0) {
              return false;
            }

            var matches = content.match(/\|button\|(\d+)/);
            if (matches) {
              opts.opt = 'make_log';
              opts['args[oid]'] = matches[1];
            }

            matches = content.match(/lid\|oid\|(\d+)\|(\d+)/i);
            if (matches) {
              opts['args[lid]'] = matches[1];
              opts['args[oid]'] = matches[2];
              opts['args[ref]'] = '';
            }

            return true;
          });

          if (!scripts) {
            console.info( 'NoPicAds: script content has been changed' );
            return;
          }

          function xhr () {
            NoPicAds.post('/links/ajax.fly.php', opts, function (text) {
              var json = JSON.parse(text);
              if (json.message) {
                NoPicAds.redirect(json.message.url);
              } else {
                window.setTimeout(xhr, 2000);
              }
            });
          }
          window.setTimeout(xhr, 1200);
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
      {
        rule: [
          {
            host: /bc\.vc/,
            path: /^.+(https?:\/\/.+)/,
          },
        ],
        run: function (m) {
          NoPicAds.redirect(m.path[1]);
        },
      },

      // imagerabbit.com
      {
        rule: [
          {
            host: /imagerabbit\.com/,
            path: /.+\.html$/,
          },
        ],
        run: function () {
          var a = document.querySelector('#page_body div.text_align_center a');
          if (!a) {
            console.info('NoPicAds: "#page_body div.text_align_center a" not found');
            return;
          }
          NoPicAds.redirect(a.href);
        },
      },

      // mihalism v1
      {
        rule: [
          {
            host: /(imagerabbit|games8y)\.com/,
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
            host: /s21\.imgtube\.us|jpdown\.info/,
          },
          {
            host: /image69\.us/,
            path: /\/x\/.+/,
          },

        ],
        run: function () {
          // for jpdown.info
          NoPicAds.removeNodes('#divExoLayerWrapper, #fadeinbox');

          var a = document.querySelector('#page_body a');
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
          var a = document.querySelector('#page_body a');
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
          var a = document.querySelector('#page_body .text_align_center a');
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
          var a = document.querySelector('#page_body a');
          if (!a) {
            console.info('NoPicAds: "#page_body a" not found');
            return;
          }
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
          var i = document.querySelector('#page_body div.text_align_center img');
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
          var o = document.querySelector('#container img[alt="image"]');
          if (!o) {
            console.info('NoPicAds: "#container img[alt="image"]" not found');
            return;
          }
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

          var script = document.querySelector('body script');
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
          var i = document.querySelector('table img');
          if (!i) {
            console.info('NoPicAds: "table img" not found');
            return;
          }
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
          var o = document.querySelector('#cursor_lupa');
          if (!o) {
            console.info('NoPicAds: "#cursor_lupa" not found');
            return;
          }
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
          var a = document.querySelector('div.img_box a');
          if (!a) {
            console.info('NoPicAds: "div.img_box a" not found');
            return;
          }
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
          var i = document.querySelector('#showimage');
          if (!i) {
            console.info('NoPicAds: "#showimage" not found');
            return;
          }
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
          var o = document.querySelector('#iimg');
          if (!o) {
            console.info('NoPicAds: "#iimg" not found');
            return;
          }
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
          var o = document.querySelector('#container img[class^=centred]');
          if (!o) {
            console.info('NoPicAds: "#container img[class^=centred]" not found');
            return;
          }
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
          o = document.querySelector('img.pic');
          if (!o) {
            console.info('NoPicAds: "img.pic" not found');
            return;
          }
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
          var o = document.querySelector('#imageContainer img[id]');
          if (!o) {
            console.info('NoPicAds: "#imageContainer img[id]" not found');
            return;
          }
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
          var i = document.querySelector('a.pic1 img');
          if (!i) {
            console.info('NoPicAds: "a.pic1 img" not found');
            return;
          }
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
          var i = document.querySelector('div.panel.top form input[name=sid]');
          if (!i) {
            console.info('NoPicAds: "div.panel.top form input[name=sid]" not found');
            return;
          }
          NoPicAds.redirect('/img_show.php?view_id=' + i.value);
        },
      },

      // abload.de
      {
        rule: [
          {
            host: /^(.+\.)?abload\.de$/,
          },
        ],
        run: function () {
          var i = document.querySelector('#image');
          if (!i) {
            console.info('NoPicAds: "#image" not found');
            return;
          }
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
          var a = document.querySelector('#imgbox a.divclick');
          if (!a) {
            console.info('NoPicAds: "#imgbox a.divclick" not found');
            return;
          }
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
          var i = document.querySelector('#imgbox img.bigimg');
          if (!i) {
            console.info('NoPicAds: "#imgbox img.bigimg" not found');
            return;
          }
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
          var i = document.querySelector( '#d1 img' );
          if (!i) {
            console.info('NoPicAds: "#d1 img" not found');
            return;
          }
          i = i.onclick.toString();
          i = i.match( /mshow\('(.+)'\)/ );
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
          var i = document.querySelector('#shortURL-content img');
          if (!i) {
            console.info('NoPicAds: "#shortURL-content img" not found');
            return;
          }
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
          var i = document.querySelector('#container-home img');
          if (!i) {
            console.info('NoPicAds: "#container-home img" not found');
            return;
          }
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
          var i = document.querySelector('#main_image');
          if (!i) {
            console.info('NoPicAds: "#main_image" not found');
            return;
          }
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
          var a = document.querySelector('#content a.lightbox');
          if (!a) {
            console.info('NoPicAds: "#content a.lightbox" not found');
            return;
          }
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
          var a = document.querySelector('.dlbutton2 > a');
          if (!a) {
            console.info('NoPicAds: ".dlbutton2 > a" not found');
            return;
          }
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
          var i = document.querySelector('#content + img');
          if (!i) {
            console.info('NoPicAds: "#content + img" not found');
            return;
          }
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
          var i = document.querySelector('td > img');
          if (!i) {
            console.info('NoPicAds: "td > img" not found');
            return;
          }
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
          a = document.querySelector('div.span7 a');
          if (!a) {
            console.info('NoPicAds: "div.span7 a" not found');
            return;
          }
          NoPicAds.redirect(a.href);
        },
      },

    ],

  };

  NoPicAds.exec();

}());

// vim: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
