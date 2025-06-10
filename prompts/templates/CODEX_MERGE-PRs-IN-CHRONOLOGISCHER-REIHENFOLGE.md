# 🎯 **CODEX: MERGE PRs IN CHRONOLOGISCHER REIHENFOLGE (BEWÄHRTE METHODE)**

## **DIREKTER BEFEHL FÜR CODEX:**

Du hast Zugriff auf das Remote Repository, nutze gh (Github-CLI).

```
JETZT SOFORT: Merge PRs in chronologischer Reihenfolge (ÄLTESTER ZUERST).
REIHENFOLGE: PR #87 → PR #88 → PR #89 → PR #90 → ... → NEUESTER PR
BEWÄHRTE METHODE: 1) gh pr list --json number,createdAt --jq 'sort_by(.createdAt) | .[0].number' (finde ältesten offenen PR)
2) git checkout main && git pull origin main 
3) git checkout origin/pr/[PR-NUMBER] -b pr-[PR-NUMBER] 
4) git rebase origin/main 
5) BEI KONFLIKTEN: Öffne jede konfliktierte Datei → kombiniere BEIDE Versionen (NIE Features löschen) → git add . → git rebase --continue 
6) git push -f origin pr-[PR-NUMBER] 
7) gh pr merge [PR-NUMBER] --merge --delete-branch 
DANN: Zeige "✅ PR #[NUMBER] GEMERGT" und fahre mit dem NÄCHST-ÄLTEREN offenen PR fort.
KRITISCH: Features aus BEIDEN Seiten behalten, NIEMALS überschreiben.
```

---

## **🚀 CHRONOLOGISCHER MERGE-PROZESS:**

```bash
# === 1. Ältesten offenen PR finden ===
OLDEST_PR=$(gh pr list --json number,createdAt --jq 'sort_by(.createdAt) | .[0].number')
echo "🎯 MERGING OLDEST PR: #$OLDEST_PR"

# === 2. PR Status prüfen ===
gh pr view $OLDEST_PR --json state,title,createdAt
# Erwartung: {"state":"OPEN","title":"[PR-TITLE]","createdAt":"[DATE]"}

# === 3. Bewährter Merge Process ===
git checkout main && git pull origin main
git checkout origin/pr/$OLDEST_PR -b pr-$OLDEST_PR
git rebase origin/main

# === 4. Bei Konflikten → BEIDE Versionen kombinieren ===
git add . && git rebase --continue
git push -f origin pr-$OLDEST_PR
gh pr merge $OLDEST_PR --merge --delete-branch
echo "✅ PR #$OLDEST_PR [FEATURE-NAME] GEMERGT (CHRONOLOGISCH)"
```

---

## **📅 CHRONOLOGIE-BESTIMMUNG:**

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

## **🚨 UNIVERSAL KONFLIKT-AUFLÖSUNG:**

### **COMPONENT_STATUS.md (Standard-Pattern):**
```markdown
# IMMER BEIDE Versionen kombinieren:
<<<<<<< HEAD
**Started:** Sun Jun  8 22:54:15 UTC 2025
**Strategy:** Work with existing codebase
=======
**Started:** Sun Jun  8 23:23:02 UTC 2025  
**Strategy:** Work with existing codebase, enhanced features
>>>>>>> pr-branch

# LÖSUNG - Timestamps und Features kombinieren:
**Started:** Sun Jun  8 22:54:15 UTC 2025
**Last Updated:** [NEUESTER_TIMESTAMP]
**Strategy:** Work with existing codebase, enhanced features

# Status Updates aus BEIDEN Seiten behalten:
- [EXISTING_FEATURE]: ✅ Status (aus main)
- [NEW_FEATURE]: ✅ Implemented (aus PR)
- [ANOTHER_FEATURE]: ✅ Enhanced (aus PR)
```

### **Package Index Konflikte:**
```typescript
// packages/@smolitux/[PACKAGE]/src/index.ts
// FALSCH (Feature-Verlust):
<<<<<<< HEAD
export { ExistingComponent } from './components/ExistingComponent';
export { OldUtility } from './utils/OldUtility';
=======
export { ExistingComponent } from './components/ExistingComponent';
export { NewComponent } from './components/NewComponent';
export { EnhancedUtility } from './utils/EnhancedUtility';
>>>>>>> pr-branch

// RICHTIG - ALLE Exports behalten:
export { ExistingComponent } from './components/ExistingComponent';
export { OldUtility } from './utils/OldUtility';           // Aus main
export { NewComponent } from './components/NewComponent';   // Aus PR
export { EnhancedUtility } from './utils/EnhancedUtility'; // Aus PR
export * from './types';                                   // Alle types
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

## **✅ FEATURE-ERHALTUNGS-CHECKLISTE:**

### **Vor dem Merge:**
- [ ] PR-Chronologie bestätigt (ältester zuerst)
- [ ] Alle neuen Komponenten aus PR identifiziert
- [ ] Alle neuen Utilities/Helpers aus PR identifiziert  
- [ ] Alle neuen Types/Interfaces aus PR identifiziert
- [ ] Alle neuen Tests aus PR identifiziert
- [ ] Alle Documentation-Updates aus PR identifiziert

### **Bei Konflikt-Auflösung:**
- [ ] **BEIDE Versionen analysiert** (main + PR)
- [ ] **ALLE Features kombiniert** (keine gelöscht)
- [ ] **Exports/Imports erweitert** (nicht überschrieben)
- [ ] **Documentation ergänzt** (nicht ersetzt)
- [ ] **Tests zusammengeführt** (alle behalten)

### **Nach dem Merge:**
- [ ] Neue Features in main branch verfügbar
- [ ] Bestehende Features unverändert funktional
- [ ] Package exports vollständig
- [ ] Documentation aktualisiert
- [ ] Zero Data Loss bestätigt
- [ ] **Chronologische Reihenfolge eingehalten**

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

## **🚀 CHRONOLOGISCHE ERFOLGSGARANTIE:**

- ✅ **Chronologische Reihenfolge**: Ältester PR zuerst, neuester zuletzt
- ✅ **Bewährte Methode**: Basiert auf erfolgreichem PR #371
- ✅ **Zero Data Loss**: Alle Features aus beiden Seiten behalten
- ✅ **Universal einsetzbar**: Für jeden PR-Typ geeignet
- ✅ **Konflikt-sicher**: Klare Auflösungsstrategien
- ✅ **Wiederholbar**: Identischer Prozess für alle PRs
- ✅ **Nachvollziehbar**: Klare chronologische Dokumentation

**STARTE MIT DEM ÄLTESTEN OFFENEN PR - CHRONOLOGISCHE REIHENFOLGE EINHALTEN!** 🚀

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
