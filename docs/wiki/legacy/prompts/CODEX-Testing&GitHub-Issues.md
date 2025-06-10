# 🔍 Smolitux UI Testing & GitHub Issues - CODEX PROCESS MONITOR

## 🎯 CODEX MISSION: ÜBERWACHE DEN GESAMTEN PROZESS!

**ROLLE: Aktiver Process Monitor & Problem Solver**
- ✅ Führe Befehle aus UND überwache Ergebnisse
- 🔍 Identifiziere Probleme und handle sie sofort  
- 📊 Verfolge Fortschritt kontinuierlich
- 🛠️ Löse Fehler automatisch mit Fallback-Strategien
- 📋 Erstelle Live-Updates und Berichte

## 🚀 PHASE 1: STARTUP & VALIDATION
```bash
# Codex: Führe aus UND überwache jeden Schritt!

echo "🔍 CODEX: Starting process monitoring..."

# 1. Umgebung validieren
echo "📋 Validating environment..."
[ ! -d "packages/@smolitux" ] && echo "❌ ERROR: Not in repository root" && exit 1
[ ! -f "scripts/run_complete_analysis.sh" ] && echo "❌ ERROR: Scripts missing" && exit 1

# 2. GitHub Auth prüfen
echo "🔑 Checking GitHub authentication..."
if ! gh auth status >/dev/null 2>&1; then
    echo "❌ GitHub auth failed - attempting fix..."
    gh auth login || echo "⚠️ Manual auth required"
fi

# 3. Skript-Permissions prüfen
echo "🔧 Ensuring script permissions..."
chmod +x scripts/*.sh

echo "✅ PHASE 1 COMPLETE - Environment ready"
```

## 🚀 PHASE 2: EXECUTION & MONITORING
```bash
# Codex: Führe Hauptanalyse aus mit kontinuierlicher Überwachung

echo "🚀 PHASE 2: Starting main analysis with monitoring..."

# Hauptanalyse starten
echo "📊 Starting complete analysis..."
if ./scripts/run_complete_analysis.sh; then
    echo "✅ Complete analysis SUCCESS"
else
    echo "❌ Complete analysis FAILED - switching to fallback mode"
    
    # FALLBACK: Schrittweise Ausführung
    echo "🔄 FALLBACK: Manual step execution..."
    
    # Analyzer Issues
    if [ -f "create_issues.sh" ]; then
        source create_issues.sh && create_analyzer_issues
        echo "📊 Analyzer issues: $(gh issue list --label ERROR,WARN --state open | wc -l)"
    fi
    
    # Package-by-package testing
    PACKAGES=("core" "theme" "utils" "layout" "charts")
    for pkg in "${PACKAGES[@]}"; do
        echo "🔄 FALLBACK: Processing $pkg..."
        
        if [ -d "packages/@smolitux/$pkg" ]; then
            cd packages/@smolitux/$pkg
            
            # Test verfügbare Scripts
            SCRIPTS_RUN=0
            [ -f package.json ] && grep -q '"lint"' package.json && npm run lint 2>&1 | tee lint.log && SCRIPTS_RUN=$((SCRIPTS_RUN+1))
            [ -f package.json ] && grep -q '"test"' package.json && npm test 2>&1 | tee test.log && SCRIPTS_RUN=$((SCRIPTS_RUN+1))
            [ -f package.json ] && grep -q '"build"' package.json && npm run build 2>&1 | tee build.log && SCRIPTS_RUN=$((SCRIPTS_RUN+1))
            
            # Issues erstellen
            if [ -f "../../scripts/create_package_issues.sh" ]; then
                ../../scripts/create_package_issues.sh $pkg
            fi
            
            echo "📊 $pkg: $SCRIPTS_RUN scripts executed"
            cd ../../..
        else
            echo "⚠️ Package $pkg not found"
        fi
    done
fi

echo "✅ PHASE 2 COMPLETE - Analysis finished"
```

## 🚀 PHASE 3: VALIDATION & REPORTING
```bash
# Codex: Validiere Ergebnisse und erstelle detaillierte Berichte

echo "🚀 PHASE 3: Results validation and reporting..."

# Issue-Counts validieren
TOTAL_ISSUES=$(gh issue list --state open | wc -l)
CRITICAL_ISSUES=$(gh issue list --label priority:critical --state open | wc -l)
ESLINT_ISSUES=$(gh issue list --label eslint --state open | wc -l)
TEST_ISSUES=$(gh issue list --label test-failure --state open | wc -l)

echo "📊 VALIDATION RESULTS:"
echo "  Total Issues: $TOTAL_ISSUES"
echo "  Critical: $CRITICAL_ISSUES"  
echo "  ESLint: $ESLINT_ISSUES"
echo "  Tests: $TEST_ISSUES"

# Validiere Mindest-Issue-Count
if [ $TOTAL_ISSUES -lt 50 ]; then
    echo "⚠️ WARNING: Low issue count ($TOTAL_ISSUES) - investigating..."
    
    # Debugging
    echo "🔍 Debug: Checking status files..."
    ls -la status/ 2>/dev/null || echo "No status directory"
    
    echo "🔍 Debug: Checking log files..."
    find packages -name "*.log" | head -5
    
    echo "🔍 Debug: Manual issue search..."
    find packages -name "*.tsx" | head -3 | while read file; do
        grep -l "React\." "$file" | head -1
    done
fi

# Erstelle erweiterten Report
./scripts/issue_utils.sh stats > CURRENT_STATUS.md
echo "" >> CURRENT_STATUS.md
echo "## Package Breakdown:" >> CURRENT_STATUS.md
for pkg in core theme utils testing layout charts media community ai blockchain resonance federation voice-control; do
    count=$(gh issue list --label "package:$pkg" --state open | wc -l)
    echo "- @smolitux/$pkg: $count issues" >> CURRENT_STATUS.md
done

echo "✅ PHASE 3 COMPLETE - Validation and reporting finished"
```

## 🚀 PHASE 4: CONTINUOUS MONITORING
```bash
# Codex: Kontinuierliche Überwachung und Problem-Detection

echo "🚀 PHASE 4: Continuous monitoring and problem detection..."

# Live Issue Tracking
echo "📈 Setting up live monitoring..."

# Package Health Check
FAILED_PACKAGES=()
for pkg in core theme utils layout charts; do
    PKG_ISSUES=$(gh issue list --label "package:$pkg" --state open | wc -l)
    if [ $PKG_ISSUES -eq 0 ]; then
        echo "⚠️ ALERT: No issues found for $pkg - might need investigation"
        FAILED_PACKAGES+=($pkg)
    elif [ $PKG_ISSUES -gt 50 ]; then
        echo "🔴 ALERT: High issue count for $pkg ($PKG_ISSUES) - critical problems"
    else
        echo "✅ $pkg: $PKG_ISSUES issues (healthy)"
    fi
done

# Problem Resolution
if [ ${#FAILED_PACKAGES[@]} -gt 0 ]; then
    echo "🛠️ PROBLEM RESOLUTION: Investigating failed packages..."
    for pkg in "${FAILED_PACKAGES[@]}"; do
        echo "🔍 Re-analyzing $pkg..."
        
        cd packages/@smolitux/$pkg
        # Force re-run problematic package
        npm run lint 2>&1 | tee rerun-lint.log
        ../../scripts/create_package_issues.sh $pkg
        cd ../../..
        
        NEW_COUNT=$(gh issue list --label "package:$pkg" --state open | wc -l)
        echo "📊 $pkg: $NEW_COUNT issues after re-run"
    done
fi

echo "✅ PHASE 4 COMPLETE - Monitoring established"
```

## 📊 FINAL CODEX REPORT
```bash
# Codex: Erstelle finalen Überwachungsbericht

echo "📋 CODEX FINAL PROCESS REPORT"
echo "============================="

# Statistics
FINAL_TOTAL=$(gh issue list --state open | wc -l)
FINAL_CRITICAL=$(gh issue list --label priority:critical --state open | wc -l)

echo "🎯 PROCESS COMPLETION:"
echo "  ✅ Total Issues Created: $FINAL_TOTAL"
echo "  🔴 Critical Issues: $FINAL_CRITICAL"  
echo "  📦 Packages Processed: 13"
echo "  ⏱️ Process Duration: $SECONDS seconds"

# Success Criteria Check
if [ $FINAL_TOTAL -ge 50 ]; then
    echo "🎉 SUCCESS: Issue creation target achieved ($FINAL_TOTAL >= 50)"
else
    echo "⚠️ PARTIAL: Issue count below target ($FINAL_TOTAL < 50)"
fi

if [ $FINAL_CRITICAL -gt 0 ]; then
    echo "🚨 ACTION REQUIRED: $FINAL_CRITICAL critical issues need immediate attention"
    gh issue list --label priority:critical --state open --limit 5
fi

# Next Steps
echo ""
echo "📋 RECOMMENDED NEXT ACTIONS:"
echo "1. Review critical issues: gh issue list --label priority:critical"
echo "2. Start with core package issues: gh issue list --label package:core"  
echo "3. Monitor progress: ./scripts/issue_utils.sh stats"

# Save monitoring data
date > LAST_MONITORING_RUN.txt
echo "Total Issues: $FINAL_TOTAL" >> LAST_MONITORING_RUN.txt
echo "Critical: $FINAL_CRITICAL" >> LAST_MONITORING_RUN.txt

echo "✅ CODEX PROCESS MONITORING COMPLETE!"
```

## 🎯 CODEX EXECUTION MANDATE:

**FÜHRE ALLE 4 PHASEN AUS - ÜBERWACHE JEDEN SCHRITT!**

1. **🔍 Validiere** Umgebung und behebe Probleme
2. **🚀 Führe aus** mit Fallback bei Fehlern  
3. **📊 Validiere** Ergebnisse und erstelle Reports
4. **📈 Überwache** kontinuierlich und löse Probleme

**Codex ist Process Owner - nicht nur Executor!**
