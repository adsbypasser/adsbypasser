// ==UserScript==
// @name           NoPicAds
// @namespace      FoolproofProject
// @description    No Picture Advertisements
// @copyright      2012+, legnaleurc (https://github.com/legnaleurc/nopicads)
// @version        1.1.2
// @license        BSD
// @updateURL      http://userscripts.org/scripts/source/154858.meta.js
// @downloadURL    http://userscripts.org/scripts/source/154858.user.js
// @include        http://*.linkbucks.com/*
// @include        http://*.allanalpass.com/*
// @include        http://*.amy.gs/*
// @include        http://*.any.gs/*
// @include        http://*.baberepublic.com/*
// @include        http://*.deb.gs/*
// @include        http://*.drstickyfingers.com/*
// @include        http://*.dyo.gs/*
// @include        http://*.fapoff.com/*
// @include        http://*.filesonthe.net/*
// @include        http://*.freean.us/*
// @include        http://*.galleries.bz/*
// @include        http://*.hornywood.tv/*
// @include        http://*.linkbabes.com/*
// @include        http://*.linkgalleries.net/*
// @include        http://*.linkseer.net/*
// @include        http://*.miniurls.co/*
// @include        http://*.picbucks.com/*
// @include        http://*.picturesetc.net/*
// @include        http://*.poontown.net/*
// @include        http://*.qqc.co/*
// @include        http://*.qvvo.com/*
// @include        http://*.realfiles.net/*
// @include        http://*.rqq.co/*
// @include        http://*.seriousdeals.net/*
// @include        http://*.seriousfiles.com/*
// @include        http://*.seriousurls.com/*
// @include        http://*.sexpalace.gs/*
// @include        http://*.theseblogs.com/*
// @include        http://*.thesefiles.com/*
// @include        http://*.theseforums.com/*
// @include        http://*.thesegalleries.com/*
// @include        http://*.thosegalleries.com/*
// @include        http://*.tinybucks.net/*
// @include        http://*.tinylinks.co/*
// @include        http://*.tnabucks.com/*
// @include        http://*.tubeviral.com/*
// @include        http://*.uberpicz.com/*
// @include        http://*.ubervidz.com/*
// @include        http://*.ubucks.net/*
// @include        http://*.ugalleries.net/*
// @include        http://*.ultrafiles.net/*
// @include        http://*.urlbeat.net/*
// @include        http://*.urlpulse.net/*
// @include        http://*.whackyvidz.com/*
// @include        http://*.youfap.com/*
// @include        http://*.youfap.me/*
// @include        http://*.yyv.co/*
// @include        http://*.zff.co/*
// @include        http://*.zxxo.net/*
// @include        http://adf.ly/*
// @include        http://u.bb/*
// @include        http://9.bb/*
// @include        http://q.gs/*
// @include        http://j.gs/*
// @include        http://*.imagevenue.com/img.php?*
// @include        http://*.urlcash.net/*
// @include        http://linkbee.com/*
// @include        http://lnk.co/*
// @include        http://*alabout.com/*
// @include        http://*alafs.com/*
// @include        http://pushba.com/*
// @include        http://www.turboimagehost.com/*
// @include        http://*imageporter.com/*
// @include        http://*imagecarry.com/*
// @include        http://*imagedunk.com/*
// @include        http://*imageswitch.com/*
// @include        http://*piclambo.net/*
// @include        http://*picleet.com/*
// @include        http://*picturedip.com/*
// @include        http://*pictureturn.com/*
// @include        http://*yankoimages.net/*
// @include        http://www.pixhost.org/show/*
// @include        http://ichan.org/*
// @include        http://zpag.es/*
// @include        http://imgchili.com/show/*
// @include        http://www.viidii.com/*
// @include        http://adfoc.us/*
// @include        http://adfoc.us/serve/?id=*
// @include        http://imagetwist.com/*
// @include        http://adjoin.me/*
// @include        http://www.madlink.sk/*
// @include        http://lnx.lu/*
// @include        http://adcrun.ch/*
// @include        http://kissdown.com/viewer.php?file=*
// @include        http://imagerabbit.com/viewer.php?file=*
// @include        http://games8y.com/viewer.php?file=*
// @include        http://image69.us/viewer.php?file=*
// @include        http://gzvd.info/viewer.php?file=*
// @include        http://picjav.net/viewer.php?file=*
// @include        http://hentaita.com/viewer.php?file=*
// @include        http://picjav.net/picjav2/viewer.php?file=*
// @include        http://picjav.net/x/viewer.php?file=*
// @include        http://bc.vc/*
// @include        http://imgonion.com/*
// @include        http://imgrill.com/*
// @include        http://imagecherry.com/*
// @include        http://imagecorn.com/*
// @include        http://imagehosting.2owl.net/*
// @exclude        http://www.linkbucks.com/
// @exclude        http://linkbee.com/
// @exclude        http://lnk.co/
// @exclude        http://adf.ly/*market.php?*
// @exclude        http://adf.ly/?default_ad*
// ==/UserScript==

( function() {
	'use strict';

	function RedirectionHelper(baseURI){
		this.baseURI=baseURI;
		this.domain=null;
		this.action=new Actions();
	}
	RedirectionHelper.prototype = {
		matchDomain: function(){
			var domain = this.baseURI.match(/^https?:\/\/([^\/]+)\//);
			if(domain)
				this.domain=domain[1];
			return this;
		},

		matchAction: function(){
			if(this.domain)
				this.action.find(this.domain);
			return this;
		},

		invokeAction: function(){
			if(this.action.invoked)
				this.action.invoked();
			return this;
		}
	}

	function Actions(){
		this.invoked=null;
		this.targetUrl=null;
	}
	Actions.prototype = {
		find: function( domain ) {
			for( var key in this.patterns ) {
				var pattern = this.patterns[key];
				var matched = pattern.rule.exec( domain );
				if( matched ) {
					this.invoked = pattern.run.bind( this, matched );
					return true;
				}
			}
			return false;
		},

		redirect: function(){
			if(this.targetUrl)
				window.location.replace(this.targetUrl);
		},

		cleanTimer: function(){
			var intervalID=setInterval('0', 10);
			while(--intervalID>0)
				clearInterval(intervalID);
		},

		disableWindowOpen: function(){
			if(unsafeWindow){
				unsafeWindow.open = function(){};
			}

			if(window){
				window.open = function(){};
			}
		},

		patterns: {
			linkbucks: {
				rule: /^[\w]{8}\..*\.(com?|net|gs|me|tv|bz|us)/,
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

			alabout: {
				rule: /(alabout|alafs)\.com/,
				run: function(){
					var o=document.getElementsByTagName('a');
					for(var i in o)
						if(/http:\/\/(www\.)?(alabout|alafs)\.com\/j\.phtml\?url=/.test(o[i].href))
							o[i].href=o[i].textContent;
				}
			},

			imageporter: {
				rule: /(imagecarry|imagedunk|imageporter|imageswitch|picleet|picturedip|pictureturn)\.com|(piclambo|yankoimages)\.net/,
				run: function(){
					var o;

					if(o=document.getElementById('firopage')){
						o.parentNode.removeChild(o);
					}

					o=document.getElementsByTagName('iframe');
					for(i=o.length-1;i>=0;i--){
						o[i].parentNode.removeChild(o[i]);
					}

					o=(document.compatMode=='CSS1Compat') ? document.documentElement : document.body;
					o.style.overflow='auto';

					this.cleanTimer();
					this.disableWindowOpen();
				}
			},

			adf: {
				rule: /adf.ly|[u9]\.bb|[jq]\.gs/,
				run: function(){
					var head = document.getElementsByTagName('head')[0].innerHTML;
					var matches = head.match(/var\s+url\s*=\s*['"](.+)['"]/);
					var that = this;

					if(matches){
						var ad = document.querySelector( 'body iframe' );
						ad.parentNode.removeChild( ad );
						window.setTimeout(function(){
							that.targetUrl=matches[1];
							that.redirect();
						}, 5000);
					}
					else if((matches = document.location.href.toString().match(/\/(https?:\/\/.+)/))) {
						that.targetUrl = matches[1];
						that.redirect();
					}
				}
			},

			turboimagehost: {
				rule: /turboimagehost\.com/,
				run: function(){
					var o;
					if((o=document.getElementById('blanket')))
						o.style.width='0px';
					if((o=document.getElementById('popUpDiv1')))
						o.style.visibility='hidden';
				}
			},

			imagevenue: {
				rule: /imagevenue\.com/,
				run: function(){
					var o;
					if((o=document.getElementById('interContainer')))
						o.style.display='none';
					if((o=document.getElementById('interVeil')))
						o.style.display='none';
				}
			},

			linkbee: {
				rule: /(linkbee\.com|lnk\.co)/,
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

			zpag: {
				rule: /zpag\.es/,
				run: function(){
					var matches=document.getElementsByTagName('head')[0].innerHTML.match(/window\.location\s*=\s*(['"])((?:\\\1|[^\1])*?)\1/);
					if(matches)
						this.targetUrl=matches[2];
					this.redirect();
				}
			},

			pixhost: {
				rule: /www\.pixhost\.org/,
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

			ichan: {
				rule: /ichan\.org/,
				run: function(){
					var o=document.getElementsByTagName('a');
					var l=o.length;
					for(var i=0; i<l; i++){
						if(o[i].href.indexOf('/url/http://')>-1)
							o[i].href=o[i].href.replace(/http:\/\/.+\/url\/(?=http:\/\/)/,'');
					}
				}
			},

			urlcash: {
				rule: /urlcash\.net/,
				run: function(){
					var matches;
					if(unsafeWindow)
						this.targetUrl=unsafeWindow.linkDestUrl;
					else if((matches=document.body.innerHTML.match(/linkDestUrl = '(.+)'/)) && matches)
						this.targetUrl=matches[1];
					this.redirect();
				}
			},

			pushba: {
				rule: /pushba\.com/,
				run: function(){
					var o;
					if((o=document.getElementById('urlTextBox')))
						this.targetUrl=o.value;
					this.redirect();
				}
			},

			imgchili: {
				rule: /imgchili\.com/,
				run: function(){
					var o;
					if((o=document.getElementById('ad')))
						o.parentNode.removeChild(o);

					if((o=document.getElementById('all')))
						o.style.display='';
				}
			},

			viidii: {
				rule: /www\.viidii\.com/,
				run: function(){
					var o;
					if((o=document.getElementById('directlink'))){
						this.targetUrl=o.href;
						this.redirect();
					}
				}
			},

			adfoc: {
				rule: /adfoc\.us/,
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

			imagetwist: {
				rule: /imagetwist\.com/,
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

			adjoin: {
				rule: /adjoin\.me/,
				run: function() {
					this.targetUrl=document.location.toString().replace(/adjoin\.me\/\d+\//, '');
					this.redirect();
				}
			},

			madlink: {
				rule: /www\.madlink\.sk/,
				run: function(){
					document.getElementById('gosterbeni').getElementsByClassName('button')[0].click();
				}
			},

			lnxlu: {
				rule: /lnx\.lu/,
				run: function() {
					this.targetUrl = document.getElementById('clickbtn').getElementsByTagName('a')[0].href;
					this.redirect();
				}
			},

			// Provided by tuxie.forte@userscripts.org
			adcrun: {
				rule: /adcrun\.ch/,
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

			mihalism: {
				rule: /(imagerabbit|kissdown|games8y)\.com/,
				run: function(){
					this.targetUrl = document.location.href.toString().replace('viewer.php?file=', 'images/');
					this.redirect();
				}
			},

			bcvc: {
				rule: /bc\.vc/,
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

			mihalism1: {
				rule: /image69\.us/,
				run: function() {
					var a = document.querySelector( '#page_body a' );
					var s = a.href;
					// the real link does not immediately appears after http://
					this.targetUrl = 'http://' + s.substr( s.lastIndexOf( window.location.hostname ) );
					this.redirect();
				},
			},

			mihalism2: {
				rule: /gzvd\.info|hentaita\.com/,
				run: function() {
					var a = document.querySelector( '#page_body a' );
					var s = a.href;
					// the real link is diffirent from original host
					var i = s.lastIndexOf( 'http://' );
					if( i >= 0 ) {
						this.targetUrl = s.substr( i );
						this.redirect();
					}
				},
			},

			imgonion: {
				rule: /imgonion\.com|imgrill\.com|imagecorn\.com/,
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

			imagecherry: {
				rule: /imagecherry\.com/,
				run: function() {
					var b = document.querySelector( 'body' );
					if( b.id ) {
						b.parentNode.removeChild( b );
						b = document.querySelector( 'body' );
						b.style.display = 'block';
					}
				},
			},

			mihalism3: {
				rule: /picjav\.net/,
				run: function() {
					if( window.location.pathname.indexOf( '/x/' ) === 0 ) {
						var a = document.querySelector( '#page_body a' );
					} else {
						var a = document.querySelectorAll( '#page_body a' );
						a = a[1];
					}
					var s = a.href;
					if( window.location.pathname.indexOf( '/x/' ) === 0 ) {
						this.targetUrl = s;
						this.redirect();
					} else {
						// the real link does not immediately appears after http://
						a = s.lastIndexOf( window.location.hostname );
						if( a >= 0 ) {
							this.targetUrl = 'http://' + s.substr( a );
							this.redirect();
						}
					}
				},
			},

			imagehosting: {
				rule: /imagehosting\.2owl\.net/,
				run: function() {
					var d = document.querySelector( '#warning' );
					d.parentNode.removeChild( d );
				},
			},
		}
	}

	var myRedirector=new RedirectionHelper(document.baseURI);
	myRedirector.matchDomain().matchAction().invokeAction();

} )();
