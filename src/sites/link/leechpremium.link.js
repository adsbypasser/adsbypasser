_.register({
  rule: 
    {
      host: /^leechpremium\.link$/,
      path: /^\/cheat\//,
      query: /^\?link=([a-zA-Z0-9/=]+)$/,
    },
  async start (m) {
    const rawLink = atob(decodeURIComponent(m.query[1]));
    await $.openLink(rawLink);
  },
});
