/**
 * Configuration page rendering logic for AdsBypasser
 *
 * This script handles the dynamic rendering of configuration options
 * and manages user interactions on the configuration page.
 * Modernized version using vanilla JavaScript and Web Components.
 */

// Immediately-invoked function expression (IIFE) to avoid global namespace pollution
(() => {
  "use strict";

  // DOM element references using querySelector
  const view = {
    panel: document.querySelector("#panel"),
    options: document.querySelector("#options"),
    save: document.querySelector("#save"),
    msg: document.querySelector("#msg"),
    installHint: document.querySelector("#install-hint"),
  };

  // Factory functions for creating UI elements using Web Components
  const factory = {
    /**
     * Create a checkbox UI element using Web Component
     * @param {string} key - Configuration option key
     * @param {Object} data - Configuration option data
     * @returns {HTMLElement} - Created checkbox element
     */
    checkbox(key, data) {
      const element = document.createElement("config-checkbox");
      element.setAttribute("key", key);
      element.setAttribute("label", data.label);
      element.setAttribute("help", data.help);
      if (data.value) {
        element.setAttribute("checked", "");
      }
      return element;
    },

    /**
     * Create a select/dropdown UI element using Web Component
     * @param {string} key - Configuration option key
     * @param {Object} data - Configuration option data
     * @returns {HTMLElement} - Created select element
     */
    select(key, data) {
      const element = document.createElement("config-select");
      element.setAttribute("key", key);
      element.setAttribute("label", data.label);
      element.setAttribute("help", data.help);
      element.setAttribute("value", data.value);
      // Set menu items via property (arrays can't be attributes)
      element.menu = data.menu;
      return element;
    },
  };

  window.commit = async () => {};

  /**
   * Render configuration options on the page
   * @param {Object} data - Configuration data to render
   */
  window.render = (data) => {
    clearTimeout(detection);

    view.msg.classList.add("animated");

    // Iterate through configuration options and create UI elements
    Object.entries(data.options).forEach(([key, config]) => {
      const createUI = factory[config.type];

      if (!createUI) {
        return;
      }

      const element = createUI(key, config);
      view.options.appendChild(element);
    });

    // Show the configuration panel
    view.panel.style.display = "block";

    // Handle message transition end events
    view.msg.addEventListener("transitionend", () => {
      view.msg.classList.remove("dismissed");
    });

    // Handle save button click events
    view.save.addEventListener("click", async (event) => {
      event.preventDefault();

      const data = {};

      // Collect checkbox values
      view.options
        .querySelectorAll('input[type="checkbox"]')
        .forEach((input) => {
          data[input.name] = input.checked;
        });

      // Collect select values
      view.options.querySelectorAll("select").forEach((select) => {
        // TODO not always integer
        data[select.name] = parseInt(select.value, 10);
      });

      // Commit changes
      // TODO this returns a promise.
      await commit(data);

      view.msg.classList.add("dismissed");
    });
  };

  // Detection timeout for showing installation hint
  const detection = setTimeout(() => {
    view.installHint.classList.add("animated");
    view.installHint.style.opacity = "1";
    view.installHint.style.display = "block";
  }, 1000);
})();
