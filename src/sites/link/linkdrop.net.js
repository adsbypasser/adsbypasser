(function () {

  _.register({
    rule: {
      host: [
        /^ulshare\.net$/,
        /^adurl\.id$/,
        /^earn-guide\.com$/,
        /^(cutwi|cut-w|cutl|dmus)\.in$/,
        /^(www\.)?jurl\.io$/,
        /^mitly\.us$/,
        /^tui\.click$/,
        /^met\.bz$/,
        /^lapak\.link$/,
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
        /^(dz4link|gocitlink|3rabcut|short2win|adsrt|shortglobal|jainjinvani|agradarpan)\.com$/,
        /^(payshorturl|urltips|shrinkearn|itiad|cutsouf|enewstalk|lnks4all|jejaklagu)\.com$/,
        /^(earn-url|bit-url|cut-win|link-zero|cut-earn|oturl|glory-link|coolmitten)\.com$/,
        /^(empireshort|empearn|tarnwh2i|tabeikh|yourw-ay|reb7konline|factural|akla4)\.com$/,
        /^(shrinkbuck|clkpay|linksht|haxrs|click2-url|cooltxtgen|arba7co|shortlinko)\.com$/,
        /^(partqb2i|khraba|adlpu|tabakhelo|amenitiees|cosmicmony|ilinkshortx|a-egy)\.com$/,
        /^(advance-wishingjs|govtsmartjob|bloggingraja|techkti|sxtsquad|adpaytm)\.com$/,
        /^(thegyaanipoint|downloaddoom|linkfay|5brgedid|earthpiclover|adigp|tomient)\.com$/,
        /^(techmen-world|razerflixs|gamesindians|dislooks|elkhbrel7sry|onaah)\.com$/,
        /^(wrap-w0rld|ommantrameditation|mawdok|techfinda|clixg|boardgift|beast-birds)\.com$/,
        /^(talkittechy|newsinjules|kutpay|nikkarr|veblink|al3amall|6aba2day)\.com$/,
        /^(vy\.)?adsvy\.com$/,
        /^(www\.)?(clkpays|lnkjob|efshort)\.com$/,
        /^(linkexa|admew|shrtfly|kuylink|cut4links|adskipme|skipurls|ely-om7)\.com$/,
        /^(smarteasystudy|cyahealth|ershadat|z2i|srtfly|arba7kpro)\.com$/,
        /^(blogginggyanbox|yourtechguider|gifsis|3rab-cash|pinkhindi|wishes2)\.com$/,
        /^(mykinggo|li-nkz|win4cut|khabratk|programsfre|safelinkblogger)\.com$/,
        /^(linkorlink|mrfourtech|fabsdeals|tech4utoday|urlsamo|earnwithshortlink)\.com$/,
        /^(earnmoneytalk|newupdatesonline|uptoos|bakilink|gossipcorners)\.com$/,
        /^shrt(8|10)\.com$/,
        // net
        /^(safelinku|tinylinks|licklink|linkrex|zlshorte|vivads)\.net$/,
        /^(vnurl|vinaurl|foxurl|short2win|cashat|shrtfly|shortye)\.net$/,
        /^(link4win|linksad|topurl|xemlink|cutadlink|crabcut|directedlink)\.net$/,
        // pw
        /^(clik|tokenfly|getlink|psl|pss|shln|lpe|chrt|szs|miniurl)\.pw$/,
        /^(www\.)?lwt\.pw$/,
        // in
        /^(trlink|wolink|tocdo|cuturl|counsellingresult2016|iitjeemainguide|healthhindigyan)\.in$/,
        /^(utimetableresult|daily-sale)\.in$/,
        // me
        /^(adbilty|adpop|ujv|tpx|adsrt|2fly|lin65|short2win|suarankri|infotrendy)\.me$/,
        /^(advancedautorepairtips|takeitfor)\.me$/,
        // xyz
        /^(shink|shrten|gg-l|vnurl|bloggingdekh|ln11|sh11|tradeguru|newskart|kidsors)\.xyz$/,
        /^(techinhub|viralnow|shophipro|technocanvas|getfreshcloud|profitstudy)\.xyz$/,
        /^(autocarsmagz|getpocket|yasinews)\.xyz$/,
        // else
        /^(petty|skips|tr|flaz)\.link$/,
        /^megaurl\.(in|link)$/,
        /^payskip\.(me|org)$/,
        /^(oke|cuon|cuio|cuee|cuus|cuto|cu2|linktor|flylink|uiz|cu3|uii)\.io$/,
        /^(3bst|coinlink|itiurl|coshink|link5s|curs|makeurl|mooddisorder|cutls)\.co$/,
        /^(mlink|cl250|xpickle)\.club$/,
        /^(igram|gram|pingit)\.im$/,
        /^(clk|cll)\.(press|ink|sh|icu)$/,
        /^short\.pe$/,
        /^(urlcloud|imageoptimizer)\.us$/,
        /^(icutit|earnbig|cutearn)\.ca$/,
        /^(adzurl|link2link)\.cf$/,
        /^(koylinks|buy-in-599rs)\.win$/,
        /^lopte\.pro$/,
        /^(www\.)?pnd\.tl$/,
        /^(tny|tiny)\.ec$/,
        /^tl\.tc$/,
        /^e2s\.cc$/,
        /^lyon\.kim$/,
        /^(linkvip|4short)\.tk$/,
        /^stfly\.press$/,
        /^(businessiss2|techandreview|yesmoviesapp|kpscthulasilogin)\.info$/,
        /^eatings\.stream$/,
        /^8o\.ee$/,
        /^buyitonline\.store$/,
        /^(shortearn|enrt)\.eu$/,
        /^(1921681254|geki)\.tech$/,
        /^123link\.(pw|vip)$/,
        /^123link\.carpartsviet97\.site$/,
        /^(lotechnocan|updatetribun|templink|ez4link)\.org$/,
        /^tinylink\.run$/,
        /^btc\.ms$/,
        /^earn\.theplusit\.ro$/,
        /^skip\.az$/,
        /^(dutchycorp|abouttech)\.space$/,
        /^click2see\.desi$/,
        /^shorted\.id$/,
        /^zi\.ht$/,
        /^funnyquiz\.blog$/,
        /^(sciencelife|cpm4all)\.ga$/,
        /^thin\.at$/,
        /^(www\.)?bloggerworld\.online$/,
        /^(click2url|ln435|merdekaid)\.online$/,
        /^sk-ip\.ru$/,
        /^za\.gl$/,
        /^(el3id|allreports)\.site$/,
        /^royalown\.review$/,
        /^bestscholaeshipdegree\.date$/,
        /^oko\.sh$/,
        /^splashnews\.ooo$/,
        /^ckk\.ai$/,
        /^fc\.lc$/,
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
        /^wi\.cr$/,
        /^wicr\.me$/,
        /^linksoflife\.co$/,
        /^linksof\.life$/,
      ],
    },
    async ready () {
      const handler = new InvisibleRecaptchaHandler();
      await handler.call();
    },
  });

  _.register({
    rule: {
      host: [
        /^(cutpaid|tmearn|icutlink)\.com$/,
        /^(ctui|cuti)\.in$/,
        /^zutrox\.link$/,
        /^(www\.)?shrink\.vip$/,
        /^cutwin\.(us|com)$/,
        /^123short\.biz$/,
      ],
    },
    async ready () {
      const handler = new NonDisabledRecaptchaHandler();
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
        /^(cut-urls|linclik|premiumzen|by6dk|mikymoons|man2pro)\.com$/,
        /^(link4win|loadurl|cut4link|raolink|adshorte)\.com$/,
        /^short\.pastewma\.com$/,
        /^linkfly\.gaosmedia\.com$/,
        /^(www\.)?viralukk\.com$/,
        /^(www\.)?niagoshort\.com$/,
        // net
        /^www\.worldhack\.net$/,
        /^(eklink)\.net$/,
        // else
        /^(urle|adshort)\.co$/,
        /^(weefy|adbull|zeiz|link4|adcoin|jelajahinternet)\.me$/,
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
        /^spamlink\.org$/,
        /^royurls\.bid$/,
        /^(1)?idsly\.(com|bid|net|org)$/,
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


  class NoRecaptchaHandler extends AbstractHandler {

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
        b.click();
      }
    }

  }


  class NonDisabledRecaptchaHandler extends RecaptchaHandler {

    async submitListen (b) {
      while (true) {
        await _.wait(500);
        /*global grecaptcha*/
        if (grecaptcha && grecaptcha.getResponse().length !== 0) {
          b.click();
          break;
        }
      }
    }

  }


  class OURLHandler extends RecaptchaHandler {

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

  class ShortlyHandler extends AbstractHandler {

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
        $.window.jQuery.post('getlink.php', {id: id}).done(function (url) {
          if (url.match(/^http/)) {
            $.openLink(url);
          }
        });
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
