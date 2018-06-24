(function () {

  _.register({
    rule: {
      host: [
        /^dmus\.in$/,
        /^ulshare\.net$/,
        /^adurl\.id$/,
        /^earn-guide\.com$/,
        /^(cutwin|cut-earn)\.com$/,
        /^(cutwi|cut-w|cutl)\.in$/,
        /^(www\.)?jurl\.io$/,
        /^mitly\.us$/,
        /^tui\.click$/,
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
        /^idsly\.com$/,
        /^(adbilty|adpop)\.me$/,
        /^(oke|cuon)\.io$/,
        /^linkrex\.net$/,
        /^safelinku\.net$/,
        /^(3bst|coinlink|itiurl)\.co$/,
        /^3rabcut\.com$/,
        /^(shink|shrten|gg-l)\.xyz$/,
        /^mlink\.club$/,
        /^zlshorte\.net$/,
        /^(igram|gram)\.im$/,
        /^(trlink|wolink|tocdo)\.in$/,
        /^tr\.link$/,
        /^dz4link\.com$/,
        /^short2win\.com$/,
        /^(vn|vina|fox)url\.net$/,
        /^clk\.press$/,
        /^short\.pe$/,
        /^urlcloud\.us$/,
        /^(www\.)?linkdrop\.net$/,
        /^(123link|clik|tokenfly)\.pw$/,
        /^(vy\.)?adsvy\.com$/,
        /^cut4links\.com$/,
        /^(tmearn|payshorturl|urltips|shrinkearn)\.com$/,
        /^(earn-url|bit-url)\.com$/,
        /^megaurl\.in$/,
        /^(icutit|earnbig)\.ca$/,
        /^koylinks\.win$/,
        /^lopte\.pro$/,
        /^(www\.)?pnd\.tl$/,
        /^(tny|tiny)\.ec$/,
        /^(linkexa|admew|shrtfly|kuylink)\.com$/,
        /^tl\.tc$/,
        /^petty\.link$/,
        /^wi\.cr$/,
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
      host: [
        /^(psl|twik)\.pw$/,
        /^coshink\.co$/,
        /^(curs|crus|4cut)\.io$/,
        /^(cut-urls|link-zero)\.com$/,
        /^adslink\.pw$/,
        /^dzurl\.ml$/,
        /^petty\.link$/,
        /^u2s\.io$/,
        /^shortad\.cf$/,
        /^link4\.me$/,
        /^urle\.co$/,
        /^taive\.in$/,
        /^www\.worldhack\.net$/,
        /^123link\.(io|co|press)$/,
        /^git\.tc$/,
        /^adfu\.us$/,
        /^short\.pastewma\.com$/,
        /^l2s\.io$/,
        /^adbilty\.in$/,
        /^linkfly\.gaosmedia\.com$/,
        /^linclik\.com$/,
        /^zeiz\.me$/,
        /^adbull\.me$/,
        /^adshort\.co$/,
        /^(adshorte|adsrt)\.com$/,
        /^(weefy|payskip)\.me$/,
        /^premiumzen\.com$/,
        /^cut4link\.com$/,
        /^(cutearn|shortit)\.ca$/,
        /^(www\.)?viralukk\.com$/,
        /^shrt10\.com$/,
        /^mikymoons\.com$/,
        /^spamlink\.org$/,
        /^royurls\.bid$/,
        /^(itiad|by6dk)\.com$/,
        /^(ot|load)url\.com$/,
        /^man2pro\.com$/,
        /^raolink\.com$/,
        /^eklink\.net$/,
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
      return getJQueryForm(this._formSelector);
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
      if (f) {
        _.info('recaptcha detected, stop');
        return false;
      }
      return true;
    }

    async getMiddleware () {
      return getJQueryForm(this._formSelector);
    }

    withoutMiddleware () {
      // TODO This line was added for sflnk.me, but the domain is gone.
      // Need to confirm if this is still work for the rest sites.
      const f = $('#link-view');
      f.submit();
    }

    async getURL (jForm) {
      while (true) {
        await _.wait(2000);
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
        verify: getJQueryForm('#get-link'),
        go: getJQueryForm(this._formSelector),
      };
    }

    async getURL (jFormObject) {
      await getURLFromJQueryForm(jFormObject.verify);
      return await getURLFromJQueryForm(jFormObject.go);
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


  function getJQueryForm (selector) {
    const jQuery = $.window.$;
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
