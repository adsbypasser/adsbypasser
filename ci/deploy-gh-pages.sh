#!/bin/bash

# Deploy to GitHub Pages repository and create a tag
# Usage: ./ci/deploy-gh-pages.sh <tag-name> <source-dir> <target-repo>
#
# Environment variables:
# - GH_PAT: Personal Access Token (required for external repo access)

set -e  # Exit on any error

TAG_NAME="$1"
SOURCE_DIR="$2"
TARGET_REPO="$3"

if [ -z "$TAG_NAME" ] || [ -z "$SOURCE_DIR" ] || [ -z "$TARGET_REPO" ]; then
    echo "Error: Missing required arguments"
    echo "Usage: $0 <tag-name> <source-dir> <target-repo>"
    echo "Example: $0 v1.2.3 ./dist/ghpages adsbypasser/adsbypasser.github.io"
    exit 1
fi

# Use GH_PAT for external repository access
TOKEN="$GH_PAT"

if [ -z "$TOKEN" ]; then
    echo "Error: GH_PAT not found in environment (required for external repo access)"
    exit 1
fi

# Extract owner and repo from target repo name
IFS='/' read -r OWNER REPO <<< "$TARGET_REPO"
if [ -z "$OWNER" ] || [ -z "$REPO" ]; then
    echo "Error: Invalid repository name format: $TARGET_REPO"
    echo "Expected format: owner/repo"
    exit 1
fi

# Check if source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo "Error: Source directory does not exist: $SOURCE_DIR"
    exit 1
fi

REPO_URL="https://${TOKEN}@github.com/${TARGET_REPO}.git"
TEMP_DIR="temp-gh-pages-$(date +%s)"

echo "🚀 Deploying $TAG_NAME to $TARGET_REPO..."

# Clone the target repository
echo "📥 Cloning $TARGET_REPO..."
git clone "$REPO_URL" "$TEMP_DIR"

# Enter the cloned repository
cd "$TEMP_DIR"

# Check if tag already exists
if git rev-parse "$TAG_NAME" >/dev/null 2>&1; then
    echo "⚠️  Tag $TAG_NAME already exists, skipping tag creation..."
    SKIP_TAG=true
else
    SKIP_TAG=false
fi

# Copy files from source to target
echo "📋 Copying files from $SOURCE_DIR..."
cp -r "../$SOURCE_DIR"/* .

# Configure git
git config user.name "GitHub Actions"
git config user.email "actions@github.com"

# Add all changes
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "ℹ️  No changes to commit"
else
    # Commit changes
    echo "💾 Committing changes..."
    git commit -m "$TAG_NAME"

    # Push changes
    echo "📤 Pushing changes to $TARGET_REPO..."
    git push origin master
fi

# Create and push tag if it doesn't exist
if [ "$SKIP_TAG" = false ]; then
    echo "🏷️  Creating tag $TAG_NAME..."
    git tag -a "$TAG_NAME" -m "Deploy $TAG_NAME to GitHub Pages"

    echo "📤 Pushing tag $TAG_NAME to $TARGET_REPO..."
    git push origin "$TAG_NAME"

    echo "✅ Successfully deployed and tagged $TARGET_REPO with $TAG_NAME"
else
    echo "✅ Successfully deployed to $TARGET_REPO (tag $TAG_NAME already exists)"
fi

# Clean up
cd ..
rm -rf "$TEMP_DIR"

echo "🎉 Deployment completed successfully!"
