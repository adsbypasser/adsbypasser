import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITES_DIR = path.resolve(__dirname, "../../src/sites");

/**
 * Extract domains from JSDoc @domain tags in site files
 * @returns {Promise<string[]>} Array of domain strings
 */
async function extractDomainsFromJSDoc() {
  const domains = new Set();

  // Start scanning from the sites directory
  await scanDirectory(SITES_DIR, domains);

  // Convert Set to sorted array
  const sortedDomains = Array.from(domains).sort();

  return sortedDomains;
}

/**
 * Recursively scan all .js files in sites directory
 * @param {string} dir - Directory to scan
 * @param {Set<string>} domains - Set to collect domains
 */
async function scanDirectory(dir, domains) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await scanDirectory(fullPath, domains);
    } else if (entry.isFile() && entry.name.endsWith(".js")) {
      await extractDomainsFromFile(fullPath, domains);
    }
  }
}

/**
 * Extract domains from a single file
 * @param {string} filePath - Path to the file to scan
 * @param {Set<string>} domains - Set to collect domains
 */
async function extractDomainsFromFile(filePath, domains) {
  try {
    const content = await fs.readFile(filePath, "utf-8");

    // Find JSDoc comments and extract @domain tags
    const jsdocRegex = /\/\*\*[\s\S]*?\*\//g;
    const domainRegex = /@domain\s+([^\s\*]+)/g;

    let match;
    while ((match = jsdocRegex.exec(content)) !== null) {
      const jsdocComment = match[0];
      let domainMatch;
      while ((domainMatch = domainRegex.exec(jsdocComment)) !== null) {
        const domain = domainMatch[1].trim();
        if (domain) {
          domains.add(domain);
        }
      }
    }
  } catch (error) {
    console.warn(`Warning: Could not read file ${filePath}:`, error.message);
  }
}

export { extractDomainsFromJSDoc };
