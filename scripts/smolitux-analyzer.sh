#!/bin/bash

# SMOLITUX REPOSITORY ANALYZER
# Analyzes current state before running completion finisher

echo "🔍 SMOLITUX REPOSITORY ANALYZER"
echo "==============================="

PACKAGES=("core" "theme" "utils" "testing" "layout" "charts" "media" "community" "ai" "blockchain" "resonance" "federation" "voice-control")

echo "📊 Current Repository State Analysis"
echo "===================================="

TOTAL_COMPONENTS=0
TOTAL_TESTS=0
TOTAL_STORIES=0
MISSING_TESTS=0
MISSING_STORIES=0

echo ""
echo "Package Breakdown:"
echo "------------------"

for pkg in "${PACKAGES[@]}"; do
    PKG_DIR="packages/@smolitux/$pkg"
    [ ! -d "$PKG_DIR" ] && continue
    
    echo "📦 @smolitux/$pkg"
    
    # Count actual component files (excluding test/story files)
    PKG_COMPONENTS=0
    PKG_TESTS=0
    PKG_STORIES=0
    PKG_MISSING_TESTS=0
    PKG_MISSING_STORIES=0
    
    if [ -d "$PKG_DIR/src" ]; then
        # Find actual component files
        while IFS= read -r -d '' component; do
            # Skip if it's a test file, story file, or utility file
            if [[ "$component" =~ \.test\.tsx$ ]] || \
               [[ "$component" =~ \.stories\.tsx$ ]] || \
               [[ "$component" =~ /__tests__/ ]] || \
               [[ "$component" =~ /stories/ ]] || \
               [[ "$(basename "$component")" =~ ^(index|types|constants|utils|hooks)\.tsx$ ]]; then
                continue
            fi
            
            ((PKG_COMPONENTS++))
            
            BASENAME=$(basename "$component" .tsx)
            COMP_DIR=$(dirname "$component")
            
            # Check for test file
            TEST_FILE="$COMP_DIR/$BASENAME.test.tsx"
            if [ -f "$TEST_FILE" ]; then
                ((PKG_TESTS++))
            else
                ((PKG_MISSING_TESTS++))
            fi
            
            # Check for story file
            STORY_FILE="$COMP_DIR/$BASENAME.stories.tsx"
            if [ -f "$STORY_FILE" ]; then
                ((PKG_STORIES++))
            else
                ((PKG_MISSING_STORIES++))
            fi
            
        done < <(find "$PKG_DIR/src" -name "*.tsx" -type f -print0)
        
        # Calculate percentages for this package
        if [ $PKG_COMPONENTS -gt 0 ]; then
            PKG_TEST_PERCENT=$(( PKG_TESTS * 100 / PKG_COMPONENTS ))
            PKG_STORY_PERCENT=$(( PKG_STORIES * 100 / PKG_COMPONENTS ))
        else
            PKG_TEST_PERCENT=0
            PKG_STORY_PERCENT=0
        fi
        
        echo "  Components: $PKG_COMPONENTS"
        echo "  Tests: $PKG_TESTS/$PKG_COMPONENTS ($PKG_TEST_PERCENT%) | Missing: $PKG_MISSING_TESTS"
        echo "  Stories: $PKG_STORIES/$PKG_COMPONENTS ($PKG_STORY_PERCENT%) | Missing: $PKG_MISSING_STORIES"
        
        # Add to totals
        TOTAL_COMPONENTS=$((TOTAL_COMPONENTS + PKG_COMPONENTS))
        TOTAL_TESTS=$((TOTAL_TESTS + PKG_TESTS))
        TOTAL_STORIES=$((TOTAL_STORIES + PKG_STORIES))
        MISSING_TESTS=$((MISSING_TESTS + PKG_MISSING_TESTS))
        MISSING_STORIES=$((MISSING_STORIES + PKG_MISSING_STORIES))
    else
        echo "  ❌ No src directory found"
    fi
    echo ""
done

# Calculate overall percentages
if [ $TOTAL_COMPONENTS -gt 0 ]; then
    OVERALL_TEST_PERCENT=$(( TOTAL_TESTS * 100 / TOTAL_COMPONENTS ))
    OVERALL_STORY_PERCENT=$(( TOTAL_STORIES * 100 / TOTAL_COMPONENTS ))
else
    OVERALL_TEST_PERCENT=0
    OVERALL_STORY_PERCENT=0
fi

echo "📈 OVERALL SUMMARY"
echo "=================="
echo "Total Components: $TOTAL_COMPONENTS"
echo ""
echo "Test Coverage:"
echo "  ✅ Complete: $TOTAL_TESTS ($OVERALL_TEST_PERCENT%)"
echo "  ❌ Missing: $MISSING_TESTS"
echo ""
echo "Story Coverage:"
echo "  ✅ Complete: $TOTAL_STORIES ($OVERALL_STORY_PERCENT%)"
echo "  ❌ Missing: $MISSING_STORIES"
echo ""

# Analyze validation issues
echo "🔧 VALIDATION ISSUES ANALYSIS"
echo "============================="

REACT_IMPORT_ISSUES=0
EXPORT_ISSUES=0
TYPESCRIPT_ISSUES=0
TESTID_ISSUES=0

echo "Scanning for validation issues..."

# Check React import issues
REACT_IMPORT_ISSUES=$(find packages -name "*.tsx" -exec grep -l "React\." {} \; | while read file; do
    if ! grep -q "import React" "$file"; then
        echo "$file"
    fi
done | wc -l)

# Check export issues
EXPORT_ISSUES=$(find packages -name "*.tsx" | grep -v "\.test\.\|\.stories\.\|__tests__" | while read file; do
    BASENAME=$(basename "$file" .tsx)
    if ! grep -q "export.*$BASENAME\|export default" "$file"; then
        echo "$file"
    fi
done | wc -l)

# Check TypeScript issues
TYPESCRIPT_ISSUES=$(find packages -name "*.tsx" -exec grep -l "any\|@ts-ignore" {} \; | wc -l)

# Check missing test-id issues
TESTID_ISSUES=$(find packages -name "*.tsx" | grep -v "\.test\.\|\.stories\.\|__tests__" | while read file; do
    if grep -q "return.*<" "$file" && ! grep -q "data-testid" "$file"; then
        echo "$file"
    fi
done | wc -l)

echo "React Import Issues: $REACT_IMPORT_ISSUES"
echo "Missing Export Issues: $EXPORT_ISSUES"
echo "TypeScript Issues (any/@ts-ignore): $TYPESCRIPT_ISSUES"
echo "Missing Test-ID Issues: $TESTID_ISSUES"

TOTAL_VALIDATION_ISSUES=$((REACT_IMPORT_ISSUES + EXPORT_ISSUES + TYPESCRIPT_ISSUES + TESTID_ISSUES))

echo ""
echo "📋 COMPLETION FINISHER IMPACT PREDICTION"
echo "========================================"
echo "Files to be generated:"
echo "  Test files: $MISSING_TESTS"
echo "  Story files: $MISSING_STORIES"
echo ""
echo "Issues to be fixed:"
echo "  Total validation issues: $TOTAL_VALIDATION_ISSUES"
echo ""

if [ $MISSING_TESTS -eq 0 ] && [ $MISSING_STORIES -eq 0 ] && [ $TOTAL_VALIDATION_ISSUES -eq 0 ]; then
    echo "🎯 REPOSITORY IS ALREADY COMPLETE!"
    echo "No missing tests, stories, or validation issues found."
else
    echo "🚀 READY TO RUN COMPLETION FINISHER"
    echo ""
    echo "Expected results after completion:"
    echo "  Test Coverage: $OVERALL_TEST_PERCENT% → 100%"
    echo "  Story Coverage: $OVERALL_STORY_PERCENT% → 100%"
    echo "  Validation Issues: $TOTAL_VALIDATION_ISSUES → 0"
    echo ""
    echo "To proceed, run the completion finisher script."
fi

echo ""
echo "✅ Analysis complete!"
