/**
 * Web Components for configuration form elements
 * Replaces Lodash template-based rendering with native Custom Elements
 */

/**
 * Base class for configuration form components
 */
class ConfigComponent extends HTMLElement {
  constructor(templateId) {
    super();
    this.templateId = templateId;
  }

  connectedCallback() {
    const template = document.getElementById(this.templateId);
    if (!template) {
      console.error(`Template ${this.templateId} not found`);
      return;
    }

    const clone = template.content.cloneNode(true);
    this.appendChild(clone);
    this.render();
  }

  render() {
    // Override in subclasses
  }

  getAttribute(name) {
    return super.getAttribute(name) || "";
  }
}

/**
 * Custom element for checkbox configuration options
 * Usage: <config-checkbox key="option1" label="Enable feature" help="Description" checked></config-checkbox>
 */
class ConfigCheckbox extends ConfigComponent {
  constructor() {
    super("template-checkbox");
  }

  render() {
    const key = this.getAttribute("key");
    const label = this.getAttribute("label");
    const help = this.getAttribute("help");
    const checked = this.hasAttribute("checked");

    const input = this.querySelector("input");
    const labelEl = this.querySelector("label");
    const helpEl = this.querySelector(".form-text");

    if (input) {
      input.id = `checkbox-${key}`;
      input.name = key;
      input.checked = checked;
    }

    if (labelEl) {
      labelEl.setAttribute("for", `checkbox-${key}`);
      labelEl.textContent = label;
    }

    if (helpEl) {
      helpEl.textContent = help;
    }
  }
}

/**
 * Custom element for select/dropdown configuration options
 * Usage: <config-select key="option1" label="Choose option" help="Description" value="0"></config-select>
 * Note: Menu items should be set via JavaScript property after creation
 */
class ConfigSelect extends ConfigComponent {
  constructor() {
    super("template-select");
    this._menu = [];
  }

  set menu(items) {
    this._menu = items;
    if (this.isConnected) {
      this.renderOptions();
    }
  }

  get menu() {
    return this._menu;
  }

  render() {
    const key = this.getAttribute("key");
    const label = this.getAttribute("label");
    const help = this.getAttribute("help");
    const value = this.getAttribute("value");

    const selectEl = this.querySelector("select");
    const labelEl = this.querySelector("label");
    const helpEl = this.querySelector(".form-text");

    if (selectEl) {
      selectEl.id = `select-${key}`;
      selectEl.name = key;
      selectEl.dataset.value = value; // Store for later use
    }

    if (labelEl) {
      labelEl.setAttribute("for", `select-${key}`);
      labelEl.textContent = label;
    }

    if (helpEl) {
      helpEl.textContent = help;
    }

    this.renderOptions();
  }

  renderOptions() {
    const selectEl = this.querySelector("select");
    if (!selectEl || this._menu.length === 0) {
      return;
    }

    const currentValue = selectEl.dataset.value;
    selectEl.innerHTML = "";

    this._menu.forEach(([value, text]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = text;
      if (String(value) === String(currentValue)) {
        option.selected = true;
      }
      selectEl.appendChild(option);
    });
  }
}

// Register custom elements
customElements.define("config-checkbox", ConfigCheckbox);
customElements.define("config-select", ConfigSelect);
