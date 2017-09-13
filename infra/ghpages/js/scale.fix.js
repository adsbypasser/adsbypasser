(function () {
  'use strict';

  var metas = document.getElementsByTagName('meta');
  if (navigator.userAgent.match(/iPhone/i)) {
    for (var i = 0; i < metas.length; ++i) {
      if (metas[i].name == "viewport") {
        metas[i].content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
      }
    }
    document.addEventListener("gesturestart", gestureStart, false);
  }
  function gestureStart () {
    for (var i = 0; i < metas.length; ++i) {
      if (metas[i].name == "viewport") {
        metas[i].content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6";
      }
    }
  }
})();
