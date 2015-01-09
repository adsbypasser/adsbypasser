(function (global, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory;
  } else {
    factory(global, {
      getValue: GM_getValue,
      setValue: GM_setValue,
    }, global._, global.$);
  }
}(this, function (global, GM, _, $) {
  'use strict';

  var window = global.window;
  var unsafeWindow = global.unsafeWindow;
  var document = window.document;


  $._load = function () {
    delete $._load;
    var tmp = {
      version: GM.getValue('version', 0),
      alignCenter: GM.getValue('align_center'),
      changeBackground: GM.getValue('change_background'),
      externalServerSupport: GM.getValue('external_server_support'),
      redirectImage: GM.getValue('redirect_image'),
      scaleImage: GM.getValue('scale_image'),
    };
    fixup(tmp);
    save(tmp);
    $.config = tmp;
  };

  function save (c) {
    GM.setValue('version', c.version);
    GM.setValue('align_center', c.alignCenter);
    GM.setValue('change_background', c.changeBackground);
    GM.setValue('external_server_support', c.externalServerSupport);
    GM.setValue('redirect_image', c.redirectImage);
    GM.setValue('scale_image', c.scaleImage);
  }

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

      unsafeWindow.commit = $.inject(function (data) {
        data.version = $.config.version;
        _.C(data).each(function (v, k) {
          $.config[k] = v;
        });
        // protection hack
        setTimeout(function () {
          save(data);
        }, 0);
      });

      unsafeWindow.render($.inject({
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
      }));

    },
  });


  return $;

}));


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
