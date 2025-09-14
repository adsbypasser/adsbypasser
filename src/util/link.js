import { isString, wait, forEach } from 'util/core.js';
import { info, warn } from 'util/logger.js';

// -----------------------------
// Helper to append element to DOM and yield execution
// -----------------------------
function prepare(element) {
  if (!document.body) {
    document.body = document.createElement('body');
  }
  document.body.appendChild(element);
  return wait(0);
}

// -----------------------------
// Simulate a GET link click
// -----------------------------
async function get(url) {
  const a = document.createElement('a');
  a.href = url;

  let clicked = false;
  a.addEventListener(
    'click',
    (event) => {
      event.stopPropagation();
      clicked = true;
    },
    true
  );

  await prepare(a);
  a.click();

  const tick = setInterval(() => {
    if (clicked) {
      info('already clicked');
      clearInterval(tick);
    } else {
      info('try again');
      a.click();
    }
  }, 500);
}

// -----------------------------
// Simulate a POST form submission
// -----------------------------
async function post(path, params = {}) {
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

// -----------------------------
// Open link (GET or POST) with optional referer
// -----------------------------
async function openLink(to, options = {}) {
  if (!isString(to) || !to) {
    warn('false URL');
    return;
  }

  const withReferer = options.referer !== undefined ? options.referer : true;
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

export { openLink };
