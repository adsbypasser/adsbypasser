import {
  isString,
  wait,
  forEach,
} from 'util/core';
import {
  info,
  warn,
} from 'util/logger';


function prepare (e) {
  // HACK create a body if called before DOMContentLoaded
  if (!document.body) {
    document.body = document.createElement('body');
  }
  document.body.appendChild(e);
  // yield execution for ... event loop?
  return wait(0);
}


async function get (url) {
  // Create a link on the page
  const a = document.createElement('a');
  a.href = url;

  // Prevent event interfering
  let clicked = false;
  a.addEventListener('click', (event) => {
    event.stopPropagation();
    clicked = true;
  });

  // Simulate clicks on this link (so that the referer is sent)
  await prepare(a);
  a.click();
  const tick = setInterval(() => {
    if (clicked) {
      info('already clicked');
      clearInterval(tick);
      return;
    }
    info('try again');
    a.click();
  }, 50);
}


async function post (path, params) {
  params = params || {};

  // The rest of this code assumes you are not using a library.
  // It can be made less wordy if you use one.
  const form = document.createElement('form');
  form.method = 'post';
  form.action = path;

  forEach(params, (value, key) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = value;
    form.appendChild(input);
  });

  await prepare(form);
  form.submit();
}


// TODO erase history if possible
async function openLink (to, options) {
  if (!isString(to) && !to) {
    warn('false URL');
    return;
  }
  options = options || {};
  const withReferer = typeof options.referer === 'undefined' ? true : options.referer;
  const postData = options.post;

  const from = window.location.toString();
  info(`${from} -> ${to}`);

  if (postData) {
    await post(to, postData);
    return;
  }

  if (withReferer) {
    await get(to);
    return;
  }

  window.top.location.replace(to);
}


export {
  openLink,
};
