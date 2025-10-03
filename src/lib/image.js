import { openLink } from "./link.js";
import { remove } from "./dom.js";
import { warn, info } from "./logger.js";
import { removeAllTimer } from "./misc.js";
import { GMAPI } from "./platform.js";

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

function enableScrolling() {
  const el =
    document.compatMode === "CSS1Compat"
      ? document.documentElement
      : document.body;
  el.style.overflow = "";
}

function toggleShrinking() {
  this.classList.toggle("adsbypasser-shrinked");
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

async function scaleImage(img) {
  const siURL = await GMAPI.getResourceUrl("scaleImage");
  appendStyleURL(siURL);

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

async function changeBackground() {
  const bgImage = await GMAPI.getResourceUrl("bgImage");
  document.body.style.backgroundColor = "#222222";
  document.body.style.backgroundImage = `url('${bgImage}')`;
}

async function alignCenter() {
  const acURL = await GMAPI.getResourceUrl("alignCenter");
  appendStyleURL(acURL);
}

function injectStyle(wrapper, img) {
  remove("style, link[rel=stylesheet]");
  wrapper.id = "adsbypasser-wrapper";
  img.id = "adsbypasser-image";
}

function appendStyleURL(url) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = url;
  document.head.appendChild(link);
}

async function replaceBody(imgSrc) {
  const redirectImage = await GMAPI.getValue("redirect_image");
  if (!redirectImage || !imgSrc) {
    if (!imgSrc) warn("false url");
    return;
  }

  info(`replacing body with \`${imgSrc}\` ...`);

  removeAllTimer();
  enableScrolling();

  document.body = document.createElement("body");

  const wrapper = document.createElement("div");
  document.body.appendChild(wrapper);

  const img = document.createElement("img");
  img.src = imgSrc;
  wrapper.appendChild(img);

  const ac = await GMAPI.getValue("align_center");
  const si = await GMAPI.getValue("scale_image");
  if (ac || si) injectStyle(wrapper, img);
  if (ac) await alignCenter();
  const cb = await GMAPI.getValue("change_background");
  if (cb) await changeBackground();
  if (si) await scaleImage(img);
}

export { openImage };
