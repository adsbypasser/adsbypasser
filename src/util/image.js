import {
  openLink,
} from 'util/link';
import {
  remove,
} from 'util/dom';
import {
  warn,
  info,
} from 'util/logger';
import {
  removeAllTimer,
} from 'util/misc';
import {
  GMAPI,
} from 'util/platform';


async function openImage (imgSrc, options) {
  options = options || {};
  const replace = !!options.replace;
  // will be false by default
  const referer = !!options.referer;

  if (replace) {
    await replaceBody(imgSrc);
    return;
  }

  const redirectImage = await GMAPI.getValue('redirect_image');
  if (redirectImage) {
    await openLink(imgSrc, {
      referer: referer,
    });
  }
}


function enableScrolling () {
  const o = document.compatMode === 'CSS1Compat' ? document.documentElement : document.body;
  o.style.overflow = '';
}


function toggleShrinking () {
  this.classList.toggle('adsbypasser-shrinked');
}


function checkScaling () {
  const nw = this.naturalWidth;
  const nh = this.naturalHeight;
  const cw = document.documentElement.clientWidth;
  const ch = document.documentElement.clientHeight;
  if ((nw > cw || nh > ch) && !this.classList.contains('adsbypasser-resizable')) {
    this.classList.add('adsbypasser-resizable');
    this.classList.add('adsbypasser-shrinked');

    this.addEventListener('click', toggleShrinking);
  } else {
    this.removeEventListener('click', toggleShrinking);

    this.classList.remove('adsbypasser-shrinked');
    this.classList.remove('adsbypasser-resizable');
  }
}


async function scaleImage (i) {
  const siURL = await GMAPI.getResourceUrl('scaleImage');
  appendStyleURL(siURL);

  if (i.naturalWidth && i.naturalHeight) {
    checkScaling.call(i);
  } else {
    i.addEventListener('load', checkScaling);
  }

  let h = 0;
  window.addEventListener('resize', () => {
    window.clearTimeout(h);
    h = window.setTimeout(checkScaling.bind(i), 100);
  });
}


async function changeBackground () {
  const bgImage = await GMAPI.getResourceUrl('bgImage');
  document.body.style.backgroundColor = '#222222';
  document.body.style.backgroundImage = `url('${bgImage}')`;
}


async function alignCenter () {
  const acURL = await GMAPI.getResourceUrl('alignCenter');
  appendStyleURL(acURL);
}


function injectStyle (d, i) {
  remove('style, link[rel=stylesheet]');

  d.id = 'adsbypasser-wrapper';
  i.id = 'adsbypasser-image';
}


function appendStyleURL (url) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = url;
  document.head.appendChild(link);
}


async function replaceBody (imgSrc) {
  const redirectImage = await GMAPI.getValue('redirect_image');
  if (!redirectImage) {
    return;
  }

  if (!imgSrc) {
    warn('false url');
    return;
  }
  info(`replacing body with \`${imgSrc}\` ...`);

  // NOTE maybe nuke the whole page
  removeAllTimer();
  enableScrolling();

  document.body = document.createElement('body');

  const d = document.createElement('div');
  document.body.appendChild(d);

  const i = document.createElement('img');
  i.src = imgSrc;
  d.appendChild(i);

  const ac = await GMAPI.getValue('align_center');
  const si = await GMAPI.getValue('scale_image');
  if (ac || si) {
    injectStyle(d, i);
  }
  if (ac) {
    await alignCenter();
  }
  const cb = await GMAPI.getValue('change_background');
  if (cb) {
    await changeBackground();
  }
  if (si) {
    await scaleImage(i);
  }
}


export {
  openImage,
};
