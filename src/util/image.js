(function (context, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = function (context, GM) {
      var _ = require('lodash');
      var core = require('./core.js');
      var dom = require('./dom.js');
      var config = require('./config.js');
      var link = require('./link.js');
      var misc = require('./misc.js');
      var modules = [dom, config, link, misc].map(function (v) {
        return v.call(null, context, GM);
      });
      var $ = _.assign.apply(_, modules);
      return factory(context, GM, core, $);
    };
  } else {
    factory(context, {
      getResourceText: GM_getResourceText,
      addStyle: GM_addStyle,
      getResourceURL: GM_getResourceURL,
    }, context._, context.$);
  }
}(this, function (context, GM, _, $) {
  'use strict';

  var window = context.window;
  var document = window.document;


  $.openImage = function (imgSrc) {
    if ($.config.redirectImage) {
      $.openLink(imgSrc, {
        referer: false,
      });
    }
  };

  function enableScrolling () {
    var o = document.compatMode === 'CSS1Compat' ? document.documentElement : document.body;
    o.style.overflow = '';
  };

  function toggleShrinking () {
    this.classList.toggle('adsbypasser-shrinked');
  }

  function checkScaling () {
    var nw = this.naturalWidth;
    var nh = this.naturalHeight;
    var cw = document.documentElement.clientWidth;
    var ch = document.documentElement.clientHeight;
    if ((nw > cw || nh > ch) && !this.classList.contains('adsbypasser-resizable')) {
      this.classList.add('adsbypasser-resizable');
      this.classList.add('adsbypasser-shrinked');

      this.addEventListener('click', toggleShrinking);
    } else {
      this.removeEventListener('click', toggleShrinking);

      this.classList.remove('adsbypasser-shrinked');
      this.classList.remove('adsbypasser-resizable');
    }
  }

  function scaleImage (i) {
    var style = GM.getResourceText('scaleImage');
    GM.addStyle(style);

    if (i.naturalWidth && i.naturalHeight) {
      checkScaling.call(i);
    } else {
      i.addEventListener('load', checkScaling);
    }

    var h;
    window.addEventListener('resize', function () {
      window.clearTimeout(h);
      h = window.setTimeout(checkScaling.bind(i), 100);
    });
  }

  function changeBackground () {
    var bgImage = GM.getResourceURL('bgImage');
    document.body.style.backgroundColor = '#222222';
    document.body.style.backgroundImage = _.T('url(\'{0}\')')(bgImage);
  }

  function alignCenter () {
    var style = GM.getResourceText('alignCenter');
    GM.addStyle(style);
  }

  function injectStyle (d, i) {
    $.removeNodes('style, link[rel=stylesheet]');

    d.id = 'adsbypasser-wrapper';
    i.id = 'adsbypasser-image';
  }

  $.replace = function (imgSrc) {
    if (!$.config.redirectImage) {
      return;
    }

    if (!imgSrc) {
      _.warn('false url');
      return;
    }
    _.info(_.T('replacing body with `{0}` ...')(imgSrc));

    $.removeAllTimer();
    enableScrolling();

    document.body = document.createElement('body');

    var d = document.createElement('div');
    document.body.appendChild(d);

    var i = document.createElement('img');
    i.src = imgSrc;
    d.appendChild(i);

    if ($.config.alignCenter || $.config.scaleImage) {
      injectStyle(d, i);
    }
    if ($.config.alignCenter) {
      alignCenter();
    }
    if ($.config.changeBackground) {
      changeBackground();
    }
    if ($.config.scaleImage) {
      scaleImage(i);
    }
  };


  return $;

}));


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
