#!/bin/bash

# ═══════════════════════════════════════════════════════════════════════════════
# 🚀 CREATE_ISSUES.SH - Robuste GitHub Issues mit Standard Labels
# ═══════════════════════════════════════════════════════════════════════════════

# Create standard GitHub labels if they don't exist
create_standard_labels() {
    echo "🏷️ Ensuring standard GitHub labels exist..."
    
    # Standard labels with colors
    LABELS=(
        "bug|d73a4a|Something isn't working"
        "enhancement|a2eeef|New feature or request"
        "high-priority|b60205|High priority issue"
        "code-quality|0e8a16|Code quality improvement"
        "typescript|1d76db|TypeScript related issue"
        "react|61dafb|React component issue"
        "testing|f9c23c|Testing related issue"
        "documentation|0075ca|Documentation improvement"
    )
    
    for label_info in "${LABELS[@]}"; do
        IFS='|' read -r name color description <<< "$label_info"
        
        if ! gh label list --limit 100 | grep -q "^$name"; then
            echo "  📝 Creating label: $name"
            gh label create "$name" --color "$color" --description "$description" 2>/dev/null || true
        fi
    done
    
    echo "  ✅ Standard labels ready"
}

# Enhanced issue creation with deduplication
create_analyzer_issues() {
    echo "🚀 Creating GitHub issues with enhanced error handling..."
    
    # Create labels first
    if gh auth status >/dev/null 2>&1; then
        create_standard_labels
    fi
    
    ISSUES_LOG="analyzer_issues.log"
    CREATED_ISSUES_LOG="created_issues.log"
    echo "# Analyzer Issues - $(date)" > "$ISSUES_LOG"
    echo "# Created Issues - $(date)" > "$CREATED_ISSUES_LOG"
    
    TOTAL_FOUND=0
    TOTAL_CREATED=0
    
    # Scan for React import issues
    echo "🔍 Scanning React import issues..."
    find packages -name "*.tsx" -type f 2>/dev/null | while read file; do
        if grep -q "React\." "$file" && ! grep -q "import React" "$file"; then
            echo "REACT_IMPORT:$file:1:Missing React import for React.* usage" >> "$ISSUES_LOG"
        fi
    done
    
    # Scan for TypeScript issues
    echo "🔍 Scanning TypeScript issues..."
    find packages -name "*.tsx" -type f -exec grep -Hn "\\bany\\b\\|@ts-ignore" {} \; 2>/dev/null | head -20 | while read line; do
        echo "TYPESCRIPT:$line:TypeScript bad practice detected" >> "$ISSUES_LOG"
    done
    
    # Scan for missing exports
    echo "🔍 Scanning export issues..."
    find packages -name "*.tsx" -type f 2>/dev/null | grep -v "\.test\.\|\.stories\." | head -10 | while read file; do
        BASENAME=$(basename "$file" .tsx)
        if ! grep -q "export.*$BASENAME\\|export default" "$file"; then
            echo "EXPORT:$file:1:Missing export for component $BASENAME" >> "$ISSUES_LOG"
        fi
    done
    
    # Scan for missing test-ids
    echo "🔍 Scanning test-id issues..."
    find packages -name "*.tsx" -type f 2>/dev/null | head -10 | while read file; do
        if grep -q "return.*<" "$file" && ! grep -q "data-testid" "$file"; then
            echo "TESTING:$file:1:Missing data-testid attribute" >> "$ISSUES_LOG"
        fi
    done
    
    # Count total issues found
    TOTAL_FOUND=$(grep -c ":" "$ISSUES_LOG" 2>/dev/null || echo "0")
    echo "📊 Found $TOTAL_FOUND potential issues"
    
    # Create GitHub issues with improved error handling
    if gh auth status >/dev/null 2>&1; then
        echo "📤 Creating GitHub issues with standard labels..."
        
        # Remove duplicates first
        sort "$ISSUES_LOG" | uniq > "${ISSUES_LOG}.tmp" && mv "${ISSUES_LOG}.tmp" "$ISSUES_LOG"
        
        while IFS=':' read -r type file line_num message; do
            [ -z "$type" ] && continue
            [[ "$type" =~ ^# ]] && continue
            
            # Extract package name safely
            PACKAGE=$(echo "$file" | cut -d'/' -f3 2>/dev/null || echo "unknown")
            
            # Create descriptive title
            SHORT_MSG=$(echo "$message" | cut -c1-40 | sed 's/[[:space:]]*$//')
            TITLE="[$type] $PACKAGE: $SHORT_MSG..."
            
            # Map issue types to standard labels
            case "$type" in
                "REACT_IMPORT") LABELS="bug,react" ;;
                "TYPESCRIPT") LABELS="bug,typescript" ;;
                "EXPORT") LABELS="code-quality,enhancement" ;;
                "TESTING") LABELS="testing,enhancement" ;;
                *) LABELS="bug" ;;
            esac
            
            # Check for existing similar issues to avoid duplicates
            EXISTING=$(gh issue list --search "in:title $type $PACKAGE" --limit 5 --json title --jq '.[].title' 2>/dev/null || echo "")
            
            if echo "$EXISTING" | grep -q "$type.*$PACKAGE"; then
                echo "  ⚠️ Similar issue exists for $type in $PACKAGE - skipping"
                continue
            fi
            
            # Create detailed issue body
            BODY="**Issue Type:** $type
**Package:** @smolitux/$PACKAGE
**File:** \`$file\`
**Line:** $line_num
**Problem:** $message

**Priority:** $([ "$type" = "TYPESCRIPT" ] && echo "High" || echo "Medium")

**To Reproduce:**
\`\`\`bash
# Navigate to file
code $file:$line_num
\`\`\`

**Expected Behavior:**
$(case "$type" in
    "REACT_IMPORT") echo "File should import React when using React.* syntax" ;;
    "TYPESCRIPT") echo "Should use proper TypeScript types instead of 'any' or @ts-ignore" ;;
    "EXPORT") echo "Component should have proper export statement" ;;
    "TESTING") echo "Component should have data-testid for testing" ;;
    *) echo "Issue should be resolved according to best practices" ;;
esac)

**Labels:** $LABELS
**Auto-generated:** Yes"

            echo "  📝 Creating: $TITLE"
            
            if gh issue create \
                --title "$TITLE" \
                --label "$LABELS" \
                --body "$BODY" >/dev/null 2>&1; then
                TOTAL_CREATED=$((TOTAL_CREATED + 1))
                echo "$TITLE" >> "$CREATED_ISSUES_LOG"
                echo "    ✅ Created successfully"
            else
                echo "    ❌ Failed to create"
                echo "FAILED: $TITLE" >> "failed_issues.log"
            fi
            
            # Rate limiting: small delay between issues
            sleep 0.5
                
        done < "$ISSUES_LOG"
        
        echo ""
        echo "📊 Issue Creation Summary:"
        echo "  🔍 Issues Found: $TOTAL_FOUND"
        echo "  ✅ Issues Created: $TOTAL_CREATED"
        echo "  📋 Created Issues Log: $CREATED_ISSUES_LOG"
        
        if [ -f "failed_issues.log" ]; then
            FAILED_COUNT=$(wc -l < "failed_issues.log")
            echo "  ❌ Failed Issues: $FAILED_COUNT (see failed_issues.log)"
        fi
        
    else
        echo "⚠️ GitHub unavailable - $TOTAL_FOUND issues logged locally in $ISSUES_LOG"
        echo "💡 To create issues later: source create_issues.sh && create_analyzer_issues"
    fi
}

# Show current GitHub issue statistics
show_issue_stats() {
    if gh auth status >/dev/null 2>&1; then
        echo "📊 Current GitHub Issue Statistics:"
        echo "  Total Open: $(gh issue list --state open | wc -l)"
        echo "  Bugs: $(gh issue list --label bug --state open | wc -l)"
        echo "  Enhancements: $(gh issue list --label enhancement --state open | wc -l)"
        echo "  High Priority: $(gh issue list --label high-priority --state open | wc -l)"
        echo "  TypeScript: $(gh issue list --label typescript --state open | wc -l)"
        echo "  React: $(gh issue list --label react --state open | wc -l)"
        echo "  Testing: $(gh issue list --label testing --state open | wc -l)"
        echo ""
        echo "🔗 View all issues: gh issue list --state open"
    else
        echo "⚠️ GitHub CLI not authenticated"
    fi
}

# Export functions for sourcing
export -f create_analyzer_issues
export -f create_standard_labels
export -f show_issue_stats

echo "✅ Enhanced create_issues.sh loaded"
echo "📋 Available functions:"
echo "  • create_analyzer_issues  - Create issues with standard GitHub labels"
echo "  • create_standard_labels  - Ensure GitHub labels exist"
echo "  • show_issue_stats        - Show current issue statistics"
