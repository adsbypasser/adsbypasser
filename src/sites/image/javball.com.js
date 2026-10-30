/**
 * @domain 2minx.com
 * @domain ai18.pics
 * @domain anime-jav.vip
 * @domain bbcuck.com
 * @domain chinese-pics.vip
 * @domain cn-av.vip
 * @domain cn1min.com
 * @domain cnpics.org
 * @domain cnxxx.org
 * @domain cosplaytele.vip
 * @domain fc2ppv.me
 * @domain fc2ppv.stream
 * @domain girlxxx.vip
 * @domain hentai-manga.org
 * @domain hentai4f.com
 * @domain hentaishine.com
 * @domain homexxx.vip
 * @domain idol69.net
 * @domain jav1min.com
 * @domain javball.com
 * @domain javbee.co
 * @domain javsunday.com
 * @domain javtele.net
 * @domain javtele.org
 * @domain kr-av.com
 * @domain kr1min.com
 * @domain misa.homes
 * @domain old-young.vip
 * @domain pig69.vip
 * @domain porn-pig.com
 * @domain ria-kurumi.vip
 * @domain russian18.vip
 * @domain s-porn.com
 * @domain sht-link.com
 * @domain thaiav.org
 * @domain xxpics.org
 * @domain xxxfans.org
 */
_.register({
  rule: [
    "https://2minx.com/upload/en/*",
    "https://ai18.pics/upload/en/*",
    "https://anime-jav.vip/upload/en/*",
    "https://bbcuck.com/upload/en/*",
    "https://chinese-pics.vip/upload/en/*",
    "https://cn-av.vip/upload/en/*",
    "https://cn1min.com/upload/en/*",
    "https://cnpics.org/upload/en/*",
    "https://cnxxx.org/upload/en/*",
    "https://cosplaytele.vip/upload/en/*",
    "https://fc2ppv.me/upload/en/*",
    "https://fc2ppv.stream/upload/en/*",
    "https://girlxxx.vip/upload/en/*",
    "https://hentai-manga.org/upload/en/*",
    "https://hentai4f.com/upload/en/*",
    "https://hentaishine.com/upload/en/*",
    "https://homexxx.vip/upload/en/*",
    "https://idol69.net/upload/en/*",
    "https://jav1min.com/upload/en/*",
    "https://javball.com/upload/en/*",
    "https://javbee.co/upload/en/*",
    "https://javsunday.com/upload/en/*",
    "https://javtele.net/upload/en/*",
    "https://javtele.org/upload/en/*",
    "https://kr-av.com/upload/en/*",
    "https://kr1min.com/upload/en/*",
    "https://misa.homes/upload/en/*",
    "https://old-young.vip/upload/en/*",
    "https://pig69.vip/upload/en/*",
    "https://porn-pig.com/upload/en/*",
    "https://ria-kurumi.vip/upload/en/*",
    "https://russian18.vip/upload/en/*",
    "https://s-porn.com/upload/en/*",
    "https://sht-link.com/upload/en/*",
    "https://thaiav.org/upload/en/*",
    "https://xxpics.org/upload/en/*",
    "https://xxxfans.org/upload/en/*",
  ],
  async ready() {
    const m = $('meta[property="og:image"]');
    await $.openImage(m.content);
  },
});
