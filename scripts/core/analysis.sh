#!/bin/bash

# SMOLITUX CORE ANALYSIS
# Core analysis functions for Smolitux scripts

# Source utils using the script's directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/utils.sh"

# Analyze repository
analyze_repository() {
  log_section "REPOSITORY ANALYSIS"
  
  local total_components=0
  local total_tests=0
  local total_stories=0
  local missing_tests=0
  local missing_stories=0
  
  log_info "Analyzing packages..."
  
  for pkg in "${PACKAGES[@]}"; do
    local pkg_dir="packages/@smolitux/$pkg"
    [ ! -d "$pkg_dir" ] && continue
    
    local pkg_status=$(get_package_status "$pkg")
    local pkg_components=$(echo "$pkg_status" | cut -d: -f2)
    local pkg_tests=$(echo "$pkg_status" | cut -d: -f3)
    local pkg_stories=$(echo "$pkg_status" | cut -d: -f4)
    local pkg_test_percent=$(echo "$pkg_status" | cut -d: -f5)
    local pkg_story_percent=$(echo "$pkg_status" | cut -d: -f6)
    
    local pkg_missing_tests=$((pkg_components - pkg_tests))
    local pkg_missing_stories=$((pkg_components - pkg_stories))
    
    log_info "📦 @smolitux/$pkg"
    log_info "  Components: $pkg_components"
    log_info "  Tests: $pkg_tests/$pkg_components ($pkg_test_percent%) | Missing: $pkg_missing_tests"
    log_info "  Stories: $pkg_stories/$pkg_components ($pkg_story_percent%) | Missing: $pkg_missing_stories"
    
    total_components=$((total_components + pkg_components))
    total_tests=$((total_tests + pkg_tests))
    total_stories=$((total_stories + pkg_stories))
    missing_tests=$((missing_tests + pkg_missing_tests))
    missing_stories=$((missing_stories + pkg_missing_stories))
  done
  
  # Calculate overall percentages
  local overall_test_percent=0
  local overall_story_percent=0
  
  if [ $total_components -gt 0 ]; then
    overall_test_percent=$((total_tests * 100 / total_components))
    overall_story_percent=$((total_stories * 100 / total_components))
  fi
  
  log_section "OVERALL SUMMARY"
  log_info "Total Components: $total_components"
  log_info ""
  log_info "Test Coverage:"
  log_info "  ✅ Complete: $total_tests ($overall_test_percent%)"
  log_info "  ❌ Missing: $missing_tests"
  log_info ""
  log_info "Story Coverage:"
  log_info "  ✅ Complete: $total_stories ($overall_story_percent%)"
  log_info "  ❌ Missing: $missing_stories"
  
  # Analyze validation issues
  log_section "VALIDATION ISSUES ANALYSIS"
  
  local react_import_issues=0
  local export_issues=0
  local typescript_issues=0
  local testid_issues=0
  
  log_info "Scanning for validation issues..."
  
  # Check React import issues
  react_import_issues=$(find packages -name "*.tsx" -exec grep -l "React\." {} \; | while read -r file; do
    if ! grep -q "import React" "$file"; then
      echo "$file"
    fi
  done | wc -l)
  
  # Check export issues
  export_issues=$(find packages -name "*.tsx" | grep -v "\.test\.\|\.stories\.\|__tests__" | while read -r file; do
    local basename=$(basename "$file" .tsx)
    if ! grep -q "export.*$basename\|export default" "$file"; then
      echo "$file"
    fi
  done | wc -l)
  
  # Check TypeScript issues
  typescript_issues=$(find packages -name "*.tsx" -exec grep -l "any\|@ts-ignore" {} \; | wc -l)
  
  # Check missing test-id issues
  testid_issues=$(find packages -name "*.tsx" | grep -v "\.test\.\|\.stories\.\|__tests__" | while read -r file; do
    if grep -q "return.*<" "$file" && ! grep -q "data-testid" "$file"; then
      echo "$file"
    fi
  done | wc -l)
  
  log_info "React Import Issues: $react_import_issues"
  log_info "Missing Export Issues: $export_issues"
  log_info "TypeScript Issues (any/@ts-ignore): $typescript_issues"
  log_info "Missing Test-ID Issues: $testid_issues"
  
  local total_validation_issues=$((react_import_issues + export_issues + typescript_issues + testid_issues))
  
  log_section "COMPLETION IMPACT PREDICTION"
  log_info "Files to be generated:"
  log_info "  Test files: $missing_tests"
  log_info "  Story files: $missing_stories"
  log_info ""
  log_info "Issues to be fixed:"
  log_info "  Total validation issues: $total_validation_issues"
  log_info ""
  
  if [ $missing_tests -eq 0 ] && [ $missing_stories -eq 0 ] && [ $total_validation_issues -eq 0 ]; then
    log_success "REPOSITORY IS ALREADY COMPLETE!"
    log_info "No missing tests, stories, or validation issues found."
  else
    log_info "READY TO RUN COMPLETION WORKFLOW"
    log_info ""
    log_info "Expected results after completion:"
    log_info "  Test Coverage: $overall_test_percent% → 100%"
    log_info "  Story Coverage: $overall_story_percent% → 100%"
    log_info "  Validation Issues: $total_validation_issues → 0"
    log_info ""
    log_info "To proceed, run the completion workflow script."
  fi
  
  log_success "Analysis complete!"
}

# Analyze package
analyze_package() {
  local package=$1
  
  log_section "PACKAGE ANALYSIS: @smolitux/$package"
  
  local pkg_status=$(get_package_status "$package")
  local pkg_components=$(echo "$pkg_status" | cut -d: -f2)
  local pkg_tests=$(echo "$pkg_status" | cut -d: -f3)
  local pkg_stories=$(echo "$pkg_status" | cut -d: -f4)
  local pkg_test_percent=$(echo "$pkg_status" | cut -d: -f5)
  local pkg_story_percent=$(echo "$pkg_status" | cut -d: -f6)
  
  local pkg_missing_tests=$((pkg_components - pkg_tests))
  local pkg_missing_stories=$((pkg_components - pkg_stories))
  
  log_info "Components: $pkg_components"
  log_info "Tests: $pkg_tests/$pkg_components ($pkg_test_percent%) | Missing: $pkg_missing_tests"
  log_info "Stories: $pkg_stories/$pkg_components ($pkg_story_percent%) | Missing: $pkg_missing_stories"
  
  log_section "COMPONENT STATUS"
  
  get_component_list "$package" | while read -r component; do
    local component_status=$(get_component_status "$package" "$component")
    local component_name=$(echo "$component_status" | cut -d: -f1)
    local component_impl=$(echo "$component_status" | cut -d: -f2)
    local component_test=$(echo "$component_status" | cut -d: -f3)
    local component_story=$(echo "$component_status" | cut -d: -f4)
    
    log_info "$component_name: Implementation $component_impl | Test $component_test | Story $component_story"
  done
  
  log_section "VALIDATION ISSUES"
  
  # Check React import issues
  local react_import_issues=$(find "packages/@smolitux/$package" -name "*.tsx" -exec grep -l "React\." {} \; | while read -r file; do
    if ! grep -q "import React" "$file"; then
      echo "$file"
    fi
  done | wc -l)
  
  # Check export issues
  local export_issues=$(find "packages/@smolitux/$package" -name "*.tsx" | grep -v "\.test\.\|\.stories\.\|__tests__" | while read -r file; do
    local basename=$(basename "$file" .tsx)
    if ! grep -q "export.*$basename\|export default" "$file"; then
      echo "$file"
    fi
  done | wc -l)
  
  # Check TypeScript issues
  local typescript_issues=$(find "packages/@smolitux/$package" -name "*.tsx" -exec grep -l "any\|@ts-ignore" {} \; | wc -l)
  
  # Check missing test-id issues
  local testid_issues=$(find "packages/@smolitux/$package" -name "*.tsx" | grep -v "\.test\.\|\.stories\.\|__tests__" | while read -r file; do
    if grep -q "return.*<" "$file" && ! grep -q "data-testid" "$file"; then
      echo "$file"
    fi
  done | wc -l)
  
  log_info "React Import Issues: $react_import_issues"
  log_info "Missing Export Issues: $export_issues"
  log_info "TypeScript Issues (any/@ts-ignore): $typescript_issues"
  log_info "Missing Test-ID Issues: $testid_issues"
  
  local total_validation_issues=$((react_import_issues + export_issues + typescript_issues + testid_issues))
  
  log_section "COMPLETION IMPACT PREDICTION"
  log_info "Files to be generated:"
  log_info "  Test files: $pkg_missing_tests"
  log_info "  Story files: $pkg_missing_stories"
  log_info ""
  log_info "Issues to be fixed:"
  log_info "  Total validation issues: $total_validation_issues"
  log_info ""
  
  if [ $pkg_missing_tests -eq 0 ] && [ $pkg_missing_stories -eq 0 ] && [ $total_validation_issues -eq 0 ]; then
    log_success "PACKAGE IS ALREADY COMPLETE!"
    log_info "No missing tests, stories, or validation issues found."
  else
    log_info "READY TO RUN COMPLETION WORKFLOW"
    log_info ""
    log_info "Expected results after completion:"
    log_info "  Test Coverage: $pkg_test_percent% → 100%"
    log_info "  Story Coverage: $pkg_story_percent% → 100%"
    log_info "  Validation Issues: $total_validation_issues → 0"
    log_info ""
    log_info "To proceed, run the completion workflow script for this package."
  fi
  
  log_success "Package analysis complete!"
}

# Analyze component
analyze_component() {
  local package=$1
  local component=$2
  
  log_section "COMPONENT ANALYSIS: @smolitux/$package/$component"
  
  local component_status=$(get_component_status "$package" "$component")
  local component_name=$(echo "$component_status" | cut -d: -f1)
  local component_impl=$(echo "$component_status" | cut -d: -f2)
  local component_test=$(echo "$component_status" | cut -d: -f3)
  local component_story=$(echo "$component_status" | cut -d: -f4)
  
  log_info "Implementation: $component_impl"
  log_info "Test: $component_test"
  log_info "Story: $component_story"
  
  log_section "COMPONENT FILES"
  
  local component_file="packages/@smolitux/$package/src/components/$component/$component.tsx"
  local test_file="packages/@smolitux/$package/src/components/$component/$component.test.tsx"
  local story_file="packages/@smolitux/$package/src/components/$component/$component.stories.tsx"
  
  if [ -f "$component_file" ]; then
    log_info "Component file: $component_file"
    log_info "$(head -10 "$component_file" | sed 's/^/  /')"
    log_info "  ..."
  else
    log_warning "Component file not found: $component_file"
  fi
  
  if [ -f "$test_file" ]; then
    log_info "Test file: $test_file"
    log_info "$(head -10 "$test_file" | sed 's/^/  /')"
    log_info "  ..."
  else
    log_warning "Test file not found: $test_file"
  fi
  
  if [ -f "$story_file" ]; then
    log_info "Story file: $story_file"
    log_info "$(head -10 "$story_file" | sed 's/^/  /')"
    log_info "  ..."
  else
    log_warning "Story file not found: $story_file"
  fi
  
  log_section "VALIDATION ISSUES"
  
  # Check React import issues
  if [ -f "$component_file" ] && grep -q "React\." "$component_file" && ! grep -q "import React" "$component_file"; then
    log_warning "React import issue: Missing import React"
  fi
  
  # Check export issues
  if [ -f "$component_file" ] && ! grep -q "export.*$component\|export default" "$component_file"; then
    log_warning "Export issue: Missing export for $component"
  fi
  
  # Check TypeScript issues
  if [ -f "$component_file" ] && grep -q "any\|@ts-ignore" "$component_file"; then
    log_warning "TypeScript issue: Using any or @ts-ignore"
  fi
  
  # Check missing test-id issues
  if [ -f "$component_file" ] && grep -q "return.*<" "$component_file" && ! grep -q "data-testid" "$component_file"; then
    log_warning "Test-ID issue: Missing data-testid attribute"
  fi
  
  log_section "COMPLETION IMPACT PREDICTION"
  
  local missing_files=0
  [ "$component_impl" = "❌" ] && missing_files=$((missing_files + 1))
  [ "$component_test" = "❌" ] && missing_files=$((missing_files + 1))
  [ "$component_story" = "❌" ] && missing_files=$((missing_files + 1))
  
  if [ $missing_files -eq 0 ]; then
    log_success "COMPONENT IS ALREADY COMPLETE!"
    log_info "No missing files found."
  else
    log_info "READY TO RUN COMPLETION WORKFLOW"
    log_info ""
    log_info "Files to be generated:"
    [ "$component_impl" = "❌" ] && log_info "  Component file: $component_file"
    [ "$component_test" = "❌" ] && log_info "  Test file: $test_file"
    [ "$component_story" = "❌" ] && log_info "  Story file: $story_file"
    log_info ""
    log_info "To proceed, run the completion workflow script for this component."
  fi
  
  log_success "Component analysis complete!"
}

# Export functions
export -f analyze_repository
export -f analyze_package
export -f analyze_component