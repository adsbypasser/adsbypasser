/**
 * Domain-related utility functions for validation and extraction
 */
import { parseDomain } from "parse-domain";

/**
 * Validate domain name format using parse-domain package
 * @param {string} domain - Domain to validate
 * @returns {boolean} True if valid domain
 */
export function isValidDomain(domain) {
  // Check if domain is a valid string
  if (!domain || typeof domain !== "string") {
    return false;
  }

  // Additional basic validation before using parse-domain
  if (
    domain.length < 3 || // Too short
    domain.startsWith(".") || // Starts with dot
    domain.endsWith(".") || // Ends with dot
    domain.includes("..") || // Consecutive dots
    domain.includes("_") || // Underscore not allowed
    !domain.includes(".") // Must contain at least one dot
  ) {
    return false;
  }

  try {
    const result = parseDomain(domain);
    return result.type === "LISTED" || result.type === "NOT_LISTED";
  } catch {
    return false;
  }
}

/**
 * Extract domains from file content using JSDoc @domain tags
 * @param {string} content - File content
 * @returns {string[]} Array of domain names
 */
export function extractDomainsFromContent(content) {
  const domains = [];
  const domainRegex = /@domain\s+(.+?)(?:\s|$)/g;
  let match;

  while ((match = domainRegex.exec(content)) !== null) {
    const domain = match[1].trim();
    if (isValidDomain(domain)) {
      domains.push(domain);
    }
  }

  return domains;
}

/**
 * Extract domains from commit message text
 * @param {string} commitMessage - Commit message text
 * @returns {string[]} Array of domain names found in commit message
 */
export function extractDomainsFromCommitMessage(commitMessage) {
  const domains = [];
  const fixMatch = commitMessage.match(/fix:\s*(.+?)(?:\s|$|,)/);

  if (fixMatch) {
    const domain = fixMatch[1].trim();
    if (isValidDomain(domain)) {
      domains.push(domain);
    }
  }

  return domains;
}

/**
 * Extract the root domain from a subdomain using parse-domain package
 * @param {string} domain - Domain to extract root domain from
 * @returns {string|null} Root domain or null if invalid
 */
function extractRootDomain(domain) {
  if (!isValidDomain(domain)) {
    return null;
  }

  try {
    const result = parseDomain(domain);

    if (result.type !== "LISTED" && result.type !== "NOT_LISTED") {
      return null;
    }

    // Build the root domain from the parsed result
    const rootDomain = result.domain + "." + result.topLevelDomains.join(".");
    return rootDomain;
  } catch {
    return null;
  }
}

/**
 * Remove duplicated root domains from an array of domains
 * Keeps only the root domain when multiple subdomains exist for the same root
 * @param {string[]} domains - Array of domain names
 * @returns {string[]} Array of unique root domains
 */
export function deduplicateRootDomains(domains) {
  const rootDomains = new Set();

  // Map each domain to its root domain and add to set
  for (const domain of domains) {
    const rootDomain = extractRootDomain(domain);
    if (rootDomain) {
      rootDomains.add(rootDomain);
    }
  }

  // Convert set to sorted array
  return Array.from(rootDomains).sort();
}
