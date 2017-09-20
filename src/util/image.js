import {
  config,
} from 'util/config';
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
  GM,
} from 'util/platform';


async function openImage (imgSrc, options) {
  options = options || {};
  const replace = !!options.replace;
  // will be false by default
  const referer = !!options.referer;

  if (replace) {
    replaceBody(imgSrc);
    return;
  }

  if (config.redirectImage) {
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


function scaleImage (i) {
  const style = GM.getResourceText('scaleImage');
  GM.addStyle(style);

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


function changeBackground () {
  const bgImage = GM.getResourceURL('bgImage');
  document.body.style.backgroundColor = '#222222';
  document.body.style.backgroundImage = `url('${bgImage}')`;
}


function alignCenter () {
  const style = GM.getResourceText('alignCenter');
  GM.addStyle(style);
}


function injectStyle (d, i) {
  remove('style, link[rel=stylesheet]');

  d.id = 'adsbypasser-wrapper';
  i.id = 'adsbypasser-image';
}


function replaceBody (imgSrc) {
  if (!config.redirectImage) {
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

  if (config.alignCenter || config.scaleImage) {
    injectStyle(d, i);
  }
  if (config.alignCenter) {
    alignCenter();
  }
  if (config.changeBackground) {
    changeBackground();
  }
  if (config.scaleImage) {
    scaleImage(i);
  }
}


export {
  openImage,
};
