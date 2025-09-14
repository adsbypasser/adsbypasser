import { openLink } from 'util/link.js';
import { remove } from 'util/dom.js';
import { warn, info } from 'util/logger.js';
import { removeAllTimer } from 'util/misc.js';
import { GMAPI } from 'util/platform.js';

// -----------------------------
// Main image opener
// -----------------------------
async function openImage(imgSrc, options = {}) {
  const replace = !!options.replace;
  const referer = !!options.referer;

  if (replace) {
    await replaceBody(imgSrc);
    return;
  }

  const redirectImage = await GMAPI.getValue('redirect_image');
  if (redirectImage) {
    await openLink(imgSrc, { referer });
  }
}

// -----------------------------
// Body / page manipulation helpers
// -----------------------------
function enableScrolling() {
  const target =
    document.compatMode === 'CSS1Compat'
      ? document.documentElement
      : document.body;
  target.style.overflow = '';
}

function toggleShrinking() {
  this.classList.toggle('adsbypasser-shrinked');
}

function checkScaling() {
  const nw = this.naturalWidth;
  const nh = this.naturalHeight;
  const cw = document.documentElement.clientWidth;
  const ch = document.documentElement.clientHeight;

  if ((nw > cw || nh > ch) && !this.classList.contains('adsbypasser-resizable')) {
    this.classList.add('adsbypasser-resizable', 'adsbypasser-shrinked');
    this.addEventListener('click', toggleShrinking);
  } else if (nw <= cw && nh <= ch && this.classList.contains('adsbypasser-resizable')) {
    this.removeEventListener('click', toggleShrinking);
    this.classList.remove('adsbypasser-resizable', 'adsbypasser-shrinked');
  }
}

async function scaleImage(img) {
  const siURL = await GMAPI.getResourceUrl('scaleImage');
  appendStyleURL(siURL);

  if (img.naturalWidth && img.naturalHeight) {
    checkScaling.call(img);
  } else {
    img.addEventListener('load', checkScaling);
  }

  let resizeTimeout = 0;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(checkScaling.bind(img), 100);
  });
}

async function changeBackground() {
  const bgImage = await GMAPI.getResourceUrl('bgImage');
  document.body.style.backgroundColor = '#222222';
  document.body.style.backgroundImage = `url('${bgImage}')`;
}

async function alignCenter() {
  const acURL = await GMAPI.getResourceUrl('alignCenter');
  appendStyleURL(acURL);
}

// -----------------------------
// DOM / style helpers
// -----------------------------
function injectStyle(wrapperDiv, img) {
  remove('style, link[rel=stylesheet]');
  wrapperDiv.id = 'adsbypasser-wrapper';
  img.id = 'adsbypasser-image';
}

function appendStyleURL(url) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = url;
  document.head.appendChild(link);
}

// -----------------------------
// Replace page body with image
// -----------------------------
async function replaceBody(imgSrc) {
  const redirectImage = await GMAPI.getValue('redirect_image');
  if (!redirectImage || !imgSrc) {
    if (!imgSrc) warn('false url');
    return;
  }

  info(`replacing body with \`${imgSrc}\` ...`);

  removeAllTimer();
  enableScrolling();

  document.body = document.createElement('body');

  const wrapperDiv = document.createElement('div');
  document.body.appendChild(wrapperDiv);

  const img = document.createElement('img');
  img.src = imgSrc;
  wrapperDiv.appendChild(img);

  const alignCenterEnabled = await GMAPI.getValue('align_center');
  const scaleEnabled = await GMAPI.getValue('scale_image');

  if (alignCenterEnabled || scaleEnabled) injectStyle(wrapperDiv, img);
  if (alignCenterEnabled) await alignCenter();
  if (await GMAPI.getValue('change_background')) await changeBackground();
  if (scaleEnabled) await scaleImage(img);
}

export { openImage };
