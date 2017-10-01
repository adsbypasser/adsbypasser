import {
  nop,
} from 'util/core';
import {
  usw,
} from 'util/platform';
import {
  warn,
} from 'util/logger';


function removeAllTimer () {
  let handle = window.setInterval(nop, 10);
  while (handle > 0) {
    window.clearInterval(handle--);
  }
  handle = window.setTimeout(nop, 10);
  while (handle > 0) {
    window.clearTimeout(handle--);
  }
}


function nuke (url) {
  try {
    usw.document.write('nuked by AdsBypasser, leading to ...<br/>');
  } catch (e) {
    warn('nuke failed', e);
  }
  const a = document.createElement('a');
  a.href = url;
  a.textContent = url;
  document.body.appendChild(a);
}


function generateRandomIP () {
  return [0, 0, 0, 0].map(() => {
    return Math.floor(Math.random() * 256);
  }).join('.');
}


export {
  removeAllTimer,
  nuke,
  generateRandomIP,
};
