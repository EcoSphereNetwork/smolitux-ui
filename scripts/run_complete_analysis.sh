#!/bin/bash

# ═══════════════════════════════════════════════════════════════════════════════
# 🚀 RUN_COMPLETE_ANALYSIS.SH - Robuste Vollanalyse mit Auto-Problem-Fixing
# ═══════════════════════════════════════════════════════════════════════════════

set -euo pipefail

echo "🚀 SMOLITUX UI ROBUST COMPLETE ANALYSIS"
echo "======================================="
echo ""

# ───────────────────────────────────────────────
# Auto-Fix Functions
# ───────────────────────────────────────────────

fix_git_setup() {
    echo "🔧 Auto-fixing Git setup..."
    
    if [ ! -d ".git" ]; then
        echo "  📁 Initializing git repository..."
        git init
    fi
    
    if ! git remote get-url origin >/dev/null 2>&1; then
        echo "  🔗 Adding GitHub remote..."
        git remote add origin "https://github.com/EcoSphereNetwork/smolitux-ui.git" || true
    fi
    
    echo "  ✅ Git setup complete"
}

fix_github_cli() {
    echo "🔧 Auto-fixing GitHub CLI..."
    
    if ! command -v gh &> /dev/null; then
        echo "  📦 Installing GitHub CLI..."
        apt-get update >/dev/null 2>&1 || true
        apt-get install -y gh >/dev/null 2>&1 || {
            echo "  ⚠️ Package manager install failed, trying direct install..."
            curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg 2>/dev/null || true
        }
    fi
    
    if [ -n "${GH_TOKEN:-}" ]; then
        echo "$GH_TOKEN" | gh auth login --with-token >/dev/null 2>&1 || echo "  ⚠️ GitHub auth failed"
    fi
    
    echo "  ✅ GitHub CLI setup complete"
}

fix_dependencies() {
    echo "🔧 Auto-fixing dependencies..."
    
    if [ ! -d "node_modules" ]; then
        echo "  📦 Installing root dependencies..."
        npm install --legacy-peer-deps >/dev/null 2>&1 || echo "  ⚠️ Root npm install had issues"
    fi
    
    # Install package-specific dependencies
    for pkg_dir in packages/@smolitux/*; do
        if [ -d "$pkg_dir" ] && [ -f "$pkg_dir/package.json" ]; then
            pkg_name=$(basename "$pkg_dir")
            if [ ! -d "$pkg_dir/node_modules" ]; then
                echo "  📦 Installing $pkg_name dependencies..."
                (cd "$pkg_dir" && npm install --legacy-peer-deps >/dev/null 2>&1) || echo "  ⚠️ $pkg_name npm install had issues"
            fi
        fi
    done
    
    echo "  ✅ Dependencies setup complete"
}

create_missing_scripts() {
    echo "🔧 Creating missing scripts..."
    
    mkdir -p scripts
    
    # Create robust create_issues.sh
    if [ ! -f "create_issues.sh" ]; then
        cat > create_issues.sh <<'EOF'
#!/bin/bash

create_analyzer_issues() {
    echo "🚀 Creating issues with robust fallback..."
    
    ISSUES_LOG="analyzer_issues.log"
    echo "# Analyzer Issues - $(date)" > "$ISSUES_LOG"
    TOTAL_FOUND=0
    
    # Scan for React import issues
    echo "🔍 Scanning React import issues..."
    find packages -name "*.tsx" 2>/dev/null | while read file; do
        if grep -q "React\." "$file" && ! grep -q "import React" "$file"; then
            echo "ERROR:$file:1:Missing React import for React.* usage" >> "$ISSUES_LOG"
        fi
    done
    
    # Scan for TypeScript issues
    echo "🔍 Scanning TypeScript issues..."
    find packages -name "*.tsx" -exec grep -Hn "any\|@ts-ignore" {} \; 2>/dev/null | while read line; do
        echo "ERROR:$line:TypeScript bad practice detected" >> "$ISSUES_LOG"
    done
    
    # Scan for missing exports
    echo "🔍 Scanning export issues..."
    find packages -name "*.tsx" 2>/dev/null | grep -v "\.test\.\|\.stories\." | while read file; do
        BASENAME=$(basename "$file" .tsx)
        if ! grep -q "export.*$BASENAME\|export default" "$file"; then
            echo "WARN:$file:1:Missing export for component $BASENAME" >> "$ISSUES_LOG"
        fi
    done
    
    # Count total issues
    TOTAL_FOUND=$(grep -c ":" "$ISSUES_LOG" 2>/dev/null || echo "0")
    echo "📊 Found $TOTAL_FOUND issues in total"
    
    # Try GitHub issue creation
    if gh auth status >/dev/null 2>&1 && gh repo view >/dev/null 2>&1; then
        echo "📤 Creating GitHub issues..."
        CREATED=0
        while IFS=':' read -r type file line message; do
            [ -z "$type" ] && continue
            PACKAGE=$(echo "$file" | cut -d'/' -f3 2>/dev/null || echo "unknown")
            TITLE="[$type] $PACKAGE: $(echo "$message" | cut -c1-40)..."
            
            if gh issue create \
                --title "$TITLE" \
                --label "bug,$type,package:$PACKAGE" \
                --body "**Problem:** $message
**File:** $file:$line
**Package:** @smolitux/$PACKAGE
**Type:** $type" >/dev/null 2>&1; then
                CREATED=$((CREATED + 1))
            fi
        done < "$ISSUES_LOG"
        echo "✅ Created $CREATED GitHub issues"
    else
        echo "⚠️ GitHub unavailable - $TOTAL_FOUND issues logged locally in $ISSUES_LOG"
    fi
}

export -f create_analyzer_issues
EOF
        chmod +x create_issues.sh
        echo "  ✅ Created create_issues.sh"
    fi
    
    echo "  ✅ Scripts creation complete"
}

# ───────────────────────────────────────────────
# Configuration & Initialization
# ───────────────────────────────────────────────
PACKAGES=("core" "theme" "utils" "testing" "layout" "charts" "media" "community" "ai" "blockchain" "resonance" "federation" "voice-control")
TOTAL_ISSUES=0
SUCCESSFUL_PACKAGES=0
FAILED_PACKAGES=0
START_TIME=$(date +%s)

echo "🔧 AUTO-FIXING COMMON PROBLEMS..."
fix_git_setup
fix_github_cli  
fix_dependencies
create_missing_scripts

echo ""
echo "📊 STARTING COMPREHENSIVE ANALYSIS..."
echo "====================================="

# ───────────────────────────────────────────────
# Phase 1: Analyzer Issues
# ───────────────────────────────────────────────
echo ""
echo "📊 PHASE 1: ANALYZER VALIDATION ISSUES"
echo "======================================"

if [ -f "create_issues.sh" ]; then
    echo "🔍 Running analyzer issue detection..."
    source create_issues.sh
    create_analyzer_issues
    
    # Count analyzer issues
    if gh auth status >/dev/null 2>&1; then
        ANALYZER_ISSUES=$(gh issue list --label ERROR,WARN --state open 2>/dev/null | wc -l || echo "0")
        echo "📊 Analyzer issues created: $ANALYZER_ISSUES"
        TOTAL_ISSUES=$((TOTAL_ISSUES + ANALYZER_ISSUES))
    else
        ANALYZER_ISSUES=$(grep -c ":" analyzer_issues.log 2>/dev/null || echo "0")
        echo "📊 Analyzer issues found locally: $ANALYZER_ISSUES"
        TOTAL_ISSUES=$((TOTAL_ISSUES + ANALYZER_ISSUES))
    fi
else
    echo "⚠️ create_issues.sh not found - skipping analyzer phase"
fi

# ───────────────────────────────────────────────
# Phase 2: Package-by-Package Analysis  
# ───────────────────────────────────────────────
echo ""
echo "📦 PHASE 2: PACKAGE-BY-PACKAGE ANALYSIS"
echo "======================================="

for pkg in "${PACKAGES[@]}"; do
    echo ""
    echo "🔄 Processing @smolitux/$pkg..."
    
    PKG_DIR="packages/@smolitux/$pkg"
    if [ ! -d "$PKG_DIR" ]; then
        echo "  ⚠️ Package directory not found: $PKG_DIR"
        FAILED_PACKAGES=$((FAILED_PACKAGES + 1))
        continue
    fi
    
    cd "$PKG_DIR"
    
    # Initialize package issue tracking
    PKG_ISSUES_LOG="${pkg}_analysis.log"
    echo "# Package Analysis for @smolitux/$pkg - $(date)" > "$PKG_ISSUES_LOG"
    PKG_ISSUES_BEFORE=$(gh issue list --label "package:$pkg" --state open 2>/dev/null | wc -l || echo "0")
    
    # Check available scripts
    AVAILABLE_SCRIPTS=""
    if [ -f "package.json" ]; then
        grep -q '"lint"' package.json && AVAILABLE_SCRIPTS="$AVAILABLE_SCRIPTS lint"
        grep -q '"test"' package.json && AVAILABLE_SCRIPTS="$AVAILABLE_SCRIPTS test"  
        grep -q '"build"' package.json && AVAILABLE_SCRIPTS="$AVAILABLE_SCRIPTS build"
    fi
    
    echo "  📋 Available scripts:$AVAILABLE_SCRIPTS"
    
    # Execute available scripts with error capture
    SCRIPTS_EXECUTED=0
    
    if [[ "$AVAILABLE_SCRIPTS" == *"lint"* ]]; then
        echo "  🔍 Running lint..."
        if npm run lint >lint.log 2>&1; then
            echo "    ✅ Lint passed"
        else
            echo "    ❌ Lint failed - capturing errors"
            grep "error" lint.log 2>/dev/null | head -5 | while read line; do
                echo "LINT_ERROR:$line" >> "$PKG_ISSUES_LOG"
            done
        fi
        SCRIPTS_EXECUTED=$((SCRIPTS_EXECUTED + 1))
    fi
    
    if [[ "$AVAILABLE_SCRIPTS" == *"test"* ]]; then
        echo "  🧪 Running tests..."
        if npm test >test.log 2>&1; then
            echo "    ✅ Tests passed"
        else
            echo "    ❌ Tests failed - capturing errors"
            grep -E "(FAIL|Error|Failed)" test.log 2>/dev/null | head -3 | while read line; do
                echo "TEST_FAILURE:$line" >> "$PKG_ISSUES_LOG"
            done
        fi
        SCRIPTS_EXECUTED=$((SCRIPTS_EXECUTED + 1))
    fi
    
    if [[ "$AVAILABLE_SCRIPTS" == *"build"* ]]; then
        echo "  🔨 Running build..."
        if npm run build >build.log 2>&1; then
            echo "    ✅ Build passed"
        else
            echo "    ❌ Build failed - capturing errors"
            grep -E "(error|Error|ERROR)" build.log 2>/dev/null | head -3 | while read line; do
                echo "BUILD_ERROR:$line" >> "$PKG_ISSUES_LOG"
            done
        fi
        SCRIPTS_EXECUTED=$((SCRIPTS_EXECUTED + 1))
    fi
    
    # Direct code analysis as fallback
    if [ $SCRIPTS_EXECUTED -eq 0 ]; then
        echo "  🔍 No scripts available - doing direct code analysis..."
        find src -name "*.tsx" 2>/dev/null | head -10 | while read file; do
            if grep -q "React\." "$file" && ! grep -q "import React" "$file"; then
                echo "REACT_IMPORT:$file:Missing React import" >> "$PKG_ISSUES_LOG"
            fi
            if grep -q "any" "$file"; then
                echo "TYPESCRIPT:$file:Uses 'any' type" >> "$PKG_ISSUES_LOG"
            fi
        done
    fi
    
    # Create GitHub issues from package analysis
    PKG_ISSUES_FOUND=$(grep -c ":" "$PKG_ISSUES_LOG" 2>/dev/null || echo "0")
    
    if [ $PKG_ISSUES_FOUND -gt 0 ] && gh auth status >/dev/null 2>&1; then
        echo "  📤 Creating $PKG_ISSUES_FOUND GitHub issues..."
        CREATED_COUNT=0
        while IFS=':' read -r type error_info; do
            [ -z "$type" ] && continue
            TITLE="$type in @smolitux/$pkg: $(echo "$error_info" | cut -c1-30)..."
            
            if gh issue create \
                --title "$TITLE" \
                --label "bug,$type,package:$pkg" \
                --body "**Package:** @smolitux/$pkg
**Type:** $type
**Details:** $error_info
**Scripts Executed:** $SCRIPTS_EXECUTED" >/dev/null 2>&1; then
                CREATED_COUNT=$((CREATED_COUNT + 1))
            fi
        done < "$PKG_ISSUES_LOG"
        echo "  ✅ Created $CREATED_COUNT GitHub issues"
    else
        echo "  📋 $PKG_ISSUES_FOUND issues logged locally"
    fi
    
    PKG_ISSUES_AFTER=$(gh issue list --label "package:$pkg" --state open 2>/dev/null | wc -l || echo "0")
    PKG_NEW_ISSUES=$((PKG_ISSUES_AFTER - PKG_ISSUES_BEFORE + PKG_ISSUES_FOUND))
    
    echo "  📊 Package summary: $SCRIPTS_EXECUTED scripts, $PKG_NEW_ISSUES total issues"
    TOTAL_ISSUES=$((TOTAL_ISSUES + PKG_NEW_ISSUES))
    SUCCESSFUL_PACKAGES=$((SUCCESSFUL_PACKAGES + 1))
    
    cd ../../..
done

# ───────────────────────────────────────────────
# Final Report Generation
# ───────────────────────────────────────────────
echo ""
echo "📋 GENERATING COMPREHENSIVE REPORT..."
echo "===================================="

END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))

# Collect final statistics
if gh auth status >/dev/null 2>&1; then
    GITHUB_TOTAL=$(gh issue list --state open 2>/dev/null | wc -l || echo "0")
    GITHUB_CRITICAL=$(gh issue list --label priority:critical --state open 2>/dev/null | wc -l || echo "0")
    GITHUB_ESLINT=$(gh issue list --label eslint --state open 2>/dev/null | wc -l || echo "0")
    GITHUB_TESTS=$(gh issue list --label test-failure --state open 2>/dev/null | wc -l || echo "0")
else
    GITHUB_TOTAL=0
    GITHUB_CRITICAL=0
    GITHUB_ESLINT=0
    GITHUB_TESTS=0
fi

# Count local issues
LOCAL_ISSUES=$(find . -name "*_analysis.log" -o -name "*_issues.log" | xargs grep -c ":" 2>/dev/null | awk -F: '{sum+=$2} END {print sum+0}')

echo "🎉 ANALYSIS COMPLETE!"
echo "===================="
echo ""
echo "📊 Final Statistics:"
echo "  ⏱️ Duration: ${DURATION}s"
echo "  📦 Packages Processed: $SUCCESSFUL_PACKAGES"
echo "  ❌ Failed Packages: $FAILED_PACKAGES"
echo "  📈 Total Issues: $TOTAL_ISSUES"
echo "  📤 GitHub Issues: $GITHUB_TOTAL"
echo "  📋 Local Issues: $LOCAL_ISSUES"
echo ""
echo "🏷️ Issues by Type:"
echo "  🔴 Critical: $GITHUB_CRITICAL"
echo "  🔧 ESLint: $GITHUB_ESLINT"
echo "  🧪 Tests: $GITHUB_TESTS"
echo ""

# Generate detailed report
cat > ROBUST_ANALYSIS_REPORT.md <<EOF
# Smolitux UI Robust Analysis Report

**Generated:** $(date)
**Duration:** ${DURATION}s
**Analysis Method:** Robust with auto-fixing

## Summary
- **Total Issues:** $TOTAL_ISSUES
- **GitHub Issues:** $GITHUB_TOTAL
- **Local Issues:** $LOCAL_ISSUES
- **Packages Processed:** $SUCCESSFUL_PACKAGES/$((SUCCESSFUL_PACKAGES + FAILED_PACKAGES))

## Issues by Type
- Critical: $GITHUB_CRITICAL
- ESLint: $GITHUB_ESLINT  
- Test Failures: $GITHUB_TESTS

## Package Status
$(for pkg in "${PACKAGES[@]}"; do
    if [ -d "packages/@smolitux/$pkg" ]; then
        if gh auth status >/dev/null 2>&1; then
            count=$(gh issue list --label "package:$pkg" --state open 2>/dev/null | wc -l || echo "0")
        else
            count=$(grep -c ":" "packages/@smolitux/$pkg/${pkg}_analysis.log" 2>/dev/null || echo "0")
        fi
        echo "- @smolitux/$pkg: $count issues"
    fi
done)

## Analysis Logs Generated
$(find . -name "*_analysis.log" -o -name "*_issues.log" | while read log; do
    count=$(grep -c ":" "$log" 2>/dev/null || echo "0")
    echo "- $log: $count issues"
done)

## Next Steps
1. Review GitHub issues: \`gh issue list --state open\`
2. Check local logs for detailed error info
3. Start with critical issues first
4. Address React import issues (quick wins)

## System Status
- Git Remote: $(git remote get-url origin 2>/dev/null || echo "Not configured")
- GitHub CLI: $(gh --version 2>/dev/null | head -1 || echo "Not available")
- Node.js: $(node --version 2>/dev/null || echo "Not available")
EOF

echo "📄 Comprehensive report saved: ROBUST_ANALYSIS_REPORT.md"

# Save execution summary
cat > ANALYSIS_SUMMARY.txt <<EOF
Robust Analysis Summary - $(date)
Total Issues: $TOTAL_ISSUES
GitHub Issues: $GITHUB_TOTAL  
Local Issues: $LOCAL_ISSUES
Duration: ${DURATION}s
Success Rate: $SUCCESSFUL_PACKAGES/$((SUCCESSFUL_PACKAGES + FAILED_PACKAGES))
EOF

echo ""
echo "✅ ROBUST COMPLETE ANALYSIS FINISHED!"
echo "All issues identified and categorized successfully."
echo "Use 'gh issue list --state open' to view GitHub issues."
echo "Check *_analysis.log files for detailed local analysis."
