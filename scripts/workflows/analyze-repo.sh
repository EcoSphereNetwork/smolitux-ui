#!/bin/bash

# SMOLITUX REPOSITORY ANALYZER
# Analyzes the current state of the repository

# Source core modules
source "$(dirname "$0")/../core/utils.sh"
source "$(dirname "$0")/../core/analysis.sh"

# Parse arguments
parse_args "$@"

# Run analysis
if [ -n "$COMPONENT" ] && [ -n "$PACKAGE" ]; then
  analyze_component "$PACKAGE" "$COMPONENT"
elif [ -n "$PACKAGE" ]; then
  analyze_package "$PACKAGE"
else
  analyze_repository
fi

log_success "Analysis complete!"