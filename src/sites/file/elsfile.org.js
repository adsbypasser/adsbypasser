// This site uses the XFileSharing Pro script

_.register({
  rule: {
    host: /^elsfile\.org$/,
  },
  async ready () {
    const down = $.$('#btn_download');
    if (down) {
      down.click();
      return;
    }

    const countdown = $('#frmdlcenter');
    const o = new MutationObserver(() => {
      const submit = $.$('input[type="submit"][name="method_free"]');
      if (submit) {
        submit.click();
      }
    });
    o.observe(countdown, {
      childList: true
    });

    // Hacking the countdown timer
    let script = $.searchFromScripts(/.*eval\(function\(p,a,c,k,e,d\).*/);
    if (script.length > 0) {
      script = script[0].replace('||important', '|0|important');
      _.evil(script);
    }
  },
});
