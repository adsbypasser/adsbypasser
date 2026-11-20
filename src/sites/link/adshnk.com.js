/**
 * @domain adshnk.com
 * @domain ashnk.com
 * @domain dshnk.com
 * @domain shrink-service.it
 */
_.register({
  rule: {
    host: [
      /^(?:\w+\.)?adshnk\.com$/,
      /^(?:\w+\.)?ashnk\.com$/,
      /^(?:\w+\.)?dshnk\.com$/,
      /^(?:\w+\.)?shrink-service\.it$/,
    ],
    path: /^\/(?:(?:btn|s)\/)?([A-Za-z0-9]{2,})\/?$/,
  },
  async start(m) {
    const forcedDomain = "adshnk.com";
    const cookieBypassV1 = $.getCookie("cookie_bypass_v1") || "false";
    const uri = `https://${forcedDomain}/${m.path[1]}`;

    const response = await $.post(
      "https://www.shrink-service.it/v3/api/prototype/init",
      {
        req: "init",
        uri,
        cookie_bypass_v1: cookieBypassV1,
      },
      {
        Origin: _.none,
        Referer: _.none,
        "X-Requested-With": _.none,
      },
    );

    const entries = JSON.parse(response);
    const response0 = entries["0"];
    if (!response0 || !response0.destination) {
      _.warn("destination link not found");
      return;
    }

    await $.openLink(response0.destination);
  },
});
