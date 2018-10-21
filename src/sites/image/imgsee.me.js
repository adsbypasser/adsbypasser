(function () {

  const PATH_RULE = /^\/([0-9a-zA-Z-_]+)(\.|\/|$)/;

  _.register({
    rule: {
      host: [
        /^(imgmonkey|imgtrex|imgve)\.com$/,
        /^(www\.)?imgsee\.me$/,
        /^imgclick\.net$/,
        /^(uploadrr|imageeer|pic-maniac|hulkimge)\.com$/,
        /^www\.uimgshare\.com$/,
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
      host: /^imgrock\.info$/,
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
        $.window._0x5b50b7 = null;

        await $.openImage(i.src);
        return;
      }

      // disable devtools blocker
      $.window._0x5b50b7 = null;

      let node = null;
      while (!node) {
        await _.wait(500);
        node = $.$('button[name="next"]');
      }
      node.click();
      node.click();
      node.click();
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

  _.register({
    rule: {
      host: /^imgrock\.pw$/,
      path: PATH_RULE,
    },
    async ready () {
      const i = $.$('img.picview');
      if (i) {
        // second stage
        await $.openImage(i.src);
        return;
      }

      const node = await getAmbiguousForm(
        'div[id] + div[id] > input:not([style])',
        (node) => {
          const d = node.parentElement;
          // first click the input element, then the ambiguous forms will show
          node.click();
          return d;
        });
      node.click();
    },
  });

  _.register({
    rule: {
      host: /^(imgview|imgtown|imgmaze|imgdew)\.pw$/,
      path: PATH_RULE,
    },
    async ready () {
      $.remove('iframe');

      const i = $.$('img.picview');
      if (i) {
        // second stage
        await $.openImage(i.src);
        return;
      }

      $.window._0x58ff35 = null;

      const node = await getAmbiguousForm(
        'script + div[id] > input:not([style])',
        (node) => {
          const d = node.parentElement;
          // first click the input element, then the ambiguous forms will show
          node.click();
          return d;
        });
      node.click();
    },
  });

  _.register({
    rule: {
      host: /^imgant\.com$/,
      path: /^\/img-(\d+)\.html$/,
    },
    async start (m) {
      await $.openLink(`imgview-${m.path[1]}.html`);
    },
  });

  _.register({
    rule: {
      host: /^imgant\.com$/,
      path: /^\/imgview-\d+\.html$/,
    },
    async ready () {
      const i = $('#picView');
      await $.openImage(i.src);
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
    let visibleClasses = parseStyle(style);
    visibleClasses = filterDuplicated(visibleClasses);
    while (true) {
      const button = findVisibleForm(visibleClasses);
      if (button) {
        return button;
      }
      await _.wait(500);
    }
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
    return Array.from(table.entries()).filter((unique) => {
      return unique;
    }).map((_, c) => {
      return c;
    });
  }

  function findVisibleForm (classes) {
    for (const class_ of classes) {
      const form = $.$(`form.${class_}`);
      if (!form) {
        continue;
      }
      const button = $.$('input[type="button"], button[type="button"]', form);
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
