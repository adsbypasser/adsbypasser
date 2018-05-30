_.register({
  rule: {
    host: /^www\.linkdecode\.com$/,
    path: /^\/$/,
    query: /^\?(.+)$/,
  },
  async ready (m) {
    $.remove('iframe');

    // Either base64 + salt, or a plain URL
    let lnk = m.query[1];

    // If plain URL
    if (m.query[1].match(/^https?:\/\//)) {
      await $.openLink(lnk);
      return;
    }

    // Interstitial
    let b = $.$('#popup');
    if (b && b.href) {
      await $.openLink(b.href);
      return;
    }

    // Else if base64 + salt, we get the decrypted URL from the website
    b = $('#m > .Visit_Link');
    b = b.onclick.toString().match(/window\.open\('([^']+)'/);
    if (!b) {
      throw new _.AdsBypasser('pattern changed');
    }

    // Plain link
    lnk = b[1].match(/\?(https?:\/\/.*)$/);
    if (lnk) {
      await $.openLink(lnk[1]);
      return;
    }

    // Continue the decryption
    await $.openLink(b[1]);
  },
});
