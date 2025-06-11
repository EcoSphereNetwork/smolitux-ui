# 🎯 CODEX: CHRONOLOGISCHER PR-MERGE (OPTIMIERT)

## **DIREKTER BEFEHL FÜR CODEX:**

**WICHTIG:** Setup-Validierung zuerst, dann chronologischer PR-Merge.

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

### **🚀 SCHRITT 2: CHRONOLOGISCHER PR-MERGE**

```bash
# Chronologischer PR-Merge (Ältester zuerst)
OLDEST_PR=$(gh pr list --json number,createdAt --jq 'sort_by(.createdAt) | .[0].number' 2>/dev/null)

if [ -z "$OLDEST_PR" ] || [ "$OLDEST_PR" = "null" ]; then
    echo "🎉 KEINE OFFENEN PRS - ALLE GEMERGT!"
    exit 0
fi

echo "🎯 MERGING OLDEST PR: #$OLDEST_PR"

# Standard chronologischer Merge-Prozess
git checkout main && git pull origin main
gh pr checkout $OLDEST_PR
git rebase main || {
    echo "⚠️ MERGE-KONFLIKTE - AUFLÖSUNG ERFORDERLICH"
    echo "🛠️ KONFLIKT-PRIORITÄTEN:"
    echo "1. BUG-FIXES → Höchste Priorität (immer aus PR behalten)"
    echo "2. SECURITY-FIXES → Höchste Priorität (immer aus PR behalten)"  
    echo "3. PERFORMANCE-IMPROVEMENTS → Hohe Priorität (aus PR behalten)"
    echo "4. NEW-FEATURES → Beide Versionen kombinieren"
    echo ""
    echo "📋 KONFLIKTIERTE DATEIEN:"
    git status --porcelain | grep "^UU\|^AA\|^DD" | cut -c4-
    echo ""
    echo "⏸️ NACH KONFLIKT-AUFLÖSUNG: git add . && git rebase --continue"
    exit 2
}

git push -f
gh pr merge $OLDEST_PR --merge --delete-branch
echo "✅ PR #$OLDEST_PR GEMERGT (CHRONOLOGISCH)"

# Nächsten PR anzeigen
NEXT_OLDEST=$(gh pr list --json number,createdAt --jq 'sort_by(.createdAt) | .[0].number' 2>/dev/null)
if [ -n "$NEXT_OLDEST" ] && [ "$NEXT_OLDEST" != "null" ]; then
    echo "⏭️ NÄCHSTER ÄLTESTER PR: #$NEXT_OLDEST"
else
    echo "🎉 ALLE PRS CHRONOLOGISCH GEMERGT!"
fi
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

## **🎯 UNIVERSELLER START-BEFEHL**

```bash
# Robuster chronologischer PR-Merge - funktioniert in jeder Umgebung
bash -c "$(cat <<'EOF'
# Setup-Validierung
if ! git remote get-url origin &>/dev/null; then
    echo "❌ Repository setup required"
    exit 1
fi

if ! gh auth status &>/dev/null; then
    echo "❌ GitHub authentication required"
    exit 1
fi

# Ältesten PR finden und mergen
OLDEST_PR=$(gh pr list --json number,createdAt --jq 'sort_by(.createdAt) | .[0].number')
if [ -n "$OLDEST_PR" ] && [ "$OLDEST_PR" != "null" ]; then
    echo "🎯 Merging oldest PR: #$OLDEST_PR"
    git checkout main && git pull origin main
    gh pr checkout $OLDEST_PR
    git rebase main
    git push -f
    gh pr merge $OLDEST_PR --merge --delete-branch
    echo "✅ PR #$OLDEST_PR merged successfully!"
else
    echo "🎉 No open PRs - all merged!"
fi
EOF
)"
```

---

## **✅ ERFOLGSGARANTIE-CHECKLISTE**

### **Vor dem Merge:**
- [ ] **Setup validiert** - Remote und GitHub CLI konfiguriert
- [ ] **Ältester PR identifiziert** - Chronologische Reihenfolge bestätigt
- [ ] **PR zugänglich** - gh pr view $PR_NUMBER erfolgreich

### **Während des Merge:**
- [ ] **Main branch aktuell** - git pull origin main erfolgreich
- [ ] **PR ausgecheckt** - gh pr checkout erfolgreich
- [ ] **Rebase ausgeführt** - gegen aktuellen main branch

### **Bei Konflikten:**
- [ ] **Bug-Fixes priorisiert** - Korrigierte Versionen aus PR behalten
- [ ] **Features kombiniert** - Alle neuen Features aus beiden Seiten
- [ ] **Konflikte vollständig aufgelöst** - Keine Merge-Marker übrig
- [ ] **Tests validiert** - Build erfolgreich nach Auflösung

### **Nach dem Merge:**
- [ ] **Push erfolgreich** - git push -f ohne Fehler
- [ ] **PR gemergt** - gh pr merge erfolgreich
- [ ] **Branch gelöscht** - Automatische Bereinigung
- [ ] **Chronologie beibehalten** - Nächster ältester PR identifiziert

**STARTE MIT DEM UNIVERSELLEN BEFEHL - FUNKTIONIERT GARANTIERT!** 🚀
