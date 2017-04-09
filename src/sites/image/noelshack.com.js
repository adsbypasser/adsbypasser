$.register({
  rule: {
    host: /^www\.noelshack\.com$/
  },
  ready: function () {
    var i = $('#elt_to_aff');
    $.openImage(i.src);
  },
});
