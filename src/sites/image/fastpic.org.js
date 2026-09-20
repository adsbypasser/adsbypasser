/**
 * @domain fastpic.org
 */
_.register({
  rule: {
    host: /^fastpic\.org$/,
    path: [/^\/view\//, /^\/fullview\//],
  },
  async ready() {
    if (document.readyState === "loading") {
      await new Promise((resolve) => {
        document.addEventListener("DOMContentLoaded", resolve, { once: true });
      });
    }
    const bypassContinue = () => {
      const links = document.querySelectorAll("a[href*='/fullview/']");
      for (const a of links) {
        const text = (a.textContent || "").trim().toLowerCase();
        if (text.includes("continue to image") || text.includes("click to continue to image") || text.includes("перейти к изображению")) {
          const style = getComputedStyle(a);
          const visible = style.display !== "none" && style.visibility !== "hidden" && a.getBoundingClientRect().width > 0 && a.getBoundingClientRect().height > 0;
          if (visible && a.href) {
            return a.href;
          }
        }
      }
      return null;
    };
    for (let i = 0; i < 15; i++) {
      const continueUrl = bypassContinue();
      if (continueUrl) {
        await $.openLink(continueUrl);
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
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
