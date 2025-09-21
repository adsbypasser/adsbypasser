#!/usr/bin/env node

import { generateReleaseNotesForTag } from "./release-notes.js";

/**
 * CLI interface for generating release notes
 */
async function main() {
  const currentTag = process.argv[2];

  if (!currentTag) {
    console.error("Usage: node release-notes-cli.js <tag>");
    console.error("Example: node release-notes-cli.js v8.0.0");
    console.error("");
    console.error(
      "This script generates release notes for a specific git tag.",
    );
    console.error(
      "It will compare the tag with the previous tag to show changes.",
    );
    process.exit(1);
  }

  try {
    const releaseNotes = await generateReleaseNotesForTag(currentTag);
    console.log(releaseNotes);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

// Run the CLI
main();
