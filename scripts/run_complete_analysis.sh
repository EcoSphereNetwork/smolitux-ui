#!/bin/bash

# ═══════════════════════════════════════════════════════════════════════════════
# 🚀 CREATE_PACKAGE_ISSUES.SH - Package Testing Issues to GitHub
# ═══════════════════════════════════════════════════════════════════════════════

PACKAGE=${1:-core}
CREATED_COUNT=0

create_package_issues() {
    local PACKAGE=$1
    echo "🔍 Creating issues for @smolitux/$PACKAGE..."
    
    # ───────────────────────────────────────────────
    # ESLint Issues
    # ───────────────────────────────────────────────
    if [ -f "lint.log" ] && grep -q "error" lint.log; then
        echo "  📋 Processing ESLint errors..."
        
        grep "error" lint.log | head -10 | while read line; do
            # Parse ESLint output: file:line:col error message rule
            FILE=$(echo "$line" | awk -F: '{print $1}')
            LINE=$(echo "$line" | awk -F: '{print $2}')
            RULE=$(echo "$line" | grep -o '[a-zA-Z-/@]*$' | tail -1)
            MESSAGE=$(echo "$line" | sed 's/.*error[[:space:]]*//' | sed "s/[[:space:]]*$RULE[[:space:]]*$//")
            
            TITLE="ESLint $RULE violation in @smolitux/$PACKAGE"
            BODY="**ESLint Rule:** \`$RULE\`
**File:** \`$FILE:$LINE\`
**Package:** @smolitux/$PACKAGE
**Message:** $MESSAGE

**Reproduction:**
\`\`\`bash
cd packages/@smolitux/$PACKAGE
npm run lint
\`\`\`

**Fix:**
Update the code to comply with ESLint rule \`$RULE\`.

**Resources:**
- [ESLint Rule Documentation](https://eslint.org/docs/rules/$RULE)"

            echo "    📝 ESLint: $RULE in $FILE"
            gh issue create \
                --title "$TITLE" \
                --label "code-quality,eslint,package:$PACKAGE" \
                --body "$BODY" >/dev/null 2>&1 && CREATED_COUNT=$((CREATED_COUNT + 1))
        done
    fi
    
    # ───────────────────────────────────────────────
    # Test Failures
    # ───────────────────────────────────────────────
    if [ -f "test.log" ] && grep -qE "(FAIL|Error|Failed)" test.log; then
        echo "  🧪 Processing test failures..."
        
        grep -E "(FAIL|Error|Failed)" test.log | head -5 | while read line; do
            # Extract test name and error
            TEST_NAME=$(echo "$line" | grep -o "FAIL.*" | head -1)
            ERROR_MSG=$(echo "$line" | sed 's/.*Error[[:space:]]*//')
            
            TITLE="Test failure in @smolitux/$PACKAGE: $(echo "$TEST_NAME" | cut -c1-30)..."
            BODY="**Test Error:** $ERROR_MSG
**Package:** @smolitux/$PACKAGE
**Full Output:** 
\`\`\`
$line
\`\`\`

**Reproduction:**
\`\`\`bash
cd packages/@smolitux/$PACKAGE
npm test
\`\`\`

**Fix Required:**
- Review failing test case
- Update component or test logic
- Ensure all assertions pass
- Run \`npm test\` to verify fix"

            echo "    📝 Test: $(echo "$TEST_NAME" | cut -c1-20)..."
            gh issue create \
                --title "$TITLE" \
                --label "bug,test-failure,package:$PACKAGE" \
                --body "$BODY" >/dev/null 2>&1 && CREATED_COUNT=$((CREATED_COUNT + 1))
        done
    fi
    
    # ───────────────────────────────────────────────
    # Build Errors
    # ───────────────────────────────────────────────
    if [ -f "build.log" ] && grep -qE "(error|Error|ERROR)" build.log; then
        echo "  🔨 Processing build errors..."
        
        grep -E "(error|Error|ERROR)" build.log | head -5 | while read line; do
            # Extract error details
            ERROR_TYPE="Build Error"
            if echo "$line" | grep -q "TypeScript"; then
                ERROR_TYPE="TypeScript Build Error"
            elif echo "$line" | grep -q "Module"; then
                ERROR_TYPE="Module Resolution Error"
            fi
            
            TITLE="$ERROR_TYPE in @smolitux/$PACKAGE"
            BODY="**Build Error:** $line
**Package:** @smolitux/$PACKAGE
**Type:** $ERROR_TYPE

**Reproduction:**
\`\`\`bash
cd packages/@smolitux/$PACKAGE
npm run build
\`\`\`

**Fix Required:**
- Resolve build compilation issues
- Check for missing dependencies
- Verify TypeScript configuration
- Test with \`npm run build\`

**Priority:** Critical - blocks package publishing"

            echo "    📝 Build: $ERROR_TYPE"
            gh issue create \
                --title "$TITLE" \
                --label "bug,build,package:$PACKAGE,priority:critical" \
                --body "$BODY" >/dev/null 2>&1 && CREATED_COUNT=$((CREATED_COUNT + 1))
        done
    fi
    
    echo "  ✅ Package issues created for $PACKAGE: $CREATED_COUNT new issues"
}

# ───────────────────────────────────────────────
# Main Execution
# ───────────────────────────────────────────────

if [ -z "$1" ]; then
    echo "Usage: $0 <package-name>"
    echo "Example: $0 core"
    echo ""
    echo "Available packages:"
    echo "  core, theme, utils, testing, layout, charts"
    echo "  media, community, ai, blockchain, resonance"
    echo "  federation, voice-control"
    exit 1
fi

echo "🔍 Processing package: @smolitux/$PACKAGE"

# Check if we're in the right directory
if [ ! -d "packages/@smolitux/$PACKAGE" ]; then
    echo "❌ Error: Package directory packages/@smolitux/$PACKAGE not found"
    echo "   Make sure you're in the repository root"
    exit 1
fi

# Change to package directory
cd packages/@smolitux/$PACKAGE || exit 1

# Check for log files
LOG_FILES=0
[ -f "lint.log" ] && LOG_FILES=$((LOG_FILES + 1))
[ -f "test.log" ] && LOG_FILES=$((LOG_FILES + 1))
[ -f "build.log" ] && LOG_FILES=$((LOG_FILES + 1))

if [ $LOG_FILES -eq 0 ]; then
    echo "⚠️  Warning: No log files found (lint.log, test.log, build.log)"
    echo "   Run the testing commands first:"
    echo "   npm run lint 2>&1 | tee lint.log"
    echo "   npm test 2>&1 | tee test.log"
    echo "   npm run build 2>&1 | tee build.log"
    exit 1
fi

# Create issues
create_package_issues $PACKAGE

echo ""
echo "📊 Summary for @smolitux/$PACKAGE:"
echo "  Issues created: $CREATED_COUNT"
echo "  View issues: gh issue list --label package:$PACKAGE --state open"

cd ../../..
