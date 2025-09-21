import { extractDomainDiff } from "../build/diff.js";
import { extractPRsBetweenTags, getPreviousTag } from "./pr-extractor.js";

/**
 * Format domain changes as markdown
 * @param {Object} domainDiff - Domain diff object with added, retired, fixed arrays
 * @returns {string} Formatted markdown
 */
function formatDomainChanges(domainDiff) {
  let markdown = "## What's Changed\n\n";

  if (domainDiff.added.length > 0) {
    markdown += "### Added Domains\n";
    domainDiff.added.forEach((domain) => {
      markdown += `- ${domain}\n`;
    });
    markdown += "\n";
  }

  if (domainDiff.fixed.length > 0) {
    markdown += "### Fixed Domains\n";
    domainDiff.fixed.forEach((domain) => {
      markdown += `- ${domain}\n`;
    });
    markdown += "\n";
  }

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
 * @param {Array<Object>} commits - Array of commit objects
 * @returns {string} Formatted markdown
 */
function formatPRs(commits) {
  if (commits.length === 0) {
    return "";
  }

  let markdown = "### Merged Commits\n";

  commits.forEach((commit) => {
    markdown += `- ${commit.message} (#${commit.prNumber})\n`;
  });

  markdown += "\n";

  return markdown;
}

/**
 * Generate release notes between two tags
 * @param {string} fromTag - Starting tag
 * @param {string} toTag - Ending tag
 * @returns {Promise<string>} Formatted release notes
 */
export async function generateReleaseNotes(fromTag, toTag) {
  try {
    // Extract domain changes
    const domainDiff = await extractDomainDiff(fromTag, toTag);

    // Extract PRs
    const prs = extractPRsBetweenTags(fromTag, toTag);

    // Build the release notes
    let releaseNotes = formatDomainChanges(domainDiff);

    // Add contributors section if there are PRs
    if (prs.length > 0) {
      releaseNotes += "## Contributors\n";
      releaseNotes +=
        "Thanks to all contributors who made this release possible!\n\n";

      releaseNotes += formatPRs(prs);
    }

    // Add footer
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
 * @param {string} currentTag - Current tag (e.g., "v7.32.0")
 * @returns {Promise<string>} Formatted release notes
 */
export async function generateReleaseNotesForTag(currentTag) {
  const previousTag = getPreviousTag(currentTag);

  if (!previousTag) {
    return `## Release Notes\n\nThis is the first release of adsbypasser.\n\n**Full Changelog**: https://github.com/adsbypasser/adsbypasser/commits/${currentTag}\n`;
  }

  return await generateReleaseNotes(previousTag, currentTag);
}
