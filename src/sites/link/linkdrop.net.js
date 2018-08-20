(function () {

  _.register({
    rule: {
      host: [
        /^ulshare\.net$/,
        /^adurl\.id$/,
        /^(cutwin|earn-guide)\.com$/,
        /^(cutwi|cut-w|cutl|dmus)\.in$/,
        /^(www\.)?jurl\.io$/,
        /^mitly\.us$/,
        /^tui\.click$/,
        /^met\.bz$/,
      ],
    },
    async ready () {
      const handler = new NoRecaptchaHandler();
      await handler.call();
    },
  });

  _.register({
    rule: {
      host: [
        // com
        /^(dz4link|gocitlink|3rabcut|short2win)\.com$/,
        /^(tmearn|payshorturl|urltips|shrinkearn|itiad|cutsouf)\.com$/,
        /^(earn-url|bit-url|cut-win|link-zero|cut-earn)\.com$/,
        /^(vy\.)?adsvy\.com$/,
        /^(linkexa|admew|shrtfly|kuylink|cut4links)\.com$/,
        // net
        /^(safelinku|tinylinks|licklink|linkrex|zlshorte)\.net$/,
        /^(vnurl|vinaurl|foxurl|short2win|cashat)\.net$/,
        // else
        /^(trlink|wolink|tocdo|megaurl)\.in$/,
        /^(petty|skips|tr)\.link$/,
        /^idsly\.(com|bid)$/,
        /^(adbilty|adpop|payskip|wicr|ujv)\.me$/,
        /^wi\.cr$/,
        /^(oke|cuon|linktor|flylink)\.io$/,
        /^(3bst|coinlink|itiurl|coshink)\.co$/,
        /^(shink|shrten|gg-l)\.xyz$/,
        /^mlink\.club$/,
        /^(igram|gram)\.im$/,
        /^clk\.(press|sh)$/,
        /^short\.pe$/,
        /^urlcloud\.us$/,
        /^(123link|clik|tokenfly|getlink)\.pw$/,
        /^(icutit|earnbig|cutearn)\.ca$/,
        /^koylinks\.win$/,
        /^lopte\.pro$/,
        /^(www\.)?pnd\.tl$/,
        /^(tny|tiny)\.ec$/,
        /^tl\.tc$/,
        /^lyon\.kim$/,
        /^linkvip\.tk$/,
      ],
    },
    async ready () {
      const handler = new RecaptchaHandler();
      await handler.call();
    },
  });

  _.register({
    rule: {
      host: /^(www\.)?ourl\.io$/,
    },
    async ready () {
      const handler = new OURLHandler();
      await handler.call();
    },
  });

  _.register({
    rule: {
      host: /^(www\.)?linkdrop\.net$/,
    },
    async ready () {
      const handler = new LinkDropHandler();
      await handler.call();
    },
  });

  _.register({
    rule: {
      host: [
        // com
        /^(cut-urls|linclik|premiumzen|shrt10|by6dk|mikymoons|man2pro)\.com$/,
        /^(mykinggo|win4cut)\.com$/,
        /^short\.pastewma\.com$/,
        /^linkfly\.gaosmedia\.com$/,
        /^(adshorte|adsrt)\.com$/,
        /^(www\.)?viralukk\.com$/,
        /^(www\.)?niagoshort\.com$/,
        /^(oturl|loadurl)\.com$/,
        /^(cut4link|raolink)\.com$/,
        // net
        /^www\.worldhack\.net$/,
        /^(eklink|vivads)\.net$/,
        // else
        /^(urle|adshort)\.co$/,
        /^(weefy|adbull|zeiz|link4|adcoin)\.me$/,
        /^(adbilty|taive)\.in$/,
        /^(psl|twik|adslink)\.pw$/,
        /^(curs|crus|4cut|u2s|l2s)\.io$/,
        /^dzurl\.ml$/,
        /^petty\.link$/,
        /^shortad\.cf$/,
        /^123link\.(io|co|press|pro)$/,
        /^git\.tc$/,
        /^adfu\.us$/,
        /^shortit\.ca$/,
        /^spamlink\.org$/,
        /^royurls\.bid$/,
        /^za\.gl$/,
      ],
    },
    async ready () {
      const handler = new StagedHandler();
      await handler.call();
    },
  });


  class AbstractHandler {

    constructor () {
      this._overlaySelector = [
        '[class$="Overlay"]',
        '#__random_class_name__',
        '#headlineatas',
      ].join(', ');

      // TODO extract to paramater
      this._formSelector = [
        '#go-link',
        '.go-link',
        'form[action="/links/go"]',
        'form[action="/links/linkdropgo"]',
      ].join(', ');
    }

    removeOverlay () {
      $.remove(this._overlaySelector);
      $.block(this._overlaySelector, document.body);
    }

    removeFrame () {
      $.remove('iframe');
    }

    async call () {
      const ok = this.prepare();
      if (!ok) {
        return;
      }

      const mw = await this.getMiddleware();
      if (!mw) {
        this.withoutMiddleware();
        return;
      }

      const url = await this.getURL(mw);
      await $.openLink(url);
    }

  }


  class NoRecaptchaHandler extends AbstractHandler {

    constructor () {
      super();
    }

    prepare () {
      this.removeFrame();
      this.removeOverlay();
      return true;
    }

    async getMiddleware () {
      return await getJQueryForm(this._formSelector);
    }

    withoutMiddleware () {
      _.info('no form');
    }

    async getURL (jForm) {
      return await getURLFromJQueryForm(jForm);
    }

  }


  class RecaptchaHandler extends AbstractHandler {

    constructor () {
      super();
    }

    prepare () {
      this.removeOverlay();

      const f = $.$('#captchaShortlink');
      if (!f) {
        return true;
      }
      _.info('recaptcha detected, stop');

      // press the button after recaptcha
      _.info('trying to listen submit button');
      const b = $.$('#invisibleCaptchaShortlink');
      if (!b) {
        return false;
      }

      const o = new MutationObserver(() => {
        if (!b.disabled) {
          b.click();
        }
      });
      o.observe(b, {
        attributes: true,
      });

      return false;
    }

    async getMiddleware () {
      return await getJQueryForm(this._formSelector);
    }

    withoutMiddleware () {
      // TODO This line was added for sflnk.me, but the domain is gone.
      // Need to confirm if this is still work for the rest sites.
      const f = $('#link-view');
      f.submit();
    }

    async getURL (jForm) {
      while (true) {
        await _.wait(1000);
        try {
          const url = await getURLFromJQueryForm(jForm);
          if (url) {
            return url;
          }
        } catch (e) {
          _.warn(e);
        }
      }
    }

  }


  class OURLHandler extends RecaptchaHandler {

    constructor () {
      super();
    }

    async getMiddleware () {
      return {
        verify: await getJQueryForm('#get-link'),
        go: await getJQueryForm(this._formSelector),
      };
    }

    async getURL (jFormObject) {
      await getURLFromJQueryForm(jFormObject.verify);
      return await getURLFromJQueryForm(jFormObject.go);
    }

  }


  class LinkDropHandler extends RecaptchaHandler {

    constructor () {
      super();
    }

    async getMiddleware () {
      return await getJQueryForm('#mylink');
    }

  }


  class StagedHandler extends AbstractHandler {

    constructor () {
      super();
    }

    prepare () {
      this.removeFrame();
      this.removeOverlay();
      return true;
    }

    async getMiddleware () {
      const f = $.$('#link-view');
      if (!f) {
        return document;
      }

      const args = extractArgument(f);
      const url = f.getAttribute('action');
      let page = await $.post(url, args);
      page = $.toDOM(page);
      return page;
    }

    withoutMiddleware () {
      _.info('no page');
    }

    async getURL (page) {
      const f = $('#go-link', page);
      const args = extractArgument(f);
      const url = f.getAttribute('action');
      let data = await $.post(url, args);
      data = JSON.parse(data);
      if (data && data.url) {
        // nuke for bol.tl, somehow it will interfere click event
        $.nuke(data.url);

        return data.url;
      }
      throw new _.AdsBypasserError('wrong data');
    }

  }


  function extractArgument (form) {
    const args = {};
    _.forEach($.$$('input', form), (v) => {
      args[v.name] = v.value;
    });
    return args;
  }


  async function getJQueryForm (selector) {
    let jQuery = $.window.$;
    while (!jQuery) {
      await _.wait(50);
      jQuery = $.window.$;
    }
    const f = jQuery(selector);
    if (f.length > 0) {
      return f;
    }
    return null;
  }

  function getURLFromJQueryForm (jForm) {
    return new Promise((resolve, reject) => {
      const jQuery = $.window.$;
      jQuery.ajax({
        dataType: 'json',
        type: 'POST',
        url: jForm.attr('action'),
        data: jForm.serialize(),
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

})();
