/**
 * @domain anime-jav.com
 * @domain chinese-pics.com
 * @domain cn-av.com
 * @domain cnpics.org
 * @domain cosplay18.pics
 * @domain hentai-sub.com
 * @domain hentaixnx.com
 * @domain idol69.net
 * @domain pig69.com
 * @domain porn-pig.com
 * @domain porn4f.com
 * @domain porn4f.org
 * @domain sweetie-fox.com
 */
_.register({
  rule: [
    "https://anime-jav.com/upload/en/*",
    "https://chinese-pics.com/upload/en/*",
    "https://cn-av.com/upload/en/*",
    "https://cnpics.org/upload/en/*",
    "https://cosplay18.pics/upload/en/*",
    "https://hentai-sub.com/upload/en/*",
    "https://hentaixnx.com/upload/en/*",
    "https://idol69.net/upload/en/*",
    "https://pig69.com/upload/en/*",
    "https://porn-pig.com/upload/en/*",
    "https://porn4f.com/upload/en/*",
    "https://porn4f.org/upload/en/*",
    "https://sweetie-fox.com/upload/en/*",
  ],
  async ready() {
    const m = $('meta[property="og:image"]');
    await $.openImage(m.content);
  },
});
