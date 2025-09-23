/**
 * @domain adsafelink.com
 * @domain aylink.co
 * @domain birdurls.com
 * @domain clik.pw
 * @domain clk.sh
 * @domain cpmlink.pro
 * @domain dz4link.com
 * @domain gitlink.pro
 * @domain linkmoni.com
 * @domain miniurl.pw
 * @domain mitly.us
 * @domain oke.io
 * @domain oko.sh
 * @domain pahe.plus
 * @domain payskip.org
 * @domain pingit.im
 * @domain thotpacks.xyz
 * @domain tmearn.net
 */
(function () {
  _.register({
    rule: {
      host: [
        // com
        /^adsafelink\.com$/,
        /^birdurls\.com$/,
        /^dz4link\.com$/,
        /^linkmoni\.com$/,
        // net
        /^tmearn\.net$/,
        // org
        /^payskip\.org$/,
        // pw
        /^clik\.pw$/,
        /^miniurl\.pw$/,
        // else
        /^aylink\.co$/,
        /^(clk|oko)\.sh$/,
        /^cpmlink\.pro$/,
        /^gitlink\.pro$/,
        /^mitly\.us$/,
        /^oke\.io$/,
        /^pahe\.plus$/,
        /^pingit\.im$/,
        /^thotpacks\.xyz$/,
      ],
    },
    async ready() {
      const handler = new RecaptchaHandler();
      await handler.call();
    },
  });

  class AbstractHandler {
    constructor() {
      this._overlaySelector = [
        '[class$="Overlay"]',
        "#__random_class_name__",
        "#headlineatas",
        "#myModal",
        ".opacity_wrapper",
        "#overlay",
      ].join(", ");

      // TODO extract to paramater
      this._formSelector = [
        "#go-link",
        ".go-link",
        "#originalLink.get-link",
        'form[action="/links/go"]',
      ].join(", ");
    }

    removeOverlay() {
      $.remove(this._overlaySelector);
      $.block(this._overlaySelector, document.body);

      setInterval(() => {
        document.body.style.overflow = "initial";
      }, 500);
    }

    removeFrame() {
      $.remove("iframe");
    }

    async call() {
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
    async prepare() {
      this.removeOverlay();

      const f = $.$("#captchaShortlink, div.g-recaptcha");
      if (!f) {
        return true;
      }
      _.info("recaptcha detected, stop");

      // press the button after recaptcha
      _.info("trying to listen submit button");
      const b = $.$("#invisibleCaptchaShortlink");
      if (!b) {
        return false;
      }
    }

    async submitListen(b) {
      const o = new MutationObserver(() => {
        if (!b.disabled) {
          b.click();
        }
      });
      o.observe(b, {
        attributes: true,
      });
    }

    async getMiddleware() {
      return await getJQueryForm(this._formSelector);
    }

    withoutMiddleware() {
      // Not sure if this is still needed.
      const f = $("#link-view");
      f.submit();
    }

    async getURL(jForm) {
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

  async function getJQueryForm(selector) {
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

  function getURLFromJQueryForm(jForm) {
    return new Promise((resolve, reject) => {
      if (jForm.is("a") && jForm.attr("href")) {
        resolve(jForm.attr("href"));
      }

      const jQuery = $.window.$;
      jQuery.ajax({
        dataType: "json",
        type: "POST",
        url: jForm.attr("action"),
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
          reject(new _.AdsBypasserError("request error"));
        },
      });
    });
  }
})();
