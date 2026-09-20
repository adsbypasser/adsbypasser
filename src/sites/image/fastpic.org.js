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
    const extraRedirect = () => {
      const bodyText = (document.body?.textContent || "").toLowerCase();
      const hasContinueButton = [...document.querySelectorAll("a, button")].some((el) => {
        const text = (el.textContent || "").trim().toLowerCase();
        return text.includes("continue to image") || text.includes("click to continue to image") || text.includes("перейти к изображению");
      });
      const hasFallbackText = bodyText.includes("button not working?") && bodyText.includes("open the image page with this link");
      if (!hasContinueButton || !hasFallbackText) {
        return null;
      }
      const fallbackText = [...document.querySelectorAll("body *")].find((el) => {
        const text = (el.textContent || "").trim().toLowerCase();
        return text.includes("button not working?") && text.includes("open the image page with this link") && [...el.querySelectorAll("a[href]")].length > 0;
      });
      if (fallbackText) {
        const link = fallbackText.querySelector("a[href]");
        if (link?.href) {
          return link.href;
        }
      }
      for (const a of document.querySelectorAll("a[href]")) {
        const text = (a.textContent || "").trim().toLowerCase();
        if (text.includes("open the image page with this link") && a.href) {
          return a.href;
        }
      }
      return null;
    };
    const extraRedirectUrl = extraRedirect();
    if (extraRedirectUrl) {
      await $.openLink(extraRedirectUrl);
      return;
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
    const continueUrl = await new Promise((resolve) => {
      let finished = false;
      const finish = (url) => {
        if (finished) return;
        finished = true;
        observer.disconnect();
        clearInterval(timer);
        clearTimeout(timeout);
        resolve(url);
      };
      const check = () => {
        const url = bypassContinue();
        if (url) finish(url);
      };
      const observer = new MutationObserver(check);
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
      });
      const timer = setInterval(check, 50);
      const timeout = setTimeout(() => finish(null), 3000);
      check();
    });
    if (continueUrl) {
      await $.openLink(continueUrl);
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
