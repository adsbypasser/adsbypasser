(function () {
  'use strict';

  $.register({
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
    ready: function () {
      $.removeNodes('iframe');

      var f = getForm();
      if (!f) {
        return;
      }

      sendRequest(f);
    },
  });


  $.register({
    rule: {
      host: /^sflnk\.me$/,
    },
    ready: function () {
      $.removeNodes('iframe');

      var f = getForm();
      if (!f) {
        f = $('#link-view');
        f.submit();
        return;
      }

      sendRequest(f);
    },
  });


  function getForm () {
    var jQuery = $.window.$;
    var f = jQuery('form[action="/links/go"], form[action="/links/linkdropgo"]');
    if (f.length > 0) {
      return f;
    }
    return null;
  }


  function sendRequest (f) {
    var jQuery = $.window.$;
    jQuery.ajax({
      dataType: 'json',
      type: 'POST',
      url: f.attr('action'),
      data: f.serialize(),
      success: function (result, status, xhr) {
        if (result.url) {
          $.openLink(result.url);
        } else {
          _.warn(result.message);
        }
      },
      error: function (xhr, status, error) {
        _.warn(xhr, status, error);
      },
    });
  }

})();
