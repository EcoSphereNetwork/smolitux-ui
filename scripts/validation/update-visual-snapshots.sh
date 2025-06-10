#!/bin/bash

# Ensure the snapshots directory exists
mkdir -p __snapshots__

# Update snapshots for light theme
echo "Updating visual snapshots for light theme..."
THEME=light npx test-storybook --url http://localhost:6006 --config-dir .storybook/test-runner --update-snapshots

# Update snapshots for dark theme
echo "Updating visual snapshots for dark theme..."
THEME=dark npx test-storybook --url http://localhost:6006 --config-dir .storybook/test-runner --test-id="*darkmode*" --update-snapshots

echo "Visual snapshots updated!"