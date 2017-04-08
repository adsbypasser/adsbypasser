$.register({
  rule: {
    host: /^(www\.)?piccash\.net$/
  },
  ready: function () {
  var i = $('.container > img');
  var m =i.onclick.toString().match(/mshow\('([^']+)'\);/);
  $.openImage(m[1]);
  },
});
