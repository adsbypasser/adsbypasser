$.register({
  rule: /http:\/\/setlinks\.us\/(p|t|d).*/,
  ready: function () {
    'use strict';

    // Redirect links d
    var k = $.$$('script').find(function (script) {
      script = script.innerHTML;
      var m = script.match(/window\.location='([^']+)'/);
      if (!m) {
        return _.nop;
      }
      return m[1];
    });
    if (k) {
      $.openLink(k.payload);
      return;
    }

    // One link container p
    var i = $.$$('div.links-container.result-form:not(.p-links-container) > span.dlinks > a');

    // Convert to JS Object so we can count the number of links
    var aLinks = i.map(function (value) {
      return value;
    });

    // If only one link, we redirect to it
    if (aLinks.length == 1) {
      $.openLink(aLinks[0].href);
      return;
    }

    // Captcha links p,t
    i = $('img[alt=captcha]');

    if (typeof i != 'undefined') {
      $.captcha(i.src, function (a) {
        var b = $('#captcha');
        var c = $('input[name=Submit]');
        b.value = a;
        c.click();
      });
  }
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
