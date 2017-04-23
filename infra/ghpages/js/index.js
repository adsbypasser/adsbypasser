(() => {
  'use strict';

  if (canUseES7()) {
    const links = document.querySelectorAll('#releases a.es5');
    links.forEach(hide);
  } else {
    const links = document.querySelectorAll('#releases a.es7');
    links.forEach(hide);
  }

  function canUseES7 () {
    try {
      eval('(async function () {});');
      return true;
    } catch (e) {
      console.info('test', e);
      return false;
    }
  }


  function hide (element) {
    element.style.display = 'none';
  }

})();
