_.register({
  rule: {
    host: /^linksas\.us$/,
    path: /^(\/\w+)$/,
  },
  async ready (m) {
    const recaptcha = await _.tryEvery(1000, () => {
      const recaptcha = $('#g-recaptcha-response');
      if (!recaptcha) {
        // no recaptcha, unlikely to happen
        return null;
      }
      if (!recaptcha.value) {
        // not ready yet
        return _.none;
      }
      return recaptcha.value;
    });

    // get random ip info
    const url = `http://ipinfo.io/${_.generateRandomIP()}/json`;
    let ipinfo = await $.get(url);
    ipinfo = JSON.parse(ipinfo);
    const payload = {
      codeAds: 1,
      country: ipinfo.country,
      ipAddress: ipinfo.ip,
      recaptcha: recaptcha,
    };

    // finally send the request
    const token = $.getCookie('XSRF-TOKEN');
    let data = await $.post('/go' + m.path[1], payload, {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': token,
    });
    data = JSON.parse(data);
    await $.openLink(data.message);
  },
});

_.register({
  rule: {
    host: /^linksas\.us$/,
    path: /^\/go\//,
  },
  async ready () {
    const a = $.$('#btnSubmit');
    if (!a) {
      // recaptcha stage
      return;
    }

    const url = a.href;
    const pattern = /https?:\/\//g;
    let lastURL = '';
    while (true) {
      const matched = pattern.exec(url);
      if (!matched) {
        break;
      }
      lastURL = matched + url.substring(pattern.lastIndex);
    }
    await $.openLink(lastURL);
  },
});
