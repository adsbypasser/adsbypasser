import fs from "fs/promises";
import { extractDomainsFromJSDoc } from "../jsdoc.js";
import { deduplicateRootDomains } from "./domain.js";
import { allBuildOptions, getFeatureName } from "./build.js";
import { output } from "./paths.js";

const SITES_OUTPUT = output.to("ghpages/_data/sites.json");
const URLS_OUTPUT = output.to("ghpages/_data/urls.json");

/**
 * Generate sites.json data file for Jekyll
 * Extracts domains from JSDoc comments and writes to Jekyll data directory
 * @returns {Promise<void>}
 */
export async function generateSitesData() {
  // Extract domains from JSDoc
  const domains = await extractDomainsFromJSDoc();

  // Deduplicate root domains
  const uniqueDomains = deduplicateRootDomains(domains);

  // Ensure directory exists
  await fs.mkdir(output.to("ghpages/_data"), { recursive: true });

  // Write as JSON array
  await fs.writeFile(SITES_OUTPUT, JSON.stringify(uniqueDomains, null, 2));
}

/**
 * Generate urls.json data file for Jekyll
 * Creates URLs for all userscript variants and writes to Jekyll data directory
 * @returns {Promise<void>}
 */
export async function generateUrlsData() {
  const urls = {};

  // Generate URLs for all feature combinations (includes "full" and "lite")
  for (const [supportImage] of allBuildOptions()) {
    const featureName = getFeatureName(supportImage);
    urls[featureName] = `adsbypasser.${featureName}.user.js`;
  }

  // Ensure directory exists
  await fs.mkdir(output.to("ghpages/_data"), { recursive: true });

  // Write as JSON object
  await fs.writeFile(URLS_OUTPUT, JSON.stringify(urls, null, 2));
}
