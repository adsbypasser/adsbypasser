// ==UserScript==
// @name           NoPicAds
// @namespace      FoolproofProject
// @description    No Picture Advertisements
// @copyright      2012+, legnaleurc (https://github.com/legnaleurc/nopicads)
// @version        2.1.2
// @license        BSD
// @updateURL      http://userscripts.org/scripts/source/154858.meta.js
// @downloadURL    http://userscripts.org/scripts/source/154858.user.js
// @grant          unsafeWindow
// @match          http://*.linkbucks.com/*
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
// @match          http://adf.ly/*
// @match          http://u.bb/*
// @match          http://9.bb/*
// @match          http://q.gs/*
// @match          http://j.gs/*
// @match          http://*.imagevenue.com/img.php?*
// @match          http://*.urlcash.net/*
// @match          http://linkbee.com/*
// @match          http://lnk.co/*
// @match          http://*.alabout.com/*
// @match          http://*.alafs.com/*
// @match          http://pushba.com/*
// @match          http://www.turboimagehost.com/*
// @match          http://*.imageporter.com/*
// @match          http://*.imagecarry.com/*
// @match          http://*.imagedunk.com/*
// @match          http://*.imageswitch.com/*
// @match          http://*.piclambo.net/*
// @match          http://*.picleet.com/*
// @match          http://*.picturedip.com/*
// @match          http://*.pictureturn.com/*
// @match          http://*.yankoimages.net/*
// @match          http://www.pixhost.org/show/*
// @match          http://ichan.org/*
// @match          http://zpag.es/*
// @match          http://imgchili.com/show/*
// @match          http://www.viidii.com/*
// @match          http://adfoc.us/*
// @match          http://adfoc.us/serve/?id=*
// @match          http://imagetwist.com/*
// @match          http://adjoin.me/*
// @match          http://www.madlink.sk/*
// @match          http://lnx.lu/*
// @match          http://adcrun.ch/*
// @match          http://kissdown.com/viewer.php?file=*
// @match          http://imagerabbit.com/viewer.php?file=*
// @match          http://games8y.com/viewer.php?file=*
// @match          http://image69.us/viewer.php?file=*
// @match          http://gzvd.info/viewer.php?file=*
// @match          http://picjav.net/viewer.php?file=*
// @match          http://hentaita.com/viewer.php?file=*
// @match          http://picjav.net/picjav2/viewer.php?file=*
// @match          http://picjav.net/x/viewer.php?file=*
// @match          http://s21.imgtube.us/viewer.php?file=*
// @match          http://bc.vc/*
// @match          http://imgonion.com/*
// @match          http://imgrill.com/*
// @match          http://imagecherry.com/*
// @match          http://imagecorn.com/*
// @match          http://imagehosting.2owl.net/image/*
// @match          http://imgdino.com/*
// @match          http://www.4owl.info/image/*
// @exclude        http://www.linkbucks.com/
// @exclude        http://linkbee.com/
// @exclude        http://lnk.co/
// @exclude        http://adf.ly/*market.php?*
// @exclude        http://adf.ly/?default_ad*
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
			runner[0].call( this, runner[1] );
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
			run: function(){
				var o = document.querySelectorAll( '#firopage, iframe' );
				Array.prototype.forEach.call( o, function( v ) {
					v.parentNode.removeChild( v );
				} );

				o = ( document.compatMode === 'CSS1Compat' ) ? document.documentElement : document.body;
				o.style.overflow = 'auto';

				this.cleanTimer();
				this.disableWindowOpen();
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
				var head = document.getElementsByTagName('head')[0].innerHTML;
				var matches = head.match(/var\s+zzz\s*=\s*['"](.+)['"]/);
				var that = this;

				if( matches ) {
					var ad = document.querySelector( 'body iframe' );
					ad.parentNode.removeChild( ad );

					matches = matches[1];
					if( /^http.*$/.test( matches ) ) {
						that.targetUrl = matches;
						that.redirect();
						return;
					}

					var ajax = new XMLHttpRequest();
					ajax.open( 'GET', '/shortener/go?zzz=' + matches, true );
					ajax.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
					ajax.onreadystatechange = function() {
						if( ajax.readyState == 4 && ajax.status == 200 ) {
							var r = JSON.parse( ajax.responseText )
							that.targetUrl = r.zzz;
							that.redirect();
						}
					};
					ajax.send( null );
				} else if( ( matches = document.location.href.toString().match(/\/(https?:\/\/.+)/ ) ) ) {
					that.targetUrl = matches[1];
					that.redirect();
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
					host: /imgchili\.com/,
				},
			],
			run: function() {
				var o = document.querySelector( '#ad' );
				if( o ) {
					o.parentNode.removeChild(o);
				}
				o = document.querySelector( '#all' );
				if( o ) {
					o.style.display = '';
				}
				this.disableWindowOpen();
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
			run: function(){
				var o = null;
				if((o = document.getElementById('chatWindow'))){
					o.parentNode.removeChild(o);
				}
				if((o = document.getElementById('popupOverlay'))){
					o.parentNode.removeChild(o);
				}

				this.disableWindowOpen();
			}
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
			run: function(){
				var matches, opts, scripts = document.getElementsByTagName('script');
				opts = '';
				for(var i=0; i<scripts.length; ++i){
					if(scripts[i].innerHTML.indexOf('eval')!=-1){
						matches = scripts[i].innerHTML.match(/\|button\|(\d+)/);
						matches && (opts = 'opt=make_log&args[oid]=' + matches[1]);

						matches = scripts[i].innerHTML.match(/lid\|oid\|(\d+)\|(\d+)/i);
						matches && (opts += '&args[lid]='+matches[1]+'&args[oid]=' + matches[2] + '&args[ref]=');
					}
				}
				var xhr = function(params){
					var ajax=new XMLHttpRequest();
					ajax.open('POST', '/links/ajax.fly.php', true);
					ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
					ajax.onreadystatechange=(function(that){
						return function(){
							if(ajax.readyState == 4 && ajax.status == 200){
								var jj = eval('(' + ajax.responseText + ')');
								if(jj.message){
									top.location.href = jj.message.url
								}else{
									window.setTimeout(function(){ xhr(params) }, 2000);
								}
							}
						}
					})(this);
					ajax.send(params);
				};
				window.setTimeout(function(){
					xhr(encodeURI(opts))
				}, 1200);
			}
		},

		// mihalism
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

		// bcvc
		{
			rule: [
				{
					host: /bc\.vc/,
				},
			],
			run: function() {
				var matches = null;
				var opts = '';
				var scripts = document.getElementsByTagName( 'script' );
				for( var i = 0; i < scripts.length; ++i ) {
					if( scripts[i].innerHTML.indexOf( 'eval' ) !== -1 ) {
						matches = scripts[i].innerHTML.match( /aid:(\d+),lid:(\d+),oid:(\d+)/ );
						matches && (opts = [ 'opt=make_log&args[aid]=', matches[1], '&args[lid]=', matches[2], '&args[oid]=', matches[3], '&args[ref]=' ].join( '' ) );
					}
				}

				var xhr = function( params ) {
					var ajax = new XMLHttpRequest();
					ajax.open( 'POST', '/fly/ajax.fly.php', true );
					ajax.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
					ajax.onreadystatechange = ( function( that ) {
						return function() {
							if( ajax.readyState == 4 && ajax.status == 200 ) {
								var jj = eval( '(' + ajax.responseText + ')' );
								if( jj.message ) {
									top.location.href = jj.message.url;
								} else {
									window.setTimeout(function(){ xhr(params) }, 2000);
								}
							}
						}
					} )( this );
					ajax.send( params );
				};

				window.setTimeout( function() {
					xhr( encodeURI( opts ) );
				}, 1200 );
			}
		},

		// image69
		{
			rule: [
				{
					host: /image69\.us/,
				},
			],
			run: function( m ) {
				var a = document.querySelector( '#page_body a' );
				var s = a.href;
				// the real link does not immediately appears after http://
				this.targetUrl = 'http://' + s.substr( s.lastIndexOf( m.host[0] ) );
				this.redirect();
			},
		},

		// mihalism2
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

		// imgonion
		// imgrill
		// imagecorn
		{
			rule: [
				{
					host: /imgonion\.com|imgrill\.com|imagecorn\.com/,
				},
			],
			run: function() {
				this.disableWindowOpen();
				var node = document.querySelector( '#continuetoimage > form input' );
				if( node ) {
					node.click();
				} else {
					node = document.querySelector( '#overlayBg' );
					if( node ) {
						node.parentNode.removeChild( node );
					}
					node = document.querySelector( '#footer' );
					if( node ) {
						node = node.nextSibling;
						node.parentNode.removeChild( node );
					}
				}
			},
		},

		// imagecherry
		{
			rule: [
				{
					host: /imagecherry\.com/,
				},
			],
			run: function() {
				var b = document.querySelector( 'body' );
				if( b.id ) {
					b.parentNode.removeChild( b );
					b = document.querySelector( 'body' );
					b.style.display = 'block';
				}
			},
		},

		// picjav.net/x
		{
			rule: [
				{
					host: /picjav\.net/,
					path: /\/x\/.+/,
				},
				{
					host: /s21\.imgtube\.us/,
				},
			],
			run: function() {
				var a = document.querySelector( '#page_body a' );
				var s = a.href;
				this.targetUrl = s;
				this.redirect();
			},
		},

		// picjav.net
		// picjav.net/picjav2
		{
			rule: [
				{
					host: /picjav\.net/,
				},
			],
			run: function( m ) {
				var a = document.querySelectorAll( '#page_body a' );
				a = a[1];
				var s = a.href;
				// the real link does not immediately appears after http://
				a = s.lastIndexOf( m.host[0] );
				if( a >= 0 ) {
					this.targetUrl = 'http://' + s.substr( a );
					this.redirect();
				}
			},
		},

		// chevereto
		{
			rule: [
				{
					host: /imagehosting\.2owl\.net|www\.4owl\.info/,
				},
			],
			run: function() {
				var d = document.querySelectorAll( '#warning, #slide_up, #slide_up2, #fadeinbox, #content + div' );
				Array.prototype.forEach.call( d, function( v ) {
					v.parentNode.removeChild( v );
				} );
			},
		},

		// imgdino.com
		{
			rule: [
				{
					host: /imgdino\.com/,
				},
			],
			run: function() {
				var d = document.querySelector( '#redirect-ad' );
				if( d ) {
					d.parentNode.removeChild( d );
				}
			},
		},
	];

	var action = new Actions();
	action.run();

} )();
