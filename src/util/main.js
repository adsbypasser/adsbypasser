(function (global, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory;
  } else {
    factory(global, {
      openInTab: GM_openInTab,
      registerMenuCommand: GM_registerMenuCommand,
    }, global._, global.$);
  }
}(this, function (global, GM, _, $) {
  'use strict';

  var window = global.window;
  var unsafeWindow = global.unsafeWindow;
  var document = window.document;


  function disableWindowOpen () {
    unsafeWindow.open = _.nop;
  }

  function disableLeavePrompt () {
    var seal = {
      set: function () {
        _.info('blocked onbeforeunload');
      },
    };
    // NOTE maybe break in future Firefox release
    _.C([unsafeWindow, unsafeWindow.document.body]).each(function (o) {
      if (!o) {
        return;
      }

      // release existing events
      o.onbeforeunload = undefined;
      // prevent they bind event again
      o.__defineSetter__('onbeforeunload', $.inject(seal.set));

      // block addEventListener
      var oael = o.addEventListener;
      var nael = function (type) {
        if (type === 'beforeunload') {
          _.info('blocked addEventListener onbeforeunload');
          return;
        }
        return oael.apply(this, arguments);
      };
      o.addEventListener = $.inject(nael);
    });
  }

  $._main = function (isNodeJS) {
    var findHandler = $._findHandler;

    delete $._main;
    delete $._findHandler;

    if (isNodeJS) {
      config = load();
      return;
    }

    if (window.top !== window.self) {
      // skip frames
      return;
    }

    GM.registerMenuCommand('AdsBypasser - Configure', function () {
      GM.openInTab('https://adsbypasser.github.io/configure.html');
    });

    var handler = findHandler(true);
    if (handler) {
      $._load();
      _.info('working on\n%s \nwith\n%o', window.location.toString(), $.config);

      disableWindowOpen();

      handler.start();

      document.addEventListener('DOMContentLoaded', function () {
          disableLeavePrompt();
          handler.ready();
      });
    } else {
      _.info('does not match location on `%s`, will try HTML content', window.location.toString());

      document.addEventListener('DOMContentLoaded', function () {
        handler = findHandler(false);

        if (!handler) {
          _.info('does not match HTML content on `%s`', window.location.toString());
          return;
        }

        $._load();
        _.info('working on\n%s \nwith\n%o', window.location.toString(), $.config);

        disableWindowOpen();
        disableLeavePrompt();

        handler.ready();
      });
    }
  };

  return $;

}));
$._main();


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
