$.register({
  rule: {
    host: /^xxxscreens\.com$/,
  },
  ready: function () {
    'use strict';
    var contBtn = $.$('.button.red.large');
    if(contBtn)
    {
     contBtn.click();
     return;
    };
    var i = $('.centred_resized');
    if (i) {
      $.openImage(i.src);
    };
  },
});
