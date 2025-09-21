import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { extractDomainsFromContent } from "./domain.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITES_DIR = path.resolve(__dirname, "../src/sites");

/**
 * Extract domains from JSDoc @domain tags in site files
 * @param {string[]} [directories] - Optional array of subdirectories to scan (e.g., ['file', 'link'])
 * @returns {Promise<string[]>} Array of domain strings
 */
export async function extractDomainsFromJSDoc(directories = null) {
  const domains = new Set();

  if (directories) {
    // Scan only specified directories
    for (const dir of directories) {
      const dirPath = path.join(SITES_DIR, dir);
      await scanDirectory(dirPath, domains);
    }
  } else {
    // Start scanning from the sites directory
    await scanDirectory(SITES_DIR, domains);
  }

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
    const fileDomains = extractDomainsFromContent(content);
    fileDomains.forEach((domain) => domains.add(domain));
  } catch (error) {
    console.warn(`Warning: Could not read file ${filePath}:`, error.message);
  }
}
