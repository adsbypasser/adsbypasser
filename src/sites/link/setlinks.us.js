$.register({
  rule: /http:\/\/setlinks\.us\/(p|t|d).*/,
  ready: function () {
    'use strict';

    // Redirect links d
    var k = $.searchScripts(/window\.location='([^']+)'/);
    if (k) {
      $.openLink(k[1]);
      return;
    }

    // One link container p
    var aLinks = $.$$('div.links-container.result-form:not(.p-links-container) > span.dlinks > a');

    // If only one link, we redirect to it
    if (aLinks.size() === 1) {
      $.openLink(aLinks.at(0).href);
      return;
    }

    // Captcha links p,t
    k = $('img[alt=captcha]');

    $.captcha(k.src, function (a) {
      var b = $('#captcha');
      var c = $('input[name=Submit]');
      b.value = a;
      c.click();
    });
  },
});
