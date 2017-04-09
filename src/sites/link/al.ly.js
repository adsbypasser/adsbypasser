_.register({
  rule: {
    host: [
      /^al\.ly$/,
      /^ally\.sh$/,
    ],
  },
  async ready () {
    // first stage
    let i = $.$('body > section > iframe');
    if (i) {
      // the site will detect iframe being removed or not
      i.src = 'about:blank';

      // wait a reasonable time to avoid AdsBlock detection
      await _.wait(3000);
      const a = $('a.redirect');
      a.click();

      return;
    }

    // second stage
    i = $.searchFromScripts(/"href","([^"]+)"\)\.remove/);
    if (!i) {
      _.warn('site changed');
      return;
    }
    i = i[1];

    $.openLink(i);
  },
});
