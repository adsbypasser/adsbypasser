// -----------------------------
// Config Loader
// -----------------------------
import { register } from "util/dispatcher.js";
import { usw, GMAPI } from "util/platform.js";

const MANIFEST = [
  {
    key: "version",
    default_: 0,
    verify: (v) => typeof v === "number" && v >= 0,
    normalize: parseInt,
  },
  {
    key: "align_center",
    default_: true,
    verify: (v) => typeof v === "boolean",
    normalize: Boolean,
    label: "Align Center",
    help: "Align image to the center if possible.",
    type: "checkbox",
  },
  {
    key: "change_background",
    default_: true,
    verify: (v) => typeof v === "boolean",
    normalize: Boolean,
    label: "Change Background",
    help: "Use Firefox-like image background.",
    type: "checkbox",
  },
  {
    key: "redirect_image",
    default_: true,
    verify: (v) => typeof v === "boolean",
    normalize: Boolean,
    label: "Redirect Image",
    help: "Directly open image link if possible.",
    type: "checkbox",
  },
  {
    key: "scale_image",
    default_: true,
    verify: (v) => typeof v === "boolean",
    normalize: Boolean,
    label: "Scale Image",
    help: "Scale image to fit window.",
    type: "checkbox",
  },
  {
    key: "log_level",
    default_: 1,
    verify: (v) => typeof v === "number" && v >= 0 && v <= 2,
    normalize: parseInt,
    label: "Log Level",
    help: "0: quiet, 1: default, 2: verbose",
    type: "select",
    menu: [
      [0, "0 (quiet)"],
      [1, "1 (default)"],
      [2, "2 (verbose)"],
    ],
  },
];

// -----------------------------
// Helpers
// -----------------------------
async function sanityCheck() {
  const values = await Promise.all(MANIFEST.map((d) => GMAPI.getValue(d.key)));
  const updates = {};

  MANIFEST.forEach((d, i) => {
    let val = values[i];
    if (!d.verify(val)) val = d.default_;
    updates[d.key] = val;
  });

  await Promise.all(
    Object.entries(updates).map(([k, v]) => GMAPI.setValue(k, v)),
  );
}

function waitForPage() {
  return new Promise((resolve) => {
    if (document.readyState === "complete" && usw.render) return resolve();

    const check = () => {
      if (document.readyState === "complete" && usw.render) {
        clearInterval(interval);
        resolve();
      }
    };
    const interval = setInterval(check, 50);
    document.addEventListener("DOMContentLoaded", check);
  });
}

async function dumpConfig() {
  const values = await Promise.all(MANIFEST.map((d) => GMAPI.getValue(d.key)));
  const o = {};
  MANIFEST.forEach((d, i) => (o[d.key] = values[i]));
  return o;
}

async function loadConfig() {
  await sanityCheck();

  register({
    rule: { host: /^adsbypasser\.github\.io$/, path: /^\/configure\.html$/ },
    async ready() {
      await waitForPage();

      usw.commit = async (data) => {
        for (const [k, v] of Object.entries(data)) await GMAPI.setValue(k, v);
      };

      const config = await dumpConfig();

      const options = MANIFEST.reduce((acc, d) => {
        if (!d.type || d.key === "version") return acc;
        acc[d.key] = {
          type: d.type,
          value: config[d.key],
          label: d.label,
          help: d.help,
        };
        if (d.type === "select") acc[d.key].menu = d.menu;
        return acc;
      }, {});

      usw.render({ version: config.version, options });
    },
  });
}

export { dumpConfig, loadConfig };
