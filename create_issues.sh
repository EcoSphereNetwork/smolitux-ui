#!/bin/bash

create_analyzer_issues() {
    echo "🚀 Creating GitHub issues for validation problems..."
    
    TOTAL_CREATED=0
    
    for status_file in status/*.log; do
        [ ! -f "$status_file" ] && continue
        
        PACKAGE=$(basename "$status_file" .log)
        echo "📦 Processing @smolitux/$PACKAGE..."
        
        while IFS=':' read -r type file line message; do
            [ -z "$type" ] && continue
            [[ "$type" =~ ^# ]] && continue
            
            TITLE="[$type] $PACKAGE: $(echo "$message" | cut -c1-40)..."
            LABELS="bug,$type,package:$PACKAGE"
            
            if [ "$type" = "ERROR" ]; then
                LABELS="$LABELS,priority:high"
            fi
            
            BODY="**Problem:** $message
**File:** $file:$line  
**Package:** @smolitux/$PACKAGE
**Type:** $type

**Reproduction:**
\`\`\`bash
cd packages/@smolitux/$PACKAGE
grep -n \"$(echo "$message" | cut -d: -f1)\" $file
\`\`\`"

            echo "Creating issue: $TITLE"
            gh issue create \
                --title "$TITLE" \
                --label "$LABELS" \
                --body "$BODY" && TOTAL_CREATED=$((TOTAL_CREATED + 1))
                
        done < "$status_file"
    done
    
    echo "✅ Created $TOTAL_CREATED GitHub issues!"
}

# Export function
export -f create_analyzer_issues
