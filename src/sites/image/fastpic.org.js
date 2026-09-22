/**
 * @domain fastpic.org
 */
_.register({
  rule: {
    host: /^fastpic\.org$/,
    path: [/^\/view\//, /^\/fullview\//],
  },
  async ready() {
    const findUrl = () => {
        const links = [document.querySelectorAll("a[href]")];
        const body = document.body?.textContent?.toLowerCase() || "";
        const fallback = links.find(a =>
            /open the image page with this link/i.test(a.textContent)
        );

        if (
            /button not working?/i.test(body) &&
            /open the image page with this link/i.test(body)
        ) {
            return fallback?.href;
        }

        return links.find(a =>
            /fullview/i.test(a.href) &&
            /continue to image|click to continue to image|перейти к изображению/i.test(a.textContent))?.href;
    };

    let url = findUrl();

    if (!url) {
        const scripts = document.scripts;

        for (const script of scripts) {
            const match = script.textContent.match(/pp0["sr"+"c"]="([^"]+)"/);

            if (match) {
                url = match[1];
                break;
            }
        }
    }
    if (!url) {
        url = document.querySelector("#imglink, #imga")?.href;
    }

    if (url) {
        window.location.href = url;
    }
 },
});
