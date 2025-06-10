#!/bin/bash

# SMOLITUX QUALITY VALIDATION
# Validates the quality of components, packages, and the repository

# Source core modules
source "$(dirname "$0")/../core/utils.sh"
source "$(dirname "$0")/../core/validation.sh"

# Parse arguments
parse_args "$@"

# Run validation
if [ -n "$COMPONENT" ] && [ -n "$PACKAGE" ]; then
  validate_component_quality "$PACKAGE" "$COMPONENT"
  validate_tests "$PACKAGE" "$COMPONENT"
elif [ -n "$PACKAGE" ]; then
  validate_package_quality "$PACKAGE"
  validate_build "$PACKAGE"
  validate_tests "$PACKAGE"
  validate_lint "$PACKAGE"
elif [ "$ALL" = true ]; then
  validate_all_packages
  validate_build
  validate_tests
  validate_lint
  validate_storybook
else
  validate_production_readiness
fi

log_success "Quality validation complete!"