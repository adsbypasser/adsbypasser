// ==UserScript==
// @name           NoPicAds
// @namespace      FoolproofProject
// @description    No Picture Advertisements
// @copyright      2012+, legnaleurc (https://github.com/legnaleurc/nopicads)
// @version        2.11
// @license        BSD
// @updateURL      https://userscripts.org/scripts/source/154858.meta.js
// @downloadURL    https://userscripts.org/scripts/source/154858.user.js
// @grant          unsafeWindow
// @grant          GM_xmlhttpRequest
// @run-at         document-start
// @match          http://*.alabout.com/*
// @match          http://*.alafs.com/*
// @match          http://*.allanalpass.com/*
// @match          http://*.amy.gs/*
// @match          http://*.any.gs/*
// @match          http://*.baberepublic.com/*
// @match          http://*.deb.gs/*
// @match          http://*.directupload.net/*
// @match          http://*.drstickyfingers.com/*
// @match          http://*.dyo.gs/*
// @match          http://*.fapoff.com/*
// @match          http://*.filesonthe.net/*
// @match          http://*.freean.us/*
// @match          http://*.galleries.bz/*
// @match          http://*.hornywood.tv/*
// @match          http://*.imagevenue.com/img.php?*
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
// @match          http://*.urlcash.net/*
// @match          http://*.urlpulse.net/*
// @match          http://*.whackyvidz.com/*
// @match          http://*.youfap.com/*
// @match          http://*.youfap.me/*
// @match          http://*.yyv.co/*
// @match          http://*.zff.co/*
// @match          http://*.zxxo.net/*
// @match          http://9.bb/*
// @match          http://adcrun.ch/*
// @match          http://adf.ly/*
// @match          http://adfoc.us/*
// @match          http://adfoc.us/serve/?id=*
// @match          http://adjoin.me/*
// @match          http://bc.vc/*
// @match          http://ichan.org/*
// @match          http://imgah.com/*
// @match          http://j.gs/*
// @match          http://javelite.tk/*
// @match          http://linkbee.com/*
// @match          http://lnk.co/*
// @match          http://lnx.lu/*
// @match          http://pixhub.eu/*
// @match          http://pushba.com/*
// @match          http://q.gs/*
// @match          http://u.bb/*
// @match          http://www.madlink.sk/*
// @match          http://www.pixhost.org/show/*
// @match          http://www.turboimagehost.com/*
// @match          http://www.viidii.com/*
// @match          http://zpag.es/*
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
// @match          http://imagecorn.com/*
// @match          http://imagepicsa.com/img-*.html
// @match          http://imgcandy.net/img-*.html
// @match          http://imgmoney.com/img-*.html
// @match          http://imgonion.com/img-*.html
// @match          http://imgrill.com/img-*.html
// @match          http://imgtube.net/img-*.html
// @match          http://imgwoot.com/*
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
// @match          http://image.torrentjav.net/img-*.html
// @match          http://imagedecode.com/*
// @match          http://imgcloud.co/img-*.html
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
// ==else==
// @match          http://*.4owl.info/*
// @match          http://*.abload.de/image.php?img=*
// @match          http://*.imagebam.com/image/*
// @match          http://advertisingg.com/*
// @match          http://imagetwist.com/*
// @match          http://imgbar.net/*
// @match          http://imgchili.com/show/*
// @match          http://imgchili.net/show/*
// @match          http://imgwiev.tk/?pm=*
// @match          http://www.pics-money.ru/*
// @exclude        http://www.pics-money.ru/allimage/*
// @match          http://www.sexyimg.com/*
// @match          http://goimagehost.com/xxx/*
// @match          http://www.hostpics.info/view.php?filename=*
// @match          http://imagescream.com/img/soft/*
// @match          http://imgfantasy.com/?p=*
// @match          http://www.h-animes.info/*/*/*.html
// @match          http://www.imgnip.com/viewerr2.php?file=*
// @match          http://www.x45x.info/?pt=*
// ==/else==
// ==dead==
// @match          http://kissdown.com/viewer.php?file=*
// @match          http://games8y.com/viewer.php?file=*
// @match          http://imagehosting.2owl.net/image/*
// @match          http://s21.imgtube.us/viewer.php?file=*
// ==/dead==
// @exclude        http://adcrun.ch/
// @exclude        http://adf.ly/*market.php?*
// @exclude        http://adf.ly/?default_ad*
// @exclude        http://linkbee.com/
// @exclude        http://lnk.co/
// @exclude        http://www.linkbucks.com/
// ==/UserScript==

( function() {
  'use strict';

  function Actions() {
    this.targetUrl = null;
  }

  Actions.prototype.run = function() {
    // <scheme>//<host>:<port><path><query><hash>
    var runner = this.find( {
      scheme: window.location.protocol,
      host: window.location.hostname,
      port: window.location.port,
      path: window.location.pathname,
      query: window.location.search,
      hash: window.location.hash,
    } );
    if( runner ) {
      this.disableWindowOpen();
      document.addEventListener( 'DOMContentLoaded', function() {
        runner[0].call( this, runner[1] );
      }.bind( this ) );
    }
  };

  Actions.prototype.find = function( uri ) {
    for( var i = 0; i < this.patterns.length; ++i ) {
      var pattern = this.patterns[i];
      for( var j = 0; j < pattern.rule.length; ++j ) {
        var rule = pattern.rule[j];
        var matched = {};
        for( var part in rule ) {
          matched[part] = rule[part].exec( uri[part] );
          if( !matched[part] ) {
            matched = null;
            break;
          }
        }
        if( matched ) {
          return [ pattern.run, matched ];
        }
      }
    }
    return null;
  };

  Actions.prototype.redirect = function() {
    if( this.targetUrl ) {
      console.info( 'NoPicAds: redirect to ' + this.targetUrl );
      window.location.replace( this.targetUrl );
    }
  };

  Actions.prototype.cleanTimer = function() {
    var intervalID = window.setInterval( ';', 10 );
    while( intervalID > 0 ) {
      window.clearInterval( intervalID-- );
    }
  };

  Actions.prototype.disableWindowOpen = function() {
    if( unsafeWindow ) {
      unsafeWindow.open = function(){};
    }
    if( window ) {
      window.open = function(){};
    }
  };

  Actions.prototype.replaceBody = function( imgSrc ) {
    this.cleanTimer();
    var i = document.createElement( 'img' );
    i.setAttribute( 'src', imgSrc );
    document.body = document.createElement( 'body' );
    document.body.style.textAlign = 'center';
    document.body.appendChild( i );
  };

  Actions.prototype.ajax = function( method, url, data, callback ) {
    function toQuery( data ) {
      if( typeof data === 'string' ) {
        return data;
      }
      if( data instanceof String ) {
        return data.toString();
      }
      var tmp = [];
      for( var key in data ) {
        tmp.push( key + '=' + data[key] );
      }
      return tmp.join( '&' );
    }

    var controller = GM_xmlhttpRequest( {
      method: method,
      url: url,
      data: encodeURI( toQuery( data ) ),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      onload: function( response ) {
        callback( response.responseText );
      }
    } );

    return controller;
  };

  Actions.prototype.post = function( url, data, callback ) {
    return this.ajax( 'POST', url, data, callback );
  };

  Actions.prototype.get = function( url, data, callback ) {
    return this.ajax( 'GET', url, data, callback );
  };

  Actions.prototype.patterns = [
    // linkbucks
    {
      rule: [
        {
          host: /^[\w]{8}\..*\.(com?|net|gs|me|tv|bz|us)/,
        },
      ],
      run: function(){
        var matches;

        this.cleanTimer();

        if(unsafeWindow && unsafeWindow.Lbjs && unsafeWindow.Lbjs.TargetUrl)
          this.targetUrl=unsafeWindow.Lbjs.TargetUrl;
        else if((matches=document.body.innerHTML.match(/TargetUrl\s*=\s*['"]([^'"]+)['"]/)) && matches)
          this.targetUrl=matches[1];
        this.redirect();
      }
    },

    // alabout
    {
      rule: [
        {
          host: /(alabout|alafs)\.com/,
        },
      ],
      run: function(){
        var o=document.getElementsByTagName('a');
        for(var i in o)
          if(/http:\/\/(www\.)?(alabout|alafs)\.com\/j\.phtml\?url=/.test(o[i].href))
            o[i].href=o[i].textContent;
      }
    },

    // imageporter
    {
      rule: [
        {
          host: /(imagecarry|imagedunk|imageporter|imageswitch|picleet|picturedip|pictureturn)\.com|(piclambo|yankoimages)\.net/,
        },
      ],
      run: function() {
        var o = document.querySelector( 'center img[id]' );
        if( !o ) {
          console.info( 'NoPicAds: "center img[id]" not found' );
          return;
        }
        this.targetUrl = o.src;
        this.redirect();
      },
    },

    // adf
    {
      rule: [
        {
          host: /adf.ly|[u9]\.bb|[jq]\.gs/,
        },
      ],
      run: function() {
        var head = document.querySelector( 'head' ).innerHTML;
        var matches = head.match( /var\s+zzz\s*=\s*['"](.+)['"]/ );

        if( matches ) {
          var ad = document.querySelector( 'body iframe' );
          ad.parentNode.removeChild( ad );

          matches = matches[1];
          if( /^http.*$/.test( matches ) ) {
            this.targetUrl = matches;
            this.redirect();
            return;
          }

          this.get( '/shortener/go', {
            zzz: matches,
          }, function( response ) {
            var r = JSON.parse( response );
            this.targetUrl = r.zzz;
            this.redirect();
          } );
          return;
        }

        // FIXME dead code?
        matches = window.location.href.toString().match( /\/(https?:\/\/.+)/ );
        if( matches ) {
          this.targetUrl = matches[1];
          this.redirect();
        }
      }
    },

    // turboimagehost
    {
      rule: [
        {
          host: /turboimagehost\.com/,
        },
      ],
      run: function(){
        var o;
        if((o=document.getElementById('blanket')))
          o.style.width='0px';
        if((o=document.getElementById('popUpDiv1')))
          o.style.visibility='hidden';
      }
    },

    // imagevenue
    {
      rule: [
        {
          host: /imagevenue\.com/,
        },
      ],
      run: function(){
        var o;
        if((o=document.getElementById('interContainer')))
          o.style.display='none';
        if((o=document.getElementById('interVeil')))
          o.style.display='none';
      }
    },

    // linkbee
    {
      rule: [
        {
          host: /(linkbee\.com|lnk\.co)/,
        },
      ],
      run: function(){
        var o;
        if((o=document.getElementById('urlholder')))
          this.targetUrl=o.value;
        else if((o=document.getElementById('skipBtn')))
          this.targetUrl=o.getElementsByTagName('a')[0].href;
        else
          this.targetUrl=document.title.replace(/(LNK.co|Linkbee)\s*:\s*/,'');
        this.redirect();
      }
    },

    // zpag
    {
      rule: [
        {
          host: /zpag\.es/,
        },
      ],
      run: function(){
        var matches=document.getElementsByTagName('head')[0].innerHTML.match(/window\.location\s*=\s*(['"])((?:\\\1|[^\1])*?)\1/);
        if(matches)
          this.targetUrl=matches[2];
        this.redirect();
      }
    },

    // pixhost
    {
      rule: [
        {
          host: /www\.pixhost\.org/,
        },
      ],
      run: function(){
        var o;
        if((o=document.getElementById('web'))){
          o.style.display='block';

          if((o=document.getElementById('js')))
            o.parentNode.removeChild(o);

          if((o=document.getElementById('chatWindow')))
            o.parentNode.removeChild(o);

          if((o=document.getElementById('taskbar')))
            o.parentNode.removeChild(o);
        }
      }
    },

    // ichan
    {
      rule: [
        {
          host: /ichan\.org/,
        },
      ],
      run: function(){
        var o=document.getElementsByTagName('a');
        var l=o.length;
        for(var i=0; i<l; i++){
          if(o[i].href.indexOf('/url/http://')>-1)
            o[i].href=o[i].href.replace(/http:\/\/.+\/url\/(?=http:\/\/)/,'');
        }
      }
    },

    // urlcash
    {
      rule: [
        {
          host: /urlcash\.net/,
        },
      ],
      run: function(){
        var matches;
        if(unsafeWindow)
          this.targetUrl=unsafeWindow.linkDestUrl;
        else if((matches=document.body.innerHTML.match(/linkDestUrl = '(.+)'/)) && matches)
          this.targetUrl=matches[1];
        this.redirect();
      }
    },

    // pushba
    {
      rule: [
        {
          host: /pushba\.com/,
        },
      ],
      run: function(){
        var o;
        if((o=document.getElementById('urlTextBox')))
          this.targetUrl=o.value;
        this.redirect();
      }
    },

    // imgchili
    {
      rule: [
        {
          host: /imgchili\.(com|net)/,
        },
      ],
      run: function() {
        var o = document.querySelector( '#show_image' );
        if( !o ) {
          console.info( 'NoPicAds: "#show_image" not found' );
          return;
        }
        this.targetUrl = o.src;
        this.redirect();
      },
    },

    // viidii
    {
      rule: [
        {
          host: /www\.viidii\.com/,
        },
      ],
      run: function(){
        var o;
        if((o=document.getElementById('directlink'))){
          this.targetUrl=o.href;
          this.redirect();
        }
      }
    },

    // adfoc
    {
      rule: [
        {
          host: /adfoc\.us/,
        },
      ],
      run: function(){
        // FIXME mutation events has been deprecated, consider rewrite with
        // mutation observer
        document.addEventListener('DOMNodeInserted', (function(that){
          var o;
          return function(){
            o=document.getElementById('showSkip');
            if(o && !this.targetUrl){
              that.targetUrl=o.getElementsByTagName('a')[0].href;
              that.redirect();
            }
          }
        })(this), null);
      }
    },

    // imagetwist
    {
      rule: [
        {
          host: /imagetwist\.com/,
        },
      ],
      run: function() {
        var o = document.querySelector( 'img.pic' );
        if( !o ) {
          console.info( 'NoPicAds: "img.pic" not found' );
          return;
        }
        this.targetUrl = o.src;
        this.redirect();
      },
    },

    // imagecherry
    {
      rule: [
        {
          host: /imagecherry\.com|imgpo\.st|imagejumbo\.com/,
        },
      ],
      run: function() {
        var o = document.querySelector( 'img.pic' );
        if( !o ) {
          console.info( 'NoPicAds: "img.pic" not found' );
          return;
        }
        // somehow the server send image as an attachment
        // so I replace whole document.body with single img
        this.replaceBody( o.src );
      },
    },

    // adjoin
    {
      rule: [
        {
          host: /adjoin\.me/,
        },
      ],
      run: function() {
        this.targetUrl=document.location.toString().replace(/adjoin\.me\/\d+\//, '');
        this.redirect();
      }
    },

    // madlink
    {
      rule: [
        {
          host: /www\.madlink\.sk/,
        },
      ],
      run: function(){
        document.getElementById('gosterbeni').getElementsByClassName('button')[0].click();
      }
    },

    // lnxlu
    {
      rule: [
        {
          host: /lnx\.lu/,
        },
      ],
      run: function() {
        this.targetUrl = document.getElementById('clickbtn').getElementsByTagName('a')[0].href;
        this.redirect();
      }
    },

    // Provided by tuxie.forte@userscripts.org
    // adcrun
    {
      rule: [
        {
          host: /adcrun\.ch/,
        },
      ],
      run: function() {
        var opts = {}, scripts = document.querySelectorAll( 'script' );
        for( var i = 0; i < scripts.length; ++i ) {
          var content = scripts[i].innerHTML;
          if( content.indexOf( 'eval' ) !== -1 ) {
            var matches = content.match( /\|button\|(\d+)/ );
            if( matches ) {
              opts.opt = 'make_log';
              opts['args[oid]'] = matches[1];
            }

            matches = content.match( /lid\|oid\|(\d+)\|(\d+)/i );
            if( matches ) {
              opts['args[lid]'] = matches[1];
              opts['args[oid]'] = matches[2];
              opts['args[ref]'] = '';
            }

            scripts = null;
            break;
          }
        }
        if( scripts ) {
          console.info( 'NoPicAds: script content has been changed' );
          return;
        }

        var xhr = function () {
          this.post( '/links/ajax.fly.php', opts, function( text ) {
            var json = JSON.parse( text );
            if( json.message ) {
              this.targetUrl = json.message.url;
              this.redirect();
            } else {
              window.setTimeout( xhr, 2000 );
            }
          }.bind( this ) );
        }.bind( this );
        window.setTimeout( xhr, 1200 );
      }
    },

    // bc.vc, shortcut, dirty hack
    {
      rule: [
        {
          host: /bc\.vc/,
          query: /^.+(https?:\/\/.+)/,
        },
      ],
      run: function( m ) {
        this.targetUrl = m.query[1];
        this.redirect();
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
      run: function( m ) {
        this.targetUrl = m.path[1];
        this.redirect();
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
      run: function() {
        var a = document.querySelector( '#page_body div.text_align_center a' );
        if( !a ) {
          console.info( 'NoPicAds: "#page_body div.text_align_center a" not found' );
          return;
        }
        this.targetUrl = a.href;
        this.redirect();
      },
    },

    // mihalism v1
    {
      rule: [
        {
          host: /(imagerabbit|kissdown|games8y)\.com/,
        },
      ],
      run: function(){
        this.targetUrl = document.location.href.toString().replace('viewer.php?file=', 'images/');
        this.redirect();
      }
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
      run: function() {
        // for jpdown.info
        var a = document.querySelectorAll( '#divExoLayerWrapper, #fadeinbox' );
        Array.prototype.forEach.call( a, function( v ) {
          v.parentNode.removeChild( v );
        } );
        a = document.querySelector( '#page_body a' );
        a = a.href;
        this.targetUrl = a;
        this.redirect();
      },
    },

    // mihalism v3
    {
      rule: [
        {
          host: /gzvd\.info|hentaita\.com/,
        },
      ],
      run: function() {
        var a = document.querySelector( '#page_body a' );
        var s = a.href;
        // the real link is diffirent from original host
        a = s.lastIndexOf( 'http://' );
        if( a >= 0 ) {
          this.targetUrl = s.substr( a );
          this.redirect();
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
      run: function( m ) {
        var a = document.querySelector( '#page_body .text_align_center a' );
        var s = a.href;
        // the real link does not immediately appears after http://
        this.targetUrl = 'http://' + s.substr( s.lastIndexOf( m.host[0] ) );
        this.redirect();
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
      run: function( m ) {
        var a = document.querySelectorAll( '#page_body a' );
        if( a.length < 2 ) {
          console.info( 'NoPicAds: "#page_body a" not enough' );
          return;
        }
        a = a[1];
        var s = a.href;
        // the real link does not immediately appears after http://
        a = s.lastIndexOf( m.host[0] );
        if( a < 0 ) {
          console.info( 'NoPicAds: a.href does not contains location.host' );
          return;
        }
        this.targetUrl = 'http://' + s.substr( a );
        this.redirect();
      },
    },

    // picjav.net
    {
      rule: [
        {
          host: /picjav\.net/,
        },
      ],
      run: function( m ) {
        var a = document.querySelector( '#page_body a' );
        if( !a ) {
          console.info( 'NoPicAds: "#page_body a" not found' );
          return;
        }
        this.targetUrl = a.href;
        this.redirect();
      },
    },

    // gallery.jpavgod.com
    {
      rule: [
        {
          host: /gallery\.jpavgod\.com/,
        },
      ],
      run: function() {
        var a = document.querySelectorAll( '#page_body a' );
        a = a[1];
        this.targetUrl = a.href;
        this.redirect();
      },
    },

    // preview.jpavgod.com
    {
      rule: [
        {
          host: /preview\.jpavgod\.com/,
        },
      ],
      run: function() {
        var i = document.querySelector( '#page_body div.text_align_center img' );
        this.targetUrl = i.src;
        this.redirect();
      },
    },

    // imgonion
    // FEATURE: continue to image link, POST same URL
    {
      rule: [
        {
          host: /(img(onion|rill|money|woot)|image(corn|picsa)|www\.imagefolks)\.com|img(candy|tube)\.net|imgcloud\.co/,
        },
      ],
      run: function() {
        this.disableWindowOpen();
        var node = document.querySelector( '#continuetoimage > form input' );
        if( node ) {
          // first pass
          node.click();
          return;
        }

        // second pass
        var o = document.querySelector( '#container img[alt="image"]' );
        if( !o ) {
          console.info( 'NoPicAds: "#container img[alt="image"]" not found' );
          return;
        }
        this.targetUrl = o.src;
        this.redirect();
      },
    },

    // advertisingg.com
    {
      rule: [
        {
          host: /advertisingg\.com/,
        },
      ],
      run: function() {
        function postToUrl( path, params, method ) {
          // Set method to post by default, if not specified.
          method = method || 'post';

          // The rest of this code assumes you are not using a library.
          // It can be made less wordy if you use one.
          var form = document.createElement( 'form' );
          form.setAttribute( 'method', method );
          form.setAttribute( 'action', path );

          for( var key in params ) {
            if( params.hasOwnProperty( key ) ) {
              var hiddenField = document.createElement( 'input' );
              hiddenField.setAttribute( 'type', 'hidden' );
              hiddenField.setAttribute( 'name', key );
              hiddenField.setAttribute( 'value', params[key] );

              form.appendChild( hiddenField );
            }
          }

          document.body.appendChild( form );
          form.submit();
        }

        var script = document.querySelector( 'body script' );
        var i = script.innerHTML.indexOf( 'window.location.replace' );
        if( i >= 0 ) {
          // let inline script redirect
          return;
        }
        postToUrl( '', {
          hidden: '1',
          image: ' ',
        }, 'post' );
      },
    },

    // chevereto
    {
      rule: [
        {
          host: /imagehosting\.2owl\.net|www\.4owl\.info|javelite\.tk/,
        },
      ],
      run: function() {
        var i = document.querySelector( 'table img' );
        if( !i ) {
          console.info( 'NoPicAds: "table img" not found' );
          return;
        }
        this.targetUrl = i.src;
        this.redirect();
      },
    },

    // imgdino.com
    {
      rule: [
        {
          host: /img(dino|tiger)\.com/,
        },
      ],
      run: function() {
        var o = document.querySelector( '#cursor_lupa' );
        if( !o ) {
          console.info( 'NoPicAds: "#cursor_lupa" not found' );
          return;
        }
        this.targetUrl = o.src;
        this.redirect();
      },
    },

    // CF Image Host
    {
      rule: [
        {
          host: /www\.imgjav\.tk|imgurban\.info/,
        },
      ],
      run: function() {
        var o = document.querySelector( 'div.img_box a' );
        if( !o ) {
          console.info( 'NoPicAds: "div.img_box a" not found' );
          return;
        }
        this.targetUrl = o.href;
        this.redirect();
      },
    },

    // directupload.net
    {
      rule: [
        {
          host: /.+\.directupload\.net/,
        },
      ],
      run: function() {
        var b = document.body.lastElementChild;
        b.parentNode.removeChild( b );
      },
    },

    // picfox.org
    {
      rule: [
        {
          host: /(picfox|amateurfreak)\.org/,
        },
      ],
      run: function() {
        var o = document.querySelector( '#iimg' );
        if( !o ) {
          console.info( 'NoPicAds: "#iimg" not found' );
          return;
        }
        this.targetUrl = o.src;
        this.redirect();
      },
    },

    // pixhub.eu
    {
      rule: [
        {
          host: /pixhub\.eu/,
        },
      ],
      run: function() {
        var o = document.querySelectorAll( '.adultpage, #FFN_Banner_Holder' );
        Array.prototype.forEach.call( o, function( v ) {
          v.parentNode.removeChild( v );
        } );

        o = ( document.compatMode === 'CSS1Compat' ) ? document.documentElement : document.body;
        o.style.overflow = 'auto';
      },
    },

    // reklama
    {
      rule: [
        {
          host: /(imagedecode|zonezeedimage|zeljeimage|ligasampiona)\.com|(comicalpic|image\.torrentjav|imgserve)\.net/,
        },
      ],
      run: function() {
        var o = document.querySelector( '#container img[class^=centred]' );
        if( !o ) {
          console.info( 'NoPicAds: "#container img[class^=centred]" not found' );
          return;
        }
        this.targetUrl = o.src;
        this.redirect();
      },
    },

    // imgah.com
    {
      rule: [
        {
          host: /imgah\.com/,
        },
      ],
      run: function() {
        var o = document.querySelector( 'input[type=submit]' );
        if( o ) {
          o.click();
          return;
        }
        o = document.querySelector( 'img.pic' );
        if( !o ) {
          console.info( 'NoPicAds: "img.pic" not found' );
          return;
        }
        this.replaceBody( o.src );
      },
    },

    // imagebam.com
    {
      rule: [
        {
          host: /www\.imagebam\.com/,
        },
      ],
      run: function() {
        var o = document.querySelector( '#imageContainer img[id]' );
        if( !o ) {
          console.info( 'NoPicAds: "#imageContainer img[id]" not found' );
          return;
        }
        // somehow the server send image as an attachment
        // so I replace whole document.body with single img
        this.replaceBody( o.src );
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
      run: function() {
        var i = document.querySelector( 'a.pic1 img' );
        if( !i ) {
          console.info( 'NoPicAds: "a.pic1 img" not found' );
          return;
        }
        this.targetUrl = i.src;
        this.redirect();
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
      run: function() {
        var i = document.querySelector( 'div.panel.top form input[name=sid]' );
        if( !i ) {
          console.info( 'NoPicAds: "div.panel.top form input[name=sid]" not found' );
          return;
        }
        this.targetUrl = '/img_show.php?view_id=' + i.value;
        this.redirect();
      },
    },

    // abload.de
    {
      rule: [
        {
          host: /www\.abload\.de/,
        },
      ],
      run: function() {
        var i = document.querySelector( '#image' );
        if( !i ) {
          console.info( 'NoPicAds: "#image" not found' );
          return;
        }
        this.targetUrl = i.src;
        this.redirect();
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
      run: function() {
        var a = document.querySelector( '#imgbox a.divclick' );
        if( !a ) {
          console.info( 'NoPicAds: "#imgbox a.divclick" not found' );
          return;
        }
        this.targetUrl = a.href;
        this.redirect();
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
      run: function() {
        var i = document.querySelector( '#imgbox img.bigimg' );
        if( !i ) {
          console.info( 'NoPicAds: "#imgbox img.bigimg" not found' );
          return;
        }
        this.replaceBody( i.src );
      },
    },

    // www.pics-money.ru
    {
      rule: [
        {
          host: /www\.pics-money\.ru/,
        },
      ],
      run: function() {
        var i = document.querySelector( '#d1 img' );
        if( !i ) {
          console.info( 'NoPicAds: "#d1 img" not found' );
          return;
        }
        i = i.onclick.toString();
        i = i.match( /mshow\('(.+)'\)/ );
        i = i[1];
        this.targetUrl = i;
        this.redirect();
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
      run: function( m ) {
        this.targetUrl = '/image.php?di=' + m.query[1];
        this.redirect();
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
      run: function( m ) {
        this.targetUrl = '/xxx/images/' + m.path[1];
        this.redirect();
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
      run: function( m ) {
        this.targetUrl = '/images/' + m.query[1];
        this.redirect();
      },
    },

    // imagescream.com
    {
      rule: [
        {
          host: /imagescream\.com/,
        },
      ],
      run: function() {
        var i = document.querySelector( '#shortURL-content img' );
        if( !i ) {
          console.info( 'NoPicAds: "#shortURL-content img" not found' );
          return;
        }
        this.targetUrl = i.src;
        this.redirect();
      },
    },

    // imgfantasy.com
    {
      rule: [
        {
          host: /imgfantasy\.com/,
        },
      ],
      run: function() {
        var i = document.querySelector( '#container-home img' );
        if( !i ) {
          console.info( 'NoPicAds: "#container-home img" not found' );
          return;
        }
        this.targetUrl = i.src;
        this.redirect();
      },
    },

    // www.imgnip.com
    {
      rule: [
        {
          host: /www\.imgnip\.com/,
        },
      ],
      run: function() {
        var i = document.querySelector( '#main_image' );
        if( !i ) {
          console.info( 'NoPicAds: "#main_image" not found' );
          return;
        }
        this.targetUrl = i.src;
        this.redirect();
      },
    },

    // www.x45x.info
    {
      rule: [
        {
          host: /www\.x45x\.info/,
        },
      ],
      run: function() {
        var a = document.querySelector( '#content a.lightbox' );
        if( !a ) {
          console.info( 'NoPicAds: "#content a.lightbox" not found' );
          return;
        }
        this.targetUrl = a.href;
        this.redirect();
      },
    },

    // www.h-animes.info
    {
      rule: [
        {
          host: /www\.h-animes\.info/,
        },
      ],
      run: function() {
        var a = document.querySelector( '.dlbutton2 > a' );
        if( !a ) {
          console.info( 'NoPicAds: ".dlbutton2 > a" not found' );
          return;
        }
        this.targetUrl = a.href;
        this.redirect();
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
      run: function( m ) {
        this.targetUrl = '/images/' + m.query[1];
        this.redirect();
      },
    },
  ];

  var action = new Actions();
  action.run();

} )();

// vim: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
