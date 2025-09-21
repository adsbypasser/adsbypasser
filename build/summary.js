import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import _ from "lodash";
import { marked } from "marked";
import { extractDomainsFromJSDoc } from "./jsdoc.js";
import { deduplicateRootDomains } from "./domain.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATE_PATH = path.resolve(
  __dirname,
  "../templates/ghpages/summary.template.md",
);

async function getSummaryForGitHubPages() {
  const domains = await extractDomainsFromJSDoc();

  // Dedupe domains by root domain
  const uniqueDomains = deduplicateRootDomains(domains);

  // Format domains array as markdown list
  const siteList = uniqueDomains.map((domain) => `* ${domain}`).join("\n");

  let data = await fs.readFile(TEMPLATE_PATH, {
    encoding: "utf-8",
  });
  data = _.template(data);
  data = data({
    site_list: siteList,
  });

  data = marked(data);
  return data;
}

export { getSummaryForGitHubPages };
