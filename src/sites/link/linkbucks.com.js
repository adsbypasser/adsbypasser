(function() {

  const hostRules = [
    // com
    /^(([\w]{8}|www)\.)?(allanalpass|drstickyfingers|whackyvidz)\.com$/,
    /^(([\w]{8}|www)\.)?(linkbabes|linkbucks)\.com$/,
    /^(([\w]{8}|www)\.)?theseblogs\.com$/,
    /^warning-this-linkcode-will-cease-working-soon\.www\.linkbucksdns\.com$/,
    // net
    /^(([\w]{8}|www)\.)?(filesonthe|poontown|seriousdeals|urlbeat)\.net$/,
    /^(([\w]{8}|www)\.)?(zatnawqy|rhvgmritmziwcm)\.net$/,
    // else
    /^(([\w]{8}|www)\.)?freean\.us$/,
    /^(([\w]{8}|www)\.)?(miniurls|qqc|rqq|tinylinks|yyv)\.co$/,
    /^(([\w]{8}|www)\.)?youfap\.me$/,
  ];

  _.register({
    rule: {
      host: hostRules,
      path: /^\/\w+\/url\/(.+)$/,
    },
    async ready(m) {
      $.removeAllTimer();
      $.resetCookies();
      $.remove('iframe');

      let url = m.path[1] + window.location.search;

      const match = $.searchFromScripts(/UrlEncoded: ([^,]+)/);
      if (match && match[1] === 'true') {
        // encrypted url
        url = decrypt(url);
      }

      await $.openLink(url);
    }
  });

  _.register({
    rule: {
      host: hostRules,
    },
    async start () {
      // avoid additional request
      $.window.XMLHttpRequest = _.nop;
    },
    async ready () {
      $.removeAllTimer();
      $.resetCookies();
      $.remove('iframe');

      if (window.location.pathname.indexOf('verify') >= 0) {
        // NOTE dirty fix
        const path = window.location.pathname.replace('/verify', '');
        await $.openLink(path);
        return;
      }

      const token = findToken(document);
      const url = await sendRequest(token);
      $.nuke(url);
      await $.openLink(url);
    },
  });

  // for entry script
  // this is stupid, but inspecting script on every page is too heavy
  _.register({
    rule: {
      query: /^(.*)[?&]_lbGate=\d+$/,
    },
    async start (m) {
      $.setCookie('_lbGatePassed', 'true');
      await $.openLink(window.location.pathname + m.query[1]);
    },
  });

  function findToken (context) {
    const script = $.searchFromScripts('    var f = window[\'init\' + \'Lb\' + \'js\' + \'\']', context);
    if (!script) {
      _.warn('pattern changed');
      return null;
    }

    let adurl = script.match(/AdUrl\s*:\s*'([^']+)'/);
    if (!adurl) {
      return null;
    }
    adurl = adurl[1];

    const m1 = script.match(/AdPopUrl\s*:\s*'.+\?[^=]+=([\w\d]+)'/);
    const m2 = script.match(/Token\s*:\s*'([\w\d]+)'/);
    const token = m1[1] || m2[1];
    let m = script.match(/=\s*(\d+);/);
    let ak = parseInt(m[1], 10);
    const re = /\+\s*(\d+);/g;
    let tmp = null;
    // get second (i.e. the real) salt
    while((m = re.exec(script)) !== null) {
      tmp = m[1];
    }
    ak += parseInt(tmp, 10);

    return {
      t: token,
      aK: ak,
      adurl: adurl,
    };
  }

  async function sendRequest (token) {
    // touch the ad url to pass the server-side check
    $.get(token.adurl);
    delete token.adurl;

    token.a_b = false;

    _.info('waiting the interval');
    await _.wait(5000);

    _.info('sending token: %o', token);
    const text = await $.get('/intermission/loadTargetUrl', token, {
      // strip additional headers
      'X-Requested-With': _.none,
      Origin: _.none,
    });
    const data = JSON.parse(text);
    _.info('response: %o', data);

    if (!data.Success && data.Errors[0] === 'Invalid token') {
      // somehow this token is invalid, reload to get new one
      _.warn('got invalid token');
      return await retry();
    }
    if (data.AdBlockSpotted) {
      _.warn('adblock spotted');
      return;
    }
    if (data.Success && !data.AdBlockSpotted && data.Url) {
      return data.Url;
    }
  }

  async function retry () {
    const text = await $.get(window.location.toString(), {}, {
      // trick the server to avoid possible survey page
      'X-Forwarded-For': _.generateRandomIP(),
    });
    const d = $.toDOM(text);
    const t = findToken(d);
    if (!t) {
      // if still fail, request again.
      // wait a second to avoid flooding detection
      await _.wait(1000);
      return await retry();
    }
    return await sendRequest(t);
  }

  function decrypt (url) {
    url = ConvertFromHex(url);
    let unsafe = `(${Encode.toString()})("${url}")`;
    // TODO Have to use this to escape strict mode ...
    // eslint-disable-next-line no-eval
    unsafe = (0, eval)(unsafe);
    return unsafe;
  }

  // copy from Lbjs, can not get from unsafeWindow
  function ConvertFromHex (str) {
    const result = [];
    while (str.length >= 2) {
      result.push(String.fromCharCode(parseInt(str.substring(0, 2), 16)));
      str = str.substring(2, str.length);
    }
    return result.join('');
  }
  // function name MATTERS, do not change this function
  // arguments.callee does not exists in strict mode
  /* eslint-disable no-var */
  const Encode = function (str) {
    var s = [], j = 0, x, res = '', k = arguments.callee.toString().replace(/\s+/g, '');
    for (var i = 0; i < 256; i++) {
      s[i] = i;
    }
    for (i = 0; i < 256; i++) {
      j = (j + s[i] + k.charCodeAt(i % k.length)) % 256;
      x = s[i];
      s[i] = s[j];
      s[j] = x;
    }
    i = 0;
    j = 0;
    for (var y = 0; y < str.length; y++) {
      i = (i + 1) % 256;
      j = (j + s[i]) % 256;
      x = s[i];
      s[i] = s[j];
      s[j] = x;
      res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
    }
    return res;
  };
  /* eslint-enable no-var */

})();
