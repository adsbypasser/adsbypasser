/**
 * @domain fastpic.org
 */
_.register({
  rule: {
    host: /^fastpic\.org$/,
    path: [/^\/view\//, /^\/fullview\//],
  },
  async ready() {
    const extraRedirect = () => {
      const bodyText = (document.body?.textContent || "").toLowerCase();
      const hasContinueButton = [document.querySelectorAll("a, button")].some((el) => {
        const text = (el.textContent || "").trim().toLowerCase();
        return text.includes("continue to image") || text.includes("click to continue to image") || text.includes("перейти к изображению");
      });
      const hasFallbackText = bodyText.includes("button not working?") && bodyText.includes("open the image page with this link");
      if (!hasContinueButton || !hasFallbackText) {
        return null;
      }
      const fallbackText = [document.querySelectorAll("body *")].find((el) => {
        const text = (el.textContent || "").trim().toLowerCase();
        return text.includes("button not working?") && text.includes("open the image page with this link") && [el.querySelectorAll("a[href]")].length > 0;
      });
      if (fallbackText) {
        const link = fallbackText.querySelector("a[href]");
        if (link?.href) {
          return link.href;
        }
      }
    };
    const extraRedirectUrl = extraRedirect();
    if (extraRedirectUrl) {
      await $.openLink(extraRedirectUrl);
      return;
    }
    const directUrl = $.searchFromScripts(/pp0\["sr"\+"c"\]="([^"]+)"/);
    if (directUrl?.[1]) {
      await $.openLink(directUrl[1]);
      return;
    }
    const a = $.$("#imglink, #imga");
    if (a?.href) {
      await $.openLink(a.href);
    }
  },
});
