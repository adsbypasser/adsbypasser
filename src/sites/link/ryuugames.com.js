/**
 * @domain ryuugames.com
 */
_.register({
  rule: {
    host: /^www\.ryuugames\.com$/,
    path: /^\/processing(?:\/download)?\/?$/,
  },
  async ready() {
    const isHttpUrl = (url) =>
      typeof url === "string" && /^https?:\/\//i.test(url);

    // Stage 1 (/processing/): open the destination URL from the Base64-encoded host payload directly
    const form = $.$("#continueForm");
    if (form) {
      const hostInput = $.$('input[name="host"]', form);
      if (hostInput && hostInput.value) {
        try {
          const normalized = hostInput.value
            .trim()
            .replace(/-/g, "+")
            .replace(/_/g, "/");
          const padded = normalized.padEnd(
            Math.ceil(normalized.length / 4) * 4,
            "=",
          );
          const payload = JSON.parse(atob(padded));
          if (payload && isHttpUrl(payload.url)) {
            await $.openLink(payload.url);
            return;
          }
        } catch (e) {
          _.warn("failed to decode host payload from processing page", e);
        }
      }

      // Fallback: submit the continue form to proceed to /processing/download/
      form.submit();
      return;
    }

    // Stage 2 (/processing/download/): fetch the download URL directly from data-api-url
    const container = $.$(".ryuu-sl-container[data-api-url]");
    const apiUrl = container?.getAttribute("data-api-url");
    if (apiUrl) {
      try {
        const response = await $.get(apiUrl);
        const data = JSON.parse(response);
        if (data && data.success && isHttpUrl(data.url)) {
          await $.openLink(data.url);
          return;
        }
      } catch (e) {
        _.warn("failed to fetch safelink API", e);
      }
    }

    // Fallback: enable and click the real download button without waiting for the countdown
    const button = $.$("#ryuu-sl-download-btn");
    if (button) {
      button.disabled = false;
      button.classList.add("ryuu-sl-ready");
      button.classList.remove("ryuu-sl-disabled");
      button.style.display = "";
      button.click();
    }
  },
});

_.register({
  rule: {
    host: /^www\.ryuugames\.com$/,
    query: /^\?eroge=/,
  },
  async ready() {
    const ma = $("#wpsafe-link a");
    await $.openLink(ma.href);
  },
});
