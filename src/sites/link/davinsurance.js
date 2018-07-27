_.register({
  rule: {
    host: /^davinsurance\.com$/,
    query: /r=(.+)/,
  },
  async start (m) {
    const e = m.query[1];

    function base64_decode(w) {
      const v = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
            p = [];
      let m, b, z, k, x, q, A, y,
        s = 0,
        j = 0,
        u = '';        
      if (!w) {
        return w;
      }
      w += '';
      do {
        k = v.indexOf(w.charAt(s++)), x = v.indexOf(w.charAt(s++)), q = v.indexOf(w.charAt(s++)), A = v.indexOf(w.charAt(s++)), y = k << 18 | x << 12 | q << 6 | A, m = y >> 16 & 255, b = y >> 8 & 255, z = 255 & y, 64 == q ? p[j++] = String.fromCharCode(m) : 64 == A ? p[j++] = String.fromCharCode(m, b) : p[j++] = String.fromCharCode(m, b, z);
      } while (s < w.length);
      return u = p.join(''), decodeURIComponent(escape(u.replace(/\0+$/, '')));
    }
    await $.openLink(base64_decode(e));
  },
});
