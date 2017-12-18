(function () {

  _.register({
    rule: {
      host: [
        /^(www\.)?adb\.ug$/,
        /^(www\.)?lynk\.my$/,
        /^(www\.)?adyou\.(co|me)$/,
      ],
      // Match everything but empty, privacy, terms, contact, contact/whatever or path beginning with #
      path: /^(?!\/(?:privacy|terms|contact(\/.*)?|#.*)?$).*$/,
    },
    async ready () {
      $.remove('iframe');

      // pattern 1
      const m = $.searchFromScripts(/top\.location\.href="([^"]+)"/);
      if (m) {
        await $.openLink(m[1]);
        return;
      }

      // pattern 2
      const args = await getArguments();
      tryLink(args);
    },
  });

  function getArguments () {
    const PATTERN = /\{\s*_args[^}]+\}[^}]+\}/;

    return new Promise((resolve) => {
      const m = $.searchFromScripts(PATTERN);
      if (m) {
        resolve(m);
        return;
      }
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.localName === 'script') {
              const m = node.textContent.match(PATTERN);
              if (m) {
                observer.disconnect();
                resolve(m);
              }
            }
          });
        });
      });
      observer.observe(document.body, {
        childList: true,
      });
    }).then((m) => {
      return eval('(' + m[0] + ')');
    });
  }

  function tryLink (args) {
    const url = window.location.pathname + '/skip_timer';

    // XXX uncatched promise
    const i = setInterval(() => {
      $.post(url, args).then((text) => {
        const jj = JSON.parse(text);
        if (!jj.errors && jj.messages) {
          clearInterval(i);
          $.openLink(jj.messages.url);
        }
      });
    }, 1000);
  }

})();
