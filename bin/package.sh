#!/bin/bash

# Check if jq is installed
if ! command -v jq > /dev/null; then
  echo "jq is not installed. Please install jq to use this script."
  exit 1
fi

# Get the version number from manifest.json
version=$(jq -r .version manifest.json)

# Check if the version directory exists; if not, create it
if [ ! -d "publishing/$version" ]; then
  mkdir -p "publishing/$version"
  mkdir -p "publishing/$version/images"
fi

# Copy the files to the destination directory
cp manifest.json content.js background.js styles.css "publishing/$version/"
cp images/clipboard.png "publishing/$version/images"

# # Create a ZIP file with the copied files
cd publishing/
zip -r "$version/dist.zip" "$version"

echo "Files copied and compressed successfully to publishing/$version/dist.zip"
