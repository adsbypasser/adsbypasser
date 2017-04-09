(function () {

  _.register({
    rule: {
      host: [
        /^(www\.)?linkdrop\.net$/,
        /^dmus\.in$/,
        /^ulshare\.net$/,
        /^adurl\.id$/,
        /^goolink\.me$/,
        /^earningurl\.com$/,
      ],
    },
    async ready () {
      $.remove('iframe');

      const f = getForm();
      if (!f) {
        return;
      }

      sendRequest(f);
    },
  });


  _.register({
    rule: {
      host: /^sflnk\.me$/,
    },
    async ready () {
      $.remove('iframe');

      let f = getForm();
      if (!f) {
        f = $('#link-view');
        f.submit();
        return;
      }

      sendRequest(f);
    },
  });


  function getForm () {
    const jQuery = $.window.$;
    const f = jQuery('form[action="/links/go"], form[action="/links/linkdropgo"]');
    if (f.length > 0) {
      return f;
    }
    return null;
  }


  // XXX threw away promise
  function sendRequest (f) {
    const jQuery = $.window.$;
    jQuery.ajax({
      dataType: 'json',
      type: 'POST',
      url: f.attr('action'),
      data: f.serialize(),
      success: (result) => {
        if (result.url) {
          $.openLink(result.url);
        } else {
          _.warn(result.message);
        }
      },
      error: (xhr, status, error) => {
        _.warn(xhr, status, error);
      },
    });
  }

})();
