(function () {
  'use strict';

  if (canUseES7()) {
    var links = document.querySelectorAll('#releases a.es5');
    Array.prototype.forEach.call(links, hide);
  } else {
    var links = document.querySelectorAll('#releases a.es7');
    Array.prototype.forEach.call(links, hide);
  }

  function canUseES7 () {
    try {
      eval('(async function () {});');
      return true;
    } catch (e) {
      return false;
    }
  }


  function hide (element) {
    element.style.display = 'none';
  }

})();
