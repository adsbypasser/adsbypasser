// Note: Captcha is verified client-side
_.register({
  rule: {
    host: /^(www\.)?boxcash\.net$/,
    path: /^\/[\w~]+$/,
  },
  async ready () {
    // JSON.parse() is not used because their JSON is malformed
    const m = $.searchFromScripts(/'\/ajax_link\.php',\s*\{key:\s*'(\w+)',\s*url:\s*'(\d+)',\s*t:\s*'(\d+)',\s*r:\s*'(\w*)'\}/);
    if (!m) {
      return;
    }

    const response = await $.post('/ajax_link.php', {
      key: m[1],
      url: m[2],
      t: m[3],
      r: m[4],
    });
    const l = response.match(/window(?:.top.window)\.location="([^"]+)"/);
    await $.openLink(l[1]);
  },
});

_.register({
  rule: {
    host: /^(www\.)?boxcash\.net$/,
    path: /^\/redirect\.html$/,
    query: /url=(.+)$/,
  },
  async start (m) {
    const l = decodeURIComponent(m.query[1]);
    await $.openLink(l);
  },
});
