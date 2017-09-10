_.register({
  rule: {
    host: /^(www\.)?jheberg\.net$/,
    path: /^\/captcha\//,
  },
  async ready () {
    $('.dl-button').click();
  },
});

_.register({
  rule: {
    host: /^(www\.)?jheberg\.net$/,
    path: /^\/redirect\//,
  },
  async ready () {
    'use strict';

    // If the target is a direct link, then our script opens it, and afterwards
    // the script of the website opens it too if the timer is not stopped
    $.removeAllTimer();

    const matches = $.searchFromScripts(/'slug':\s*'([^']+)',\s*'hoster':\s*'([^']+)'/);

    const slug = matches[1];
    const hoster = matches[2];

    const response = await $.post('/get/link/', {
      slug,
      hoster,
    });
    const respJSON = JSON.parse(response);
    await $.openLink(respJSON.url);
  },
});
