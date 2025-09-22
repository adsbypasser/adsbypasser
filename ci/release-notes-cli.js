#!/usr/bin/env node

/**
 * Release Notes CLI
 *
 * Command line interface for generating release notes for a specific git tag.
 * Compares the tag with the previous tag to show changes.
 *
 * Usage:
 *   node release-notes-cli.js <tag>
 *
 * Examples:
 *   node release-notes-cli.js v8.0.0
 */

import { generateReleaseNotesForTag } from "./release-notes.js";

/**
 * Main CLI function
 *
 * Parses command line arguments and generates release notes.
 *
 * @returns {Promise<void>}
 */
async function main() {
  // Extract tag from command line arguments
  const currentTag = process.argv[2];

  // Validate required arguments
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
    // Generate and display release notes
    const releaseNotes = await generateReleaseNotesForTag(currentTag);
    console.log(releaseNotes);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

// Run the CLI
main();
