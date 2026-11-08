/**
 * @domain supercheats.com
 */
_.register({
  rule: {
    host: /^(www\.)?supercheats\.com$/,
    path: /^\/interstitial\.html$/,
    query: /[?&]oldurl=/,
  },
  async start() {
    await $.openLink($.url.searchParams.get("oldurl"));
  },
});
