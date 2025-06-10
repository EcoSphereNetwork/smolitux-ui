# 🎯 **CODEX: MERGE NÄCHSTEN PR (BEWÄHRTE METHODE)**

## **DIREKTER BEFEHL FÜR CODEX:**

```
JETZT SOFORT: Merge den nächsten offenen PR aus der Liste. 
BEWÄHRTE METHODE: 1) gh pr view [PR-NUMBER] --json state (prüfe dass offen) 
2) git checkout main && git pull origin main 
3) git checkout origin/pr/[PR-NUMBER] -b pr-[PR-NUMBER] 
4) git rebase origin/main 
5) BEI KONFLIKTEN: Öffne jede konfliktierte Datei → kombiniere BEIDE Versionen (NIE Features löschen) → git add . → git rebase --continue 
6) git push -f origin pr-[PR-NUMBER] 
7) gh pr merge [PR-NUMBER] --merge --delete-branch 
DANN: Zeige "✅ PR #[NUMBER] GEMERGT" und fahre mit dem nächsten PR fort. 
KRITISCH: Features aus BEIDEN Seiten behalten, NIEMALS überschreiben.
```

---

## **🚀 STANDARDISIERTER MERGE-PROZESS:**

```bash
# === 1. PR Status prüfen ===
gh pr view [PR-NUMBER] --json state,title
# Erwartung: {"state":"OPEN","title":"[PR-TITLE]"}

# === 2. Bewährter Merge Process ===
git checkout main && git pull origin main
git checkout origin/pr/[PR-NUMBER] -b pr-[PR-NUMBER]
git rebase origin/main

# === 3. Bei Konflikten → BEIDE Versionen kombinieren ===
git add . && git rebase --continue
git push -f origin pr-[PR-NUMBER]
gh pr merge [PR-NUMBER] --merge --delete-branch
echo "✅ PR #[PR-NUMBER] [FEATURE-NAME] GEMERGT"
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

## **📊 UNIVERSAL PROGRESS TRACKING:**

```bash
# Nach jedem PR (Template):
echo "✅ MERGED: PR #[PR-NUMBER] ([FEATURE-DESCRIPTION])"
echo "🎯 PROGRESS: [CURRENT-COUNT]/[TOTAL-COUNT] PRs merged"
echo "⏭️ NEXT: PR #[NEXT-PR-NUMBER] ([NEXT-FEATURE])"
echo "🔄 REMAINING: [REMAINING-COUNT] PRs"
```

---

## **🔄 NEXT-PR BESTIMMUNG:**

```bash
# Nächsten offenen PR finden:
NEXT_PR=$(gh pr list --json number --jq '.[0].number' 2>/dev/null)
if [ -n "$NEXT_PR" ]; then
    echo "⏭️ NÄCHSTER PR: #$NEXT_PR"
    gh pr view $NEXT_PR --json title --jq '.title'
else
    echo "🎉 ALLE PRS GEMERGT!"
fi
```

---

## **✅ FEATURE-ERHALTUNGS-CHECKLISTE:**

### **Vor dem Merge:**
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

---

## **🎯 UNIVERSAL ANWENDUNG:**

### **Für jeden beliebigen PR:**
1. **Ersetze `[PR-NUMBER]`** mit tatsächlicher PR-Nummer
2. **Ersetze `[FEATURE-NAME]`** mit PR-Feature-Beschreibung
3. **Befolge identische Schritte** unabhängig vom PR-Inhalt
4. **Wende Konflikt-Auflösung an** basierend auf Dateityp
5. **Dokumentiere Fortschritt** mit Universal-Template

### **Beispiel-Anwendung:**
```bash
# PR #365: Theme documentation
gh pr view 365 --json state,title
git checkout main && git pull origin main
git checkout origin/pr/365 -b pr-365
git rebase origin/main
# [Konflikte lösen - Theme docs kombinieren]
git add . && git rebase --continue
git push -f origin pr-365
gh pr merge 365 --merge --delete-branch
echo "✅ PR #365 THEME DOCS GEMERGT"
```

---

## **🚀 ERFOLGSGARANTIE:**

- ✅ **Bewährte Methode**: Basiert auf erfolgreichem PR #371
- ✅ **Zero Data Loss**: Alle Features aus beiden Seiten behalten
- ✅ **Universal einsetzbar**: Für jeden PR-Typ geeignet
- ✅ **Konflikt-sicher**: Klare Auflösungsstrategien
- ✅ **Wiederholbar**: Identischer Prozess für alle PRs

**STARTE MIT DEM NÄCHSTEN OFFENEN PR - BEWÄHRTE METHODE ANWENDEN!** 🚀
