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

async function scaleImage () {
  const head = document.getElementsByTagName('head')[0];
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.innerHTML = `
origImgSize = {};
function getMouse (evt) {
  return getOffsetRect({left: evt.clientX, top: evt.clientY});
}
function getInnerWindow () {
  return {width: window.innerWidth, height: window.innerHeight};
}
function getDetailedBox (el) {
  return {width: el.width, height: el.height, aspectRatio: el.width / el.height};
}
function getOffsetRect (box) {
  var body = document.body;
  var docEl = document.documentElement;
  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;
  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;
  return {left: Math.round(left), top: Math.round(top)};
}
function toggleZoom (evt, el) {
  var innerWin = getInnerWindow();
  var detailedBox = {width: el.width, height: el.height, aspectRatio: origImgSize.aspectRatio};
  if (!origImgSize.zoomedIn) {
    var mouse = getMouse(evt);
    var imgZoomedOutRect = getOffsetRect(el.getBoundingClientRect());
    detailedBox.left = imgZoomedOutRect.left;
    detailedBox.top = imgZoomedOutRect.top;
    el.width = origImgSize.width;
    el.height = origImgSize.height;
    var imgZoomedInRect = getOffsetRect(el.getBoundingClientRect());
    window.scrollTo(Math.round((mouse.left - detailedBox.left) / detailedBox.width * origImgSize.width - innerWin.width / 2 + imgZoomedInRect.left), Math.round((mouse.top - detailedBox.top) / detailedBox.height * origImgSize.height - innerWin.height / 2 + imgZoomedInRect.top));
    origImgSize.zoomedIn = true;
    el.style.cursor = 'zoom-out';
  } else if (origImgSize.width < innerWin.width && origImgSize.height < innerWin.height) {
    el.style.cursor = 'default';
  } else {
    resizeToFitIn(el, innerWin);
    origImgSize.zoomedIn = false;
    el.style.cursor = 'zoom-in';
  }
  scaled = Math.round(el.width / origImgSize.width * 100);
  document.title = '(Image, ' + origImgSize.width + 'x' + origImgSize.height + ')' + (scaled === 100 ? '' : ' - Scaled ' + scaled + '%') + ' - AdsBypasser';
}
function resizeToFitIn (srcEl, dstEl) {
  var srcDetailedBox = getDetailedBox(srcEl);
  var dstDetailedBox = getDetailedBox(dstEl);
  if (srcDetailedBox.aspectRatio < dstDetailedBox.aspectRatio) {
    srcEl.width = Math.round(dstDetailedBox.height * srcDetailedBox.aspectRatio);
    srcEl.height = dstDetailedBox.height;
  } else {
    srcEl.width = dstDetailedBox.width;
    srcEl.height = Math.round(dstDetailedBox.width / srcDetailedBox.aspectRatio);
  }
}
window.addEventListener('resize', () => {
  if (!origImgSize.zoomedIn) {
    origImgSize.zoomedIn = true;
    toggleZoom(null, document.getElementById('adsbypasser-image'));
  }
});
var el = document.getElementById('adsbypasser-image');
el.setAttribute('onclick', 'toggleZoom(event, this)');
el.style.cursor = 'zoom-out';
var newImg = new Image();
newImg.onload = function () {
  origImgSize = {width: newImg.width, height: newImg.height, zoomedIn: true};
  toggleZoom(null, document.getElementById('adsbypasser-image'));
};
newImg.src = document.getElementById('adsbypasser-image').src;
  `;
  head.appendChild(script);
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
    await scaleImage();
  }
}


export {
  openImage,
};
