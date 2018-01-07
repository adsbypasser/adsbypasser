(function () {

  const PATH_RULE = /^\/([0-9a-zA-Z-_]+)(\.|\/|$)/;

  _.register({
    rule: {
      host: [
        /^img(universal|paying|mega|zeus|monkey|trex|ve|dew|diamond)\.com$/,
        /^(www\.)?imgsee\.me$/,
        /^img(click|maid)\.net$/,
        /^(uploadrr|imageeer|imzdrop|www\.uimgshare|pic-maniac|hulkimge)\.com$/,
        /^imgdrive\.co$/,
        /^cuteimg\.cc$/,
        /^img(tiger|gold)\.org$/,
        /^myimg\.club$/,
        /^foxyimg\.link$/,
        /^(core|iron)img\.net$/,
      ],
      path: PATH_RULE,
    },
    async ready (m) {
      await helper(m.path[1], getNext1);
    },
  });

  _.register({
    rule: {
      host: [
        /^imgview\.net$/,
        /^img(maze|outlet)\.com$/,
      ],
      path: PATH_RULE,
    },
    async ready () {
      const i = $.$('img.pic');
      if (i) {
        // second stage
        await $.openImage(i.src);
        return;
      }

      const d = $('div[id^="imageviewi"]');
      const node = await waitDOM(d, (node) => {
        return node.nodeName === 'FORM' && $.$('input[name="id"]', node);
      });
      node.submit();
    },
  });

  _.register({
    rule: {
      host: [
        /^imgtown\.net$/,
        /^imgrock\.info$/,
      ],
      path: PATH_RULE,
    },
    async ready () {
      const i = $.$('img.picview');
      if (i) {
        // second stage
        await $.openImage(i.src);
        return;
      }

      // disable devtools blocker
      $.window._0x337c4b = null;

      const node = await getAmbiguousForm('div[id] + div[id] > style', (node) => {
        return node.parentElement;
      });
      // it will replace the token on 'click hover', so just emulate this action
      node.click();
      node.click();
      node.click();
    },
  });

  _.register({
    rule: {
      host: /^imgoutlet\.pw$/,
      path: PATH_RULE,
    },
    async ready () {
      const i = $.$('img.picview');
      if (i) {
        // second stage

        // disable devtools blocker
        $.window._0x2cd123 = null;

        await $.openImage(i.src);
        return;
      }

      // disable devtools blocker
      $.window._0x337c4b = null;

      const node = await getAmbiguousForm('div[id] + div[id] > style', (node) => {
        return node.parentElement;
      });
      node.click();
    },
  });

  _.register({
    rule: {
      host: /^chronos\.to$/,
      path: PATH_RULE,
    },
    async ready (m) {
      await helper(m.path[1], getNext2);
    },
  });

  _.register({
    rule: {
      host: /^imgfiles\.org$/,
      path: PATH_RULE,
    },
    async ready () {
      const i = $.$('img.pic');
      if (i) {
        // second stage
        await $.openImage(i.src);
        return;
      }

      const f = $('form');
      f.submit();
    },
  });

  _.register({
    rule: 'http://imgview.net/tpind.php',
    async ready () {
      const i = $.$('img.pic');
      if (i) {
        // second stage
        await $.openImage(i.src, {replace: true});
        return;
      }

      await _.wait(500);
      let d = $('div[id^="imageviewi"] input[type="submit"][style=""]');
      d = d.parentNode;
      d.submit();
    },
  });

  _.register({
    rule: /^http:\/\/imgdragon\.com\/(getfil\.php|dl)$/,
    async ready () {
      const i = $.$('img.pic');
      if (i) {
        // second stage
        await $.openImage(i.src);
        return;
      }

      await _.wait(500);
      const f = $('#ContinueFRM');
      f.submit();
    },
  });

  function waitDOM (element, fn) {
    return new Promise((resolve) => {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type !== 'childList') {
            return;
          }
          const [k, , r] = _.find(mutation.addedNodes, (child) => {
            return fn(child) ? child : _.none;
          });
          if (k === _.none) {
            return;
          }
          observer.disconnect();
          resolve(r);
        });
      });
      observer.observe(element, {
        childList: true,
      });
    });
  }

  // Used when the form's shell does not exist when page loaded.
  async function getAmbiguousForm (selector, shellNormalizer) {
    const d = await waitFormShell(selector, shellNormalizer);
    const style = $('style', d);
    const visibleClasses = parseStyle(style);
    const forms = $.$$('form', d);
    for (const form of forms) {
      const isVisible = visibleClasses.some((class_) => {
        return form.classList.contains(class_);
      });
      if (!isVisible) {
        continue;
      }
      const button = $.$('input[type="button"]', form);
      if (button) {
        return button;
      }
    }
    return null;
  }

  // Used when the form's shell does not exist when page loaded.
  // Wait for the given selector, and normalize matched element by normalizer.
  function waitFormShell (selector, normalizer) {
    return new Promise((resolve) => {
      const handle = setInterval(() => {
        let shell = $.$(selector);
        if (!shell) {
          return;
        }
        clearInterval(handle);
        shell = normalizer(shell);
        resolve(shell);
      }, 500);
    });
  }

  function parseStyle (style) {
    style = style.textContent;
    const pattern = /\.(\w+)\{visibility:initial;\}/g;
    let rv = null;
    const classes = [];
    while ((rv = pattern.exec(style)) !== null) {
      classes.push(rv[1]);
    }
    return classes;
  }

  function getNext1 (i) {
    return i.value;
  }

  function getNext2 (i) {
    let next = i.onclick && i.onclick.toString().match(/value='([^']+)'/);
    if (next) {
      next = next[1];
      return next;
    } else {
      return i.value;
    }
  }

  async function helper (id, getNext) {
    const recaptcha = $.$('#recaptcha_widget, #captcha');
    if (recaptcha) {
      _.info('stop because recaptcha');
      return;
    }

    let i = $.$('input[name="next"]');
    if (i) {
      // first stage
      const next = getNext(i);
      await go(id, $('input[name="pre"]').value, next);
      return;
    }

    i = $.$('img.picview');
    if (i) {
      // second stage
      await $.openImage(i.src);
      return;
    }

    // other page
    _.info('do nothing');
  }

  async function go (id, pre, next) {
    await $.openLink('', {
      post: {
        op: 'view',
        id: id,
        pre: pre,
        next: next,
        adb: '0',
      },
    });
  }

})();
