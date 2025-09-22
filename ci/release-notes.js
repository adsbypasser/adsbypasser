import { extractDomainDiff } from "../build/diff.js";
import { extractPRsBetweenTags, getPreviousTag } from "./pr-extractor.js";

/**
 * Format domain changes as markdown
 *
 * Generates a markdown section detailing added, fixed, and retired domains.
 *
 * @param {Object} domainDiff - Domain diff object with added, retired, fixed arrays
 * @returns {string} Formatted markdown
 */
function formatDomainChanges(domainDiff) {
  let markdown = "## What's Changed\n\n";

  // Add section for added domains
  if (domainDiff.added.length > 0) {
    markdown += "### Added Domains\n";
    domainDiff.added.forEach((domain) => {
      markdown += `- ${domain}\n`;
    });
    markdown += "\n";
  }

  // Add section for fixed domains
  if (domainDiff.fixed.length > 0) {
    markdown += "### Fixed Domains\n";
    domainDiff.fixed.forEach((domain) => {
      markdown += `- ${domain}\n`;
    });
    markdown += "\n";
  }

  // Add section for retired domains
  if (domainDiff.retired.length > 0) {
    markdown += "### Retired Domains\n";
    domainDiff.retired.forEach((domain) => {
      markdown += `- ${domain}\n`;
    });
    markdown += "\n";
  }

  return markdown;
}

/**
 * Format merged PR commits as markdown
 *
 * Generates a markdown section listing merged pull requests.
 *
 * @param {Array<Object>} commits - Array of commit objects
 * @returns {string} Formatted markdown
 */
function formatPRs(commits) {
  // Return empty string if no commits
  if (commits.length === 0) {
    return "";
  }

  // Generate markdown list of commits
  let markdown = "### Merged Commits\n";

  commits.forEach((commit) => {
    markdown += `- ${commit.message} (#${commit.prNumber})\n`;
  });

  markdown += "\n";

  return markdown;
}

/**
 * Generate release notes between two tags
 *
 * Creates comprehensive release notes including domain changes and merged PRs.
 *
 * @param {string} fromTag - Starting tag
 * @param {string} toTag - Ending tag
 * @returns {Promise<string>} Formatted release notes
 */
export async function generateReleaseNotes(fromTag, toTag) {
  try {
    // Extract domain changes between tags
    const domainDiff = await extractDomainDiff(fromTag, toTag);

    // Extract PRs between tags
    const prs = extractPRsBetweenTags(fromTag, toTag);

    // Build the release notes with domain changes
    let releaseNotes = formatDomainChanges(domainDiff);

    // Add contributors section if there are PRs
    if (prs.length > 0) {
      releaseNotes += "## Contributors\n";
      releaseNotes +=
        "Thanks to all contributors who made this release possible!\n\n";

      releaseNotes += formatPRs(prs);
    }

    // Add footer with full changelog link
    releaseNotes += "---\n\n";
    releaseNotes += `**Full Changelog**: https://github.com/adsbypasser/adsbypasser/compare/${fromTag}...${toTag}\n`;

    return releaseNotes;
  } catch (error) {
    console.error(`Error generating release notes: ${error.message}`);
    return `## Release Notes\n\nError generating detailed release notes: ${error.message}`;
  }
}

/**
 * Generate release notes for the current tag
 *
 * Creates release notes by comparing the current tag with the previous tag.
 *
 * @param {string} currentTag - Current tag (e.g., "v7.32.0")
 * @returns {Promise<string>} Formatted release notes
 */
export async function generateReleaseNotesForTag(currentTag) {
  // Get the previous tag for comparison
  const previousTag = getPreviousTag(currentTag);

  // Handle first release case
  if (!previousTag) {
    return `## Release Notes

This is the first release of adsbypasser.

**Full Changelog**: https://github.com/adsbypasser/adsbypasser/commits/${currentTag}
`;
  }

  // Generate release notes comparing with previous tag
  return await generateReleaseNotes(previousTag, currentTag);
}
