#!/bin/bash

# SMOLITUX COVERAGE DASHBOARD GENERATOR
# Generates a coverage dashboard for the repository

# Source core modules
source "$(dirname "$0")/../core/utils.sh"

# Parse arguments
parse_args "$@"

# Generate dashboard
generate_dashboard() {
  local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
  
  log_section "GENERATING COVERAGE DASHBOARD"
  
  # Create dashboard file
  cat > COMPONENT_STATUS.md << EOF
# Smolitux UI Component Status

Last Updated: $timestamp

## Summary
This report shows the completion status of all components in the Smolitux UI library.

## Package Overview

EOF
  
  # Add package-by-package summary
  local total_components=0
  local total_tests=0
  local total_stories=0
  
  for pkg in "${PACKAGES[@]}"; do
    local pkg_dir="packages/@smolitux/$pkg"
    [ ! -d "$pkg_dir" ] && continue
    
    local pkg_status=$(get_package_status "$pkg")
    local pkg_components=$(echo "$pkg_status" | cut -d: -f2)
    local pkg_tests=$(echo "$pkg_status" | cut -d: -f3)
    local pkg_stories=$(echo "$pkg_status" | cut -d: -f4)
    local pkg_test_percent=$(echo "$pkg_status" | cut -d: -f5)
    local pkg_story_percent=$(echo "$pkg_status" | cut -d: -f6)
    
    if [ $pkg_components -gt 0 ]; then
      cat >> COMPONENT_STATUS.md << EOF
### @smolitux/$pkg
- Components: $pkg_components
- Tests: $pkg_tests/$pkg_components ($pkg_test_percent%)
- Stories: $pkg_stories/$pkg_components ($pkg_story_percent%)
- Status: $([ $pkg_test_percent -eq 100 ] && [ $pkg_story_percent -eq 100 ] && echo "✅ Complete" || echo "⚠️ In Progress")

EOF
      
      total_components=$((total_components + pkg_components))
      total_tests=$((total_tests + pkg_tests))
      total_stories=$((total_stories + pkg_stories))
    fi
  done
  
  # Calculate overall percentages
  local overall_test_percent=0
  local overall_story_percent=0
  
  if [ $total_components -gt 0 ]; then
    overall_test_percent=$((total_tests * 100 / total_components))
    overall_story_percent=$((total_stories * 100 / total_components))
  fi
  
  # Update summary
  sed -i "3i Total Components: $total_components" COMPONENT_STATUS.md
  sed -i "4i Test Coverage: $overall_test_percent%" COMPONENT_STATUS.md
  sed -i "5i Story Coverage: $overall_story_percent%" COMPONENT_STATUS.md
  
  # Add detailed component list if requested
  if [ "$DETAILED" = true ]; then
    cat >> COMPONENT_STATUS.md << EOF
## Detailed Component Status

EOF
    
    for pkg in "${PACKAGES[@]}"; do
      local pkg_dir="packages/@smolitux/$pkg"
      [ ! -d "$pkg_dir" ] && continue
      
      get_component_list "$pkg" | while read -r component; do
        local component_status=$(get_component_status "$pkg" "$component")
        local component_name=$(echo "$component_status" | cut -d: -f1)
        local component_impl=$(echo "$component_status" | cut -d: -f2)
        local component_test=$(echo "$component_status" | cut -d: -f3)
        local component_story=$(echo "$component_status" | cut -d: -f4)
        
        cat >> COMPONENT_STATUS.md << EOF
### $component_name (@smolitux/$pkg)
- Implementation: $([ "$component_impl" = "✅" ] && echo "✅ Complete" || echo "❌ Missing")
- Tests: $([ "$component_test" = "✅" ] && echo "✅ Complete" || echo "❌ Missing")
- Stories: $([ "$component_story" = "✅" ] && echo "✅ Complete" || echo "❌ Missing")
- Status: $([ "$component_impl" = "✅" ] && [ "$component_test" = "✅" ] && [ "$component_story" = "✅" ] && echo "✅ Ready" || echo "⚠️ Incomplete")

EOF
      done
    done
  fi
  
  # Create wiki dashboard
  mkdir -p docs/wiki/testing
  cp COMPONENT_STATUS.md docs/wiki/testing/test-coverage-dashboard.md
  
  log_success "Coverage dashboard generated: COMPONENT_STATUS.md"
  log_success "Wiki dashboard generated: docs/wiki/testing/test-coverage-dashboard.md"
}

# Run dashboard generation
if [ -n "$PACKAGE" ]; then
  log_info "Generating dashboard for package: @smolitux/$PACKAGE"
else
  log_info "Generating dashboard for all packages"
fi

generate_dashboard

log_success "Coverage dashboard generation complete!"