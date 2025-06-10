#!/bin/bash

# Ensure the snapshots directory exists
mkdir -p __snapshots__

# Run tests for light theme
echo "Running visual tests for light theme..."
THEME=light npx test-storybook --url http://localhost:6006 --config-dir .storybook/test-runner

# Run tests for dark theme
echo "Running visual tests for dark theme..."
THEME=dark npx test-storybook --url http://localhost:6006 --config-dir .storybook/test-runner --test-id="*darkmode*"

echo "Visual regression tests completed!"