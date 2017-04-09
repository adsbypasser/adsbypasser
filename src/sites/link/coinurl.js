$.register({
  rule: {
    host: /^(?:(\w+)\.)?(coinurl\.com|cur\.lv)$/,
    path: /^\/([-\w]+)$/
  },
  ready: function (m) {
    'use strict';

    $.removeNodes('iframe');

    var host = 'http://cur.lv/redirect_curlv.php';
    var param = m.host[1] === undefined ? {
      code: m.path[1],
    } : {
      zone: m.host[1],
      name: m.path[1],
    };

    // Retrieve the main frame
    $.get(host, param).then(function(mainFrameContent) {
      try {
        // Convert it to HTML nodes
        var docMainFrame = $.toDOM(mainFrameContent);
      } catch (e) {
        throw new _.AdsBypasserError('main frame changed');
      }

      // Regex allowing to extract the link from a subframe
      var rExtractLink = /onclick="open_url\('([^']+)',\s*'go'\)/;

      // Iterate each frame
      var innerFrames = $.$$('iframe', docMainFrame).each(function (currFrame) {
        // Fix the host of the frame
        // NOTE Webkit does not strictly follow HTMLElement spec, can not use HTMLFrameElement.src
        var currFrameAddr = currFrame.getAttribute('src');

        // Get the content of the current frame
        $.get(currFrameAddr).then(function(currFrameContent) {
          // Try to find the link in the current frame
          var aRealLink = rExtractLink.exec(currFrameContent);

          // Could not find it? Try to find it in the next frame
          if (aRealLink === undefined || aRealLink[1] === undefined) {
            return;
          }

          // Otherwise redirect to the link
          var realLink = aRealLink[1];
          $.openLink(realLink);
        });
      });
    });
  },
});
