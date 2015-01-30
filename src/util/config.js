(function (context, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = function (context, GM) {
      var _ = require('lodash');
      var core = require('./core.js');
      var misc = require('./misc.js');
      var handler = require('./handler.js');
      var modules = [misc, handler].map(function (v) {
        return v.call(null, context, GM);
      });
      var $ = _.assign.apply(null, modules);
      return factory(context, GM, core, $);
    };
  } else {
    factory(context, {
      getValue: GM_getValue,
      setValue: GM_setValue,
    }, context._, context.$);
  }
}(this, function (context, GM, _, $) {
  'use strict';

  var window = context.window;

  $.config = {
    set version (value) {
      GM.setValue('version', value);
    },
    get version () {
      return GM.getValue('version', 0);
    },
    set alignCenter (value) {
      GM.setValue('align_center', value);
    },
    get alignCenter () {
      return GM.getValue('align_center');
    },
    set changeBackground (value) {
      GM.setValue('change_background', value);
    },
    get changeBackground () {
      return GM.getValue('change_background');
    },
    set externalServerSupport (value) {
      GM.setValue('external_server_support', value);
    },
    get externalServerSupport () {
      GM.getValue('external_server_support');
    },
    set redirectImage (value) {
      GM.setValue('redirect_image', value);
    },
    get redirectImage () {
      return GM.getValue('redirect_image');
    },
    set scaleImage (value) {
      GM.setValue('scale_image', value);
    },
    get scaleImage () {
      return GM.getValue('scale_image');
    },
  };

  fixup($.config);

  function fixup (c) {
    var patches = [
      function (c) {
        var ac = typeof c.alignCenter !== 'undefined';
        if (typeof c.changeBackground === 'undefined') {
          c.changeBackground = ac ? c.alignCenter : true;
        }
        if (typeof c.scaleImage === 'undefined') {
          c.scaleImage = ac ? c.alignCenter : true;
        }
        if (!ac) {
          c.alignCenter = true;
        }
        if (typeof c.redirectImage === 'undefined') {
          c.redirectImage = true;
        }
      },
      function (c) {
        if (typeof c.externalServerSupport === 'undefined') {
          c.externalServerSupport = false;
        }
      },
    ];
    while (c.version < patches.length) {
      patches[c.version](c);
      ++c.version;
    }
  }

  $.register({
    rule: {
      host: /^adsbypasser\.github\.io$/,
      path: /^\/configure\.html$/,
    },
    ready: function () {

      $.window.commit = function (data) {
        data.version = $.config.version;
        _.C(data).each(function (v, k) {
          $.config[k] = v;
        });
        // protection hack
        setTimeout(function () {
          save(data);
        }, 0);
      };

      $.window.render({
        version: $.config.version,
        options: {
          alignCenter: {
            type: 'checkbox',
            value: $.config.alignCenter,
            label: 'Align Center',
            help: 'Align image to the center if possible. (default: enabled)',
          },
          changeBackground: {
            type: 'checkbox',
            value: $.config.changeBackground,
            label: 'Change Background',
            help: 'Use Firefox-like image background if possible. (default: enabled)',
          },
          redirectImage: {
            type: 'checkbox',
            value: $.config.redirectImage,
            label: 'Redirect Image',
            help: [
              'Directly open image link if possible. (default: enabled)',
              'If disabled, redirection will only works on link shortener sites.',
            ].join('<br/>\n'),
          },
          scaleImage: {
            type: 'checkbox',
            value: $.config.scaleImage,
            label: 'Scale Image',
            help: 'When image loaded, scale it to fit window if possible. (default: enabled)',
          },
          externalServerSupport: {
            type: 'checkbox',
            value: $.config.externalServerSupport,
            label: 'External Server Support',
            help: [
              'Send URL information to external server to enhance features (e.g.: captcha resolving). (default: disabled)',
              'Affected sites:',
              'urlz.so (captcha)',
            ].join('<br/>\n'),
          },
        },
      });

    },
  });


  return $;

}));


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
