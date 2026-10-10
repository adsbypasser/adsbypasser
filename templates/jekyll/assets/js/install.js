/**
 * Installation channel switch for AdsBypasser
 *
 * The switch itself works with CSS only. This script lets a link to
 * "#nightly" open the page with the nightly channel selected.
 */

(() => {
  "use strict";

  if (location.hash === "#nightly") {
    document.querySelector("#channel-nightly").checked = true;
  }
})();
