(function () {
  'use strict';

  var sUrl = '(\\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])';

  function isLink (text) {
    var rUrl = new RegExp(_.T('^{0}$')(sUrl), 'i');
    return rUrl.test(text);
  }

  function linkify (text) {
    var rUrl = new RegExp(sUrl, 'ig');
    return text.replace(rUrl, function(match) {
      return _.T("<a href='{0}'>{0}</a>")(match);
    });
  }

  // Binbox pastes
  $.register({
    rule: {
      host: /^(www\.)?([a-zA-Z0-9]+\.)?binbox\.io$/,
      path: /\/([a-zA-Z0-9]+)/,
      hash: /(?:#([a-zA-Z0-9]+))?/,
    },
    ready: function (m) {
      // If the hash is not here, it should ask the user for the password.
      // In fact, there is a security issue: if the user is not connected,
      // then it'll ask to fill a captcha, and the user will be able to access
      // the paste by only typing the captcha.

      var sjcl = $.window.sjcl;

      var paste_id = m.path[1];
      var paste_salt = m.hash[1];

      var API_URL = _.T('https://binbox.io/{0}.json')(paste_id);

      $.get(API_URL, false, {
        Origin: _.none,
        Referer: _.none,
        // referrer must be here
        Cookie: 'referrer=1',
        'X-Requested-With': _.none,
      }).then(function (pasteInfo) {
        pasteInfo = _.parseJSON(pasteInfo);
        if (!pasteInfo.ok) {
          throw new _.AdsBypasserError("error when getting paste information");
        }

        if (pasteInfo.paste.url) {
          $.openLink(pasteInfo.paste.url);
          return;
        }

        // Decrypt paste
        var raw_paste = sjcl.decrypt(paste_salt, pasteInfo.paste.text);
        if (isLink(raw_paste)) {
          $.openLink(raw_paste);
          return;
        }

        // Create paste
        var elm = document.createElement('pre');
        elm.id = 'paste-text';
        elm.innerHTML = linkify(raw_paste);

        // Replace captcha with paste
        var frame = $('#paste-frame, #captcha-page');
        frame.parentNode.replaceChild(elm, frame);
      });
    },
  });

})();
