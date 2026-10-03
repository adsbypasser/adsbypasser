#!/bin/bash

# Deploy nightly userscripts to the nightly GitHub Pages repository
#
# This script replaces the content of the nightly repository with a single
# commit containing the built userscripts. History is not kept.
#
# Environment variables:
#   SOURCE_DIR         - The local directory containing built userscripts
#   TARGET_REPO        - The target GitHub repository (format: owner/repo)
#   TARGET_REPO_TOKEN  - Personal Access Token for target repository access
#   COMMIT_SHA         - The source commit the scripts were built from
#
# Examples:
#   SOURCE_DIR=./dist TARGET_REPO=adsbypasser/nightly COMMIT_SHA=abc123 ./build/ci/deploy-nightly.sh

set -e # Exit on any error

# Validate required environment variables
if [ -z "${SOURCE_DIR}" ] || [ -z "${TARGET_REPO}" ] || [ -z "${TARGET_REPO_TOKEN}" ] || [ -z "${COMMIT_SHA}" ]; then
    echo "Error: Missing required environment variables"
    echo "Required: SOURCE_DIR, TARGET_REPO, TARGET_REPO_TOKEN, COMMIT_SHA"
    echo "Example: SOURCE_DIR=./dist TARGET_REPO=adsbypasser/nightly TARGET_REPO_TOKEN=your_token COMMIT_SHA=abc123 $0"
    exit 1
fi

# Check if source directory exists
if [ ! -d "${SOURCE_DIR}" ]; then
    echo "Error: Source directory does not exist: ${SOURCE_DIR}"
    exit 1
fi

SHORT_SHA="${COMMIT_SHA:0:7}"
TEMP_DIR="$(mktemp -d)"
trap 'rm -rf "${TEMP_DIR}"' EXIT

echo "🚀 Deploying nightly ${SHORT_SHA} to ${TARGET_REPO}..."

echo "📋 Copying files from ${SOURCE_DIR}..."
cp "${SOURCE_DIR}"/adsbypasser.*.user.js "${SOURCE_DIR}"/adsbypasser.*.meta.js "${TEMP_DIR}"/
# Serve files as-is, skip Jekyll processing
touch "${TEMP_DIR}/.nojekyll"

cd "${TEMP_DIR}"
git init -q -b master

# Configure git with standard identity
git config user.name "GitHub Actions"
git config user.email "actions@github.com"

git add .
git commit -q -m "nightly: ${SHORT_SHA}"

echo "📤 Pushing to ${TARGET_REPO}..."
git push -q -f "https://${TARGET_REPO_TOKEN}@github.com/${TARGET_REPO}.git" master

echo "🎉 Nightly deployment completed successfully!"
