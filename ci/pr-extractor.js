import { execSync } from "child_process";

/**
 * Extract merged PR commits from git log between two tags
 *
 * This function looks for commits ending with (#<pr number>) which is typical
 * of squash merges from GitHub PRs.
 *
 * @param {string} fromTag - Starting tag
 * @param {string} toTag - Ending tag
 * @returns {Array<Object>} Array of commit objects with hash, author, message, prNumber
 */
export function extractPRsBetweenTags(fromTag, toTag) {
  const commits = [];

  try {
    const commitRange =
      toTag === "HEAD" ? `${fromTag}..HEAD` : `${fromTag}..${toTag}`;

    // Get all commits between tags
    const allCommits = execSync(
      `git log --pretty=format:"%H|%an|%ae|%s" ${commitRange}`,
      { encoding: "utf8" },
    )
      .split("\n")
      .filter((line) => line.trim());

    for (const commit of allCommits) {
      const [hash, author, email, message] = commit.split("|");

      // Look for commits ending with (#<pr number>) - typical of squash merges
      const prMatch = message.match(/\(#(\d+)\)$/);
      if (prMatch) {
        const prNumber = parseInt(prMatch[1]);
        commits.push({
          hash,
          author,
          message: message.replace(/\s*\(#\d+\)$/, ""), // Remove the PR number suffix
          prNumber,
          url: `https://github.com/adsbypasser/adsbypasser/pull/${prNumber}`,
        });
      }
    }
  } catch (error) {
    console.warn(`Warning: Could not extract PR commits: ${error.message}`);
  }

  return commits;
}

/**
 * Extract author statistics from git log between two tags
 *
 * Counts the number of commits per author in the specified range.
 *
 * @param {string} fromTag - Starting tag
 * @param {string} toTag - Ending tag
 * @returns {Array<Object>} Array of author objects with name, email, commitCount
 */
export function extractAuthorsBetweenTags(fromTag, toTag) {
  const authors = new Map();

  try {
    const commitRange =
      toTag === "HEAD" ? `${fromTag}..HEAD` : `${fromTag}..${toTag}`;
    const commits = execSync(
      `git log --pretty=format:"%an|%ae" ${commitRange}`,
      { encoding: "utf8" },
    )
      .split("\n")
      .filter((line) => line.trim());

    for (const commit of commits) {
      const [name, email] = commit.split("|");
      const key = `${name}|${email}`;

      if (authors.has(key)) {
        authors.get(key).commitCount++;
      } else {
        authors.set(key, {
          name,
          email,
          commitCount: 1,
        });
      }
    }
  } catch (error) {
    console.warn(`Warning: Could not extract authors: ${error.message}`);
  }

  // Convert to array and sort by commit count (descending)
  return Array.from(authors.values()).sort(
    (a, b) => b.commitCount - a.commitCount,
  );
}

/**
 * Get the previous tag for comparison
 *
 * Finds the most recent tag before the current tag when sorted by version.
 *
 * @param {string} currentTag - Current tag
 * @returns {string} Previous tag or null if not found
 */
export function getPreviousTag(currentTag) {
  try {
    // Get all tags sorted by version
    const tags = execSync("git tag --sort=-version:refname", {
      encoding: "utf8",
    })
      .split("\n")
      .filter((tag) => tag.trim() && tag !== currentTag);

    return tags[0] || null;
  } catch (error) {
    console.warn(`Warning: Could not get previous tag: ${error.message}`);
    return null;
  }
}
