/**
 * Configuration page rendering logic for AdsBypasser
 *
 * This script handles the dynamic rendering of configuration options
 * and manages user interactions on the configuration page.
 */

window.render = null;
window.commit = function commit() {};

// Immediately-invoked function expression (IIFE) to avoid global namespace pollution
(function () {
  "use strict";

  // DOM element references
  const view = {
    panel: $("#panel"),
    options: $("#options"),
    save: $("#save"),
    msg: $("#msg"),
    installHint: $("#install-hint"),
  };

  // Template functions for different configuration option types
  const template = {
    checkbox: _.template($("#template-checkbox").text()),
    select: _.template($("#template-select").text()),
  };

  // Factory functions for creating UI elements for different option types
  const factory = {
    /**
     * Create a checkbox UI element
     * @param {string} key - Configuration option key
     * @param {Object} data - Configuration option data
     * @returns {HTMLElement} - Created checkbox element
     */
    checkbox: function (key, data) {
      const html = template.checkbox({
        key: key,
        checked: data.value,
        label: data.label,
        help: data.help,
      });
      return $.parseHTML(html);
    },

    /**
     * Create a select/dropdown UI element
     * @param {string} key - Configuration option key
     * @param {Object} data - Configuration option data
     * @returns {HTMLElement} - Created select element
     */
    select: function (key, data) {
      const html = template.select({
        key: key,
        value: data.value,
        menu: data.menu,
        label: data.label,
        help: data.help,
      });
      return $.parseHTML(html);
    },
  };

  /**
   * Render configuration options on the page
   * @param {Object} data - Configuration data to render
   */
  window.render = function (data) {
    clearTimeout(detection);

    view.msg.addClass("animated");

    // Iterate through configuration options and create UI elements
    _.each(data.options, function (v, k) {
      const createUI = factory[v.type];

      if (!createUI) {
        return;
      }

      const d = createUI(k, v);
      view.options.append(d);
    });

    // Show the configuration panel
    view.panel.css("display", "block");

    // Handle message transition end events
    view.msg.on("transitionend webkitTransitionEnd", function () {
      view.msg.removeClass("dismissed");
    });

    // Handle save button click events
    view.save.on("click", function (event) {
      event.preventDefault();

      const data = {};

      // Collect checkbox values
      view.options.find('input[type="checkbox"]').each(function (k, v) {
        data[v.name] = v.checked;
      });

      // Collect select values
      view.options.find("select").each(function (k, v) {
        // TODO not always integer
        data[v.name] = parseInt(v.value, 10);
      });

      // Commit changes
      // TODO this returns a promise.
      commit(data);

      view.msg.addClass("dismissed");
    });
  };

  // Detection timeout for showing installation hint
  const detection = setTimeout(function () {
    view.installHint.addClass("animated");
    view.installHint.css({
      opacity: 1,
      display: "block",
    });
  }, 1000);
})();
