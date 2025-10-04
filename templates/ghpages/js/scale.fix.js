/**
 * Viewport scaling fix for mobile devices
 *
 * This script adjusts viewport scaling for better mobile experience
 * on iPhone devices by modifying meta viewport tags.
 */

// Immediately-invoked function expression (IIFE) to avoid global namespace pollution
(function () {
  "use strict";

  /**
   * Adjust viewport scaling for iPhone devices
   */
  const metas = document.getElementsByTagName("meta");
  if (navigator.userAgent.match(/iPhone/i)) {
    for (let i = 0; i < metas.length; ++i) {
      if (metas[i].name == "viewport") {
        metas[i].content =
          "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
      }
    }
    document.addEventListener("gesturestart", gestureStart, false);
  }

  /**
   * Handle gesture start events for further viewport adjustments
   */
  function gestureStart() {
    for (let i = 0; i < metas.length; ++i) {
      if (metas[i].name == "viewport") {
        metas[i].content =
          "width=device-width, minimum-scale=0.25, maximum-scale=1.6";
      }
    }
  }
})();
