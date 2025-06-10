#!/bin/bash

# SMOLITUX CORE VALIDATION
# Core validation functions for Smolitux scripts

# Source utils
source "$(dirname "$0")/utils.sh"

# Validate component
validate_component_quality() {
  local package=$1
  local component=$2
  local score=0
  local max_score=10
  
  log_section "QUALITY VALIDATION: @smolitux/$package/$component"
  
  # 1. TypeScript compliance (2 points)
  if ! grep -q ": any\|@ts-ignore" "packages/@smolitux/$package/src/components/$component/$component.tsx"; then
    log_success "TypeScript strict compliance"
    ((score += 2))
  else
    log_error "TypeScript issues found"
  fi
  
  # 2. Test coverage (2 points)
  if [ -f "packages/@smolitux/$package/src/components/$component/$component.test.tsx" ]; then
    log_success "Test file exists"
    ((score += 2))
  else
    log_error "Missing test file"
  fi
  
  # 3. Storybook documentation (1 point)
  if [ -f "packages/@smolitux/$package/src/components/$component/$component.stories.tsx" ]; then
    log_success "Story file exists"
    ((score += 1))
  else
    log_error "Missing story file"
  fi
  
  # 4. Accessibility (2 points)
  if grep -q "jest-axe\|toHaveNoViolations" "packages/@smolitux/$package/src/components/$component/$component.test.tsx" 2>/dev/null; then
    log_success "Accessibility tests present"
    ((score += 2))
  else
    log_error "Missing accessibility tests"
  fi
  
  # 5. forwardRef pattern (1 point)
  if grep -q "forwardRef" "packages/@smolitux/$package/src/components/$component/$component.tsx" 2>/dev/null; then
    log_success "forwardRef implemented"
    ((score += 1))
  else
    log_error "Missing forwardRef"
  fi
  
  # 6. Test ID (1 point)
  if grep -q "data-testid" "packages/@smolitux/$package/src/components/$component/$component.tsx" 2>/dev/null; then
    log_success "Test ID present"
    ((score += 1))
  else
    log_error "Missing test ID"
  fi
  
  # 7. Export structure (1 point)
  if grep -q "export.*$component\|export default" "packages/@smolitux/$package/src/components/$component/$component.tsx" 2>/dev/null; then
    log_success "Proper exports"
    ((score += 1))
  else
    log_error "Missing exports"
  fi
  
  log_info "Quality Score: $score/$max_score"
  
  if [ $score -eq $max_score ]; then
    log_success "Component is production-ready!"
    return 0
  else
    log_warning "Component needs improvement"
    return 1
  fi
}

# Validate package
validate_package_quality() {
  local package=$1
  local total_components=0
  local passing_components=0
  
  log_section "PACKAGE VALIDATION: @smolitux/$package"
  
  # Get component list
  local components=$(get_component_list "$package")
  
  if [ -z "$components" ]; then
    log_warning "No components found in package: @smolitux/$package"
    return 1
  fi
  
  # Validate each component
  echo "$components" | while read -r component; do
    ((total_components++))
    
    if validate_component_quality "$package" "$component"; then
      ((passing_components++))
    fi
  done
  
  # Calculate pass rate
  local pass_rate=0
  if [ $total_components -gt 0 ]; then
    pass_rate=$((passing_components * 100 / total_components))
  fi
  
  log_section "PACKAGE VALIDATION SUMMARY"
  log_info "Total Components: $total_components"
  log_info "Passing Components: $passing_components"
  log_info "Pass Rate: $pass_rate%"
  
  if [ $pass_rate -eq 100 ]; then
    log_success "Package is production-ready!"
    return 0
  else
    log_warning "Package needs improvement"
    return 1
  fi
}

# Validate all packages
validate_all_packages() {
  local total_packages=0
  local passing_packages=0
  
  log_section "REPOSITORY VALIDATION"
  
  for package in "${PACKAGES[@]}"; do
    local pkg_dir="packages/@smolitux/$package"
    if [ -d "$pkg_dir" ]; then
      ((total_packages++))
      
      if validate_package_quality "$package"; then
        ((passing_packages++))
      fi
    fi
  done
  
  # Calculate pass rate
  local pass_rate=0
  if [ $total_packages -gt 0 ]; then
    pass_rate=$((passing_packages * 100 / total_packages))
  fi
  
  log_section "REPOSITORY VALIDATION SUMMARY"
  log_info "Total Packages: $total_packages"
  log_info "Passing Packages: $passing_packages"
  log_info "Pass Rate: $pass_rate%"
  
  if [ $pass_rate -eq 100 ]; then
    log_success "Repository is production-ready!"
    return 0
  else
    log_warning "Repository needs improvement"
    return 1
  fi
}

# Validate build
validate_build() {
  local package=$1
  
  log_section "BUILD VALIDATION"
  
  if [ -n "$package" ]; then
    log_info "Building package: @smolitux/$package"
    if npm run build --workspace=@smolitux/$package; then
      log_success "Build successful for @smolitux/$package"
      return 0
    else
      log_error "Build failed for @smolitux/$package"
      return 1
    fi
  else
    log_info "Building all packages"
    if npm run build; then
      log_success "Build successful for all packages"
      return 0
    else
      log_error "Build failed for all packages"
      return 1
    fi
  fi
}

# Validate tests
validate_tests() {
  local package=$1
  local component=$2
  
  log_section "TEST VALIDATION"
  
  if [ -n "$component" ] && [ -n "$package" ]; then
    log_info "Testing component: @smolitux/$package/$component"
    if npm test --workspace=@smolitux/$package -- --testPathPattern="$component" --passWithNoTests; then
      log_success "Tests passed for @smolitux/$package/$component"
      return 0
    else
      log_error "Tests failed for @smolitux/$package/$component"
      return 1
    fi
  elif [ -n "$package" ]; then
    log_info "Testing package: @smolitux/$package"
    if npm test --workspace=@smolitux/$package -- --passWithNoTests; then
      log_success "Tests passed for @smolitux/$package"
      return 0
    else
      log_error "Tests failed for @smolitux/$package"
      return 1
    fi
  else
    log_info "Testing all packages"
    if npm test -- --passWithNoTests; then
      log_success "Tests passed for all packages"
      return 0
    else
      log_error "Tests failed for all packages"
      return 1
    fi
  fi
}

# Validate lint
validate_lint() {
  local package=$1
  
  log_section "LINT VALIDATION"
  
  if [ -n "$package" ]; then
    log_info "Linting package: @smolitux/$package"
    if npm run lint --workspace=@smolitux/$package; then
      log_success "Lint passed for @smolitux/$package"
      return 0
    else
      log_error "Lint failed for @smolitux/$package"
      return 1
    fi
  else
    log_info "Linting all packages"
    if npm run lint; then
      log_success "Lint passed for all packages"
      return 0
    else
      log_error "Lint failed for all packages"
      return 1
    fi
  fi
}

# Validate storybook
validate_storybook() {
  log_section "STORYBOOK VALIDATION"
  
  log_info "Building Storybook"
  if npm run build-storybook; then
    log_success "Storybook build successful"
    return 0
  else
    log_error "Storybook build failed"
    return 1
  fi
}

# Validate production readiness
validate_production_readiness() {
  log_section "PRODUCTION READINESS VALIDATION"
  
  local all_passed=true
  
  # 1. Build validation
  log_info "Build Validation..."
  if npm run build >/dev/null 2>&1; then
    log_success "All packages build successfully"
  else
    log_error "Build failures detected"
    all_passed=false
  fi
  
  # 2. Test validation
  log_info "Test Validation..."
  if npm test -- --passWithNoTests >/dev/null 2>&1; then
    log_success "All tests pass"
  else
    log_error "Test failures detected"
    all_passed=false
  fi
  
  # 3. Lint validation
  log_info "Lint Validation..."
  if npm run lint >/dev/null 2>&1; then
    log_success "No lint errors"
  else
    log_error "Lint errors detected"
    all_passed=false
  fi
  
  # 4. TypeScript validation
  log_info "TypeScript Validation..."
  if npm run type-check >/dev/null 2>&1; then
    log_success "No TypeScript errors"
  else
    log_error "TypeScript errors detected"
    all_passed=false
  fi
  
  # 5. Coverage validation
  log_info "Coverage Validation..."
  local total_components=$(find packages/@smolitux -name "*.tsx" | grep -v "\.test\.\|\.stories\." | wc -l)
  local total_tests=$(find packages/@smolitux -name "*.test.tsx" | wc -l)
  local total_stories=$(find packages/@smolitux -name "*.stories.tsx" | wc -l)
  
  local test_coverage=0
  local story_coverage=0
  
  if [ $total_components -gt 0 ]; then
    test_coverage=$((total_tests * 100 / total_components))
    story_coverage=$((total_stories * 100 / total_components))
  fi
  
  if [ $test_coverage -ge 95 ]; then
    log_success "Test coverage: $test_coverage%"
  else
    log_error "Test coverage too low: $test_coverage% (target: 95%)"
    all_passed=false
  fi
  
  if [ $story_coverage -ge 95 ]; then
    log_success "Story coverage: $story_coverage%"
  else
    log_error "Story coverage too low: $story_coverage% (target: 95%)"
    all_passed=false
  fi
  
  # Final result
  log_info ""
  if [ "$all_passed" = true ]; then
    log_success "PRODUCTION READY!"
    log_info "All validation criteria passed. Ready for release."
    return 0
  else
    log_warning "NOT PRODUCTION READY"
    log_info "Please address the issues above before release."
    return 1
  fi
}

# Export functions
export -f validate_component_quality
export -f validate_package_quality
export -f validate_all_packages
export -f validate_build
export -f validate_tests
export -f validate_lint
export -f validate_storybook
export -f validate_production_readiness