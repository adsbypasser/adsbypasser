#!/usr/bin/env node

/**
 * Domain Checker
 *
 * Extracts domains from src/sites/**.js and reports their validity.
 * Checks both DNS resolution and HTTP/HTTPS accessibility.
 *
 * Usage:
 *   node check-domains.js [category1] [category2] ...
 *
 * Examples:
 *   node check-domains.js          # Check all categories
 *   node check-domains.js file     # Check only file category
 *   node check-domains.js file link image  # Check specific categories
 */

import { extractDomainsFromJSDoc } from "../build/jsdoc.js";
import { deduplicateRootDomains } from "../build/domain.js";
import dns from "dns/promises";
import https from "https";
import http from "http";
import { URL } from "url";

/**
 * Check if a domain is resolvable via DNS
 *
 * Attempts to resolve the domain using both IPv4 and IPv6.
 *
 * @param {string} domain - Domain to check
 * @returns {Promise<boolean>} True if resolvable
 */
async function isDomainResolvable(domain) {
  try {
    // Try IPv4 first
    await dns.resolve4(domain);
    return true;
  } catch (ipv4Error) {
    try {
      // Try IPv6 if IPv4 fails
      await dns.resolve6(domain);
      return true;
    } catch (ipv6Error) {
      return false;
    }
  }
}

/**
 * Check if a domain is accessible via HTTP/HTTPS
 *
 * Attempts to make a HEAD request to the domain using both HTTPS and HTTP.
 *
 * @param {string} domain - Domain to check
 * @returns {Promise<boolean>} True if accessible
 */
async function isDomainAccessible(domain) {
  const protocols = ["https", "http"];

  for (const protocol of protocols) {
    try {
      const url = `${protocol}://${domain}`;
      const urlObj = new URL(url);
      const isHttps = protocol === "https";
      const client = isHttps ? https : http;

      const result = await new Promise((resolve) => {
        const req = client.request(
          {
            hostname: urlObj.hostname,
            port: urlObj.port || (isHttps ? 443 : 80),
            path: urlObj.pathname,
            method: "HEAD",
            timeout: 5000, // 5 second timeout
            headers: {
              "User-Agent": "Mozilla/5.0 (compatible; DomainChecker/1.0)",
            },
          },
          (res) => {
            resolve(true);
          },
        );

        req.on("error", () => resolve(false));
        req.on("timeout", () => {
          req.destroy();
          resolve(false);
        });
        req.end();
      });

      if (result) return true;
    } catch (error) {
      // Continue to next protocol
      continue;
    }
  }

  return false;
}

/**
 * Check domain status
 *
 * Determines if a domain is valid, expired, or unreachable.
 *
 * @param {string} domain - Domain to check
 * @returns {Promise<Object>} Status object with domain, status, resolvable, and accessible properties
 */
async function checkDomain(domain) {
  const isResolvable = await isDomainResolvable(domain);

  if (!isResolvable) {
    return {
      domain,
      status: "EXPIRED",
      resolvable: false,
      accessible: false
    };
  }

  const isAccessible = await isDomainAccessible(domain);

  if (isAccessible) {
    return {
      domain,
      status: "VALID",
      resolvable: true,
      accessible: true
    };
  } else {
    return {
      domain,
      status: "UNREACHABLE",
      resolvable: true,
      accessible: false,
    };
  }
}

/**
 * Main function
 *
 * Extracts domains from the sites directory and checks their status.
 *
 * @returns {Promise<void>}
 */
async function main() {
  // Parse command line arguments
  const args = process.argv.slice(2);
  const categories = args.length > 0 ? args : null;

  // Display extraction information
  console.log("Extracting domains from sites directory...");
  if (categories) {
    console.log(`Categories: ${categories.join(", ")}`);
  } else {
    console.log("Categories: all");
  }

  try {
    // Extract domains from sites
    const domains = await extractDomainsFromJSDoc(categories);
    const uniqueDomains = deduplicateRootDomains(domains);

    console.log(`Found ${uniqueDomains.length} unique root domains\n`);

    // Handle case with no domains found
    if (uniqueDomains.length === 0) {
      console.log("No domains found.");
      return;
    }

    // Check each domain
    const results = [];
    for (const domain of uniqueDomains) {
      process.stdout.write(`Checking ${domain}... `);
      const result = await checkDomain(domain);
      results.push(result);

      // Display status with appropriate emoji
      const statusIcon =
        result.status === "VALID"
          ? "✅"
          : result.status === "EXPIRED"
            ? "❌"
            : "⚠️";
      console.log(`${statusIcon} ${result.status}`);
    }

    // Generate and display summary
    console.log("\n" + "=".repeat(50));
    console.log("SUMMARY:");

    const validCount = results.filter((r) => r.status === "VALID").length;
    const expiredCount = results.filter((r) => r.status === "EXPIRED").length;
    const unreachableCount = results.filter(
      (r) => r.status === "UNREACHABLE",
    ).length;

    console.log(`✅ Valid: ${validCount}`);
    console.log(`❌ Expired: ${expiredCount}`);
    console.log(`⚠️  Unreachable: ${unreachableCount}`);
    console.log(`📊 Total: ${results.length}`);

    // Show expired domains if any
    const expiredDomains = results
      .filter((r) => r.status === "EXPIRED")
      .map((r) => r.domain);
    if (expiredDomains.length > 0) {
      console.log("\n❌ EXPIRED DOMAINS:");
      expiredDomains.forEach((domain) => console.log(`  - ${domain}`));
    }

    // Show unreachable domains if any
    const unreachableDomains = results
      .filter((r) => r.status === "UNREACHABLE")
      .map((r) => r.domain);
    if (unreachableDomains.length > 0) {
      console.log("\n⚠️  UNREACHABLE DOMAINS:");
      unreachableDomains.forEach((domain) => console.log(`  - ${domain}`));
    }

    // Display final summary -- (no exit codes for reporting mode)
    const invalidCount = expiredCount + unreachableCount;
    if (invalidCount > 0) {
      console.log(`\n⚠️  Found ${invalidCount} invalid domain(s)`);
    } else {
      console.log("\n✅ All domains are valid!");
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

// Execute main function directly
main().catch(console.error);
