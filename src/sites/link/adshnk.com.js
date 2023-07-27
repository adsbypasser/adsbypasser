(function () {

  // Adshnk pastes
  _.register({
    rule: {
      host: /^(www\.)?([a-zA-Z0-9]+\.)?adshnk\.com$/,
      path: /\/([a-zA-Z0-9]+)/
    },
    async ready (m) {

      const sjcl = $.window.sjcl;

      const path_id = m.path[1];

      const API_URL = `https://www.shrink-service.it/v3/api/prototype/init?req=init&uri=https://adshnk.com/`+path_id;

      let linkInfo = await $.get(API_URL, false, {
        Origin: _.none,
        Referer: _.none,
        // referrer must be here
        Cookie: 'referrer=1',
        'X-Requested-With': _.none,
      });
      linkInfo = JSON.parse(linkInfo);
      if (!linkInfo.success) {
        throw new _ADSBYPASSER_NAMESPACE___WEBPACK_IMPORTED_MODULE_0__["_"].AdsBypasserError('error when getting api information');
      }

      let urlInfo = JSON.parse(linkInfo["0"].metadata);
      if (urlInfo.url) {
        await _ADSBYPASSER_NAMESPACE___WEBPACK_IMPORTED_MODULE_0__["$"].openLink(urlInfo.url);
        return;
      }
    },
  });

})();
