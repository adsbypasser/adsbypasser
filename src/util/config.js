import { AdsBypasserError, every } from 'util/core.js';
import { register } from 'util/dispatcher.js';
import { usw, GMAPI } from 'util/platform.js';

// -----------------------------
// Config manifest with versioned defaults
// -----------------------------
const MANIFEST = [
  {
    key: 'version',
    default_: 0,
    verify: v => typeof v === 'number' && v >= 0,
    normalize: toNumber,
    migrate: async () => {}, // placeholder
  },
  {
    key: 'align_center',
    default_: true,
    verify: isBoolean,
    normalize: toBoolean,
    label: 'Align Center',
    help: 'Align image to the center if possible. (default: enabled)',
    type: 'checkbox',
    migrate: async value => typeof value !== 'boolean' ? true : value,
  },
  {
    key: 'change_background',
    default_: true,
    verify: isBoolean,
    normalize: toBoolean,
    label: 'Change Background',
    help: 'Use Firefox-like image background if possible. (default: enabled)',
    type: 'checkbox',
    migrate: async value => typeof value !== 'boolean' ? true : value,
  },
  {
    key: 'redirect_image',
    default_: true,
    verify: isBoolean,
    normalize: toBoolean,
    label: 'Redirect Image',
    help: 'Directly open image link if possible. If disabled, redirection only works on link shortener sites.',
    type: 'checkbox',
    migrate: async value => typeof value !== 'boolean' ? true : value,
  },
  {
    key: 'scale_image',
    default_: true,
    verify: isBoolean,
    normalize: toBoolean,
    label: 'Scale Image',
    help: 'When image loaded, scale it to fit window if possible. (default: enabled)',
    type: 'checkbox',
    migrate: async value => typeof value !== 'boolean' ? true : value,
  },
  {
    key: 'log_level',
    default_: 1,
    verify: v => typeof v === 'number' && v >= 0 && v <= 2,
    normalize: toNumber,
    label: 'Log Level',
    type: 'select',
    menu: [[0,'0 (quiet)'],[1,'1 (default)'],[2,'2 (verbose)']],
    help: 'Log level in developer console. (0: quiet, 1: default, 2: verbose)',
    migrate: async value => typeof value !== 'number' ? 1 : value,
  },
];

// -----------------------------
// Helpers
// -----------------------------
function isBoolean(v) { return typeof v === 'boolean'; }
function toBoolean(v) { return !!v; }
function toNumber(v) { return parseInt(v, 10); }

// -----------------------------
// Sanity check & dynamic migration
// -----------------------------
async function sanityCheck() {
  const values = await Promise.all(MANIFEST.map(d => GMAPI.getValue(d.key)));

  const updates = {};
  for (let i = 0; i < MANIFEST.length; i++) {
    const d = MANIFEST[i];
    let val = values[i];
    val = await d.migrate(val);
    if (!d.verify(val)) val = d.default_;
    updates[d.key] = val;
  }

  // Apply all updates
  await Promise.all(Object.entries(updates).map(([k,v]) => GMAPI.setValue(k,v)));
}

// -----------------------------
// Load config & dynamic UI
// -----------------------------
async function loadConfig() {
  await sanityCheck();

  register({
    rule: { host: /^adsbypasser\.github\.io$/, path: /^\/configure\.html$/ },
    async ready() {
      await waitForPage();

      usw.commit = async data => {
        for (const [k,v] of Object.entries(data)) await GMAPI.setValue(k,v);
      };

      const config = await dumpConfig();

      const options = MANIFEST.reduce((acc, d) => {
        if (!d.type || d.key === 'version') return acc;
        acc[d.key] = { type: d.type, value: config[d.key], label: d.label, help: d.help };
        if (d.type === 'select') acc[d.key].menu = d.menu;
        return acc;
      }, {});

      usw.render({ version: config.version, options });
    }
  });
}

// -----------------------------
// Wait for DOM + usw.render
// -----------------------------
function waitForPage() {
  return new Promise(resolve => {
    if (document.readyState === 'complete' && usw.render) return resolve();
    const check = () => { if (document.readyState === 'complete' && usw.render) { clearInterval(interval); resolve(); } };
    const interval = setInterval(check, 50);
    document.addEventListener('DOMContentLoaded', check);
  });
}

// -----------------------------
// Dump config
// -----------------------------
async function dumpConfig() {
  const values = await Promise.all(MANIFEST.map(d => GMAPI.getValue(d.key)));
  const o = {};
  MANIFEST.forEach((d,i) => o[d.key] = values[i]);
  return o;
}

// -----------------------------
export { dumpConfig, loadConfig };
