import { openLink } from "./link.js";
import { warn, info } from "./logger.js";
import { rebuildDocument } from "./misc.js";
import { GMAPI } from "./platform.js";

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
export async function openImage(imgSrc, options = {}) {
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

function scaleImage(img) {
  let resizable = false;
  let shrinked = false;

  function applyStyle() {
    img.style.maxWidth = shrinked ? "100%" : "";
    img.style.maxHeight = shrinked ? "100%" : "";
    if (!resizable) {
      img.style.cursor = "";
    } else {
      img.style.cursor = shrinked ? "zoom-in" : "zoom-out";
    }
  }

  function toggleShrinking(event) {
    if (!shrinked) {
      shrinked = true;
      applyStyle();
      return;
    }

    // Remember the clicked point relative to the image.
    const before = img.getBoundingClientRect();
    const rx = (event.clientX - before.left) / before.width;
    const ry = (event.clientY - before.top) / before.height;

    shrinked = false;
    applyStyle();

    // Keep the clicked point under the cursor after expanding.
    const after = img.getBoundingClientRect();
    window.scrollBy(
      after.left + rx * after.width - event.clientX,
      after.top + ry * after.height - event.clientY,
    );
  }

  function checkScaling() {
    const nw = img.naturalWidth;
    const nh = img.naturalHeight;
    const cw = document.documentElement.clientWidth;
    const ch = document.documentElement.clientHeight;

    if ((nw > cw || nh > ch) && !resizable) {
      resizable = true;
      shrinked = true;
      img.addEventListener("click", toggleShrinking);
    } else if (nw <= cw && nh <= ch && resizable) {
      img.removeEventListener("click", toggleShrinking);
      resizable = false;
      shrinked = false;
    }
    applyStyle();
  }

  if (img.naturalWidth && img.naturalHeight) {
    checkScaling();
  } else {
    img.addEventListener("load", checkScaling);
  }

  let h = 0;
  window.addEventListener("resize", () => {
    clearTimeout(h);
    h = setTimeout(checkScaling, 100);
  });
}

function changeBackground() {
  document.body.style.backgroundColor = "#222222";
}

// Center with auto margins rather than align-items/justify-content, so an
// expanded image larger than the viewport stays fully scrollable.
function alignCenter(wrapper, img) {
  document.documentElement.style.height = "100%";
  document.body.style.height = "100%";
  document.body.style.margin = "0";
  wrapper.style.display = "flex";
  wrapper.style.width = "100%";
  wrapper.style.height = "100%";
  img.style.margin = "auto";
  img.style.flex = "none";
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

  if (ac) {
    alignCenter(wrapper, img);
  }
  if (cb) {
    changeBackground();
  }
  if (si) {
    scaleImage(img);
  }
}
