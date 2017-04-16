_.register({
  rule: /http:\/\/setlinks\.us\/(p|t|d).*/,
  async ready () {
    // Redirect links d
    const k = $.searchFromScripts(/window\.location='([^']+)'/);
    if (k) {
      await $.openLink(k[1]);
      return;
    }

    // One link container p
    const aLinks = $.$$('div.links-container.result-form:not(.p-links-container) > span.dlinks > a');

    // If only one link, we redirect to it
    if (aLinks.length === 1) {
      await $.openLink(aLinks.at(0).href);
      return;
    }

    // Captcha links p,t
  },
});
