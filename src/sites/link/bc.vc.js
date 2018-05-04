(function () {

  const ajaxPattern = /\$.post\('([^']*)'[^{]+(\{\s*opt:\s*'make_log'[^}]+\}\s*\}),/i;

  // bc.vc, shortcut
  _.register({
    rule: {
      host: [
        /^bc\.vc$/,
        /^linc\.ml$/,
      ],
      path: /^.+(https?:\/\/.+)$/,
    },
    async start (m) {
      await $.openLink(m.path[1] + document.location.search + document.location.hash);
    },
  });

  // bc.vc
  _.register({
    rule: {
      host: /^bc\.vc$/,
      path: /^\/.+/,
    },
    async ready () {
      $.remove('iframe');

      const token = findAJAXToken();
      const time = fakeAJAXToken();
      const url = `/fly/ajax.php?wds=${token.wds}&time=${time}`;

      await _.wait(5000);
      let rv = await $.post(url, {
        xdf: {
          afg: $.window.tZ,
          bfg: $.window.cW,
          cfg: $.window.cH,
          jki: token.jki,
          dfg: $.window.sW,
          efg: $.window.sH,
        },
        ojk: token.ojk,
      });
      rv = JSON.parse(rv);
      if (rv.error) {
        throw new _.AdsBypasserError('auth error');
      }
      await $.openLink(rv.message.url);
    },
  });

  // adcrun.ch
  _.register({
    rule: {
      host: /^adcrun\.ch$/,
      path: /^\/\w+$/,
    },
    async ready () {
      // Try to bypass the survey
      $.remove('.user_content');

      const rSurveyLink = /http\.open\("GET", "api_ajax\.php\?sid=\d*&ip=[^&]*&longurl=([^"]+)" \+ first_time, (?:true|false)\);/;
      const l = $.searchFromScripts(rSurveyLink);
      // Redirect to the target link if we found it
      if (l) {
        await $.openLink(l[1]);
        return;
      }

      // Otherwise it's most likely a simple bc.vc-like link
      // Malformed JSON
      await run(true);
    },
  });

  _.register({
    rule: {
      host: [
        /^(1tk|hit|adbla|tl7)\.us$/,
        /^mylink\.(us|zone)$/,
        /^gx\.si$/,
        /^adwat\.ch$/,
        /^(fly2url|urlwiz|xafox)\.com$/,
        /^(zpoz|ultry)\.net$/,
        /^(wwy|myam)\.me$/,
        /^(ssl|srk)\.gs$/,
        /^www\.adjet\.eu$/,
        /^cun\.bz$/,
        /^miniurl\.tk$/,
        /^vizzy\.es$/,
        /^kazan\.vc$/,
        /^linkcash\.ml$/,
      ],
      path: /^\/.+/,
    },
    ready: run,
  });

  _.register({
    rule: {
      host: /^adtr\.im|ysear\.ch|xip\.ir$/,
      path: /^\/.+/,
    },
    async ready () {
      const a = $.$('div.fly_head a.close');
      const f = $.$('iframe.fly_frame');
      // the iframe may be an ad link
      // so also check the close button
      if (a && f) {
        await $.openLink(f.src);
      } else {
        await run();
      }
    },
  });

  _.register({
    rule: {
      host: /^ad5\.eu$/,
      path: /^\/[^.]+$/,
    },
    async ready () {
      $.remove('iframe');
      const s = searchScript(true);

      // Find the form
      let m = s.script.match(/(<form name="form1"method="post".*(?!<\\form>)<\/form>)/);
      if (!m) {
        return;
      }
      m = m[1];

      // Set the correct timezone
      const tz = -(new Date().getTimezoneOffset() / 60);
      m = m.replace('\'+timezone+\'', tz);

      // Wrap the form into a useless div
      const d = document.createElement('div');
      d.setAttribute('id', 'AdsBypasserFTW');
      d.setAttribute('style', 'display:none;');

      // Feed with the right form
      d.innerHTML = m;
      document.body.appendChild(d);

      // Redirect to next page
      $('#AdsBypasserFTW > form[name=form1]').submit();
    },
  });

  _.register({
    rule: {
      host: /^tr5\.in$/,
      path: /^\/.+/,
    },
    async ready () {
      // Malformed JSON
      await run(true);
    },
  });

  function decompress (script, unzip) {
    if (!unzip) {
      return script;
    }
    let matches = script.match(/eval(.*)/);
    if (!matches) {
      throw new _.AdsBypasserError('no script matches /eval(.*)/');
    }
    matches = matches[1];
    script = eval(matches);
    return script;
  }

  function searchScript (unzip) {
    let content = $.searchFromScripts('make_log');
    if (content) {
      return {
        direct: false,
        script: decompress(content, unzip),
      };
    }
    content = $.searchFromScripts('click_log');
    if (content) {
      return {
        direct: true,
        script: decompress(content, unzip),
      };
    }
    throw new _.AdsBypasserError('script changed');
  }

  function knockServer (script, dirtyFix) {
    const matches = script.match(ajaxPattern);
    if (!matches) {
      throw new _.AdsBypasserError('(in knock server) no script matches $.post');
    }
    const make_url = matches[1];
    const make_opts = eval('(' + matches[2] + ')');

    // XXX refactor?
    const i = setInterval(function () {
      $.post(make_url, make_opts).then(function (text) {
        if (dirtyFix) {
          // dirty fix for tr5.in
          text = text.match(/\{.+\}/)[0];
        }
        const jj = JSON.parse(text);
        if (jj.message) {
          clearInterval(i);
          return $.openLink(jj.message.url);
        }
      });
    }, 1000);
  }


  async function run (dirtyFix) {
    // prevent redirection by iframe
    $.remove('iframe');

    let result = searchScript(true);
    if (!result.direct) {
      knockServer(result.script,dirtyFix);
    } else {
      result = result.script.match(/top\.location\.href='([^']+)'/);
      if (!result) {
        throw new _.AdsBypasserError('script changed');
      }
      result = result[1];
      await $.openLink(result);
    }
  }


  function findAJAXToken () {
    const rv = $.searchFromScripts('/fly/ajax.php');
    if (!rv) {
      throw new _.AdsBypasserError('script changed');
    }
    let wds = rv.match(/\?wds=([^&]+)/);
    if (!wds) {
      throw new _.AdsBypasserError('script changed');
    }
    wds = wds[1];
    let jki = rv.match(/jki:\s*'([^']+)'/);
    if (!jki) {
      throw new _.AdsBypasserError('script changed');
    }
    jki = jki[1];
    let ojk = rv.match(/ojk:\s*'([^']+)'/);
    if (!ojk) {
      throw new _.AdsBypasserError('script changed');
    }
    ojk = ojk[1];
    return {
      wds: wds,
      jki: jki,
      ojk: ojk,
    };
  }


  function fakeAJAXToken () {
    const skipAd = $('div.fly_head span#redirectin').parentElement;
    const margin = 6;
    const fakePageX = skipAd.offsetLeft + margin + 50 + (Math.random() * 10);
    const fakePageY = skipAd.offsetTop + margin + 15 + (Math.random() * 1);

    const po = fakePageX + ',' + fakePageY;
    const posX = jQueryOffset(skipAd).left + margin;
    const posY = jQueryOffset(skipAd).top + margin;
    const pos = (fakePageX - posX) + ',' + (fakePageY - posY);
    const tsta_ = Math.floor((5 + Math.random()) * 1000);
    const time = po + ':' + pos + ':' + tsta_;

    return time;
  }


  function jQueryOffset (element) {
    const r = element.getBoundingClientRect();
    return {
      top: r.top + document.body.scrollTop,
      left: r.left + document.body.scrollLeft,
    };
  }

})();
