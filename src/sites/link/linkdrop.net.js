(function () {

  _.register({
    rule: {
      host: [
        // com
        /^birdurls\.com$/,
        /^urlshortx\.com$/,
        /^shrinkearn\.com$/,
        /^adsafelink\.com$/,
        /^(linkmoni|shrinkbuck)\.com$/,
        /^go.linksop\.com$/,
        /^try2link\.com$/,
        /^shrt10\.com$/,
        /^clicksfly\.com$/,
        // in
        /^megaurl\.in$/,
        // io
        /^oke\.io$/,
        /^uii\.io$/,
        /^shrinkme\.io$/,
        /^miniurl\.io$/,
        // net
        /^linkrex\.net$/,
        /^vinaurl\.net$/,
        /^illink\.net$/,
        // org
        /^payskip\.org$/,
        // pw
        /^clik\.pw$/,
        // else
        /^stfly\.(me|xyz)$/,
        /^pingit\.im$/,
        /^tii\.la$/,
        /^short\.pe$/,
        /^clk\.sh$/,
        /^megalink\.pro$/,
        /^tl\.tc$/,
      ],
    },
    async ready () {
      const handler = new RecaptchaHandler();
      await handler.call();
    },
  });

  _.register({
    rule: {
      host: [       
        /^met\.bz/,
        /^aylink\.co$/,
        /^cutpaid\.com$/,
        /^dz4link\.com$/,
        /^mitly\.us$/,
        /^tmearn\.net$/,
        /^fc-lc\.(com|xyz)$/,
      ],
    },
    async ready () {
      const handler = new InvisibleRecaptchaHandler();
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
        /^linclik\.com$/,
        /^adshort\.co$/,
        /^adbull\.me$/,
        /^adslink\.pw$/,
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
        '.opacity_wrapper',
        '#overlay',
      ].join(', ');

      // TODO extract to paramater
      this._formSelector = [
        '#go-link',
        '.go-link',
        '#originalLink.get-link',
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
      const ok = await this.prepare();
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


  class RecaptchaHandler extends AbstractHandler {

    async prepare () {
      this.removeOverlay();

      const f = $.$('#captchaShortlink, div.g-recaptcha');
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

      // InvisibleRecaptchaHandler needs the f element
      await this.submitListen(b, f);

      return false;
    }

    async submitListen (b) {
      const o = new MutationObserver(() => {
        if (!b.disabled) {
          b.click();
        }
      });
      o.observe(b, {
        attributes: true,
      });
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


  class InvisibleRecaptchaHandler extends RecaptchaHandler {

    async submitListen (b, f) {
      await _.wait(1000);
      const click = f.clientWidth === 0 || f.childNodes.length === 0;
      if (click && !b.disabled) {
        _.info('clicking submit button, because recaptcha was empty');
        // remove event handler
        b.setAttribute('onclick', '');
        b.click();
      }
    }

  }


  class LinkDropHandler extends RecaptchaHandler {

    async getMiddleware () {
      return await getJQueryForm('#mylink1');
    }

  }


  class StagedHandler extends AbstractHandler {

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
      if (jForm.is('a') && jForm.attr('href')) {
        resolve(jForm.attr('href'));
      }

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
