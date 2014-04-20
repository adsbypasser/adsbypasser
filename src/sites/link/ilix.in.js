(function() {
  // Start the Mutation Observer
  function obStart(o,inputIdent) {
    o.observe($.$(inputIdent),
      {
        attributes: true,
        attributeFilter: ['disabled','value'],
        attributeOldValue: true
      });
  }

  // Stop the Mutation Observer
  function obStop(o) {o.disconnect();}

  $.register({
    rule: {
      host: /^(?:www\.)?(?:ilix\.in|(priva\.us|urlink\.at))$/,
      path: /\/(\w+)/
    },
    ready: function (m) {
      'use strict';

      var realHost = 'ilix.in';

      // If broken domain then redirect to real domain
      if (m.host[1] != null) {
        var realURL = location.href.replace(m.host[1],realHost);
        $.openLink(realURL);
        return;
      }

      // Iframe redirection
      try {
        var f = $('iframe[name=ifram]');
        $.openLink(f.src);
      } catch (e) {}

      // Try to skip the timer
      try {
        var inputIdent = 'form[name=frm] input[type=submit]';

        var o = new MutationObserver(
          function (mutations) {
            obStop(o);
            mutations.forEach(
              function (currMut) {
                // Prevent countdown text
                if (currMut.attributeName == 'value') {
                  currMut.target.value = currMut.oldValue;

                // Prevent disabled state
                } else {
                  currMut.target.removeAttribute('disabled');
                }                
              }
            );

            obStart(o, inputIdent);
          }
        );

        obStart(o, inputIdent);

        // Trigger change so if our Observer was set after initial change, it still works
        $(inputIdent).value = "Trigger Change";

      } catch (e) {}
      
      // Captcha not supported
      if (!$.$('img#captcha')) {
        // Auto-submit
        $('form[name=frm]').submit();
      }
    },
  });
})();

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;