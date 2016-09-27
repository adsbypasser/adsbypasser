(function (context, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = function (context, GM) {
      var _ = require('lodash');
      var core = require('./core.js');
      var misc = require('./misc.js');
      var dispatcher = require('./dispatcher.js');
      var modules = [misc, dispatcher].map(function (v) {
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

  var MANIFEST = [
    {
      name: 'version',
      key: 'version',
      default_: 0,
      verify: function (v) {
        return typeof v === 'number' && v >= 0;
      },
      normalize: toNumber,
    },
    {
      name: 'alignCenter',
      key: 'align_center',
      default_: true,
      verify: isBoolean,
      normalize: toBoolean,
    },
    {
      name: 'changeBackground',
      key: 'change_background',
      default_: true,
      verify: isBoolean,
      normalize: toBoolean,
    },
    {
      name: 'externalServerSupport',
      key: 'external_server_support',
      default_: false,
      verify: isBoolean,
      normalize: toBoolean,
    },
    {
      name: 'redirectImage',
      key: 'redirect_image',
      default_: true,
      verify: isBoolean,
      normalize: toBoolean,
    },
    {
      name: 'scaleImage',
      key: 'scale_image',
      default_: true,
      verify: isBoolean,
      normalize: toBoolean,
    },
    {
      name: 'logLevel',
      key: 'log_level',
      default_: 1,
      verify: function (v) {
        return typeof v === 'number' && v >= 0 && v <= 2;
      },
      normalize: toNumber,
    },
  ];
  var PATCHES = [
    function (c) {
      var ac = typeof c.alignCenter === 'boolean';
      if (typeof c.changeBackground !== 'boolean') {
        c.changeBackground = ac ? c.alignCenter : true;
      }
      if (typeof c.scaleImage !== 'boolean') {
        c.scaleImage = ac ? c.alignCenter : true;
      }
      if (!ac) {
        c.alignCenter = true;
      }
      if (typeof c.redirectImage !== 'boolean') {
        c.redirectImage = true;
      }
    },
    function (c) {
      if (typeof c.externalServerSupport !== 'boolean') {
        c.externalServerSupport = false;
      }
    },
    function (c) {
      if (typeof c.logLevel !== 'number') {
        c.logLevel = 1;
      }
    },
  ];

  var window = context.window;

  function isBoolean (v) {
    return typeof v === 'boolean';
  }

  function toBoolean (v) {
    return !!v;
  }

  function toNumber (v) {
    return parseInt(v, 10);
  }

  function createConfig () {
    var c = {};
    _.C(MANIFEST).each(function (m) {
      Object.defineProperty(c, m.name, {
        configurable: true,
        enumerable: true,
        get: function () {
          return GM.getValue(m.key, m.default_);
        },
        set: function (v) {
          GM.setValue(m.key, v);
        },
      });
    });
    return c;
  }

  function senityCheck (c) {
    var ok = _.C(MANIFEST).all(function (m) {
      return m.verify(c[m.name]);
    });
    if (!ok) {
      c.version = 0;
    }
    return c;
  }

  function migrate (c) {
    if (typeof c.version !== 'number' || c.version < 0) {
      throw new _.AdsBypasserError('wrong config version: ' + c.version);
    }
    while (c.version < PATCHES.length) {
      PATCHES[c.version](c);
      ++c.version;
    }
    return c;
  }

  $.config = migrate(senityCheck(createConfig()));

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
      };

      // TODO: i18n
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
              'setlinks.us (captcha)',
            ].join('<br/>\n'),
          },
          logLevel: {
            type: 'select',
            value: $.config.logLevel,
            menu: [
              [0, '0 (quiet)'],
              [1, '1 (default)'],
              [2, '2 (verbose)'],
            ],
            label: 'Log Level',
            help: [
              'Log level in developer console. (default: 1)',
              '0 will not print anything in console.',
              '1 will only print logs on affected sites.',
              '2 will print on any sites.',
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
