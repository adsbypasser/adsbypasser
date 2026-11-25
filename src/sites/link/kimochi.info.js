/**
 * @domain kimochi.info
 */
_.register({
  rule: {
    host: /^kimochi\.info$/,
    path: /^\/inter$/,
  },
  async ready() {
    const ma = $("a#next");
    await $.openLink(ma.href);
  },
});

_.register({
  rule: {
    host: /^kimochi\.info$/,
    path: /^\/download\/(?!file\/?$).+/,
  },
  async ready() {
    const isReady = (button) => {
      if (!button || button.disabled || button.hasAttribute("disabled")) {
        return false;
      }
      const form = button.closest("form") || document;
      const turnstileWidget = $.$(".cf-turnstile", form);
      if (turnstileWidget) {
        const turnstileInput = $.$('input[name="cf-turnstile-response"]', form);
        if (!turnstileInput || !turnstileInput.value) {
          return false;
        }
      }
      return true;
    };

    if (!$.$("#downloadBtn")) {
      return;
    }

    const button = await _.tryEvery(200, () => {
      const el = $.$("#downloadBtn");
      return isReady(el) ? el : _.none;
    });
    button.click();
  },
});
