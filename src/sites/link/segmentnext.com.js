_.register({
  rule: {
    host: [
      /^segmentnext\.com$/,
      /^(www\.)?videogamesblogger\.com$/,
    ],
    path: /^\/interstitial\.html$/,
    query: /return_url=([^&]+)/,
  },
  async start (m) {
    await $.openLink(decodeURIComponent(m.query[1]));
  },
});
