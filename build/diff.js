import { execSync } from "child_process";
import { extractDomainsFromJSDoc } from "./jsdoc.js";

/**
 * Extract domains from JSDoc at a specific git tag using git show
 * @param {string} tag - Git tag
 * @returns {Promise<Set<string>>} Set of domain names
 */
async function extractDomainsFromJSDocAtTag(tag) {
  const domains = new Set();

  try {
    // Get all .js files in src/sites at the specific tag
    const files = execSync(`git ls-tree -r --name-only ${tag} src/sites/`, {
      encoding: "utf8",
    })
      .split("\n")
      .filter((line) => line.trim() && line.endsWith(".js"));

    for (const file of files) {
      try {
        // Read file content at the specific tag
        const content = execSync(`git show ${tag}:${file}`, {
          encoding: "utf8",
        });
        const fileDomains = extractDomainsFromContent(content);
        fileDomains.forEach((domain) => domains.add(domain));
      } catch (error) {
        // Skip files that can't be read (deleted, renamed, etc.)
        console.warn(
          `Warning: Could not read ${file} at ${tag}: ${error.message}`,
        );
      }
    }
  } catch (error) {
    throw new Error(`Failed to read files at tag ${tag}: ${error.message}`);
  }

  return domains;
}

/**
 * Extract domains from file content using JSDoc @domain tags
 * @param {string} content - File content
 * @returns {string[]} Array of domain names
 */
function extractDomainsFromContent(content) {
  const domains = [];
  const domainRegex = /@domain\s+([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
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
 * Validate domain name format
 * @param {string} domain - Domain to validate
 * @returns {boolean} True if valid domain
 */
function isValidDomain(domain) {
  // Basic domain validation - contains dots and valid characters
  return /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(domain);
}

/**
 * Extract domains at a specific git tag or HEAD
 * @param {string} tag - Git tag or 'HEAD'
 * @returns {Promise<Set<string>>} Set of domain names
 */
async function extractDomainsAtTag(tag) {
  if (tag === "HEAD") {
    // Use current working directory
    const domains = await extractDomainsFromJSDoc();
    return new Set(domains);
  } else {
    // Use git show to read files without checking out
    return await extractDomainsFromJSDocAtTag(tag);
  }
}

/**
 * Compare two domain sets to find added and retired domains
 * @param {Set<string>} oldDomains - Domains from older tag
 * @param {Set<string>} newDomains - Domains from newer tag
 * @returns {Object} Object with added and retired Sets
 */
function compareDomains(oldDomains, newDomains) {
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
 * Extract fixed domains from git commit messages between two tags
 * @param {string} fromTag - Starting tag
 * @param {string} toTag - Ending tag
 * @param {Set<string>} existingDomains - Domains that exist in both tags
 * @returns {Set<string>} Set of fixed domain names
 */
function extractFixedDomains(fromTag, toTag, existingDomains) {
  const fixed = new Set();

  try {
    // Get commits between tags
    const commitRange =
      toTag === "HEAD" ? `${fromTag}..HEAD` : `${fromTag}..${toTag}`;
    const commits = execSync(`git log ${commitRange} --oneline`, {
      encoding: "utf8",
    })
      .split("\n")
      .filter((line) => line.trim());

    for (const commit of commits) {
      // Look for fix: patterns (fixes)
      const fixMatch = commit.match(/fix:\s*([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
      if (fixMatch) {
        const domain = fixMatch[1].trim();
        if (isValidDomain(domain) && existingDomains.has(domain)) {
          fixed.add(domain);
        }
      }
    }
  } catch (error) {
    console.warn(`Warning: Could not analyze commits: ${error.message}`);
  }

  return fixed;
}

/**
 * Generate changelog data between two git tags
 * @param {string} fromTag - Starting tag
 * @param {string} toTag - Ending tag
 * @returns {Promise<Object>} Object with added, retired, fixed arrays and metadata
 */
export async function extractDomainDiff(fromTag, toTag) {
  const oldDomains = await extractDomainsAtTag(fromTag);
  const newDomains = await extractDomainsAtTag(toTag);

  const { added, retired } = compareDomains(oldDomains, newDomains);

  // Find domains that exist in both tags for fixed domain detection
  const existingDomains = new Set();
  for (const domain of newDomains) {
    if (oldDomains.has(domain)) {
      existingDomains.add(domain);
    }
  }

  const fixed = extractFixedDomains(fromTag, toTag, existingDomains);

  return {
    added: Array.from(added).sort(),
    retired: Array.from(retired).sort(),
    fixed: Array.from(fixed).sort(),
  };
}
