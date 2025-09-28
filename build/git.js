import { execSync } from "child_process";
import {
  extractDomainsFromContent,
  extractDomainsFromCommitMessage,
} from "./lib/domain.js";
import { extractDomainsFromJSDoc } from "./jsdoc.js";

/**
 * Execute git ls-tree to get files at a specific tag
 * @param {string} tag - Git tag
 * @param {string} path - Path to list files from
 * @returns {string[]} Array of file paths
 */
function getFilesAtTag(tag, path) {
  try {
    return execSync(`git ls-tree -r --name-only ${tag} ${path}`, {
      encoding: "utf8",
    })
      .split("\n")
      .filter((line) => line.trim());
  } catch (error) {
    throw new Error(`Failed to get files at tag ${tag}: ${error.message}`);
  }
}

/**
 * Execute git show to get file content at a specific tag
 * @param {string} tag - Git tag
 * @param {string} filePath - File path
 * @returns {string} File content
 */
function getFileContentAtTag(tag, filePath) {
  try {
    return execSync(`git show ${tag}:${filePath}`, {
      encoding: "utf8",
    });
  } catch (error) {
    throw new Error(
      `Failed to get file content at tag ${tag}: ${error.message}`,
    );
  }
}

/**
 * Execute git log to get commits between tags
 * @param {string} fromTag - Starting tag
 * @param {string} toTag - Ending tag
 * @returns {string[]} Array of commit messages
 */
function getCommitsBetweenTags(fromTag, toTag) {
  try {
    const commitRange =
      toTag === "HEAD" ? `${fromTag}..HEAD` : `${fromTag}..${toTag}`;
    return execSync(`git log ${commitRange} --oneline`, {
      encoding: "utf8",
    })
      .split("\n")
      .filter((line) => line.trim());
  } catch (error) {
    throw new Error(
      `Failed to get commits between ${fromTag} and ${toTag}: ${error.message}`,
    );
  }
}

/**
 * Extract domains from JSDoc at a specific git tag using git show
 * @param {string} tag - Git tag
 * @returns {Promise<Set<string>>} Set of domain names
 */
export async function extractDomainsFromJSDocAtTag(tag) {
  const domains = new Set();

  try {
    // Get all .js files in src/sites at the specific tag
    const files = getFilesAtTag(tag, "src/sites/").filter(
      (line) => line.trim() && line.endsWith(".js"),
    );

    for (const file of files) {
      try {
        // Read file content at the specific tag
        const content = getFileContentAtTag(tag, file);
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
 * Extract domains at a specific git tag or HEAD
 * @param {string} tag - Git tag or 'HEAD'
 * @returns {Promise<Set<string>>} Set of domain names
 */
export async function extractDomainsAtTag(tag) {
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
 * Extract fixed domains from git commit messages between two tags
 * @param {string} fromTag - Starting tag
 * @param {string} toTag - Ending tag
 * @param {Set<string>} existingDomains - Domains that exist in both tags
 * @returns {Set<string>} Set of fixed domain names
 */
export function extractFixedDomains(fromTag, toTag, existingDomains) {
  const fixed = new Set();

  try {
    // Get commits between tags
    const commits = getCommitsBetweenTags(fromTag, toTag);

    for (const commit of commits) {
      // Look for fix: patterns (fixes)
      const domains = extractDomainsFromCommitMessage(commit);
      for (const domain of domains) {
        if (existingDomains.has(domain)) {
          fixed.add(domain);
        }
      }
    }
  } catch (error) {
    console.warn(`Warning: Could not analyze commits: ${error.message}`);
  }

  return fixed;
}
