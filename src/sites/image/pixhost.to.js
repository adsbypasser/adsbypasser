/**
 * @domain 3xplanet.com
 * @domain 3xplanet.net
 * @domain jav-load.com
 * @domain javtenshi.com
 * @domain pixhost.to
 * @domain uncenav.com
 */
_.register({
  rule: [
    {
      host: /^(www\.)?pixhost\.to$/,
      path: /^\/show\//,
    },
    {
      host: [
        /^3xplanet\.(com|net)$/,
        /^jav-load\.com$/,
        /^javtenshi\.com$/,
        /^uncenav\.com$/,
      ],
      path: /^\/viewimage\//,
    },
  ],
  async ready() {
    $.remove("iframe, #ad");

    let o = $.$("#all");
    if (o) {
      o.style.display = "";
    }

    o = $("#show_image, #image");
    await $.openImage(o.src);
  },
});
