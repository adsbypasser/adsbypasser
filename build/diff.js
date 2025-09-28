import { deduplicateRootDomains } from "./lib/domain.js";
import { extractDomainsAtTag, extractFixedDomains } from "./git.js";

/**
 * Compare two domain sets to find added and retired domains
 * @param {Set<string>} oldDomains - Domains from older tag
 * @param {Set<string>} newDomains - Domains from newer tag
 * @returns {Object} Object with added and retired Sets
 */
export function compareDomains(oldDomains, newDomains) {
  const added = new Set();
  const retired = new Set();

  // Find added domains (in new but not in old)
  for (const domain of newDomains) {
    if (!oldDomains.has(domain)) {
      added.add(domain);
    }
  }

  // Find retired domains (in old but not in new)
  for (const domain of oldDomains) {
    if (!newDomains.has(domain)) {
      retired.add(domain);
    }
  }

  return { added, retired };
}

/**
 * Generate changelog data between two git tags
 * @param {string} fromTag - Starting tag
 * @param {string} toTag - Ending tag
 * @returns {Promise<Object>} Object with added, retired, fixed arrays and metadata
 */
export async function extractDomainDiff(fromTag, toTag) {
  // Extract domains at both tags
  const oldDomains = await extractDomainsAtTag(fromTag);
  const newDomains = await extractDomainsAtTag(toTag);

  // Compare domains to find added and retired
  const { added, retired } = compareDomains(oldDomains, newDomains);

  // Find domains that exist in both tags for fixed domain detection
  const existingDomains = new Set();
  for (const domain of newDomains) {
    if (oldDomains.has(domain)) {
      existingDomains.add(domain);
    }
  }

  // Extract fixed domains from commit messages
  const fixed = extractFixedDomains(fromTag, toTag, existingDomains);

  // Return sorted results
  return {
    added: deduplicateRootDomains(Array.from(added)).sort(),
    retired: deduplicateRootDomains(Array.from(retired)).sort(),
    fixed: deduplicateRootDomains(Array.from(fixed)).sort(),
  };
}
