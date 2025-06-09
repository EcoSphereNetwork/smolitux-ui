#!/bin/bash

# ═══════════════════════════════════════════════════════════════════════════════
# 🚀 RUN_COMPLETE_ANALYSIS.SH - Vollständige Smolitux UI Analyse & Issue Creation
# ═══════════════════════════════════════════════════════════════════════════════

set -euo pipefail

echo "🚀 SMOLITUX UI COMPLETE ANALYSIS & ISSUE CREATION"
echo "================================================="
echo ""

# ───────────────────────────────────────────────
# Configuration
# ───────────────────────────────────────────────
PACKAGES=("core" "theme" "utils" "testing" "layout" "charts" "media" "community" "ai" "blockchain" "resonance" "federation" "voice-control")
TOTAL_ISSUES=0
START_TIME=$(date +%s)

# Check prerequisites
check_prerequisites() {
    echo "🔍 Checking prerequisites..."
    
    # GitHub CLI
    if ! command -v gh &> /dev/null; then
        echo "❌ GitHub CLI not found. Installing..."
        apt-get update > /dev/null 2>&1
        apt-get install -y gh > /dev/null 2>&1
    fi
    
    # GitHub auth
    if ! gh auth status &> /dev/null; then
        echo "❌ GitHub authentication required"
        echo "   Run: gh auth login"
        exit 1
    fi
    
    # Repository structure
    if [ ! -d "packages/@smolitux" ]; then
        echo "❌ Not in Smolitux UI repository root"
        exit 1
    fi
    
    echo "  ✅ Prerequisites OK"
}

# Phase 1: Analyzer Issues
run_analyzer_issues() {
    echo ""
    echo "📊 PHASE 1: CREATING ANALYZER ISSUES"
    echo "====================================="
    
    if [ -f "create_issues.sh" ]; then
        echo "🔍 Loading analyzer issue creation..."
        source create_issues.sh
        
        echo "🚀 Creating analyzer validation issues..."
        create_analyzer_issues
        
        ANALYZER_ISSUES=$(gh issue list --label ERROR,WARN --state open | wc -l)
        TOTAL_ISSUES=$((TOTAL_ISSUES + ANALYZER_ISSUES))
        echo "  ✅ Analyzer issues created: $ANALYZER_ISSUES"
    else
        echo "⚠️  create_issues.sh not found - skipping analyzer issues"
    fi
}

# Phase 2: Package Testing & Issues
run_package_testing() {
    echo ""
    echo "📦 PHASE 2: PACKAGE TESTING & ISSUE CREATION"
    echo "============================================"
    
    local SUCCESSFUL_PACKAGES=0
    local FAILED_PACKAGES=0
    
    for pkg in "${PACKAGES[@]}"; do
        echo ""
        echo "🔄 Processing @smolitux/$pkg..."
        
        PKG_DIR="packages/@smolitux/$pkg"
        if [ ! -d "$PKG_DIR" ]; then
            echo "  ⚠️  Package directory not found: $PKG_DIR"
            FAILED_PACKAGES=$((FAILED_PACKAGES + 1))
            continue
        fi
        
        cd "$PKG_DIR"
        
        # Check package.json for scripts
        AVAILABLE_SCRIPTS=""
        if [ -f "package.json" ]; then
            if grep -q '"lint"' package.json; then
                AVAILABLE_SCRIPTS="$AVAILABLE_SCRIPTS lint"
            fi
            if grep -q '"test"' package.json; then
                AVAILABLE_SCRIPTS="$AVAILABLE_SCRIPTS test"
            fi
            if grep -q '"build"' package.json; then
                AVAILABLE_SCRIPTS="$AVAILABLE_SCRIPTS build"
            fi
        fi
        
        echo "  📋 Available scripts:$AVAILABLE_SCRIPTS"
        
        # Run available scripts
        PKG_ISSUES_BEFORE=$(gh issue list --label "package:$pkg" --state open | wc -l)
        
        if [[ "$AVAILABLE_SCRIPTS" == *"lint"* ]]; then
            echo "  🔍 Running lint..."
            npm run lint 2>&1 | tee lint.log > /dev/null || true
        fi
        
        if [[ "$AVAILABLE_SCRIPTS" == *"test"* ]]; then
            echo "  🧪 Running tests..."
            npm test 2>&1 | tee test.log > /dev/null || true
        fi
        
        if [[ "$AVAILABLE_SCRIPTS" == *"build"* ]]; then
            echo "  🔨 Running build..."
            npm run build 2>&1 | tee build.log > /dev/null || true
        fi
        
        # Create issues from logs
        if [ -f "../../create_package_issues.sh" ]; then
            echo "  📝 Creating issues from test results..."
            bash ../../create_package_issues.sh "$pkg" > /dev/null 2>&1 || true
        fi
        
        PKG_ISSUES_AFTER=$(gh issue list --label "package:$pkg" --state open | wc -l)
        PKG_NEW_ISSUES=$((PKG_ISSUES_AFTER - PKG_ISSUES_BEFORE))
        
        echo "  ✅ Package complete: $PKG_NEW_ISSUES new issues"
        TOTAL_ISSUES=$((TOTAL_ISSUES + PKG_NEW_ISSUES))
        SUCCESSFUL_PACKAGES=$((SUCCESSFUL_PACKAGES + 1))
        
        cd ../../..
    done
    
    echo ""
    echo "📊 Package Testing Summary:"
    echo "  ✅ Successful: $SUCCESSFUL_PACKAGES packages"
    echo "  ❌ Failed: $FAILED_PACKAGES packages"
}

# Final Report
generate_final_report() {
    local END_TIME=$(date +%s)
    local DURATION=$((END_TIME - START_TIME))
    
    echo ""
    echo "🎉 ANALYSIS COMPLETE!"
    echo "===================="
    echo ""
    echo "📊 Final Statistics:"
    echo "  ⏱️  Duration: ${DURATION}s"
    echo "  📈 Total Issues Created: $TOTAL_ISSUES"
    echo "  📦 Packages Processed: ${#PACKAGES[@]}"
    echo ""
    echo "🏷️  Issues by Type:"
    echo "  🔴 Critical (build): $(gh issue list --label priority:critical --state open | wc -l)"
    echo "  🟠 High (errors): $(gh issue list --label priority:high --state open | wc -l)"
    echo "  🔧 Code Quality: $(gh issue list --label code-quality --state open | wc -l)"
    echo "  🧪 Test Failures: $(gh issue list --label test-failure --state open | wc -l)"
    echo ""
    echo "📦 Issues by Package:"
    for pkg in "${PACKAGES[@]}"; do
        local count=$(gh issue list --label "package:$pkg" --state open | wc -l)
        if [ $count -gt 0 ]; then
            echo "  @smolitux/$pkg: $count"
        fi
    done
    echo ""
    echo "🔗 Quick Links:"
    echo "  • All Issues: gh issue list --state open"
    echo "  • Critical Issues: gh issue list --label priority:critical --state open"
    echo "  • Code Quality: gh issue list --label code-quality --state open"
    echo ""
    
    # Save report
    cat > ANALYSIS_REPORT.md <<EOF
# Smolitux UI Analysis Report

**Generated:** $(date)
**Duration:** ${DURATION}s
**Total Issues:** $TOTAL_ISSUES

## Issues by Type
- Critical (build): $(gh issue list --label priority:critical --state open | wc -l)
- High (errors): $(gh issue list --label priority:high --state open | wc -l)
- Code Quality: $(gh issue list --label code-quality --state open | wc -l)
- Test Failures: $(gh issue list --label test-failure --state open | wc -l)

## Issues by Package
$(for pkg in "${PACKAGES[@]}"; do
    local count=$(gh issue list --label "package:$pkg" --state open | wc -l)
    if [ $count -gt 0 ]; then
        echo "- @smolitux/$pkg: $count"
    fi
done)

## Next Steps
1. Review critical build issues first
2. Address code quality violations
3. Fix failing tests
4. Update package documentation

## Commands
- View all issues: \`gh issue list --state open\`
- Filter by package: \`gh issue list --label "package:core" --state open\`
- Filter by type: \`gh issue list --label "priority:critical" --state open\`
EOF
    
    echo "📄 Report saved: ANALYSIS_REPORT.md"
}

# ───────────────────────────────────────────────
# Main Execution
# ───────────────────────────────────────────────

main() {
    check_prerequisites
    run_analyzer_issues
    run_package_testing
    generate_final_report
    
    echo ""
    echo "🚀 MISSION COMPLETE!"
    echo "All issues have been created and categorized."
    echo "Use the GitHub Issues dashboard to track progress."
}

# Handle interrupts gracefully
trap 'echo ""; echo "⚠️  Analysis interrupted"; exit 1' INT TERM

# Run if executed directly
if [ "${BASH_SOURCE[0]}" == "${0}" ]; then
    main "$@"
fi
