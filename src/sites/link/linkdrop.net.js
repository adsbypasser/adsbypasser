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
        /^(dz4link|gocitlink|3rabcut|short2win|adsrt|shortglobal)\.com$/,
        /^(tmearn|payshorturl|urltips|shrinkearn|itiad|cutsouf)\.com$/,
        /^(earn-url|bit-url|cut-win|link-zero|cut-earn|oturl|glory-link)\.com$/,
        /^(vy\.)?adsvy\.com$/,
        /^(linkexa|admew|shrtfly|kuylink|cut4links|adskipme|skipurls)\.com$/,
        /^(cutpaid|smarteasystudy|cyahealth|ershadat|z2i)\.com$/,
        /^win4cut\.com$/,
        // net
        /^(safelinku|tinylinks|licklink|linkrex|zlshorte)\.net$/,
        /^(vnurl|vinaurl|foxurl|short2win|cashat|shrtfly)\.net$/,
        /^(link4win|linksad|topurl|xemlink)\.net$/,
        // pw
        /^(123link|clik|tokenfly|getlink|psl|pss)\.pw$/,
        /^(www\.)?lwt\.pw$/,     
        // else
        /^(trlink|wolink|tocdo)\.in$/,
        /^(petty|skips|tr|zutrox)\.link$/,
        /^megaurl\.(in|link)$/,
        /^idsly\.(com|bid)$/,
        /^(adbilty|adpop|payskip|wicr|ujv|tpx|adsrt)\.me$/,
        /^wi\.cr$/,
        /^(oke|cuon|cuio|linktor|flylink)\.io$/,
        /^(3bst|coinlink|itiurl|coshink|link5s)\.co$/,
        /^(shink|shrten|gg-l|vnurl)\.xyz$/,
        /^mlink\.club$/,
        /^(igram|gram)\.im$/,
        /^(clk|cll)\.(press|ink|sh|icu)$/,
        /^short\.pe$/,
        /^urlcloud\.us$/,
        /^(icutit|earnbig|cutearn)\.ca$/,
        /^(adzurl|link2link)\.cf$/,
        /^(koylinks|buy-in-599rs)\.win$/,
        /^lopte\.pro$/,
        /^(www\.)?pnd\.tl$/,
        /^(tny|tiny)\.ec$/,
        /^tl\.tc$/,
        /^e2s\.cc$/,
        /^lyon\.kim$/,
        /^linkvip\.tk$/,
        /^stfly\.press$/,
        /^businessiss2\.info$/,
        /^eatings\.stream$/,
        /^8o\.ee$/,
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
      host: /^www\.shortly\.xyz$/,
      path: /^\/link$/,
    },
    async ready () {
      const handler = new ShortlyHandler();
      await handler.call();
    },
  });

  _.register({
    rule: {
      host: [
        // com
        /^(cut-urls|linclik|premiumzen|shrt10|by6dk|mikymoons|man2pro)\.com$/,
        /^(mykinggo|link4win|loadurl|cut4link|raolink|adshorte)\.com$/,
        /^short\.pastewma\.com$/,
        /^linkfly\.gaosmedia\.com$/,
        /^(www\.)?viralukk\.com$/,
        /^(www\.)?niagoshort\.com$/,
        // net
        /^www\.worldhack\.net$/,
        /^(eklink|vivads)\.net$/,
        // else
        /^(urle|adshort)\.co$/,
        /^(weefy|adbull|zeiz|link4|adcoin)\.me$/,
        /^(adbilty|taive)\.in$/,
        /^(twik|adslink)\.pw$/,
        /^(curs|crus|4cut|u2s|l2s)\.io$/,
        /^dzurl\.ml$/,
        /^petty\.link$/,
        /^shortad\.cf$/,
        /^123link\.(io|co|press|pro)$/,
        /^git\.tc$/,
        /^(adfu|linku)\.us$/,
        /^shortit\.ca$/,
        /^(spamlink|idsly)\.org$/,
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
        '#myModal',
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
      // oturl.com will set overflow to hidden
      setInterval(() => {
        document.body.style.overflow = 'initial';
      }, 500);
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
      return await getJQueryForm('#mylink1');
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

  class ShortlyHandler extends AbstractHandler {

    constructor() {
      super();
    }

    prepare () {
      return true;
    }

    async getMiddleware () {
      // the id has been hidden, find it from links
      let a = $('#myModal .btn-primary');
      a = a.pathname.match(/^\/r\/(.+)/);
      return a[1];
    }

    withoutMiddleware () {
      _.info('no page');
    }

    async getURL (id) {
      while (true) {
        const url = await $.post('getlink.php', {
          id,
        });
        if (url) {
          return url;
        }
        await _.wait(500);
      }
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
