import { openLink } from "./link.js";
import { warn, info } from "./logger.js";
import { rebuildDocument } from "./misc.js";
import { GMAPI, VERSION } from "./platform.js";
import alignCenterCSS from "../../static/css/align_center.css";
import scaleImageCSS from "../../static/css/scale_image.css";

const RESOURCE_ROOT = `https://raw.githubusercontent.com/adsbypasser/adsbypasser/v${VERSION}/static`;
const BACKGROUND_IMAGE = `${RESOURCE_ROOT}/img/imagedoc-darknoise.png`;

/**
 * Open an image, either by redirecting to it or, with `options.replace`, by
 * replacing the whole document with it.
 *
 * Replacing is a DOM operation: it waits for DOMContentLoaded, so callers
 * must await it. Errors are not caught.
 * @param {string} imgSrc - Image URL
 * @param {Object} [options]
 * @param {boolean} [options.replace] - Replace the document instead of redirecting
 * @param {boolean} [options.referer] - Send referer when redirecting
 * @returns {Promise<void>}
 */
async function openImage(imgSrc, options = {}) {
  const replace = !!options.replace;
  const referer = !!options.referer;

  if (replace) {
    await replaceBody(imgSrc);
    return;
  }

  const redirectImage = await GMAPI.getValue("redirect_image");
  if (redirectImage) {
    await openLink(imgSrc, { referer });
  }
}

function toggleShrinking(event) {
  if (!this.classList.contains("adsbypasser-shrinked")) {
    this.classList.add("adsbypasser-shrinked");
    return;
  }

  // Remember the clicked point relative to the image.
  const before = this.getBoundingClientRect();
  const rx = (event.clientX - before.left) / before.width;
  const ry = (event.clientY - before.top) / before.height;

  this.classList.remove("adsbypasser-shrinked");

  // Keep the clicked point under the cursor after expanding.
  const after = this.getBoundingClientRect();
  window.scrollBy(
    after.left + rx * after.width - event.clientX,
    after.top + ry * after.height - event.clientY,
  );
}

function checkScaling() {
  const nw = this.naturalWidth;
  const nh = this.naturalHeight;
  const cw = document.documentElement.clientWidth;
  const ch = document.documentElement.clientHeight;

  if (
    (nw > cw || nh > ch) &&
    !this.classList.contains("adsbypasser-resizable")
  ) {
    this.classList.add("adsbypasser-resizable", "adsbypasser-shrinked");
    this.addEventListener("click", toggleShrinking);
  } else if (
    nw <= cw &&
    nh <= ch &&
    this.classList.contains("adsbypasser-resizable")
  ) {
    this.removeEventListener("click", toggleShrinking);
    this.classList.remove("adsbypasser-shrinked", "adsbypasser-resizable");
  }
}

function scaleImage(img) {
  GMAPI.addStyle(scaleImageCSS);

  if (img.naturalWidth && img.naturalHeight) {
    checkScaling.call(img);
  } else {
    img.addEventListener("load", checkScaling);
  }

  let h = 0;
  window.addEventListener("resize", () => {
    clearTimeout(h);
    h = setTimeout(checkScaling.bind(img), 100);
  });
}

function changeBackground() {
  document.body.style.backgroundColor = "#222222";
  document.body.style.backgroundImage = `url('${BACKGROUND_IMAGE}')`;
}

function alignCenter() {
  GMAPI.addStyle(alignCenterCSS);
}

function setIds(wrapper, img) {
  wrapper.id = "adsbypasser-wrapper";
  img.id = "adsbypasser-image";
}

async function replaceBody(imgSrc) {
  const redirectImage = await GMAPI.getValue("redirect_image");
  if (!redirectImage || !imgSrc) {
    if (!imgSrc) {
      warn("false url");
    }
    return;
  }

  info(`replacing body with \`${imgSrc}\` ...`);

  const ac = await GMAPI.getValue("align_center");
  const si = await GMAPI.getValue("scale_image");
  const cb = await GMAPI.getValue("change_background");

  await rebuildDocument();

  const wrapper = document.createElement("div");
  document.body.appendChild(wrapper);

  const img = document.createElement("img");
  img.src = imgSrc;
  wrapper.appendChild(img);

  if (ac || si) {
    setIds(wrapper, img);
  }
  if (ac) {
    alignCenter();
  }
  if (cb) {
    changeBackground();
  }
  if (si) {
    scaleImage(img);
  }
}

export { openImage };
