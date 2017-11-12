_.register({
  rule: {
    host: [
      /^al\.ly$/,
      /^ally\.sh$/,
    ],
  },
  async ready () {
    let i = $.$('#html_element');
    if (i) {
      // first stage, show recaptcha immediately
      $.remove('#messa');
      i.classList.remove('hidden');
      return;
    }

    // second stage
    i = $.searchFromScripts(/"href","([^"]+)" \+ hash\)\.remove/);
    if (!i) {
      _.warn('site changed');
      return;
    }
    i = i[1] + location.hash;

    $.openLink(i);
  },
});
