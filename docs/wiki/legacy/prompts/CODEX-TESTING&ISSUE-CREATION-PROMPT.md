# 🔍 CODEX TESTING & ISSUE CREATION PROMPT

**Systematische Test-Analyse und strukturierte Issue-Erstellung für Smolitux UI**

## 🎯 **PRIMARY MISSION**

Führe eine **umfassende Test-Analyse** aller Smolitux UI packages durch und erstelle für **jeden identifizierten Fehler** ein strukturiertes GitHub Issue mit:
- ✅ **Vollständige Fehleranalyse** mit Logs und Stack Traces
- ✅ **Reproduzierbare Schritte** zur Fehlernachstellung
- ✅ **Kategorisierung** nach Fehlertyp und Priorität
- ✅ **Lösungsvorschläge** basierend auf Best Practices
- ✅ **Zuweisungen** an entsprechende Labels und Milestones

## 📊 **SYSTEMATISCHER TEST-WORKFLOW**

### **PHASE 1: Comprehensive Package Testing**

#### **Step 1: Repository State Analysis**
```bash
# 1. Analyze current repository state
echo "🔍 STARTING COMPREHENSIVE TEST ANALYSIS"
echo "========================================"

bash scripts/smolitux-analyzer.sh > analysis_report.txt 2>&1

# 2. Create test results directory
mkdir -p test-results/$(date +%Y-%m-%d)
cd test-results/$(date +%Y-%m-%d)

# 3. Document starting state
echo "## Test Analysis Report - $(date)" > test_analysis_report.md
echo "Repository State:" >> test_analysis_report.md
cat ../../analysis_report.txt >> test_analysis_report.md
```

#### **Step 2: Package-by-Package Testing**
```bash
# Test each package systematically
PACKAGES=("core" "theme" "utils" "testing" "layout" "charts" "media" "community" "ai" "blockchain" "resonance" "federation" "voice-control")

for pkg in "${PACKAGES[@]}"; do
    echo "🧪 Testing @smolitux/$pkg..."
    
    # Create package-specific test directory
    mkdir -p "$pkg"
    
    # Run comprehensive tests with detailed logging
    test_package_comprehensive "$pkg"
done
```

#### **Step 3: Comprehensive Test Function**
```bash
test_package_comprehensive() {
    local pkg=$1
    local pkg_dir="packages/@smolitux/$pkg"
    local results_dir="$pkg"
    
    echo "📋 Testing Package: @smolitux/$pkg" | tee "$results_dir/test_summary.log"
    echo "=====================================" | tee -a "$results_dir/test_summary.log"
    
    # Test 1: TypeScript Compilation
    echo "🔧 TypeScript Compilation Test..." | tee -a "$results_dir/test_summary.log"
    if npm run type-check --workspace=@smolitux/$pkg > "$results_dir/typescript.log" 2>&1; then
        echo "✅ TypeScript: PASS" | tee -a "$results_dir/test_summary.log"
    else
        echo "❌ TypeScript: FAIL" | tee -a "$results_dir/test_summary.log"
        analyze_typescript_errors "$pkg" "$results_dir/typescript.log"
    fi
    
    # Test 2: ESLint Analysis
    echo "🔍 ESLint Analysis..." | tee -a "$results_dir/test_summary.log"
    if npm run lint --workspace=@smolitux/$pkg > "$results_dir/eslint.log" 2>&1; then
        echo "✅ ESLint: PASS" | tee -a "$results_dir/test_summary.log"
    else
        echo "❌ ESLint: FAIL" | tee -a "$results_dir/test_summary.log"
        analyze_eslint_errors "$pkg" "$results_dir/eslint.log"
    fi
    
    # Test 3: Unit Tests
    echo "🧪 Unit Tests..." | tee -a "$results_dir/test_summary.log"
    if npm test --workspace=@smolitux/$pkg > "$results_dir/unit_tests.log" 2>&1; then
        echo "✅ Unit Tests: PASS" | tee -a "$results_dir/test_summary.log"
    else
        echo "❌ Unit Tests: FAIL" | tee -a "$results_dir/test_summary.log"
        analyze_test_failures "$pkg" "$results_dir/unit_tests.log"
    fi
    
    # Test 4: Build Process
    echo "🏗️ Build Process..." | tee -a "$results_dir/test_summary.log"
    if npm run build --workspace=@smolitux/$pkg > "$results_dir/build.log" 2>&1; then
        echo "✅ Build: PASS" | tee -a "$results_dir/test_summary.log"
    else
        echo "❌ Build: FAIL" | tee -a "$results_dir/test_summary.log"
        analyze_build_errors "$pkg" "$results_dir/build.log"
    fi
    
    # Test 5: Dependency Analysis
    echo "📦 Dependency Analysis..." | tee -a "$results_dir/test_summary.log"
    if npm ls --workspace=@smolitux/$pkg > "$results_dir/dependencies.log" 2>&1; then
        echo "✅ Dependencies: PASS" | tee -a "$results_dir/test_summary.log"
    else
        echo "❌ Dependencies: FAIL" | tee -a "$results_dir/test_summary.log"
        analyze_dependency_issues "$pkg" "$results_dir/dependencies.log"
    fi
    
    # Test 6: Storybook Validation (if applicable)
    if [ -f "$pkg_dir/src/**/*.stories.tsx" ]; then
        echo "📚 Storybook Validation..." | tee -a "$results_dir/test_summary.log"
        validate_storybook_files "$pkg" "$results_dir"
    fi
    
    # Generate package summary
    generate_package_summary "$pkg" "$results_dir"
}
```

### **PHASE 2: Error Analysis Functions**

#### **TypeScript Error Analysis**
```bash
analyze_typescript_errors() {
    local pkg=$1
    local log_file=$2
    local issue_file="$pkg/typescript_issues.json"
    
    echo "🔍 Analyzing TypeScript errors for @smolitux/$pkg..."
    
    # Extract TypeScript errors
    grep -n "error TS" "$log_file" | while read -r line; do
        local file_path=$(echo "$line" | cut -d'(' -f1)
        local line_number=$(echo "$line" | cut -d'(' -f2 | cut -d',' -f1)
        local error_code=$(echo "$line" | grep -o "TS[0-9]*")
        local error_message=$(echo "$line" | sed 's/.*): error TS[0-9]*: //')
        
        create_typescript_issue "$pkg" "$file_path" "$line_number" "$error_code" "$error_message"
    done
    
    # Look for common TypeScript issues
    if grep -q "any" "$log_file"; then
        create_typescript_any_usage_issue "$pkg" "$log_file"
    fi
    
    if grep -q "@ts-ignore" "$log_file"; then
        create_typescript_ignore_issue "$pkg" "$log_file"
    fi
}
```

#### **ESLint Error Analysis**
```bash
analyze_eslint_errors() {
    local pkg=$1
    local log_file=$2
    
    echo "🔍 Analyzing ESLint errors for @smolitux/$pkg..."
    
    # Extract ESLint errors by type
    grep "error" "$log_file" | while read -r line; do
        local file_path=$(echo "$line" | awk '{print $1}')
        local line_number=$(echo "$line" | awk '{print $2}')
        local rule_name=$(echo "$line" | awk '{print $4}')
        local error_message=$(echo "$line" | cut -d' ' -f5-)
        
        create_eslint_issue "$pkg" "$file_path" "$line_number" "$rule_name" "$error_message"
    done
    
    # Check for specific ESLint rule violations
    check_eslint_rule_violations "$pkg" "$log_file"
}
```

#### **Test Failure Analysis**
```bash
analyze_test_failures() {
    local pkg=$1
    local log_file=$2
    
    echo "🔍 Analyzing test failures for @smolitux/$pkg..."
    
    # Extract failed tests
    grep -A 5 "FAIL" "$log_file" | while read -r block; do
        local test_file=$(echo "$block" | grep "FAIL" | awk '{print $2}')
        local test_name=$(echo "$block" | grep "✕" | sed 's/.*✕ //')
        local error_details=$(echo "$block" | tail -3)
        
        create_test_failure_issue "$pkg" "$test_file" "$test_name" "$error_details"
    done
    
    # Check for specific test issues
    if grep -q "ReferenceError" "$log_file"; then
        create_reference_error_issue "$pkg" "$log_file"
    fi
    
    if grep -q "TypeError" "$log_file"; then
        create_type_error_issue "$pkg" "$log_file"
    fi
    
    if grep -q "SyntaxError" "$log_file"; then
        create_syntax_error_issue "$pkg" "$log_file"
    fi
}
```

#### **Build Error Analysis**
```bash
analyze_build_errors() {
    local pkg=$1
    local log_file=$2
    
    echo "🔍 Analyzing build errors for @smolitux/$pkg..."
    
    # Check for module resolution issues
    if grep -q "Module not found" "$log_file"; then
        create_module_not_found_issue "$pkg" "$log_file"
    fi
    
    # Check for circular dependency issues
    if grep -q "Circular dependency" "$log_file"; then
        create_circular_dependency_issue "$pkg" "$log_file"
    fi
    
    # Check for export/import issues
    if grep -q "export" "$log_file" && grep -q "not found" "$log_file"; then
        create_export_import_issue "$pkg" "$log_file"
    fi
    
    # Check for TypeScript compilation in build
    if grep -q "TS" "$log_file"; then
        create_build_typescript_issue "$pkg" "$log_file"
    fi
}
```

### **PHASE 3: Issue Creation Templates**

#### **TypeScript Issue Template**
```bash
create_typescript_issue() {
    local pkg=$1
    local file_path=$2
    local line_number=$3
    local error_code=$4
    local error_message=$5
    local timestamp=$(date +%Y%m%d_%H%M%S)
    
    cat > "issues/typescript_${pkg}_${error_code}_${timestamp}.md" << EOF
---
title: "TypeScript Error ${error_code} in @smolitux/${pkg}"
labels: ["bug", "typescript", "package:${pkg}", "priority:high"]
assignees: []
milestone: "TypeScript Migration"
---

## 🐛 TypeScript Error Description

**Error Code:** \`${error_code}\`
**Package:** \`@smolitux/${pkg}\`
**File:** \`${file_path}\`
**Line:** \`${line_number}\`

### Error Message
\`\`\`
${error_message}
\`\`\`

### Current Behavior
TypeScript compilation fails with error \`${error_code}\` in the specified file and line.

### Expected Behavior
TypeScript should compile without errors with proper type safety.

### Steps to Reproduce
1. Navigate to \`packages/@smolitux/${pkg}\`
2. Run \`npm run type-check\`
3. Observe error at \`${file_path}:${line_number}\`

### Error Analysis
$(analyze_typescript_error_code "$error_code")

### Suggested Solution
$(suggest_typescript_solution "$error_code" "$error_message")

### Additional Context
- **Package:** @smolitux/${pkg}
- **TypeScript Version:** $(get_typescript_version)
- **Error Category:** $(categorize_typescript_error "$error_code")
- **Priority:** $(determine_error_priority "$error_code")

### Related Files
- [ ] Check for similar errors in related components
- [ ] Verify type definitions in \`${file_path}\`
- [ ] Review imports and exports

### Definition of Done
- [ ] TypeScript error \`${error_code}\` is resolved
- [ ] No new TypeScript errors introduced
- [ ] All existing tests continue to pass
- [ ] Type safety is maintained or improved
EOF

    echo "📝 Created TypeScript issue: typescript_${pkg}_${error_code}_${timestamp}.md"
}
```

#### **ESLint Issue Template**
```bash
create_eslint_issue() {
    local pkg=$1
    local file_path=$2
    local line_number=$3
    local rule_name=$4
    local error_message=$5
    local timestamp=$(date +%Y%m%d_%H%M%S)
    
    cat > "issues/eslint_${pkg}_${rule_name}_${timestamp}.md" << EOF
---
title: "ESLint Rule Violation: ${rule_name} in @smolitux/${pkg}"
labels: ["code-quality", "eslint", "package:${pkg}", "$(determine_eslint_priority "$rule_name")"]
assignees: []
milestone: "Code Quality"
---

## 🔍 ESLint Rule Violation

**Rule:** \`${rule_name}\`
**Package:** \`@smolitux/${pkg}\`
**File:** \`${file_path}\`
**Line:** \`${line_number}\`

### Error Message
\`\`\`
${error_message}
\`\`\`

### Current Behavior
ESLint rule \`${rule_name}\` is being violated in the specified location.

### Expected Behavior
Code should comply with the configured ESLint rules.

### Steps to Reproduce
1. Navigate to \`packages/@smolitux/${pkg}\`
2. Run \`npm run lint\`
3. Observe violation at \`${file_path}:${line_number}\`

### Rule Documentation
$(get_eslint_rule_documentation "$rule_name")

### Suggested Fix
$(suggest_eslint_fix "$rule_name" "$error_message")

### Code Context
\`\`\`typescript
$(extract_code_context "$file_path" "$line_number")
\`\`\`

### Additional Context
- **ESLint Config:** $(get_eslint_config_info)
- **Rule Category:** $(categorize_eslint_rule "$rule_name")
- **Auto-fixable:** $(check_eslint_autofix "$rule_name")

### Definition of Done
- [ ] ESLint rule \`${rule_name}\` violation is fixed
- [ ] No new ESLint violations introduced
- [ ] Code maintains or improves readability
- [ ] All tests continue to pass
EOF

    echo "📝 Created ESLint issue: eslint_${pkg}_${rule_name}_${timestamp}.md"
}
```

#### **Test Failure Issue Template**
```bash
create_test_failure_issue() {
    local pkg=$1
    local test_file=$2
    local test_name=$3
    local error_details=$4
    local timestamp=$(date +%Y%m%d_%H%M%S)
    
    cat > "issues/test_failure_${pkg}_${timestamp}.md" << EOF
---
title: "Test Failure: ${test_name} in @smolitux/${pkg}"
labels: ["bug", "test-failure", "package:${pkg}", "priority:high"]
assignees: []
milestone: "Test Stability"
---

## 🧪 Test Failure Description

**Test File:** \`${test_file}\`
**Test Name:** \`${test_name}\`
**Package:** \`@smolitux/${pkg}\`

### Failure Details
\`\`\`
${error_details}
\`\`\`

### Current Behavior
The test \`${test_name}\` is failing with the error shown above.

### Expected Behavior
The test should pass consistently and validate the expected functionality.

### Steps to Reproduce
1. Navigate to \`packages/@smolitux/${pkg}\`
2. Run \`npm test -- --testPathPattern="${test_file}"\`
3. Observe the test failure

### Error Analysis
$(analyze_test_error_type "$error_details")

### Suggested Investigation
$(suggest_test_investigation "$test_name" "$error_details")

### Test Context
\`\`\`typescript
$(extract_test_code "$test_file" "$test_name")
\`\`\`

### Related Components
- [ ] Component under test: $(extract_component_name "$test_file")
- [ ] Dependencies: $(list_test_dependencies "$test_file")
- [ ] Mock setup: $(check_mock_setup "$test_file")

### Additional Context
- **Jest Version:** $(get_jest_version)
- **Test Environment:** $(get_test_environment)
- **Failure Type:** $(categorize_test_failure "$error_details")

### Definition of Done
- [ ] Test \`${test_name}\` passes consistently
- [ ] Root cause of failure is identified and fixed
- [ ] No regression in other tests
- [ ] Test coverage is maintained or improved
EOF

    echo "📝 Created test failure issue: test_failure_${pkg}_${timestamp}.md"
}
```

#### **Build Error Issue Template**
```bash
create_build_error_issue() {
    local pkg=$1
    local error_type=$2
    local error_details=$3
    local timestamp=$(date +%Y%m%d_%H%M%S)
    
    cat > "issues/build_error_${pkg}_${error_type}_${timestamp}.md" << EOF
---
title: "Build Error: ${error_type} in @smolitux/${pkg}"
labels: ["bug", "build", "package:${pkg}", "priority:critical"]
assignees: []
milestone: "Build Stability"
---

## 🏗️ Build Error Description

**Error Type:** \`${error_type}\`
**Package:** \`@smolitux/${pkg}\`

### Error Details
\`\`\`
${error_details}
\`\`\`

### Current Behavior
The build process fails with the error shown above.

### Expected Behavior
The package should build successfully without errors.

### Steps to Reproduce
1. Navigate to \`packages/@smolitux/${pkg}\`
2. Run \`npm run build\`
3. Observe the build failure

### Build Configuration
$(get_build_configuration "$pkg")

### Error Analysis
$(analyze_build_error "$error_type" "$error_details")

### Suggested Solution
$(suggest_build_solution "$error_type" "$error_details")

### Build Context
- **Build Tool:** $(get_build_tool "$pkg")
- **Dependencies:** $(list_build_dependencies "$pkg")
- **Configuration Files:** $(list_config_files "$pkg")

### Additional Context
- **Node Version:** $(node --version)
- **npm Version:** $(npm --version)
- **Build Environment:** $(get_build_environment)

### Definition of Done
- [ ] Build process completes successfully
- [ ] All generated files are correct
- [ ] No new build warnings or errors
- [ ] Package can be imported and used correctly
EOF

    echo "📝 Created build error issue: build_error_${pkg}_${error_type}_${timestamp}.md"
}
```

### **PHASE 4: Comprehensive Analysis & Reporting**

#### **Generate Master Test Report**
```bash
generate_master_test_report() {
    local timestamp=$(date +%Y-%m-%d_%H-%M-%S)
    local report_file="MASTER_TEST_REPORT_${timestamp}.md"
    
    cat > "$report_file" << EOF
# 🔍 Smolitux UI Comprehensive Test Analysis Report

**Generated:** $(date)
**Analyzer:** Codex AI
**Repository:** Smolitux UI Component Library

## 📊 Executive Summary

$(generate_executive_summary)

## 📦 Package Test Results

$(generate_package_results_summary)

## 🐛 Issues Created

$(generate_issues_summary)

## 📈 Quality Metrics

$(generate_quality_metrics)

## 🎯 Recommendations

$(generate_recommendations)

## 📋 Next Steps

$(generate_next_steps)

EOF

    echo "📋 Master test report generated: $report_file"
}
```

#### **Issue Summary Generation**
```bash
generate_issues_summary() {
    echo "### Created Issues by Category"
    echo ""
    echo "| Category | Package | Count | Priority |"
    echo "|----------|---------|-------|----------|"
    
    find issues/ -name "*.md" | while read issue_file; do
        local category=$(basename "$issue_file" | cut -d'_' -f1)
        local package=$(basename "$issue_file" | cut -d'_' -f2)
        local priority=$(grep "priority:" "$issue_file" | head -1 | cut -d':' -f2 | tr -d ' "')
        
        echo "| $category | @smolitux/$package | 1 | $priority |"
    done | sort | uniq -c | awk '{print "| " $2 " | " $3 " | " $1 " | " $4 " |"}'
    
    echo ""
    echo "### Issue Distribution"
    echo ""
    
    local total_issues=$(find issues/ -name "*.md" | wc -l)
    local typescript_issues=$(find issues/ -name "typescript_*.md" | wc -l)
    local eslint_issues=$(find issues/ -name "eslint_*.md" | wc -l)
    local test_issues=$(find issues/ -name "test_*.md" | wc -l)
    local build_issues=$(find issues/ -name "build_*.md" | wc -l)
    
    echo "- **Total Issues Created:** $total_issues"
    echo "- **TypeScript Issues:** $typescript_issues"
    echo "- **ESLint Issues:** $eslint_issues"
    echo "- **Test Failures:** $test_issues"
    echo "- **Build Errors:** $build_issues"
}
```

### **PHASE 5: GitHub Integration**

#### **Create GitHub Issues (if API available)**
```bash
create_github_issues() {
    echo "🔄 Creating GitHub Issues..."
    
    find issues/ -name "*.md" | while read issue_file; do
        if command -v gh &> /dev/null; then
            echo "📝 Creating GitHub issue from $issue_file..."
            
            # Extract title, labels, and body
            local title=$(grep "^title:" "$issue_file" | cut -d'"' -f2)
            local labels=$(grep "^labels:" "$issue_file" | sed 's/labels: //' | tr -d '[]"')
            local body=$(sed '/^---$/,/^---$/d' "$issue_file")
            
            # Create the issue
            gh issue create \
                --title "$title" \
                --body "$body" \
                --label "$labels"
            
            echo "✅ Created: $title"
        else
            echo "⚠️ GitHub CLI not available. Issues saved locally in $issue_file"
        fi
    done
}
```

## 🎯 **EXECUTION INSTRUCTIONS**

### **Step 1: Initialize Testing Environment**
```bash
# Create testing workspace
mkdir -p smolitux-testing-analysis
cd smolitux-testing-analysis

# Create required directories
mkdir -p {test-results,issues,logs,reports}

# Initialize analysis
echo "🚀 Starting Smolitux UI Comprehensive Testing Analysis..."
date > analysis_start_time.txt
```

### **Step 2: Execute Comprehensive Testing**
```bash
# Run the systematic testing workflow
execute_comprehensive_testing() {
    echo "📋 EXECUTING COMPREHENSIVE TESTING WORKFLOW"
    echo "============================================"
    
    # Phase 1: Repository Analysis
    analyze_repository_state
    
    # Phase 2: Package Testing
    test_all_packages
    
    # Phase 3: Error Analysis
    analyze_all_errors
    
    # Phase 4: Issue Creation
    create_all_issues
    
    # Phase 5: Reporting
    generate_comprehensive_report
    
    # Phase 6: GitHub Integration (if available)
    create_github_issues_if_possible
    
    echo "✅ Comprehensive testing analysis complete!"
}
```

### **Step 3: Review and Validate Issues**
```bash
# Review created issues
review_created_issues() {
    echo "📋 REVIEW CREATED ISSUES"
    echo "========================"
    
    local total_issues=$(find issues/ -name "*.md" | wc -l)
    echo "Total Issues Created: $total_issues"
    
    # Categorize by priority
    echo ""
    echo "Issues by Priority:"
    grep -h "priority:" issues/*.md | sort | uniq -c
    
    # List all issue files
    echo ""
    echo "Created Issue Files:"
    ls -la issues/
}
```

## ✅ **SUCCESS CRITERIA**

### **Completion Checklist:**
- [ ] All 13 packages tested systematically
- [ ] Every error/warning/failure analyzed  
- [ ] Individual issues created for each problem
- [ ] Issues properly categorized and prioritized
- [ ] Comprehensive test report generated
- [ ] GitHub issues created (if API available)
- [ ] Next steps and recommendations provided

### **Issue Quality Standards:**
- [ ] Clear, descriptive titles
- [ ] Detailed error descriptions with logs
- [ ] Reproducible steps provided
- [ ] Suggested solutions included
- [ ] Proper labels and categorization
- [ ] Context and additional information

### **Expected Outcomes:**
- **Complete Error Inventory:** Every issue documented
- **Prioritized Issue Backlog:** Critical issues identified
- **Actionable Solutions:** Clear next steps provided
- **Quality Baseline:** Current state documented
- **Progress Tracking:** Framework for monitoring fixes

---

**🎯 EXECUTE THIS PROMPT:** Use this systematic approach to comprehensively test all Smolitux UI packages, analyze every error and problem in detail, and create structured GitHub issues for each identified issue. Maintain high standards for issue quality and provide actionable solutions for efficient problem resolution.
