#!/bin/bash

# SMOLITUX COMPONENT COMPLETION
# Completes missing components, tests, and stories

# Source core modules
source "$(dirname "$0")/../core/utils.sh"
source "$(dirname "$0")/../core/completion.sh"

# Parse arguments
parse_args "$@"

# Run completion
if [ -n "$COMPONENT" ] && [ -n "$PACKAGE" ]; then
  complete_component "$PACKAGE" "$COMPONENT"
elif [ -n "$PACKAGE" ]; then
  complete_package "$PACKAGE"
elif [ "$ALL" = true ]; then
  complete_all_packages
else
  log_error "No package or component specified. Use --package PACKAGE or --all"
  show_help
  exit 1
fi

log_success "Completion workflow complete!"