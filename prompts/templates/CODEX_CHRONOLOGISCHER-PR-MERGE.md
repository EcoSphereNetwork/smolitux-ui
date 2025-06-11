# 🎯 CODEX: CHRONOLOGISCHER PR-MERGE (CODE-ERHALTUNG + RECOVERY)

## **DIREKTER BEFEHL FÜR CODEX:**

**🚨 KRITISCH:** 
- **NIEMALS PRs schließen** ohne erfolgreiches Merging
- **ALLE Code-Verbesserungen aus PRs MÜSSEN erhalten bleiben**
- **AUTOMATISCHE RECOVERY** geschlossener, nicht gemergter PRs
- **Bei Merge-Problemen:** Konflikte lösen, aber PR offen lassen
- **Workflow:** 1) Setup validieren → 2) Geschlossene PRs wiederherstellen → 3) Chronologisch mergen**

### **🔧 SCHRITT 1: SETUP-VALIDIERUNG (VEREINFACHT)**

```bash
# Quick Setup Check
echo "🔍 VALIDATING SETUP..."

# Repository Remote Check
if ! git remote get-url origin &>/dev/null; then
    echo "❌ SETUP ERFORDERLICH - Repository remote fehlt"
    echo "💡 Setup sollte automatisch ausgeführt worden sein"
    echo "🔧 Manueller Fix: git remote add origin https://github.com/EcoSphereNetwork/smolitux-ui.git"
    exit 1
fi

# GitHub CLI Authentication Check  
if ! gh auth status &>/dev/null; then
    echo "❌ SETUP ERFORDERLICH - GitHub CLI nicht authentifiziert"
    echo "💡 Setup sollte automatisch ausgeführt worden sein"
    echo "🔧 Manueller Fix: gh auth login --web"
    exit 1
fi

# Repository Sync
git fetch origin --prune &>/dev/null || {
    echo "⚠️ Repository sync failed - continuing with local data"
}

echo "✅ SETUP VALIDATED - Ready for PR operations"
```

### **🚨 SCHRITT 2: GESCHLOSSENE PRS WIEDERHERSTELLEN**

```bash
# Suche nach geschlossenen, nicht gemergten PRs (KRITISCH für Code-Rettung)
echo "🔍 SEARCHING FOR CLOSED, UNMERGED PRS..."

CLOSED_UNMERGED=$(gh pr list --state closed --json number,mergedAt,closedAt --jq '.[] | select(.mergedAt == null) | .number' 2>/dev/null)

if [ -n "$CLOSED_UNMERGED" ]; then
    echo "🚨 FOUND CLOSED, UNMERGED PRS - CODE-VERBESSERUNGEN GEFÄHRDET!"
    echo "📋 Closed PRs without merge:"
    
    for PR_NUM in $CLOSED_UNMERGED; do
        PR_INFO=$(gh pr view $PR_NUM --json title,closedAt --jq '"PR #" + (.number|tostring) + ": " + .title + " (Closed: " + .closedAt[:10] + ")"')
        echo "   🔴 $PR_INFO"
        
        echo "🔄 REOPENING PR #$PR_NUM to preserve code improvements..."
        
        # Versuche PR wiederzuöffnen
        if gh pr reopen $PR_NUM 2>/dev/null; then
            echo "✅ PR #$PR_NUM successfully reopened"
        else
            echo "⚠️ Could not reopen PR #$PR_NUM - attempting recovery..."
            
            # Fallback: Branch recovery und neuer PR
            git fetch origin --prune
            
            # Suche nach dem PR-Branch
            PR_BRANCH=$(git branch -r | grep -E "(pr.?$PR_NUM|$PR_NUM)" | head -1 | tr -d ' ')
            
            if [ -n "$PR_BRANCH" ]; then
                echo "🔄 Found branch: $PR_BRANCH - creating recovery PR"
                
                # Erstelle Recovery-Branch
                git checkout -b recover-pr-$PR_NUM $PR_BRANCH
                git push -u origin recover-pr-$PR_NUM
                
                # Hole original PR-Details
                ORIGINAL_TITLE=$(gh pr view $PR_NUM --json title --jq '.title' 2>/dev/null || echo "Recovered PR #$PR_NUM")
                ORIGINAL_BODY=$(gh pr view $PR_NUM --json body --jq '.body' 2>/dev/null || echo "Code recovery from closed PR")
                
                # Erstelle neuen PR mit Recovery-Kennzeichnung
                NEW_PR=$(gh pr create \
                    --title "🚨 RECOVERED: $ORIGINAL_TITLE" \
                    --body "🛠️ **CODE RECOVERY FROM CLOSED PR #$PR_NUM**

Original PR was closed without merging. This recovery PR contains all code improvements and bug fixes that must be preserved.

**Original Description:**
$ORIGINAL_BODY

**CRITICAL:** All code improvements, bug fixes, and new features from original PR #$PR_NUM are included." \
                    2>/dev/null | grep -o '#[0-9]*' | head -1 | tr -d '#')
                
                if [ -n "$NEW_PR" ]; then
                    echo "✅ Recovery PR #$NEW_PR created for original PR #$PR_NUM"
                else
                    echo "❌ Could not create recovery PR - manual intervention required"
                fi
            else
                echo "❌ PR branch not found - code may be permanently lost!"
                echo "🔍 Available branches containing '$PR_NUM':"
                git branch -r | grep -i "$PR_NUM" || echo "   No matching branches found"
            fi
        fi
        echo ""
    done
    
    # Nach Recovery: Repository sync
    git fetch origin --prune
    echo "🔄 Repository synced after PR recovery"
    
else
    echo "✅ No closed, unmerged PRs found - all code preserved"
fi

echo ""
```

### **🚀 SCHRITT 3: CHRONOLOGISCHER PR-MERGE (CODE-SCHUTZ)**

```bash
# Chronologischer PR-Merge (Ältester zuerst) - SICHERE VERSION
OLDEST_PR=$(gh pr list --json number,createdAt --jq 'sort_by(.createdAt) | .[0].number' 2>/dev/null)

if [ -z "$OLDEST_PR" ] || [ "$OLDEST_PR" = "null" ]; then
    echo "🎉 KEINE OFFENEN PRS - ALLE GEMERGT!"
    exit 0
fi

echo "🎯 MERGING OLDEST PR: #$OLDEST_PR"

# WICHTIG: PR-Informationen zuerst analysieren
echo "📋 ANALYSIERE PR #$OLDEST_PR..."
gh pr view $OLDEST_PR --json title,body,files --jq '.title as $title | .body as $body | .files as $files | "Title: \($title)\nFeatures: \($body[:200])...\nFiles changed: \($files | length)"'

# Standard chronologischer Merge-Prozess mit Sicherheitschecks
git checkout main && git pull origin main
gh pr checkout $OLDEST_PR

echo "🔄 Attempting rebase with conflict protection..."
if ! git rebase main; then
    echo "⚠️ MERGE-KONFLIKTE ERKANNT - AUFLÖSUNG ERFORDERLICH"
    echo ""
    echo "🚨 WICHTIG: PR #$OLDEST_PR NICHT SCHLIESSEN!"
    echo "🛠️ KONFLIKT-PRIORITÄTEN (ALLE CODE-VERBESSERUNGEN BEHALTEN):"
    echo "1. BUG-FIXES aus PR → IMMER BEHALTEN (Höchste Priorität)"
    echo "2. SECURITY-FIXES aus PR → IMMER BEHALTEN (Höchste Priorität)"  
    echo "3. PERFORMANCE-IMPROVEMENTS aus PR → BEHALTEN (Hohe Priorität)"
    echo "4. NEW-FEATURES aus PR → BEHALTEN + mit main kombinieren"
    echo "5. ALLE neuen Dateien aus PR → BEHALTEN"
    echo "6. ALLE neuen Funktionen aus PR → BEHALTEN"
    echo ""
    echo "📋 KONFLIKTIERTE DATEIEN:"
    git status --porcelain | grep "^UU\|^AA\|^DD" | cut -c4-
    echo ""
    echo "🔧 KONFLIKT-AUFLÖSUNGS-WORKFLOW:"
    echo "1. Für JEDE konfliktierte Datei:"
    echo "   - Öffne Datei in Editor"
    echo "   - Identifiziere Code-Verbesserungen aus PR (rechte Seite >>>>>> pr-branch)"
    echo "   - BEHALTE ALLE Verbesserungen aus PR"
    echo "   - Kombiniere mit bestehenden Features aus main (linke Seite <<<<<<< HEAD)"
    echo "   - Entferne <<<<<<< ======= >>>>>>> Marker"
    echo "2. git add [DATEI]  # Für jede aufgelöste Datei"
    echo "3. git rebase --continue"
    echo "4. Wiederhole bis alle Konflikte aufgelöst"
    echo ""
    echo "⚠️ STOP: Löse Konflikte manuell auf und führe dann fort:"
    echo "   git add . && git rebase --continue"
    echo ""
    echo "🚨 NIEMALS: gh pr close verwenden - PR muss erfolgreich gemergt werden!"
    exit 2
fi

# Erfolgreicher Rebase - jetzt sicher pushen und mergen
echo "✅ Rebase erfolgreich - pushe Änderungen..."
git push -f

echo "🔀 Merge PR #$OLDEST_PR (alle Verbesserungen erhalten)..."
gh pr merge $OLDEST_PR --merge --delete-branch

echo "✅ PR #$OLDEST_PR ERFOLGREICH GEMERGT (CHRONOLOGISCH + ALLE FEATURES ERHALTEN)"

# Nächsten PR anzeigen
NEXT_OLDEST=$(gh pr list --json number,createdAt --jq 'sort_by(.createdAt) | .[0].number' 2>/dev/null)
if [ -n "$NEXT_OLDEST" ] && [ "$NEXT_OLDEST" != "null" ]; then
    echo "⏭️ NÄCHSTER ÄLTESTER PR: #$NEXT_OLDEST"
    echo "🔄 Bereit für nächsten Merge-Zyklus"
else
    echo "🎉 ALLE PRS CHRONOLOGISCH GEMERGT - ALLE FEATURES ERHALTEN!"
fi
```

---

## **🚨 NOTFALL: ERWEITERTE PR-RECOVERY & MANAGEMENT**

### **🔍 Detaillierte Suche nach verlorenen Code-Verbesserungen:**

```bash
# Umfassende Analyse aller geschlossenen PRs
echo "🔍 COMPREHENSIVE PR ANALYSIS..."

echo "📊 Closed PRs (potentially lost code):"
gh pr list --state closed --json number,title,mergedAt,closedAt --jq '.[] | select(.mergedAt == null) | "PR #" + (.number|tostring) + ": " + .title + " (Closed: " + .closedAt[:10] + ")"'

echo ""
echo "📊 Successfully merged PRs:"
gh pr list --state closed --json number,title,mergedAt --jq '.[] | select(.mergedAt != null) | "PR #" + (.number|tostring) + ": " + .title + " (Merged: " + .mergedAt[:10] + ")"'

echo ""
echo "📊 Currently open PRs:"
gh pr list --json number,title,createdAt --jq 'sort_by(.createdAt) | .[] | "PR #" + (.number|tostring) + ": " + .title + " (Created: " + .createdAt[:10] + ")"'
```

### **🛠️ Manuelle Recovery für schwierige Fälle:**

```bash
# Für spezifische PR-Nummer (z.B. PR #485)
RECOVER_SPECIFIC_PR() {
    local PR_NUM=$1
    echo "🚨 RECOVERING PR #$PR_NUM..."
    
    # 1. PR-Status analysieren
    echo "📋 PR Status Analysis:"
    gh pr view $PR_NUM --json state,title,mergedAt,closedAt,headRefName
    
    # 2. Branch-Suche (verschiedene Naming-Patterns)
    echo "🔍 Searching for PR branch..."
    git fetch origin --prune
    
    POSSIBLE_BRANCHES=$(git branch -r | grep -iE "(pr.?$PR_NUM|$PR_NUM|$(gh pr view $PR_NUM --json headRefName --jq '.headRefName' 2>/dev/null))" | tr -d ' ')
    
    if [ -n "$POSSIBLE_BRANCHES" ]; then
        echo "✅ Found potential branches:"
        echo "$POSSIBLE_BRANCHES"
        
        # Nutze den ersten gefundenen Branch
        BRANCH=$(echo "$POSSIBLE_BRANCHES" | head -1)
        echo "🔄 Using branch: $BRANCH"
        
        # Recovery-Branch erstellen
        git checkout -b recover-pr-$PR_NUM $BRANCH
        
        # Prüfe ob rebase nötig ist
        git log --oneline main..recover-pr-$PR_NUM | head -5
        
        echo "🔄 Attempting rebase to current main..."
        git checkout main && git pull origin main
        git checkout recover-pr-$PR_NUM
        
        if git rebase main; then
            echo "✅ Rebase successful"
            git push -u origin recover-pr-$PR_NUM
            
            # Neuen PR erstellen
            ORIGINAL_TITLE=$(gh pr view $PR_NUM --json title --jq '.title' 2>/dev/null)
            NEW_PR=$(gh pr create \
                --title "🛠️ RECOVERED: $ORIGINAL_TITLE" \
                --body "**AUTOMATIC RECOVERY of closed PR #$PR_NUM**

🚨 This PR contains code improvements that were lost when PR #$PR_NUM was closed without merging.

**All bug fixes, security improvements, and new features have been preserved.**

Original PR: #$PR_NUM
Recovery date: $(date)
Status: Ready for chronological merge" | grep -o '#[0-9]*' | tr -d '#')
            
            echo "✅ Recovery PR #$NEW_PR created successfully!"
            echo "🎯 Ready for chronological merge process"
        else
            echo "⚠️ Rebase conflicts detected - manual resolution required"
            echo "🛠️ Resolve conflicts preserving ALL improvements from PR #$PR_NUM"
        fi
    else
        echo "❌ No branch found for PR #$PR_NUM"
        echo "🔍 Manual search required - check these locations:"
        echo "   - Deleted branches: gh api repos/EcoSphereNetwork/smolitux-ui/git/refs/heads"
        echo "   - Forked repositories: Check contributor's fork"
        echo "   - Local branches: git branch --all"
    fi
}

# Beispiel: Recovery von PR #485
# RECOVER_SPECIFIC_PR 485
```

### **🔄 Batch-Recovery für multiple PRs:**

```bash
# Alle geschlossenen, nicht gemergten PRs auf einmal wiederherstellen
BATCH_RECOVER_PRS() {
    echo "🚨 BATCH RECOVERY OF ALL CLOSED, UNMERGED PRS..."
    
    CLOSED_PRS=$(gh pr list --state closed --json number,mergedAt --jq '.[] | select(.mergedAt == null) | .number')
    
    if [ -z "$CLOSED_PRS" ]; then
        echo "✅ No closed, unmerged PRs found"
        return
    fi
    
    echo "📋 Found $(echo "$CLOSED_PRS" | wc -l) closed PRs without merge"
    
    for PR_NUM in $CLOSED_PRS; do
        echo ""
        echo "🔄 Processing PR #$PR_NUM..."
        
        # Versuche direktes Wiedereröffnen
        if gh pr reopen $PR_NUM 2>/dev/null; then
            echo "✅ PR #$PR_NUM reopened successfully"
        else
            echo "⚠️ Cannot reopen PR #$PR_NUM - attempting recovery..."
            RECOVER_SPECIFIC_PR $PR_NUM
        fi
    done
    
    echo ""
    echo "✅ Batch recovery completed"
    echo "🎯 Now ready for chronological merge of all recovered PRs"
}

# Ausführen der Batch-Recovery
# BATCH_RECOVER_PRS
```

---

## **⚔️ KONFLIKT-AUFLÖSUNG MIT BUG-FIX PRIORITÄT**

### **AUFLÖSUNGS-HIERARCHIE:**
```
1. SECURITY FIXES     → Höchste Priorität (immer aus PR)
2. BUG FIXES          → Höchste Priorität (immer aus PR)  
3. PERFORMANCE FIXES  → Hohe Priorität (aus PR bevorzugen)
4. NEW FEATURES       → Kombinieren (beide behalten)
5. DOCUMENTATION      → Kombinieren und erweitern
```

### **STANDARD-KONFLIKTE (Häufigste Dateien):**

#### **COMPONENT_STATUS.md:**
```markdown
# RICHTIG - Timestamps und Status kombinieren:
<<<<<<< HEAD
**Started:** Sun Jun  8 22:54:15 UTC 2025
**Strategy:** Work with existing codebase
=======
**Last Updated:** Sun Jun  8 23:23:02 UTC 2025  
**Strategy:** Work with existing codebase, enhanced features
**Bug Status:** Memory leak fixed in ComponentX
>>>>>>> pr-branch

# LÖSUNG:
**Started:** Sun Jun  8 22:54:15 UTC 2025
**Last Updated:** Sun Jun  8 23:23:02 UTC 2025
**Strategy:** Work with existing codebase, enhanced features
**Bug Status:** Memory leak FIXED in ComponentX  ← BUG-FIX BEHALTEN
```

#### **Package Index (src/index.ts):**
```typescript
// RICHTIG - Alle Exports behalten, Bug-Fixes priorisieren:
<<<<<<< HEAD
export { ExistingComponent } from './components/ExistingComponent';
export { OldUtility } from './utils/OldUtility'; // Hat bekannte Bugs
=======
export { ExistingComponent } from './components/ExistingComponent';
export { FixedUtility } from './utils/FixedUtility'; // Bug-Fix Version
export { NewComponent } from './components/NewComponent';
>>>>>>> pr-branch

# LÖSUNG:
export { ExistingComponent } from './components/ExistingComponent';
export { FixedUtility } from './utils/FixedUtility';     // BUG-FIX PRIORISIERT
export { NewComponent } from './components/NewComponent';   // NEUES FEATURE BEHALTEN
// HINWEIS: OldUtility nicht exportieren da durch FixedUtility ersetzt
```

#### **TypeScript Konfiguration:**
```json
// RICHTIG - Path mappings erweitern, nicht überschreiben:
{
  "compilerOptions": {
    "paths": {
      "@smolitux/core/*": ["./packages/@smolitux/core/src/*"],     // Bestehend
      "@smolitux/theme/*": ["./packages/@smolitux/theme/src/*"],   // Bestehend
      "@smolitux/utils/*": ["./packages/@smolitux/utils/src/*"],   // Neu aus PR
      "@smolitux/testing/*": ["./packages/@smolitux/testing/src/*"] // Neu aus PR
    }
  }
}
```

---

## **📊 CHRONOLOGISCHE PROGRESS-VERFOLGUNG**

### **PR-Warteschlange anzeigen:**
```bash
echo "📅 CHRONOLOGISCHE PR-REIHENFOLGE (Ältester → Neuester):"
gh pr list --json number,title,createdAt --jq 'sort_by(.createdAt) | .[] | "  \(index + 1). PR #\(.number): \(.title) (Created: \(.createdAt[:10]))"'

# Beispiel Output:
#   1. PR #87: Add theme system (Created: 2025-06-01)
#   2. PR #88: Implement dark mode (Created: 2025-06-02) 
#   3. PR #89: Add user preferences (Created: 2025-06-03)
```

### **Nach jedem Merge:**
```bash
echo "✅ MERGED: PR #[NUM] - [DESCRIPTION] (CHRONOLOGICAL ORDER)"
echo "📅 CREATION DATE: [DATE]"

# Verbleibende PRs zählen
REMAINING=$(gh pr list --json number --jq 'length')
echo "🔄 REMAINING: $REMAINING PRs"

# Nächsten ältesten bestimmen
NEXT=$(gh pr list --json number,createdAt --jq 'sort_by(.createdAt) | .[0].number')
echo "⏭️ NEXT OLDEST: PR #$NEXT"
```

---

## **🚨 FEHLERBEHANDLUNG & DIAGNOSE**

### **Häufige Probleme:**

#### **Problem: "Permission denied" beim Push**
```bash
# Lösung: Credentials prüfen
gh auth status
# Falls nicht authentifiziert: gh auth login --web
```

#### **Problem: "PR not found"** 
```bash
# Lösung: Repository sync
git fetch origin --prune
gh repo sync
```

#### **Problem: "Rebase conflicts"**
```bash
# Lösung: Manuelle Konflikt-Auflösung
echo "🛠️ KONFLIKT-WORKFLOW:"
echo "1. git status  # Zeige konfliktierte Dateien"
echo "2. Für jede Datei:"
echo "   - Öffne in Editor"
echo "   - Wende Prioritäts-Regel an (Bug-Fixes > Features)"
echo "   - Entferne <<<<<<< ======= >>>>>>> Marker"
echo "3. git add .  # Markiere als aufgelöst"
echo "4. git rebase --continue  # Setze rebase fort"
```

---

## **🎯 UNIVERSELLER START-BEFEHL (CODE-SCHUTZ + RECOVERY)**

```bash
# Kompletter PR-Management-Workflow: Recovery + Chronologischer Merge
bash -c "$(cat <<'EOF'
# 1. Setup-Validierung
if ! git remote get-url origin &>/dev/null; then
    echo "❌ Repository setup required"
    exit 1
fi

if ! gh auth status &>/dev/null; then
    echo "❌ GitHub authentication required"
    exit 1
fi

echo "🔍 Starting comprehensive PR management..."

# 2. Geschlossene, nicht gemergte PRs wiederherstellen
echo "🚨 PHASE 1: Checking for closed, unmerged PRs..."
CLOSED_UNMERGED=$(gh pr list --state closed --json number,mergedAt --jq '.[] | select(.mergedAt == null) | .number' 2>/dev/null)

if [ -n "$CLOSED_UNMERGED" ]; then
    echo "⚠️ Found closed PRs without merge - attempting recovery..."
    for PR_NUM in $CLOSED_UNMERGED; do
        echo "🔄 Attempting to reopen PR #$PR_NUM..."
        if gh pr reopen $PR_NUM 2>/dev/null; then
            echo "✅ PR #$PR_NUM reopened successfully"
        else
            echo "⚠️ Could not reopen PR #$PR_NUM - code may need manual recovery"
        fi
    done
    git fetch origin --prune
else
    echo "✅ No closed, unmerged PRs found"
fi

# 3. Chronologischer Merge aller offenen PRs
echo ""
echo "🚀 PHASE 2: Chronological merge of open PRs..."
OLDEST_PR=$(gh pr list --json number,createdAt --jq 'sort_by(.createdAt) | .[0].number')

if [ -n "$OLDEST_PR" ] && [ "$OLDEST_PR" != "null" ]; then
    echo "🎯 Processing oldest PR: #$OLDEST_PR"
    
    # PR-Details für Kontext
    gh pr view $OLDEST_PR --json title,body --jq '"Title: " + .title + "\nDescription: " + (.body[:100] // "No description") + "..."'
    
    # Sichere Merge-Sequenz
    git checkout main && git pull origin main
    gh pr checkout $OLDEST_PR
    
    if git rebase main; then
        echo "✅ Clean rebase - proceeding with merge"
        git push -f
        gh pr merge $OLDEST_PR --merge --delete-branch
        echo "✅ PR #$OLDEST_PR merged successfully with ALL improvements preserved!"
        
        # Check for more PRs
        REMAINING=$(gh pr list --json number --jq 'length')
        echo "📊 Remaining PRs: $REMAINING"
    else
        echo "🚨 MERGE CONFLICTS DETECTED FOR PR #$OLDEST_PR"
        echo "❌ STOPPING TO PREVENT CODE LOSS"
        echo ""
        echo "🛠️ REQUIRED ACTIONS:"
        echo "1. Resolve conflicts preserving ALL PR improvements"
        echo "2. Prioritize: Bug-fixes > Security-fixes > Performance > New features"
        echo "3. Run: git add . && git rebase --continue"
        echo "4. Then: git push -f && gh pr merge $OLDEST_PR --merge --delete-branch"
        echo ""
        echo "🚨 CRITICAL: Do NOT close PR #$OLDEST_PR!"
        echo "📋 Conflicted files:"
        git status --porcelain | grep "^UU\|^AA\|^DD" | cut -c4-
        exit 2
    fi
else
    echo "🎉 No open PRs found - all work completed!"
fi

echo ""
echo "✅ PR management cycle completed successfully!"
EOF
)"
```

---

## **✅ ERFOLGSGARANTIE-CHECKLISTE (CODE-SCHUTZ + RECOVERY)**

### **Phase 1: PR-Recovery (vor Merge):**
- [ ] **Geschlossene PRs analysiert** - gh pr list --state closed ausgeführt
- [ ] **Ungemergte PRs identifiziert** - mergedAt: null gefunden
- [ ] **Recovery versucht** - gh pr reopen für alle geschlossenen PRs
- [ ] **Branch-Recovery durchgeführt** - Falls Wiedereröffnung fehlschlägt
- [ ] **Neue Recovery-PRs erstellt** - Mit Kennzeichnung "RECOVERED"
- [ ] **Repository synchronisiert** - git fetch origin --prune

### **Phase 2: Vor dem Merge:**
- [ ] **Setup validiert** - Remote und GitHub CLI konfiguriert
- [ ] **Ältester PR identifiziert** - Chronologische Reihenfolge bestätigt (inkl. Recovery-PRs)
- [ ] **PR-Details analysiert** - Features und Verbesserungen dokumentiert
- [ ] **PR zugänglich** - gh pr view $PR_NUMBER erfolgreich
- [ ] **Code-Backup erstellt** - Branch backup für Notfall

### **Phase 3: Während des Merge:**
- [ ] **Main branch aktuell** - git pull origin main erfolgreich
- [ ] **PR ausgecheckt** - gh pr checkout erfolgreich
- [ ] **Rebase versucht** - Konflikte erkannt oder erfolgreich

### **Phase 4: Bei Konflikten (KRITISCH):**
- [ ] **🚨 PR NICHT SCHLIESSEN** - PR bleibt offen bis Konflikte gelöst
- [ ] **Alle PR-Verbesserungen identifiziert** - Bug-Fixes, Features, neue Dateien
- [ ] **Bug-Fixes aus PR priorisiert** - Korrigierte Versionen IMMER behalten
- [ ] **Security-Fixes aus PR priorisiert** - Sicherheitsverbesserungen IMMER behalten
- [ ] **Performance-Fixes aus PR priorisiert** - Optimierungen IMMER behalten
- [ ] **Neue Features aus PR kombiniert** - Mit bestehenden Features zusammengeführt
- [ ] **Alle neuen Dateien aus PR behalten** - Keine Code-Dateien verloren
- [ ] **Konflikte vollständig aufgelöst** - Keine Merge-Marker übrig
- [ ] **Build-Test vor finalem Merge** - Funktionalität bestätigt

### **Phase 5: Nach erfolgreichem Merge:**
- [ ] **Push erfolgreich** - git push -f ohne Fehler
- [ ] **PR erfolgreich gemergt** - gh pr merge --merge erfolgreich
- [ ] **Branch automatisch gelöscht** - Bereinigung durchgeführt
- [ ] **ALLE Code-Verbesserungen im main branch** - Keine Regression
- [ ] **Alle neuen Features verfügbar** - Funktionalität erhalten
- [ ] **Alle Bug-Fixes aktiv** - Verbesserungen persistent
- [ ] **Recovery-PRs erfolgreich integriert** - Geschlossene PRs gerettet
- [ ] **Chronologie beibehalten** - Nächster ältester PR identifiziert

### **Phase 6: Kontinuität & Monitoring:**
- [ ] **Keine PRs versehentlich geschlossen** - Nur erfolgreiche Merges
- [ ] **Backup-Branches vorhanden** - Für Wiederherstellung falls nötig
- [ ] **Code-Änderungen dokumentiert** - PR-Backups erstellt
- [ ] **Recovery-Protokoll geführt** - Dokumentation wiederhergestellter PRs
- [ ] **Verbleibende PRs geprüft** - Queue für nächste Iteration

### **🔄 Wiederholungszyklen:**
- [ ] **Nach jedem Merge:** Prüfe auf neue geschlossene PRs
- [ ] **Recovery-Monitoring:** Kontinuierliche Überwachung auf Code-Verlust
- [ ] **Batch-Verarbeitung:** Bei mehreren geschlossenen PRs

**🚨 EISERNE REGELN:**
1. **Ein PR wird NIE geschlossen ohne dass ALLE Code-Verbesserungen erfolgreich in main gemergt wurden**
2. **Geschlossene PRs werden IMMER auf verlorene Code-Verbesserungen geprüft**
3. **Recovery hat HÖCHSTE PRIORITÄT vor neuen Merges**
4. **Bei Zweifeln: PR offen lassen und manuell prüfen**

**STARTE MIT DEM CODE-SCHUTZ + RECOVERY BEFEHL - GARANTIERT KEINE CODE-VERLUSTE!** 🛡️
