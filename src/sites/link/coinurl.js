(function () {
  'use strict';

  $.register({
    rule: {
      host: /^(?:(\w+)\.)?(coinurl\.com|cur\.lv)$/,
      path: /^\/[-\w]+$/
    },
    ready: function (m) {
      $.removeNodes('iframe');
      if (m.host[1] == null) {
        var mainFrame = 'http://cur.lv/redirect_curlv.php?code=' + escape(window.location.pathname.substring(1));
      } else {
        var mainFrame = 'http://cur.lv/redirect_curlv.php?zone=' + m.host[1] + '&name=' + escape(window.location.pathname.substring(1));
      }
      // Retrieve the main frame
      $.get(mainFrame, {}, function(mainFrameContent) {
        try {
          // Convert it to HTML nodes
          var docMainFrame = $.toDOM(mainFrameContent);
        } catch (e) {
          throw new _.AdsBypasserError('main frame changed');
        }

        // Regex allowing to extract the link from a subframe
        var rExtractLink = /onclick="open_url\('([^']+)',\s*'go'\)/;

        // Iterate each frame
        var innerFrames = $.$$('frameset > frame', docMainFrame).each(function (currFrame) {
          // Fix the host of the frame
          // NOTE Webkit does not strictly follow HTMLElement spec, can not use HTMLFrameElement.src
          var currFrameAddr = window.location.origin + '/' + currFrame.getAttribute('src');

          // Get the content of the current frame
          $.get(currFrameAddr, {}, function(currFrameContent) {
            // Try to find the link in the current frame
            var aRealLink = rExtractLink.exec(currFrameContent);

            // Could not find it? Try to find it in the next frame
            if (aRealLink == null || aRealLink[1] == null) {return;}

            // Otherwise redirect to the link
            var realLink = aRealLink[1];
            $.openLink(realLink);
          });
        });
      });
    },
  });

})();

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
