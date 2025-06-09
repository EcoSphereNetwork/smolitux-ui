# 🎯 `@smolitux/*` – CODEX COMPONENT COMPLETION PROMPT

## **🚀 DIREKTER BEFEHL FÜR CODEX:**

```bash
# ENDLOS-SCHLEIFE: Wiederhole, bis alle Komponenten in allen @smolitux/*-Paketen geprüft, getestet, repariert und dokumentiert sind
for PACKAGE in $(ls packages/@smolitux); do
  cd packages/@smolitux/$PACKAGE

  # ANALYSIERE KOMPONENTEN
  bash ../../../scripts/smolitux-analyzer.sh --package=$PACKAGE

  # Finde unvollständige Komponenten
  INCOMPLETE=$(find src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | while read file; do
    COMP=$(basename $file .tsx)
    if [ ! -f "src/components/$COMP/$COMP.test.tsx" ] || [ ! -f "src/components/$COMP/$COMP.stories.tsx" ]; then
      echo "$COMP"
    fi
  done)

  for COMPONENT in $INCOMPLETE; do
    echo "🔧 Bearbeite: $PACKAGE/$COMPONENT"

    # REPARIERE ODER ERSTELLE KOMPONENTE
    [IMPLEMENT_OR_FIX_COMPONENT]

    # VALIDIERUNG
    npm run lint && npm run test && npm run build

    # DOKUMENTATION
    echo "✅ $COMPONENT in $PACKAGE abgeschlossen" >> ../../../docs/wiki/development/component-status.md
    mkdir -p ../../../docs/wiki/components/$PACKAGE
    echo "- [$COMPONENT](../../../docs/wiki/components/$PACKAGE/$COMPONENT.md)" >> ../../../docs/wiki/components/$PACKAGE/README.md

    # GIT & PR
    git add .
    git commit -m "feat($PACKAGE): complete $COMPONENT - 100% implementation"
    git push origin main
    gh pr create --title "Complete $COMPONENT in $PACKAGE" --body "✅ Tests, ♿ A11y, 📚 Docs abgeschlossen"
    gh pr merge --merge --delete-branch
  done
done
echo "🎉 Alle @smolitux/* Komponenten vollständig!"
```

---

## 📋 **AUFGABENÜBERSICHT**

### **1. 🔍 Komponenten-Scan & Statusanalyse**

* Durchsuche alle `packages/@smolitux/*/src/components/`
* Erfasse:

  * Fehlen `.test.tsx`, `.stories.tsx` oder `.md`?
  * Sind Props untypisiert oder fehlen Varianten?
  * Gibt es A11y-Lücken (`aria`, Tastatur, Kontrast)?
* Schreibe Ergebnis in: `docs/wiki/development/component-status.md`

---

### **2. 🧪 Komponenten testen & reparieren**

Für jede erkannte Komponente:

* Falls Tests fehlen: erstelle mit `jest`, `@testing-library/react`, `jest-axe`
* Führe Tests aus: `npm run test`
* Führe A11y-Test aus (`jest-axe`)
* Repariere defekte Implementierungen
* Ergänze:

  * `forwardRef`
  * vollständige `props`-Typisierung
  * unterstützte Varianten
  * Responsivität & A11y

---

### **3. 📚 Dokumentation vervollständigen**

* Dokumentiere Props, Verhalten, Events
* Erstelle/aktualisiere Markdown in:

  * `docs/wiki/components/[package]/[component].md`
  * `docs/wiki/accessibility/components/[component].md`
* Trage Fortschritt ein in:

  * `docs/wiki/development/component-status.md`

    * `✅ abgeschlossen`
    * `🧪 getestet`
    * `♿ barrierefrei geprüft`

---

### **4. 🚨 Fehlende Komponenten erkennen**

* Vergleiche `component-status.md`, Design-Doku, Issues
* Wenn erwähnt, aber im Code fehlend:

  * Erstelle GitHub-Issue: `Component: [Name] missing`
  * Verlinke Quelle (z. B. Design-Doku oder Issue-Kommentar)

---

## 📊 STATUS-LOGIK & VALIDIERUNG

```bash
npm run lint
npm run test
npm run build
```

* Erfolgreich = „✅ abgeschlossen“ in `component-status.md`
* Misslungen = Issue erstellen oder PR nicht mergen

---

## 🔁 AUTOMATISCH WIEDERHOLEN

Nach jedem Komponentenabschluss:

* Prüfe erneut auf verbleibende Lücken
* Fahre fort, bis `component-status.md` keine „❌“-Einträge mehr enthält

---

## 📁 FILE STRUCTURE PRO KOMPONENTE

```
src/components/ComponentName/
├── ComponentName.tsx
├── ComponentName.test.tsx
├── ComponentName.stories.tsx
└── README.md (optional)
```

---

## ✅ ERFOLGSKRITERIEN (pro Paket)

* 100% getestete Komponenten (`.test.tsx`)
* 100% Storybook-Abdeckung (`.stories.tsx`)
* Vollständige Props-Typisierung
* Dokumentation für Devs & A11y
* `npm run build` & `test` ohne Fehler

---

## 🎯 MISSION

**Wiederhole diese Aufgabe für alle `@smolitux/*`-Pakete. Ziel:**

* Jede Komponente vollständig
* Jeder Test grün
* Jede API dokumentiert
* Jeder A11y-Aspekt geprüft
