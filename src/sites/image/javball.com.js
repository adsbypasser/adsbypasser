/**
 * @domain 3minx.com
 * @domain 4fuk.me
 * @domain 555fap.com
 * @domain ai18.pics
 * @domain anime-jav.com
 * @domain blackwidof.org
 * @domain chinese-pics.com
 * @domain chinese-pics.vip
 * @domain cn-av.com
 * @domain cnpics.org
 * @domain cnxx.me
 * @domain cosplay18.pics
 * @domain cosplaytele.vip
 * @domain fc2ppv.me
 * @domain fc2ppv.stream
 * @domain fikfok.net
 * @domain gofile.download
 * @domain hentai-sub.com
 * @domain hentai4f.com
 * @domain hentaicovid.com
 * @domain hentaicovid.org
 * @domain hentaipig.com
 * @domain hentaixnx.com
 * @domain idol69.net
 * @domain javball.com
 * @domain javbee.vip
 * @domain javring.com
 * @domain javsunday.com
 * @domain javtele.net
 * @domain kin8-av.com
 * @domain kin8-jav.com
 * @domain kr-av.com
 * @domain ovabee.com
 * @domain pig69.com
 * @domain porn-pig.com
 * @domain porn4f.com
 * @domain porn4f.org
 * @domain s-porn.com
 * @domain shentai-anime.com
 * @domain sweetie-fox.com
 * @domain xcamcovid.com
 * @domain xxpics.org
 */
_.register({
  rule: [
    "https://3minx.com/upload/en/*",
    "https://4fuk.me/upload/en/*",
    "https://555fap.com/upload/en/*",
    "https://ai18.pics/upload/en/*",
    "https://anime-jav.com/upload/en/*",
    "https://blackwidof.org/upload/en/*",
    "https://chinese-pics.com/upload/en/*",
    "https://chinese-pics.vip/upload/en/*",
    "https://cn-av.com/upload/en/*",
    "https://cnpics.org/upload/en/*",
    "https://cnxx.me/upload/en/*",
    "https://cosplay18.pics/upload/en/*",
    "https://cosplaytele.vip/upload/en/*",
    "https://fc2ppv.me/upload/en/*",
    "https://fc2ppv.stream/upload/en/*",
    "https://fikfok.net/upload/en/*",
    "https://gofile.download/upload/en/*",
    "https://hentai-sub.com/upload/en/*",
    "https://hentai4f.com/upload/en/*",
    "https://hentaicovid.com/uploads/en/*",
    "https://hentaicovid.org/upload/en/*",
    "https://hentaipig.com/upload/en/*",
    "https://hentaixnx.com/upload/en/*",
    "https://idol69.net/upload/en/*",
    "https://javball.com/upload/en/*",
    "https://javbee.vip/upload/en/*",
    "https://javring.com/upload/en/*",
    "https://javsunday.com/upload/en/*",
    "https://javtele.net/upload/en/*",
    "https://kin8-av.com/upload/en/*",
    "https://kin8-jav.com/upload/en/*",
    "https://kr-av.com/upload/en/*",
    "https://ovabee.com/upload/en/*",
    "https://pig69.com/upload/en/*",
    "https://porn-pig.com/upload/en/*",
    "https://porn4f.com/upload/en/*",
    "https://porn4f.org/upload/en/*",
    "https://s-porn.com/upload/en/*",
    "https://shentai-anime.com/upload/en/*",
    "https://sweetie-fox.com/upload/en/*",
    "https://xcamcovid.com/upload/en/*",
    "https://xxpics.org/upload/en/*",
  ],
  async ready() {
    const m = $('meta[property="og:image"]');
    await $.openImage(m.content);
  },
});
