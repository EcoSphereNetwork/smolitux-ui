#!/bin/bash

# ═══════════════════════════════════════════════════════════════════════════════
# 🛠️ ISSUE_UTILS.SH - GitHub Issues Utilities & Quick Actions
# ═══════════════════════════════════════════════════════════════════════════════

# Quick issue viewing functions
show_critical_issues() {
    echo "🔴 CRITICAL ISSUES (Build Blockers):"
    gh issue list --label "priority:critical" --state open --limit 20
}

show_package_issues() {
    local package=${1:-core}
    echo "📦 Issues for @smolitux/$package:"
    gh issue list --label "package:$package" --state open --limit 20
}

show_type_issues() {
    local type=${1:-eslint}
    echo "🏷️ $type Issues:"
    gh issue list --label "$type" --state open --limit 20
}

# Quick stats
quick_stats() {
    echo "📊 QUICK STATS:"
    echo "├─ Total Open: $(gh issue list --state open | wc -l)"
    echo "├─ Critical: $(gh issue list --label priority:critical --state open | wc -l)"
    echo "├─ High Priority: $(gh issue list --label priority:high --state open | wc -l)"
    echo "├─ ESLint: $(gh issue list --label eslint --state open | wc -l)"
    echo "├─ TypeScript: $(gh issue list --label typescript --state open | wc -l)"
    echo "├─ Tests: $(gh issue list --label test-failure --state open | wc -l)"
    echo "└─ Build: $(gh issue list --label build --state open | wc -l)"
}

# Package overview
package_overview() {
    echo "📦 PACKAGE OVERVIEW:"
    for pkg in core theme utils testing layout charts media community ai blockchain resonance federation voice-control; do
        count=$(gh issue list --label "package:$pkg" --state open | wc -l)
        if [ $count -gt 0 ]; then
            printf "├─ %-12s %2d issues\n" "$pkg:" "$count"
        fi
    done
}

# Bulk operations
close_fixed_issues() {
    echo "🔄 Closing issues marked as fixed..."
    gh issue list --label "status:fixed" --state open --json number --jq '.[].number' | while read issue; do
        echo "  Closing #$issue"
        gh issue close $issue --comment "Auto-closed: marked as fixed"
    done
}

# Create quick fix issue
create_quick_issue() {
    local title="$1"
    local package="$2"
    local type="${3:-bug}"
    local description="$4"
    
    if [ -z "$title" ] || [ -z "$package" ]; then
        echo "Usage: create_quick_issue 'title' 'package' [type] [description]"
        echo "Example: create_quick_issue 'Fix button styling' 'core' 'bug' 'Button has wrong colors'"
        return 1
    fi
    
    local body="**Package:** @smolitux/$package
**Type:** $type

**Description:**
$description

**Created via:** issue_utils.sh quick creation"
    
    gh issue create \
        --title "$title" \
        --label "$type,package:$package" \
        --body "$body"
}

# Interactive package selector
select_package() {
    echo "📦 Select a package:"
    select pkg in core theme utils testing layout charts media community ai blockchain resonance federation voice-control; do
        if [ -n "$pkg" ]; then
            echo "Selected: $pkg"
            show_package_issues "$pkg"
            break
        fi
    done
}

# Search issues by keyword
search_issues() {
    local keyword="$1"
    if [ -z "$keyword" ]; then
        echo "Usage: search_issues <keyword>"
        return 1
    fi
    
    echo "🔍 Searching for '$keyword':"
    gh issue list --search "$keyword" --state open --limit 20
}

# Create batch issues from file
create_batch_issues() {
    local file="$1"
    if [ ! -f "$file" ]; then
        echo "Usage: create_batch_issues <issues.txt>"
        echo ""
        echo "File format (one per line):"
        echo "TITLE|PACKAGE|LABEL|BODY"
        return 1
    fi
    
    local count=0
    while IFS='|' read -r title package label body; do
        [ -z "$title" ] && continue
        
        echo "Creating: $title"
        gh issue create \
            --title "$title" \
            --label "$label,package:$package" \
            --body "$body" && count=$((count + 1))
    done < "$file"
    
    echo "✅ Created $count issues from $file"
}

# Export issues to CSV
export_issues_csv() {
    local output="${1:-issues.csv}"
    echo "Exporting issues to $output..."
    
    echo "Number,Title,State,Labels,Package,Created" > "$output"
    
    gh issue list --state all --json number,title,state,labels,createdAt --limit 1000 | \
    jq -r '.[] | [.number, .title, .state, (.labels | map(.name) | join(";")), (.labels | map(select(.name | startswith("package:"))) | .[0].name // ""), .createdAt] | @csv' >> "$output"
    
    echo "✅ Exported to $output"
}

# Help function
show_help() {
    echo "🛠️ ISSUE UTILITIES - Available Commands:"
    echo ""
    echo "📊 VIEWING:"
    echo "  quick_stats              - Show issue statistics"
    echo "  package_overview         - Issues by package"
    echo "  show_critical_issues     - Show critical/build issues"
    echo "  show_package_issues PKG  - Show issues for package"
    echo "  show_type_issues TYPE    - Show issues by type"
    echo "  search_issues KEYWORD    - Search issues"
    echo ""
    echo "🔧 ACTIONS:"
    echo "  create_quick_issue TITLE PKG [TYPE] [DESC] - Quick issue creation"
    echo "  create_batch_issues FILE                   - Batch create from file"
    echo "  close_fixed_issues                         - Close fixed issues"
    echo ""
    echo "📤 EXPORT:"
    echo "  export_issues_csv [FILE]  - Export to CSV"
    echo ""
    echo "🎯 INTERACTIVE:"
    echo "  select_package           - Interactive package selector"
    echo ""
    echo "Examples:"
    echo "  show_package_issues core"
    echo "  show_type_issues eslint"
    echo "  create_quick_issue 'Fix button' 'core' 'bug' 'Button styling broken'"
    echo "  search_issues 'typescript'"
}

# Auto-completion for package names
_package_complete() {
    local packages="core theme utils testing layout charts media community ai blockchain resonance federation voice-control"
    COMPREPLY=($(compgen -W "$packages" -- "${COMP_WORDS[COMP_CWORD]}"))
}

complete -F _package_complete show_package_issues

# Main command dispatcher
if [ "${BASH_SOURCE[0]}" == "${0}" ]; then
    case "${1:-help}" in
        "stats"|"s") quick_stats ;;
        "overview"|"o") package_overview ;;
        "critical"|"c") show_critical_issues ;;
        "package"|"p") show_package_issues "$2" ;;
        "type"|"t") show_type_issues "$2" ;;
        "search") search_issues "$2" ;;
        "create") create_quick_issue "$2" "$3" "$4" "$5" ;;
        "batch") create_batch_issues "$2" ;;
        "close") close_fixed_issues ;;
        "export") export_issues_csv "$2" ;;
        "select") select_package ;;
        "help"|"h"|*) show_help ;;
    esac
else
    # When sourced, export all functions
    export -f quick_stats package_overview show_critical_issues show_package_issues
    export -f show_type_issues search_issues create_quick_issue create_batch_issues
    export -f close_fixed_issues export_issues_csv select_package show_help
    
    echo "✅ issue_utils.sh loaded"
    echo "💡 Run 'show_help' for available commands"
fi
