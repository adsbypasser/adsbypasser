(function () {
  'use strict';

  var ajaxPattern = /\$.post\('([^']*)'[^{]+(\{\s*opt:\s*'make_log'[^}]+\}\s*\}),/i;

  // bc.vc, shortcut
  $.register({
    rule: {
      host: [
        /^bc\.vc$/,
        /^linc\.ml$/,
      ],
      path: /^.+(https?:\/\/.+)$/,
    },
    start: function (m) {
      $.openLink(m.path[1] + document.location.search + document.location.hash);
    },
  });

  function decompress (script, unzip) {
    if (!unzip) {
      return script;
    }
    var matches = script.match(/eval(.*)/);
    if (!matches) {
      throw new _.AdsBypasserError('no script matches /eval(.*)/');
    }
    matches = matches[1];
    script = eval(matches);
    return script;
  }

  function searchScript (unzip) {
    var content = $.searchScripts('make_log');
    if (content) {
      return {
        direct: false,
        script: decompress(content, unzip),
      };
    }
    content = $.searchScripts('click_log');
    if (content) {
      return {
        direct: true,
        script: decompress(content, unzip),
      };
    }
    throw new _.AdsBypasserError('script changed');
  }

  function knockServer (script, dirtyFix) {
    var matches = script.match(ajaxPattern);
    if (!matches) {
      throw new _.AdsBypasserError('(in knock server) no script matches $.post');
    }
    var make_url = matches[1];
    var make_opts = eval('(' + matches[2] + ')');

    var i = setInterval(function () {
      $.post(make_url, make_opts).then(function (text) {
        if (dirtyFix) {
          // dirty fix for tr5.in
          text = text.match(/\{.+\}/)[0];
        }
        var jj = _.parseJSON(text);
        if (jj.message) {
          clearInterval(i);
          $.openLink(jj.message.url);
        }
      });
    }, 1000);
  }


  // bc.vc
  $.register({
    rule: {
      host: /^bc\.vc$/,
      path: /^\/.+/,
    },
    ready: function () {
      $.removeNodes('iframe');

      var token = findAJAXToken();
      var time = fakeAJAXToken();
      var url = _.T('/fly/ajax.php?wds={0}&time={1}');
      url = url(token.wds, time);

      _.wait(5000).then(function () {
        return $.post(url, {
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
      }).then(function (rv) {
        rv = JSON.parse(rv);
        if (rv.error) {
          throw new _.AdsBypasserError('auth error');
        }
        $.openLink(rv.message.url);
      }).catch(function (e) {
        _.warn('ajax error', e);
      });
    },
  });

  function run (dirtyFix) {
    // prevent redirection by iframe
    $.removeNodes('iframe');

    var result = searchScript(true);
    if (!result.direct) {
      knockServer(result.script,dirtyFix);
    } else {
      result = result.script.match(/top\.location\.href='([^']+)'/);
      if (!result) {
        throw new _.AdsBypasserError('script changed');
      }
      result = result[1];
      $.openLink(result);
    }
  }

  // adcrun.ch
  $.register({
    rule: {
      host: /^adcrun\.ch$/,
      path: /^\/\w+$/,
    },
    ready: function () {
      // Try to bypass the survey
      $.removeNodes('.user_content');

      var rSurveyLink = /http\.open\("GET", "api_ajax\.php\?sid=\d*&ip=[^&]*&longurl=([^"]+)" \+ first_time, (?:true|false)\);/;
      var l = $.searchScripts(rSurveyLink);
      // Redirect to the target link if we found it
      if (l) {
        $.openLink(l[1]);
        return;
      }

      // Otherwise it's most likely a simple bc.vc-like link
      // Malformed JSON
      run(true);
    },
  });

  $.register({
    rule: {
      host: [
        /^(1tk|hit|adbla|tl7|mylink)\.us$/,
        /^gx\.si$/,
        /^adwat\.ch$/,
        /^(fly2url|urlwiz|xafox)\.com$/,
        /^(zpoz|ultry)\.net$/,
        /^(wwy|myam)\.me$/,
        /^(ssl|srk)\.gs$/,
        /^shortit\.in$/,
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

  $.register({
    rule: {
      host: [
        /^adtr\.im$/,
        /^ysear\.ch$/,
        /^xip\.ir$/,
      ],
      path: /^\/.+/,
    },
    ready: function () {
      var a = $.$('div.fly_head a.close');
      var f = $.$('iframe.fly_frame');
      // the iframe may be an ad link
      // so also check the close button
      if (a && f) {
        $.openLink(f.src);
      } else {
        run();
      }
    },
  });

  $.register({
    rule: {
      host: /^ad5\.eu$/,
      path: /^\/[^.]+$/,
    },
    ready: function() {
      $.removeNodes('iframe');
      var s = searchScript(true);

      // Find the form
      var m = s.script.match(/(<form name="form1"method="post".*(?!<\\form>)<\/form>)/);

      if (!m) {return;}

      m = m[1];

      // Set the correct timezone
      var tz = -(new Date().getTimezoneOffset()/60);
      m = m.replace("'+timezone+'",tz);

      // Wrap the form into a useless div
      var d = document.createElement('div');
      d.setAttribute('id','AdsBypasserFTW');
      d.setAttribute('style', 'display:none;');

      // Feed with the right form
      d.innerHTML = m;
      document.body.appendChild(d);

      // Redirect to next page
      $('#AdsBypasserFTW > form[name=form1]').submit();
    },
  });

  $.register({
    rule: {
      host: /^tr5\.in$/,
      path: /^\/.+/,
    },
    ready: function () {
      // Malformed JSON
      run(true);
    },
  });


  function findAJAXToken () {
    var rv = $.searchScripts('/fly/ajax.php');
    if (!rv) {
      throw new _.AdsBypasserError('script changed');
    }
    var wds = rv.match(/\?wds=([^&]+)/);
    if (!wds) {
      throw new _.AdsBypasserError('script changed');
    }
    wds = wds[1];
    var jki = rv.match(/jki:\s*'([^']+)'/);
    if (!jki) {
      throw new _.AdsBypasserError('script changed');
    }
    jki = jki[1];
    var ojk = rv.match(/ojk:\s*'([^']+)'/);
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
    var skipAd = $('div.fly_head span#redirectin').parentElement;
    var margin = 6;
    var fakePageX = skipAd.offsetLeft + margin + 50 + (Math.random() * 10);
    var fakePageY = skipAd.offsetTop + margin + 15 + (Math.random() * 1);

    var po = fakePageX + ',' + fakePageY;
    var posX = jQueryOffset(skipAd).left + margin;
    var posY = jQueryOffset(skipAd).top + margin;
    var pos = (fakePageX - posX) + ',' + (fakePageY - posY);
    var tsta_ = Math.floor((5 + Math.random()) * 1000);
    var time = po + ':' + pos + ':' + tsta_;

    return time;
  }


  function jQueryOffset (element) {
    var r = element.getBoundingClientRect();
    return {
      top: r.top + document.body.scrollTop,
      left: r.left + document.body.scrollLeft,
    };
  }

})();
