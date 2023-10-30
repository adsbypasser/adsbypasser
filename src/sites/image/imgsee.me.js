(function () {

  const PATH_RULE = /^\/([0-9a-zA-Z-_]+)(\.|\/|$)/;

  _.register({
    rule: {
      host: [
        /^imgmonkey\.com$/,
        /^(imgsen|imgsto|kvador|kropic|picdollar|silverpic)\.com$/,
        /^(imgclick|pics4you)\.net$/,
        /^imgstar\.eu$/,
      ],
      path: PATH_RULE,
    },
    async ready (m) {
      await helper(m.path[1], getNext1);
    },
  });

  _.register({
    rule: {
      host: /^imgoutlet\.com$/,
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
      host: /^(picbaron|imgbaron|kvador|fotokiz)\.com$/,
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

  function filterDuplicated (classes) {
    const table = new Map();
    for (const c of classes) {
      if (table.has(c)) {
        table.set(c, false);
      } else {
        table.set(c, true);
      }
    }
    /* eslint-disable no-unused-vars */
    return Array.from(table.entries()).filter(([_, unique]) => {
      return unique;
    }).map(([_, c]) => {
      return c;
    });
    /* eslint-enable no-unused-vars */
  }

  function findVisibleForm (classes) {
    for (const class_ of classes) {
      const form = $.$(`form.${class_}`);
      if (!form) {
        continue;
      }
      const button = $.$('input[type="button"], button[type="button"], button[class]', form);
      if (!button) {
        continue;
      }
      const v = getComputedStyle(button).getPropertyValue('visibility');
      if (v !== 'visible') {
        continue;
      }
      return button;
    }
    return null;
  }

  function getNext1 (i) {
    return i.value;
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

    i = $.$('img.picview, img.pic');
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
