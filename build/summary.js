import fs from "fs/promises";

import _ from "lodash";
import { marked } from "marked";
import { extractDomainsFromJSDoc } from "./jsdoc.js";
import { source } from "./lib/paths.js";
import { deduplicateRootDomains } from "./lib/domain.js";

const TEMPLATE_PATH = source.to("templates/ghpages/summary.template.md");

/**
 * Generate summary for GitHub Pages
 * @returns {Promise<string>} HTML summary content
 */
export async function getSummaryForGitHubPages() {
  // Extract domains from JSDoc
  const domains = await extractDomainsFromJSDoc();

  // Deduplicate domains by root domain
  const uniqueDomains = deduplicateRootDomains(domains);

  // Format domains array as markdown list
  const siteList = uniqueDomains.map((domain) => `* ${domain}`).join("\n");

  // Read template file
  let data = await fs.readFile(TEMPLATE_PATH, {
    encoding: "utf-8",
  });

  // Process template with site list
  data = _.template(data);
  data = data({
    site_list: siteList,
  });

  // Convert markdown to HTML
  data = marked(data);
  return data;
}
