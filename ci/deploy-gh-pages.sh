#!/bin/bash

# Deploy to GitHub Pages repository and create a tag
#
# This script deploys files to a GitHub Pages repository and creates a git tag.
# It handles both new deployments and updates to existing repositories.
#
# Environment variables:
#   TAG_NAME           - The git tag to create (e.g., v1.2.3)
#   SOURCE_DIR         - The local directory containing files to deploy
#   TARGET_REPO        - The target GitHub repository (format: owner/repo)
#   TARGET_REPO_TOKEN  - Personal Access Token for target repository access
#
# Examples:
#   TAG_NAME=v1.2.3 SOURCE_DIR=./dist/ghpages TARGET_REPO=adsbypasser/adsbypasser.github.io ./ci/deploy-gh-pages.sh

set -e # Exit on any error

# Validate required environment variables
if [ -z "${TAG_NAME}" ] || [ -z "${SOURCE_DIR}" ] || [ -z "${TARGET_REPO}" ] || [ -z "${TARGET_REPO_TOKEN}" ]; then
    echo "Error: Missing required environment variables"
    echo "Required: TAG_NAME, SOURCE_DIR, TARGET_REPO, TARGET_REPO_TOKEN"
    echo "Example: TAG_NAME=v1.2.3 SOURCE_DIR=./dist/ghpages TARGET_REPO=adsbypasser/adsbypasser.github.io TARGET_REPO_TOKEN=your_token $0"
    exit 1
fi

# Extract owner and repo from target repo name
IFS='/' read -r OWNER REPO <<<"${TARGET_REPO}"
if [ -z "${OWNER}" ] || [ -z "${REPO}" ]; then
    echo "Error: Invalid repository name format: ${TARGET_REPO}"
    echo "Expected format: owner/repo"
    exit 1
fi

# Check if source directory exists
if [ ! -d "${SOURCE_DIR}" ]; then
    echo "Error: Source directory does not exist: ${SOURCE_DIR}"
    exit 1
fi

# Create temporary directory name with timestamp
TEMP_DIR="temp-gh-pages-$(date +%s)"

echo "🚀 Deploying ${TAG_NAME} to ${TARGET_REPO}..."

# Clone the target repository
echo "📥 Cloning ${TARGET_REPO}..."
REPO_URL="https://${TARGET_REPO_TOKEN}@github.com/${TARGET_REPO}.git"
git clone "${REPO_URL}" "${TEMP_DIR}"

# Enter the cloned repository
cd "${TEMP_DIR}"

# Check if tag already exists
if git rev-parse "${TAG_NAME}" >/dev/null 2>&1; then
    echo "⚠️  Tag ${TAG_NAME} already exists, skipping tag creation..."
    SKIP_TAG=true
else
    SKIP_TAG=false
fi

# Copy files from source to target
echo "📋 Copying files from ${SOURCE_DIR}..."
cp -r "../${SOURCE_DIR}"/* .

# Configure git with standard identity
git config user.name "GitHub Actions"
git config user.email "actions@github.com"

# Add all changes to git
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "ℹ️  No changes to commit"
else
    # Commit changes with tag name as message
    echo "💾 Committing changes..."
    git commit -m "${TAG_NAME}"

    # Push changes to master branch
    echo "📤 Pushing changes to ${TARGET_REPO}..."
    git push origin master
fi

# Create and push tag if it doesn't exist
if [ "${SKIP_TAG}" = false ]; then
    echo "🏷️  Creating tag ${TAG_NAME}..."
    git tag -a "${TAG_NAME}" -m "Deploy: ${TAG_NAME} to GitHub Pages"

    echo "📤 Pushing tag: ${TAG_NAME} to: ${TARGET_REPO}..."
    git push origin "${TAG_NAME}"

    echo "✅ Successfully deployed and tagged: ${TARGET_REPO} with: ${TAG_NAME}"
else
    echo "✅ Successfully deployed to: ${TARGET_REPO} (tag: ${TAG_NAME} already exists)"
fi

# Clean up temporary directory
cd ..
rm -rf "${TEMP_DIR}"

echo "🎉 Deployment completed successfully!"
