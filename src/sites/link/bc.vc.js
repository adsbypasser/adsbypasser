(function () {

  const ajaxPattern = /\$.post\('([^']*)'[^{]+(\{\s*opt:\s*'make_log'[^}]+\}\s*\}),/i;

  // bc.vc, shortcut
  _.register({
    rule: {
      host: /^bc\.vc$/,
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

      const token = await findAJAXToken();
      const time = fakeAJAXToken();
      const url = `/fly/ln.php?wds=${token.wds}&time=${time}`;

      await _.wait(5000);
      let rv = await $.post(url, {
        xdf: {
          afg: 300,
          bfg: 640,
          cfg: 480,
          jki: token.jki,
          dfg: 640,
          efg: 480,
          rt: token.rt,
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

  _.register({
    rule: {
      host: [
        /^mylink\.us$/,
        /^zpoz\.net$/,
      ],
      path: /^\/.+/,
    },
    ready: run,
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
    script = _.evil(matches);
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
    const make_opts = _.evil(`(${matches[2]})`);

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

  async function findAJAXToken () {
    const rv = $.searchFromScripts('xyz');
    if (!rv) {
      throw new _.AdsBypasserError('script changed');
    }
    let wds = rv.match(/xyz\s*=\s*'([^']+)'/);
    if (!wds) {
      throw new _.AdsBypasserError('script changed');
    }
    wds = wds[1];
    let jki = rv.match(/tkn\s*=\s*'([^']+)'/);
    if (!jki) {
      throw new _.AdsBypasserError('script changed');
    }
    jki = jki[1];
    const rt = $('#recaptchaToken');
    while (!rt.value) {
      await _.wait(500);
    }
    return {
      wds: wds,
      jki: jki,
      ojk: 'jfhg',
      rt: rt.value,
    };
  }

  function fakeAJAXToken () {
    const skipAd = $('#getLink').parentElement;
    const margin = 6;
    const fakePageX = skipAd.offsetLeft + margin + 50 + (Math.random() * 10);
    const fakePageY = skipAd.offsetTop + margin + 15 + (Math.random() * 1);

    const po = fakePageX + ',' + fakePageY;
    const posX = jQueryOffset(skipAd).left + margin;
    const posY = jQueryOffset(skipAd).top + margin;
    const pos = Math.abs(fakePageX - posX) + ',' + Math.abs(fakePageY - posY);
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
