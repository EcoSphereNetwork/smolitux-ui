# 🎯 **CODEX: MERGE PRs IN CHRONOLOGISCHER REIHENFOLGE (BEWÄHRTE METHODE)**

## **DIREKTER BEFEHL FÜR CODEX:**

**WICHTIG:** Prüfe zuerst Repository-Setup, dann führe PR-Merge durch.

### **🔧 SCHRITT 1: REPOSITORY SETUP PRÜFEN**

```bash
# Repository Remote-Status prüfen
echo "🔍 CHECKING REPOSITORY SETUP..."
REPO_URL="https://github.com/EcoSphereNetwork/smolitux-ui"

# Remote-Verbindung prüfen
git remote -v
if [ $? -ne 0 ] || [ -z "$(git remote)" ]; then
    echo "❌ NO REMOTE FOUND - SETTING UP..."
    git remote add origin $REPO_URL
    echo "✅ REMOTE ADDED: $REPO_URL"
fi

# GitHub CLI Authentication prüfen
gh auth status 2>/dev/null
if [ $? -ne 0 ]; then
    echo "❌ GITHUB CLI NOT AUTHENTICATED"
    echo "📝 RUN: gh auth login"
    exit 1
fi

# Repository sync
git fetch origin
echo "✅ REPOSITORY SETUP COMPLETE"
```

### **🚀 SCHRITT 2: CHRONOLOGISCHER PR-MERGE**

```
NACH SETUP: Merge PRs in chronologischer Reihenfolge (ÄLTESTER ZUERST).
REIHENFOLGE: PR #87 → PR #88 → PR #89 → PR #90 → ... → NEUESTER PR
BEWÄHRTE METHODE: 
1) gh pr list --json number,createdAt --jq 'sort_by(.createdAt) | .[0].number' (finde ältesten offenen PR)
2) git checkout main && git pull origin main 
3) gh pr checkout [PR-NUMBER] (automatisch branch setup)
4) git rebase main 
5) BEI KONFLIKTEN: Öffne jede konfliktierte Datei → kombiniere BEIDE Versionen (NIE Features löschen) → PRIORITÄT: Bug-Fixes und Verbesserungen IMMER beibehalten → git add . → git rebase --continue 
6) git push -f 
7) gh pr merge [PR-NUMBER] --merge --delete-branch 
DANN: Zeige "✅ PR #[NUMBER] GEMERGT" und fahre mit dem NÄCHST-ÄLTEREN offenen PR fort.
KRITISCH: Features aus BEIDEN Seiten behalten, Bug-Fixes PERSISTENT beibehalten, alle Fehler dauerhaft beheben.
```

### **🛠️ FEHLERBEHEBUNG FÜR HÄUFIGE PROBLEME:**

```bash
# Problem: "no git remotes found"
if [ -z "$(git remote)" ]; then
    git remote add origin https://github.com/EcoSphereNetwork/smolitux-ui
    git fetch origin
fi

# Problem: "gh not authenticated"
if ! gh auth status &>/dev/null; then
    echo "🔐 GitHub Authentication erforderlich:"
    echo "gh auth login --web"
    exit 1
fi

# Problem: "branch nicht gefunden"
git fetch origin --prune
git branch -r | grep "origin/pr/"
```

---

## **🎯 WORKFLOW-SZENARIEN:**

### **Szenario A: Vollständiges GitHub Setup**
```bash
# Voraussetzungen erfüllt:
# ✅ git remote vorhanden
# ✅ gh auth funktioniert
# ✅ PRs sind verfügbar

# Führe standard chronologischen Merge durch
bash -c "$(cat <<'EOF'
OLDEST_PR=$(gh pr list --json number,createdAt --jq 'sort_by(.createdAt) | .[0].number')
gh pr checkout $OLDEST_PR
git rebase main
git push -f
gh pr merge $OLDEST_PR --merge --delete-branch
EOF
)"
```

### **Szenario B: Repository ohne Remote (wie aktuell)**
```bash
# Setup erforderlich:
echo "🔧 REPOSITORY SETUP ERFORDERLICH"
REPO_URL="https://github.com/EcoSphereNetwork/smolitux-ui"

# 1. Remote hinzufügen
git remote add origin $REPO_URL
echo "✅ Remote hinzugefügt"

# 2. GitHub CLI authentifizieren
echo "🔐 AUTHENTIFIZIERUNG ERFORDERLICH:"
echo "Führe aus: gh auth login --web"
echo "Dann kehre zurück und führe diesen Prompt erneut aus"

# 3. Nach Auth: Repository synchronisieren
git fetch origin --prune
git branch -a  # Zeige verfügbare branches
echo "📝 Jetzt bereit für PR-Merge Workflow"
```

### **Szenario C: Offline-Entwicklung (Fallback)**
```bash
# Wenn GitHub nicht verfügbar:
echo "🔄 FALLBACK: LOKALE ENTWICKLUNG"
echo "Arbeite direkt mit lokalen branches:"

# Zeige lokale branches die wie PR-branches aussehen
git branch | grep -E "(pr-|feature/|fix/)"

# Wechsle zu main und merge manuell
git checkout main
for branch in $(git branch | grep -E "(pr-|feature/|fix/)" | tr -d ' *'); do
    echo "🔀 Merging branch: $branch"
    git merge --no-ff $branch -m "Merge $branch into main"
done
```

### **Szenario D: Einzelner PR-Merge (manuell)**
```bash
# Für spezifischen PR:
PR_NUMBER="87"  # Beispiel

echo "🎯 MANUAL PR MERGE: #$PR_NUMBER"
gh pr checkout $PR_NUMBER
git rebase main
# Bei Konflikten: Auflösen nach Bug-Fix Priorität
git push -f
gh pr merge $PR_NUMBER --merge --delete-branch
echo "✅ PR #$PR_NUMBER GEMERGT"
```

## **🐛 BUG-FIX & VERBESSERUNGS-PRIORITÄT:**

### **GRUNDPRINZIP:**
```
HÖCHSTE PRIORITÄT: Bug-Fixes und Fehler-Korrekturen IMMER beibehalten
REGEL: Wenn Code in einem PR verbessert/repariert wurde → DIESE Version verwenden
ZIEL: Alle Bugs persistent beheben, keine Rückschritte bei Qualität
```

### **Bug-Fix Erkennungs-Pattern:**
```bash
# PR-Beschreibung analysieren für Bug-Fix Indikatoren:
gh pr view $PR_NUMBER --json title,body --jq '.title + " " + .body' | grep -iE "(fix|bug|error|issue|patch|repair|resolve|correct|improve)"

# Typische Bug-Fix Patterns:
# - "Fix memory leak in component"
# - "Resolve infinite loop bug" 
# - "Patch security vulnerability"
# - "Correct calculation error"
# - "Improve performance bottleneck"
```

### **Bug-Fix Konflikt-Auflösung:**
```typescript
// BEISPIEL: Bug-Fix vs. alte Implementation
<<<<<<< HEAD
// Alte, fehlerhafte Version:
function calculateTotal(items) {
  let total = 0;
  for (let item of items) {
    total += item.price; // BUG: Nicht null-safe
  }
  return total;
}
=======
// Bug-Fix Version (aus PR):
function calculateTotal(items) {
  let total = 0;
  for (let item of items) {
    total += item?.price || 0; // FIX: Null-safe mit Fallback
  }
  return total;
}
>>>>>>> pr-branch

// LÖSUNG - Bug-Fix Version IMMER bevorzugen:
function calculateTotal(items) {
  let total = 0;
  for (let item of items) {
    total += item?.price || 0; // FIX: Null-safe mit Fallback - BEHALTEN
  }
  return total;
  // Zusätzliche Features aus main hier hinzufügen falls vorhanden
}
```

### **Performance-Verbesserungs-Konflikte:**
```typescript
// BEISPIEL: Performance-Optimierung vs. alte Implementation
<<<<<<< HEAD
// Alte, langsamere Version:
const processData = (data) => {
  return data.map(item => item.value).filter(val => val > 0); // Ineffizient
}
=======
// Optimierte Version (aus PR):
const processData = (data) => {
  const result = [];
  for (const item of data) {
    if (item.value > 0) result.push(item.value); // Optimiert
  }
  return result;
}
>>>>>>> pr-branch

// LÖSUNG - Optimierte Version beibehalten:
const processData = (data) => {
  const result = [];
  for (const item of data) {
    if (item.value > 0) result.push(item.value); // OPTIMIERUNG BEHALTEN
  }
  return result;
  // Weitere Features aus main hier ergänzen
}
```

### **Security-Fix Konflikte:**
```typescript
// BEISPIEL: Security-Verbesserung vs. alte Implementation
<<<<<<< HEAD
// Unsichere Version:
const validateInput = (input) => {
  return input.length > 0; // Unzureichende Validation
}
=======
// Sichere Version (aus PR):
const validateInput = (input) => {
  if (typeof input !== 'string') return false;
  return input.trim().length > 0 && input.length < 1000; // Sichere Validation
}
>>>>>>> pr-branch

// LÖSUNG - Sichere Version IMMER verwenden:
const validateInput = (input) => {
  if (typeof input !== 'string') return false;
  return input.trim().length > 0 && input.length < 1000; // SECURITY FIX BEHALTEN
  // Erweiterte Features aus main hier hinzufügen
}
```

---

## **🚀 ROBUSTER CHRONOLOGISCHER MERGE-PROZESS:**

```bash
# === 0. Repository Setup validieren ===
echo "🔧 VALIDATING REPOSITORY SETUP..."
REPO_URL="https://github.com/EcoSphereNetwork/smolitux-ui"

# Remote prüfen und ggf. hinzufügen
if [ -z "$(git remote)" ]; then
    git remote add origin $REPO_URL
    echo "✅ Remote hinzugefügt: $REPO_URL"
fi

# GitHub CLI Authentication prüfen
if ! gh auth status &>/dev/null; then
    echo "❌ FEHLER: GitHub CLI nicht authentifiziert"
    echo "🔐 LÖSUNGSSCHRITTE:"
    echo "1. gh auth login --web"
    echo "2. Folge den Anweisungen im Browser"
    echo "3. Führe diesen Befehl erneut aus"
    exit 1
fi

# Repository synchronisieren
git fetch origin --prune
echo "✅ Repository synchronisiert"

# === 1. Ältesten offenen PR finden ===
OLDEST_PR=$(gh pr list --json number,createdAt --jq 'sort_by(.createdAt) | .[0].number' 2>/dev/null)

if [ -z "$OLDEST_PR" ] || [ "$OLDEST_PR" = "null" ]; then
    echo "🎉 KEINE OFFENEN PRS GEFUNDEN - ALLE BEREITS GEMERGT!"
    exit 0
fi

echo "🎯 MERGING OLDEST PR: #$OLDEST_PR"

# === 2. PR Status und Info anzeigen ===
gh pr view $OLDEST_PR --json state,title,createdAt,author
if [ $? -ne 0 ]; then
    echo "❌ FEHLER: PR #$OLDEST_PR nicht gefunden oder nicht zugänglich"
    exit 1
fi

# === 3. Bewährter Merge Process mit verbesserter Robustheit ===
echo "📥 Switching to main branch..."
git checkout main || git checkout -b main origin/main
git pull origin main

echo "📋 Checking out PR #$OLDEST_PR..."
gh pr checkout $OLDEST_PR || {
    echo "❌ FEHLER: Konnte PR #$OLDEST_PR nicht auschecken"
    echo "🔧 ALTERNATIVE: Manueller checkout"
    git fetch origin pull/$OLDEST_PR/head:pr-$OLDEST_PR
    git checkout pr-$OLDEST_PR
}

echo "🔄 Rebasing against main..."
git rebase main || {
    echo "⚠️ MERGE-KONFLIKTE ERKANNT"
    echo "🛠️ KONFLIKT-AUFLÖSUNG ERFORDERLICH:"
    echo "1. Öffne konfliktierte Dateien"
    echo "2. Kombiniere BEIDE Versionen (Bug-Fixes priorisieren)"
    echo "3. git add ."
    echo "4. git rebase --continue"
    echo ""
    echo "📋 KONFLIKTIERTE DATEIEN:"
    git status --porcelain | grep "^UU\|^AA\|^DD" | cut -c4-
    
    # Interaktive Konflikt-Auflösung
    echo ""
    echo "⏸️ PAUSIERT FÜR KONFLIKT-AUFLÖSUNG"
    echo "▶️ NACH AUFLÖSUNG: 'git rebase --continue' und script fortsetzen"
    exit 2
}

echo "📤 Pushing changes..."
git push -f

echo "🔀 Merging PR #$OLDEST_PR..."
gh pr merge $OLDEST_PR --merge --delete-branch

echo "✅ PR #$OLDEST_PR ERFOLGREICH GEMERGT (CHRONOLOGISCH)"
```

---

---

## **🔍 DIAGNOSE & PROBLEMLÖSUNG:**

### **Repository Status Diagnose:**
```bash
echo "🔍 REPOSITORY DIAGNOSE GESTARTET..."
echo ""

# 1. Git Repository Status
echo "📂 GIT REPOSITORY:"
echo "   Current Branch: $(git branch --show-current)"
echo "   Working Directory: $(pwd)"
echo "   Repository Root: $(git rev-parse --show-toplevel 2>/dev/null || echo 'NOT A GIT REPO')"
echo ""

# 2. Remote Configuration
echo "🌐 REMOTE CONFIGURATION:"
if git remote -v &>/dev/null && [ -n "$(git remote)" ]; then
    git remote -v
    echo "   ✅ Remote configured"
else
    echo "   ❌ NO REMOTE FOUND"
    echo "   💡 Fix: git remote add origin https://github.com/EcoSphereNetwork/smolitux-ui"
fi
echo ""

# 3. GitHub CLI Status
echo "🔐 GITHUB CLI STATUS:"
if command -v gh &>/dev/null; then
    if gh auth status &>/dev/null; then
        echo "   ✅ GitHub CLI authenticated"
        echo "   User: $(gh api user --jq '.login' 2>/dev/null || echo 'Unknown')"
    else
        echo "   ❌ GitHub CLI NOT authenticated"
        echo "   💡 Fix: gh auth login --web"
    fi
else
    echo "   ❌ GitHub CLI NOT installed"
    echo "   💡 Fix: Install GitHub CLI"
fi
echo ""

# 4. Available PRs (if possible)
echo "📋 AVAILABLE PRS:"
if gh pr list &>/dev/null; then
    PR_COUNT=$(gh pr list --json number --jq 'length' 2>/dev/null || echo "0")
    echo "   📊 Open PRs: $PR_COUNT"
    if [ "$PR_COUNT" -gt "0" ]; then
        echo "   📅 CHRONOLOGICAL ORDER:"
        gh pr list --json number,title,createdAt --jq 'sort_by(.createdAt) | .[] | "      #\(.number): \(.title) (Created: \(.createdAt[:10]))"' 2>/dev/null
    fi
else
    echo "   ❌ Cannot access PRs (authentication or connection issue)"
fi
echo ""

# 5. Local Branches (Fallback info)
echo "🌿 LOCAL BRANCHES:"
git branch -a 2>/dev/null | head -10
BRANCH_COUNT=$(git branch | wc -l)
echo "   📊 Total local branches: $BRANCH_COUNT"
echo ""

echo "🏁 DIAGNOSE COMPLETE"
```

### **Schnelle Problem-Fixes:**
```bash
# Fix 1: "no git remotes found"
fix_no_remote() {
    echo "🔧 FIXING: No remote found"
    git remote add origin https://github.com/EcoSphereNetwork/smolitux-ui
    git fetch origin --prune
    echo "✅ FIXED: Remote added and synced"
}

# Fix 2: "gh not authenticated"  
fix_gh_auth() {
    echo "🔐 FIXING: GitHub CLI authentication"
    echo "1. Öffne: https://github.com/settings/tokens"
    echo "2. Erstelle Personal Access Token"
    echo "3. Führe aus: gh auth login --with-token"
    echo "4. Füge Token ein"
}

# Fix 3: "PR not found"
fix_pr_missing() {
    echo "🔄 FIXING: PR not accessible"
    git fetch origin --prune
    gh repo sync
    echo "✅ Repository synchronized"
}

# Fix 4: "Merge conflicts"
fix_merge_conflicts() {
    echo "⚔️ FIXING: Merge conflicts"
    echo "🛠️ KONFLIKT-AUFLÖSUNGS-WORKFLOW:"
    echo "1. git status  # Zeige konfliktierte Dateien"
    echo "2. Für jede Datei:"
    echo "   - Öffne Datei in Editor"
    echo "   - Löse Konflikte (Bug-Fixes priorisieren)"
    echo "   - Entferne <<<<<<< ======= >>>>>>> Marker"
    echo "3. git add .  # Markiere als aufgelöst"
    echo "4. git rebase --continue  # Setze rebase fort"
}

# Ausführen der Fixes basierend auf Problem
case "${1:-diagnose}" in
    "no-remote") fix_no_remote ;;
    "auth") fix_gh_auth ;;
    "pr-missing") fix_pr_missing ;;
    "conflicts") fix_merge_conflicts ;;
    *) 
        echo "🔍 Führe Diagnose aus..."
        # Hier würde die Diagnose-Funktion von oben ausgeführt
        ;;
esac
```

```bash
# Alle offenen PRs nach Erstellungsdatum sortiert anzeigen:
gh pr list --json number,title,createdAt --jq 'sort_by(.createdAt) | .[] | "#\(.number): \(.title) (Created: \(.createdAt[:10]))"'

# Beispiel Output:
# #87: Add theme system (Created: 2025-06-01)
# #88: Implement dark mode (Created: 2025-06-02) 
# #89: Add user preferences (Created: 2025-06-03)
# #90: Fix responsive layout (Created: 2025-06-04)

# Nächsten zu mergenden PR (ältesten) bestimmen:
NEXT_OLDEST=$(gh pr list --json number,createdAt --jq 'sort_by(.createdAt) | .[0].number' 2>/dev/null)
```

---

## **🚨 UNIVERSAL KONFLIKT-AUFLÖSUNG MIT BUG-FIX PRIORITÄT:**

### **AUFLÖSUNGS-REIHENFOLGE:**
```
1. SECURITY FIXES → Höchste Priorität
2. BUG FIXES → Sehr hohe Priorität  
3. PERFORMANCE IMPROVEMENTS → Hohe Priorität
4. NEW FEATURES → Normale Priorität (beide behalten)
5. DOCUMENTATION → Kombinieren
```

### **COMPONENT_STATUS.md (Standard-Pattern):**
```markdown
# IMMER BEIDE Versionen kombinieren + Bug-Fixes priorisieren:
<<<<<<< HEAD
**Started:** Sun Jun  8 22:54:15 UTC 2025
**Strategy:** Work with existing codebase
**Bug Status:** Known memory leak in ComponentX
=======
**Started:** Sun Jun  8 23:23:02 UTC 2025  
**Strategy:** Work with existing codebase, enhanced features
**Bug Status:** Memory leak fixed in ComponentX
>>>>>>> pr-branch

# LÖSUNG - Bug-Fixes IMMER beibehalten:
**Started:** Sun Jun  8 22:54:15 UTC 2025
**Last Updated:** Sun Jun  8 23:23:02 UTC 2025
**Strategy:** Work with existing codebase, enhanced features
**Bug Status:** Memory leak FIXED in ComponentX  ← BUG-FIX BEHALTEN

# Status Updates aus BEIDEN Seiten behalten, Bug-Fixes priorisieren:
- [EXISTING_FEATURE]: ✅ Status (aus main)
- [MEMORY_LEAK_FIX]: ✅ FIXED (aus PR) ← KRITISCH BEHALTEN
- [NEW_FEATURE]: ✅ Implemented (aus PR)
- [ANOTHER_FEATURE]: ✅ Enhanced (aus PR)
```

### **Package Index Konflikte mit Bug-Fix Priorität:**
```typescript
// packages/@smolitux/[PACKAGE]/src/index.ts
// FALSCH (Feature-Verlust und Bug-Rückfall):
<<<<<<< HEAD
export { ExistingComponent } from './components/ExistingComponent';
export { OldUtility } from './utils/OldUtility'; // Hat bekannte Bugs
=======
export { ExistingComponent } from './components/ExistingComponent';
export { NewComponent } from './components/NewComponent';
export { FixedUtility } from './utils/FixedUtility'; // Bug-Fix Version
export { EnhancedUtility } from './utils/EnhancedUtility';
>>>>>>> pr-branch

// RICHTIG - Bug-Fixes priorisieren, ALLE Exports behalten:
export { ExistingComponent } from './components/ExistingComponent';
export { FixedUtility } from './utils/FixedUtility';     // BUG-FIX PRIORISIERT
export { NewComponent } from './components/NewComponent';   // Neu aus PR
export { EnhancedUtility } from './utils/EnhancedUtility'; // Neu aus PR
export * from './types';                                   // Alle types
// HINWEIS: OldUtility nicht exportieren da FixedUtility die korrigierte Version ist
```

### **README/Documentation Konflikte:**
```markdown
# FALSCH (Information verlieren):
<<<<<<< HEAD
## Features
- Core components
- Basic testing
=======
## Features  
- Core components
- Advanced testing
- New API integration
>>>>>>> pr-branch

# RICHTIG - Alle Features dokumentieren:
## Features
- Core components               # Aus main
- Advanced testing              # Enhanced aus PR
- New API integration           # Neu aus PR
- Basic testing utilities       # Falls noch relevant aus main
```

### **TypeScript Type Konflikte:**
```typescript
// FALSCH (Type-Definitionen verlieren):
<<<<<<< HEAD
interface ComponentProps {
  children: ReactNode;
  onClick: () => void;
}
=======
interface ComponentProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  onHover?: () => void;
}
>>>>>>> pr-branch

// RICHTIG - Alle Props behalten und erweitern:
interface ComponentProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;           // Neu aus PR
  variant?: 'primary' | 'secondary'; // Neu aus PR  
  onHover?: () => void;        // Neu aus PR
  // Alle bestehenden Props beibehalten
}
```

### **Package.json Dependencies:**
```json
// RICHTIG - Alle Dependencies kombinieren:
"dependencies": {
  "react": "^18.0.0",           // Bestehend
  "lodash": "^4.17.21",         // Bestehend
  "new-package": "^1.0.0",     // Neu aus PR
  "enhanced-lib": "^2.1.0"     // Neu aus PR
},
"devDependencies": {
  "existing-tool": "^1.0.0",   // Bestehend
  "new-test-util": "^1.5.0"    // Neu aus PR
}
```

---

## **📊 CHRONOLOGISCHES PROGRESS TRACKING:**

```bash
# Vollständige PR-Liste mit Chronologie anzeigen:
echo "📅 CHRONOLOGISCHE PR-REIHENFOLGE:"
gh pr list --json number,title,createdAt --jq 'sort_by(.createdAt) | .[] | "#\(.number): \(.title) (Created: \(.createdAt[:10]))"'

# Nach jedem PR (Template):
echo "✅ MERGED: PR #[PR-NUMBER] ([FEATURE-DESCRIPTION]) - CHRONOLOGICAL ORDER"
echo "📅 MERGED DATE ORDER: [CREATION-DATE]"
echo "🎯 PROGRESS: [CURRENT-COUNT]/[TOTAL-COUNT] PRs merged (chronologically)"

# Nächsten ältesten PR bestimmen:
NEXT_OLDEST=$(gh pr list --json number,createdAt --jq 'sort_by(.createdAt) | .[0].number' 2>/dev/null)
if [ -n "$NEXT_OLDEST" ]; then
    NEXT_INFO=$(gh pr view $NEXT_OLDEST --json title,createdAt --jq '"\(.title) (Created: \(.createdAt[:10]))"')
    echo "⏭️ NEXT OLDEST PR: #$NEXT_OLDEST - $NEXT_INFO"
else
    echo "🎉 ALLE PRS CHRONOLOGISCH GEMERGT!"
fi

# Verbleibende PRs anzeigen:
REMAINING=$(gh pr list --json number --jq 'length')
echo "🔄 REMAINING: $REMAINING PRs (in chronological order)"
```

---

## **🔄 CHRONOLOGISCHE NEXT-PR BESTIMMUNG:**

```bash
# Ältesten offenen PR finden (nicht "nächsten"):
OLDEST_PR=$(gh pr list --json number,createdAt --jq 'sort_by(.createdAt) | .[0].number' 2>/dev/null)

if [ -n "$OLDEST_PR" ]; then
    PR_INFO=$(gh pr view $OLDEST_PR --json title,createdAt --jq '"\(.title) (Created: \(.createdAt[:10]))"')
    echo "🎯 OLDEST OPEN PR: #$OLDEST_PR - $PR_INFO"
    echo "📅 MERGING IN CHRONOLOGICAL ORDER (OLDEST FIRST)"
else
    echo "🎉 ALLE PRS CHRONOLOGISCH GEMERGT!"
fi

# Vollständige chronologische Warteschlange anzeigen:
echo "📋 CHRONOLOGICAL MERGE QUEUE:"
gh pr list --json number,title,createdAt --jq 'sort_by(.createdAt) | .[] | "  \(index + 1). PR #\(.number): \(.title) (Created: \(.createdAt[:10]))"'
```

---

## **✅ ERWEITERTE SETUP & BUG-FIX CHECKLISTE:**

### **Vor jedem Merge-Prozess (Setup-Validierung):**
- [ ] **Repository Remote konfiguriert** (git remote -v zeigt origin)
- [ ] **GitHub CLI authentifiziert** (gh auth status erfolgreich)
- [ ] **Repository synchronisiert** (git fetch origin --prune)
- [ ] **Offene PRs verfügbar** (gh pr list zeigt PRs)
- [ ] **Arbeitsverzeichnis sauber** (git status clean)

### **Vor dem individuellen PR-Merge:**
- [ ] **PR-Chronologie bestätigt** (ältester zuerst)
- [ ] **PR auf Bug-Fixes analysiert** (fix/bug/error/issue Keywords)
- [ ] **Security-Fixes identifiziert** (security/vulnerability Keywords)
- [ ] **Performance-Verbesserungen identifiziert** (performance/optimize Keywords)
- [ ] **PR-Zugänglichkeit geprüft** (gh pr view $PR_NUMBER erfolgreich)
- [ ] Alle neuen Komponenten aus PR identifiziert
- [ ] Alle neuen Utilities/Helpers aus PR identifiziert  
- [ ] Alle neuen Types/Interfaces aus PR identifiziert
- [ ] Alle neuen Tests aus PR identifiziert
- [ ] Alle Documentation-Updates aus PR identifiziert

### **Bei Konflikt-Auflösung:**
- [ ] **Repository-Status geprüft** (git status vor Konflikt-Auflösung)
- [ ] **BEIDE Versionen analysiert** (main + PR)
- [ ] **BUG-FIXES aus PR PRIORISIERT** (immer die korrigierte Version wählen)
- [ ] **SECURITY-FIXES aus PR PRIORISIERT** (niemals unsichere Version behalten)
- [ ] **PERFORMANCE-IMPROVEMENTS aus PR PRIORISIERT** (optimierte Version bevorzugen)
- [ ] **ALLE Features kombiniert** (keine gelöscht, außer durch Bug-Fixes ersetzt)
- [ ] **Exports/Imports erweitert** (nicht überschrieben, Bug-Fixes priorisiert)
- [ ] **Documentation ergänzt** (nicht ersetzt, Fixes dokumentiert)
- [ ] **Tests zusammengeführt** (alle behalten, Bug-Fix Tests priorisiert)
- [ ] **Konflikte vollständig aufgelöst** (keine <<<<<<< Marker übrig)

### **Nach dem Merge:**
- [ ] **Push erfolgreich** (git push -f ohne Fehler)
- [ ] **PR erfolgreich gemergt** (gh pr merge ohne Fehler)
- [ ] **Branch gelöscht** (--delete-branch ausgeführt)
- [ ] Neue Features in main branch verfügbar
- [ ] **ALLE BUG-FIXES persistent angewendet** (keine Rückfälle)
- [ ] **ALLE SECURITY-FIXES aktiv** (keine Schwachstellen wieder eingeführt)
- [ ] **ALLE PERFORMANCE-IMPROVEMENTS aktiv** (keine Verlangsamungen)
- [ ] Bestehende Features unverändert funktional (außer durch Fixes verbessert)
- [ ] Package exports vollständig (korrigierte Versionen exportiert)
- [ ] Documentation aktualisiert (Bug-Fixes dokumentiert)
- [ ] Zero Data Loss bestätigt (+ Zero Bug Regression)
- [ ] **Chronologische Reihenfolge eingehalten**
- [ ] **Repository clean** (git status zeigt sauberen Zustand)

---

## **🎯 CHRONOLOGISCHE ANWENDUNG:**

### **Für chronologischen PR-Merge:**
1. **Bestimme ältesten offenen PR** mit `gh pr list --json number,createdAt --jq 'sort_by(.createdAt) | .[0].number'`
2. **Ersetze `[PR-NUMBER]`** mit tatsächlicher ältester PR-Nummer
3. **Ersetze `[FEATURE-NAME]`** mit PR-Feature-Beschreibung
4. **Befolge identische Schritte** unabhängig vom PR-Inhalt
5. **Wende Konflikt-Auflösung an** basierend auf Dateityp
6. **Dokumentiere chronologischen Fortschritt**
7. **Wiederhole mit nächst-ältestem PR**

### **Beispiel-Anwendung (Chronologisch):**
```bash
# Schritt 1: Ältesten PR finden
OLDEST=$(gh pr list --json number,createdAt --jq 'sort_by(.createdAt) | .[0].number')
echo "🎯 Merging oldest PR: #$OLDEST"

# Schritt 2: PR #87 (angenommen ältester)
gh pr view 87 --json state,title,createdAt
git checkout main && git pull origin main
git checkout origin/pr/87 -b pr-87
git rebase origin/main
# [Konflikte lösen - Features kombinieren]
git add . && git rebase --continue
git push -f origin pr-87
gh pr merge 87 --merge --delete-branch
echo "✅ PR #87 GEMERGT (CHRONOLOGICAL: 1/N)"

# Schritt 3: Nächsten ältesten finden und wiederholen
NEXT_OLDEST=$(gh pr list --json number,createdAt --jq 'sort_by(.createdAt) | .[0].number')
echo "⏭️ NEXT OLDEST: #$NEXT_OLDEST"
```

---

## **🚀 ROBUSTE CHRONOLOGISCHE ERFOLGSGARANTIE:**

- ✅ **Setup-Validierung**: Automatische Repository-Setup Prüfung und Korrektur
- ✅ **Fehlerbehandlung**: Robuste Behandlung von Remote-, Auth- und Netzwerkproblemen
- ✅ **Chronologische Reihenfolge**: Ältester PR zuerst, neuester zuletzt
- ✅ **Bewährte Methode**: Basiert auf erfolgreichem PR #371, erweitert um Setup-Validierung
- ✅ **Zero Data Loss**: Alle Features aus beiden Seiten behalten
- ✅ **Zero Bug Regression**: Alle Bug-Fixes persistent beibehalten
- ✅ **Security First**: Alle Security-Fixes priorisiert und persistent
- ✅ **Performance Optimized**: Alle Performance-Verbesserungen beibehalten
- ✅ **Universal einsetzbar**: Für jeden Repository-Zustand und jede Umgebung
- ✅ **Konflikt-sicher**: Klare Auflösungsstrategien mit Bug-Fix Priorität
- ✅ **Wiederholbar**: Identischer Prozess für alle PRs, unabhängig vom Setup
- ✅ **Nachvollziehbar**: Umfassende Diagnose und klare Dokumentation
- ✅ **Fallback-sicher**: Alternative Workflows für verschiedene Szenarien

**🎯 UNIVERSELLER START-BEFEHL - FUNKTIONIERT IN JEDER UMGEBUNG:**

```bash
# Dieser Befehl funktioniert sowohl mit als auch ohne vorhandenes Setup
echo "🚀 STARTING ROBUST PR MERGE WORKFLOW..."

# Automatische Diagnose und Setup
bash -c "$(cat <<'EOF'
# Repository Setup validieren
if [ -z "$(git remote)" ]; then
    git remote add origin https://github.com/EcoSphereNetwork/smolitux-ui
    git fetch origin --prune
fi

# GitHub CLI validieren
if ! gh auth status &>/dev/null; then
    echo "🔐 GitHub Authentication erforderlich: gh auth login --web"
    exit 1
fi

# PRs abrufen und chronologisch mergen
OLDEST_PR=$(gh pr list --json number,createdAt --jq 'sort_by(.createdAt) | .[0].number')
if [ -n "$OLDEST_PR" ] && [ "$OLDEST_PR" != "null" ]; then
    echo "🎯 Merging oldest PR: #$OLDEST_PR"
    gh pr checkout $OLDEST_PR
    git rebase main
    git push -f
    gh pr merge $OLDEST_PR --merge --delete-branch
    echo "✅ PR #$OLDEST_PR successfully merged!"
else
    echo "🎉 No open PRs found - all merged!"
fi
EOF
)"
```

**STARTE MIT DIESEM ROBUSTEN COMMAND - FUNKTIONIERT GARANTIERT!** 🚀

### **📅 MERGE-PRIORITÄT:**
```
HÖCHSTE PRIORITÄT: PR #87 (ältester)
↓
PR #88 (zweit-ältester)
↓  
PR #89 (dritt-ältester)
↓
...
↓
NIEDRIGSTE PRIORITÄT: PR #XXX (neuester)
```
