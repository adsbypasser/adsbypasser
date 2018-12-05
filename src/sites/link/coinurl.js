_.register({
  rule: {
    host: [
      /^(?:(\w+)\.)?coinurl\.com$/,
      /^(?:(\w+)\.)?cur\.lv$/,
    ],
    path: /^\/([-\w]+)$/,
  },
  async ready (m) {
    $.remove('iframe');

    const host = 'http://cur.lv/redirect_curlv.php';
    const param = m.host[1] === undefined ? {
      code: m.path[1],
    } : {
      zone: m.host[1],
      name: m.path[1],
    };

    // Retrieve the main frame
    const mainFrameContent = await $.get(host, param);
    let docMainFrame = null;
    try {
      // Convert it to HTML nodes
      docMainFrame = $.toDOM(mainFrameContent);
    } catch (e) {
      throw new _.AdsBypasserError('main frame changed');
    }

    // Regex allowing to extract the link from a subframe
    const rExtractLink = /onclick="open_url\('([^']+)',\s*'go'\)/;

    // XXX need asyncForEach
    // Iterate each frame
    _.forEach($.$$('iframe', docMainFrame), (currFrame) => {
      // Fix the host of the frame
      // NOTE Webkit does not strictly follow HTMLElement spec, can not use HTMLFrameElement.src
      const currFrameAddr = currFrame.getAttribute('src');

      // Get the content of the current frame
      $.get(currFrameAddr).then((currFrameContent) => {
        // Try to find the link in the current frame
        const aRealLink = rExtractLink.exec(currFrameContent);

        // Could not find it? Try to find it in the next frame
        if (aRealLink === undefined || aRealLink[1] === undefined) {
          return;
        }

        // Otherwise redirect to the link
        const realLink = aRealLink[1];
        return $.openLink(realLink);
      });
    });
  },
});
