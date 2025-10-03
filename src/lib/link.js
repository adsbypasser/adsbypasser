import { isString, wait, forEach } from "./core.js";
import { info, warn } from "./logger.js";

function prepare(element) {
  // HACK: create a body if called before DOMContentLoaded
  if (!document.body) {
    document.body = document.createElement("body");
  }
  document.body.appendChild(element);
  // yield execution for the event loop
  return wait(0);
}

async function get(url) {
  const a = document.createElement("a");
  a.href = url;

  let clicked = false;
  a.addEventListener(
    "click",
    (event) => {
      event.stopPropagation();
      clicked = true;
    },
    true,
  );

  await prepare(a);
  a.click();

  const tick = setInterval(() => {
    if (clicked) {
      info("already clicked");
      clearInterval(tick);
      return;
    }
    info("try again");
    a.click();
  }, 500);
}

async function post(path, params = {}) {
  const form = document.createElement("form");
  form.method = "post";
  form.action = path;

  forEach(params, (value, key) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = value;
    form.appendChild(input);
  });

  await prepare(form);
  form.submit();
}

async function openLink(to, options = {}) {
  if (!isString(to) || !to) {
    warn("false URL");
    return;
  }

  const withReferer =
    typeof options.referer === "undefined" ? true : options.referer;
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
