$.register({
  rule: {
    host: /^(openload\.co|oload\.tv)$/,
    path: /^\/f\/.*/,
  },
  start: function (m) {
    $.window.adblock = false;
    $.window.adblock2 = false;
    $.window.popAdsLoaded = true;
  },
  ready: function () {
    'use strict';
    
    setTimeout(function () {
      var timer = $('#downloadTimer');
      timer.style.display = 'none';

      var dlCtn = $('#realdl');
      dlCtn.style.display = 'inline-block';

      var dlBtn = $('a', dlCtn);
      var ePath = $('#streamurl');
      dlBtn.href = "/stream/" + ePath.textContent;

      var videoCtn = $.$('.videocontainer');

      if (videoCtn) {
        var overlay = $('#videooverlay', videoCtn);
        overlay.click();

        // use iframe instead of $.openLink
        // in order to not affect streaming
        dlBtn.addEventListener('click', function (evt) {
          evt.preventDefault();

          // TODO *iframe* hack is not normal
          // please generalize in the future
          var iframe = document.createElement('iframe');
          iframe.src = dlBtn.href;
          document.body.appendChild(iframe);
        });

        _.info(_.T('{0} -> {1}')(window.location, dlBtn.href));

        dlBtn.click();
      } else {
        $.openLink(dlBtn.href);
      }
    }, 500);
  }
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
