(function () {

  _.register({
    rule: {
      host: [
        /^dmus\.in$/,
        /^ulshare\.net$/,
        /^adurl\.id$/,
        /^goolink\.me$/,
        /^earningurl\.com$/,
        /^earn-guide\.com$/,
        /^(cutwin|cut-earn)\.com$/,
        /^(cutwi|cut-w|cutl)\.in$/,
        /^(www\.)?jurl\.io$/,
        /^mitly\.us$/,
        /^wi\.cr$/,
        /^tui\.click$/,
      ],
    },
    async ready () {
      $.remove('iframe, [class$="Overlay"]');
      $.block('[class$="Overlay"]', document.body);

      const f = getForm();
      if (!f) {
        _.info('no form');
        return;
      }

      const url = await sendRequest(f);
      await $.openLink(url);
    },
  });

  _.register({
    rule: {
      host: [
        /^sflnk\.me$/,
        /^idsly\.com$/,
        /^(adbilty|adpop)\.me$/,
        /^(oke|cuon)\.io$/,
        /^linkrex\.net$/,
        /^safelinku\.net$/,
        /^3bst\.co$/,
        /^3rab(short|cut)\.com$/,
        /^(shink|shrten)\.xyz$/,
        /^mlink\.club$/,
        /^zlshorte\.net$/,
        /^(igram|gram)\.im$/,
        /^(trlink|wolink|tocdo)\.in$/,
        /^tr\.link$/,
        /^dz4link\.com$/,
        /^short2win\.com$/,
        /^(vn|vina)url\.net$/,
        /^clk\.press$/,
        /^short\.pe$/,
        /^urlcloud\.us$/,
        /^(www\.)?ourl\.io$/,
        /^(www\.)?linkdrop\.net$/,
        /^(123link|clik)\.pw$/,
        /^(vy\.)?adsvy\.com$/,
        /^cut4links\.com$/,
        /^(tmearn|payshorturl|urltips)\.com$/,
        /^megaurl\.in$/,
        /^icutit\.ca$/,
        /^koylinks\.win$/,
        /^lopte\.pro$/,
      ],
    },
    async ready () {
      let f = $.$('#captchaShortlink');
      if (f) {
        $.remove('[class$="Overlay"]');
        $.block('[class$="Overlay"]', document.body);

        // recaptcha
        _.info('recaptcha detected, stop');
        return;
      }

      $.remove('iframe');

      f = getForm();
      if (!f) {
        f = $('#link-view');
        f.submit();
        return;
      }

      while (true) {
        await _.wait(2000);
        try {
          const url = await sendRequest(f);
          await $.openLink(url);
          break;
        } catch (e) {
          _.warn(e);
        }
      }
    },
  });

  _.register({
    rule: {
      host: [
        /^adlink\.guru$/,
        /^(psl|twik)\.pw$/,
        /^coshink\.co$/,
        /^(curs|crus|4cut)\.io$/,
        /^shark\.vn$/,
        /^cypt\.ga$/,
        /^(filesbucks|cut-urls|link-earn|shrinkearn)\.com$/,
        /^adslink\.pw$/,
        /^dzurl\.ml$/,
        /^(elink|petty)\.link$/,
        /^(payurl|urlst)\.me$/,
        /^u2s\.io$/,
        /^shortad\.cf$/,
        /^link4\.me$/,
        /^url\.ht$/,
        /^urle\.co$/,
        /^(hashe|taive)\.in$/,
        /^www\.worldhack\.net$/,
        /^123link\.(io|co|press)$/,
        /^pir\.im$/,
        /^(www\.)?(pnd|bol)\.tl$/,
        /^(tl|adfly|git)\.tc$/,
        /^(adfu|linkhits)\.us$/,
        /^short\.pastewma\.com$/,
        /^l2s\.io$/,
        /^adbilty\.in$/,
        /^gg-l\.xyz$/,
        /^linkfly\.gaosmedia\.com$/,
        /^linclik\.com$/,
        /^zeiz\.me$/,
        /^adbull\.me$/,
        /^adshort\.co$/,
        /^(adshorte|adsrt)\.com$/,
        /^weefy\.me$/,
        /^bit-url\.com$/,
        /^premiumzen\.com$/,
        /^cut4link\.com$/,
        /^coinlink\.co$/,
        /^kokemoon\.com$/,
        /^(cutearn|earnbig|shortit)\.ca$/,
        /^(www\.)?viralukk\.com$/,
        /^shrt10\.com$/,
        /^mikymoons\.com$/,
        /^spamlink\.org$/,
        /^top9space\.com$/,
        /^royurls\.bid$/,
        /^itiad\.com$/,
        /^(ot|load)url\.com$/,
        /^man2pro\.com$/,
      ],
    },
    async ready () {
      $.remove('iframe', '.BJPPopAdsOverlay');

      const page = await firstStage();
      const url = await secondStage(page);
      // nuke for bol.tl, somehow it will interfere click event
      $.nuke(url);
      await $.openLink(url);
    },
  });


  function getForm () {
    const jQuery = $.window.$;
    const f = jQuery('#go-link, .go-link, form[action="/links/go"], form[action="/links/linkdropgo"]');
    if (f.length > 0) {
      return f;
    }
    return null;
  }


  function sendRequest (f) {
    return new Promise((resolve, reject) => {
      const jQuery = $.window.$;
      jQuery.ajax({
        dataType: 'json',
        type: 'POST',
        url: f.attr('action'),
        data: f.serialize(),
        success: (result) => {
          if (result.url) {
            resolve(result.url);
          } else {
            reject(new _.AdsBypasserError(result.message));
          }
        },
        error: (xhr, status, error) => {
          _.warn(xhr, status, error);
          reject(new _.AdsBypasserError('request error'));
        },
      });
    });
  }


  function firstStage () {
    return new Promise((resolve) => {
      const f = $.$('#link-view');
      if (!f) {
        resolve(document);
        return;
      }

      const args = extractArgument(f);
      const url = f.getAttribute('action');
      const p = $.post(url, args).then((data) => {
        return $.toDOM(data);
      });
      resolve(p);
    });
  }


  async function secondStage (page) {
    const f = $('#go-link', page);
    const args = extractArgument(f);
    const url = f.getAttribute('action');
    let data = await $.post(url, args);
    data = JSON.parse(data);
    if (data && data.url) {
      return data.url;
    }
    throw new _.AdsBypasserError('wrong data');
  }


  function extractArgument (form) {
    const args = {};
    _.forEach($.$$('input', form), (v) => {
      args[v.name] = v.value;
    });
    return args;
  }

})();
