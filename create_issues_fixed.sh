#!/bin/bash
create_analyzer_issues() {
    echo "🚀 Creating issues with standard GitHub labels..."
    
    ISSUES_LOG="analyzer_issues_fixed.log"
    echo "# Fixed Analyzer Issues - $(date)" > "$ISSUES_LOG"
    
    # Quick React import scan (limited to avoid spam)
    find packages -name "*.tsx" -type f | head -3 | while read file; do
        if grep -q "React\." "$file" && ! grep -q "import React" "$file"; then
            echo "REACT_IMPORT:$file:1:Missing React import" >> "$ISSUES_LOG"
        fi
    done
    
    # Quick TypeScript scan  
    find packages -name "*.tsx" -exec grep -Hn "\bany\b" {} \; | head -3 | while read line; do
        echo "TYPESCRIPT:$line:Uses any type" >> "$ISSUES_LOG"
    done
    
    # Create issues with proper labels
    if gh auth status >/dev/null 2>&1; then
        while IFS=':' read -r type file line message; do
            [ -z "$type" ] && continue
            PACKAGE=$(echo "$file" | cut -d'/' -f3 || echo "unknown")
            TITLE="[$type] $PACKAGE: $(echo "$message" | cut -c1-30)..."
            
            case "$type" in
                "REACT_IMPORT") LABELS="bug,react" ;;
                "TYPESCRIPT") LABELS="bug,typescript" ;;
                *) LABELS="bug" ;;
            esac
            
            gh issue create --title "$TITLE" --label "$LABELS" --body "**File:** $file:$line\n**Issue:** $message" && echo "✅ Created: $TITLE"
        done < "$ISSUES_LOG"
    fi
}
