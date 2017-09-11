(function () {

  // Binbox pastes
  _.register({
    rule: {
      host: /^(www\.)?([a-zA-Z0-9]+\.)?binbox\.io$/,
      path: /\/([a-zA-Z0-9]+)/,
      hash: /(?:#([a-zA-Z0-9]+))?/,
    },
    async ready (m) {
      // If the hash is not here, it should ask the user for the password.
      // In fact, there is a security issue: if the user is not connected,
      // then it'll ask to fill a captcha, and the user will be able to access
      // the paste by only typing the captcha.

      const sjcl = $.window.sjcl;

      const paste_id = m.path[1];
      const paste_salt = m.hash[1];

      const API_URL = `https://binbox.io/${paste_id}.json`;

      let pasteInfo = await $.get(API_URL, false, {
        Origin: _.none,
        Referer: _.none,
        // referrer must be here
        Cookie: 'referrer=1',
        'X-Requested-With': _.none,
      });
      pasteInfo = JSON.parse(pasteInfo);
      if (!pasteInfo.ok) {
        throw new _.AdsBypasserError('error when getting paste information');
      }

      if (pasteInfo.paste.url) {
        await $.openLink(pasteInfo.paste.url);
        return;
      }

      // Decrypt paste
      const raw_paste = sjcl.decrypt(paste_salt, pasteInfo.paste.text);
      if (isLink(raw_paste)) {
        await $.openLink(raw_paste);
        return;
      }

      // Create paste
      const elm = document.createElement('pre');
      elm.id = 'paste-text';
      elm.innerHTML = linkify(raw_paste);

      // Replace captcha with paste
      const frame = $('#paste-frame, #captcha-page');
      frame.parentNode.replaceChild(elm, frame);
    },
  });

  const sUrl = '(\\b(https?|ftp|file)://[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])';

  function isLink (text) {
    const rUrl = new RegExp(`^${sUrl}$`, 'i');
    return rUrl.test(text);
  }

  function linkify (text) {
    const rUrl = new RegExp(sUrl, 'ig');
    return text.replace(rUrl, (match) => {
      return `<a href="${match}">${match}</a>`;
    });
  }

})();
