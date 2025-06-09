#!/bin/bash

# ═══════════════════════════════════════════════════════════════════════════════
# 🚀 CREATE_ISSUES.SH - Analyzer Issues to GitHub
# ═══════════════════════════════════════════════════════════════════════════════

create_analyzer_issues() {
    echo "🚀 Creating GitHub issues for validation problems..."
    
    if [ ! -d "status" ]; then
        echo "❌ Error: status/ directory not found. Run setup script first."
        return 1
    fi
    
    TOTAL_CREATED=0
    
    for status_file in status/*.log; do
        [ ! -f "$status_file" ] && continue
        
        PACKAGE=$(basename "$status_file" .log)
        echo "📦 Processing @smolitux/$PACKAGE..."
        
        # Skip empty files or files with only comments
        if [ ! -s "$status_file" ] || ! grep -q "ERROR\|WARN" "$status_file"; then
            echo "  ✅ No issues found for $PACKAGE"
            continue
        fi
        
        while IFS=':' read -r type file line message; do
            [ -z "$type" ] && continue
            [[ "$type" =~ ^# ]] && continue
            
            # Clean up message
            message=$(echo "$message" | sed 's/^[[:space:]]*//')
            
            TITLE="[$type] $PACKAGE: $(echo "$message" | cut -c1-40)..."
            LABELS="bug,$type,package:$PACKAGE"
            
            if [ "$type" = "ERROR" ]; then
                LABELS="$LABELS,priority:high"
            fi
            
            BODY="**Problem:** $message
**File:** $file:$line  
**Package:** @smolitux/$PACKAGE
**Type:** $type
**Category:** Validation Issue

**Reproduction:**
\`\`\`bash
cd packages/@smolitux/$PACKAGE
grep -n \"$(echo "$message" | cut -d: -f1 | head -c20)\" $file
\`\`\`

**Fix Required:**
- Update code to resolve $type issue
- Test changes with \`npm run lint\` and \`npm test\`
- Ensure no regressions"

            echo "  📝 Creating: $TITLE"
            
            if gh issue create \
                --title "$TITLE" \
                --label "$LABELS" \
                --body "$BODY" >/dev/null 2>&1; then
                TOTAL_CREATED=$((TOTAL_CREATED + 1))
                echo "    ✅ Issue created"
            else
                echo "    ❌ Failed to create issue"
            fi
                
        done < "$status_file"
    done
    
    echo ""
    echo "🎉 Summary:"
    echo "  📊 Total issues created: $TOTAL_CREATED"
    echo "  📈 View all issues: gh issue list --state open"
    echo "  🏷️  Filter by type: gh issue list --label ERROR --state open"
    echo ""
}

# Quick issue stats
show_issue_stats() {
    echo "📊 Current Issue Statistics:"
    echo "  Total Open: $(gh issue list --state open | wc -l)"
    echo "  Errors: $(gh issue list --label ERROR --state open | wc -l)"
    echo "  Warnings: $(gh issue list --label WARN --state open | wc -l)"
    echo ""
    
    echo "📦 Issues by Package:"
    for pkg in core theme utils testing layout charts media community ai blockchain resonance federation voice-control; do
        count=$(gh issue list --label "package:$pkg" --state open | wc -l)
        if [ $count -gt 0 ]; then
            echo "  @smolitux/$pkg: $count"
        fi
    done
}

# Export functions for sourcing
export -f create_analyzer_issues
export -f show_issue_stats

echo "✅ create_issues.sh loaded"
echo "📋 Available functions:"
echo "  • create_analyzer_issues  - Create issues from status/ files"
echo "  • show_issue_stats        - Show current issue statistics"
