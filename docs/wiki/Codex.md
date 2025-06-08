# Codex: Umfassende Komponententests & Fertigstellung

## 🎯 **Mission: Jede Komponente einzeln testen und fertigstellen**

**Ziel:** Codex soll systematisch **jede einzelne Komponente** in allen `@smolitux/*` Paketen testen, überarbeiten und vollständig fertigstellen. Dies ist ein **iterativer Prozess** - dieser Prompt kann mehrfach ausgeführt werden, bis alle Komponenten perfekt sind.

---

## 📋 **Phase 1: Umgebung vorbereiten (nur beim ersten Mal)**

### 1.1 Abhängigkeiten bereinigen & installieren
```bash
# Vollständige Bereinigung
rm -rf node_modules package-lock.json
rm -rf packages/*/node_modules packages/*/coverage
rm -rf docs/node_modules .nx

# Stabile Installation
npm install --force --no-audit --no-fund
# Falls Fehler: npm install --legacy-peer-deps --force

# Fehlende Pakete identifizieren und installieren
npm list --depth=0 2>&1 | grep "UNMET DEPENDENCY" || echo "✓ Alle Abhängigkeiten erfüllt"
```

### 1.2 Status-Dashboard initialisieren
```bash
# Erstelle/Update Status-Tracking Datei
echo "# Smolitux UI Component Status - $(date)" > COMPONENT_STATUS.md
echo "" >> COMPONENT_STATUS.md
echo "| Paket | Komponenten | Tests | Coverage | Status | Letzte Bearbeitung |" >> COMPONENT_STATUS.md
echo "|-------|-------------|-------|----------|--------|---------------------|" >> COMPONENT_STATUS.md
```

---

## 📦 **Phase 2: Komponenten-by-Komponenten Analyse**

### 2.1 **Für JEDES @smolitux/* Paket ausführen:**

#### **Paket-Reihenfolge (priorisiert):**
1. `@smolitux/core` ⭐ (Basis-Komponenten)
2. `@smolitux/theme` (Styling-System)
3. `@smolitux/layout` (Layout-Komponenten)
4. `@smolitux/utils` (Utility-Funktionen)
5. `@smolitux/testing` (Test-Utilities)
6. `@smolitux/charts` (Chart-Komponenten)
7. `@smolitux/icons` (Icon-System)
8. `@smolitux/ai` (AI-Komponenten)
9. `@smolitux/media` (Media-Komponenten)
10. `@smolitux/blockchain` (Blockchain-Komponenten)
11. `@smolitux/community` (Community-Features)
12. `@smolitux/resonance` (Resonance-Features)
13. `@smolitux/voice-control` (Voice-Control)
14. `@smolitux/federation` (Federation-Features)

#### **2.2 Für jedes Paket - Detailanalyse:**

```bash
# Aktuelles Paket definieren
CURRENT_PACKAGE="core"  # Ändere entsprechend

echo "🔍 ANALYSIERE: @smolitux/$CURRENT_PACKAGE"
echo "=====================================\n"

# 1. Paket-Struktur analysieren
find packages/@smolitux/$CURRENT_PACKAGE/src -name "*.tsx" -o -name "*.ts" | grep -E "(components|index)" | head -20

# 2. Komponenten inventarisieren
echo "\n📋 KOMPONENTEN-INVENTAR:"
find packages/@smolitux/$CURRENT_PACKAGE/src -name "*.tsx" | xargs grep -l "export.*Component\|export default" | sed 's/.*\//- /'
```

#### **2.3 JEDE EINZELNE KOMPONENTE bearbeiten:**

**Für jede gefundene Komponente-Datei:**

```bash
# Beispiel: Button.tsx in @smolitux/core
COMPONENT_FILE="packages/@smolitux/core/src/components/Button/Button.tsx"
COMPONENT_NAME="Button"

echo "🧩 BEARBEITE KOMPONENTE: $COMPONENT_NAME"
echo "========================================\n"

# 1. Komponente analysieren
echo "📄 Aktuelle Implementierung:"
cat "$COMPONENT_FILE" | head -30

# 2. Tests prüfen/erstellen
TEST_FILE="${COMPONENT_FILE%.tsx}.test.tsx"
if [ ! -f "$TEST_FILE" ]; then
    echo "❌ FEHLT: Test-Datei für $COMPONENT_NAME"
    echo "✅ ERSTELLE: Vollständige Test-Suite für $COMPONENT_NAME"
    # Hier sollte Codex eine vollständige Test-Datei erstellen
fi

# 3. Stories prüfen/erstellen  
STORY_FILE="${COMPONENT_FILE%.tsx}.stories.tsx"
if [ ! -f "$STORY_FILE" ]; then
    echo "❌ FEHLT: Storybook-Story für $COMPONENT_NAME"
    echo "✅ ERSTELLE: Storybook-Story für $COMPONENT_NAME"
    # Hier sollte Codex eine Story-Datei erstellen
fi

# 4. Einzelkomponenten-Test ausführen
echo "\n🧪 TESTE: $COMPONENT_NAME"
npm test -- --testPathPattern="$COMPONENT_NAME" --coverage --coverageReporters=json-summary

# 5. Ergebnisse dokumentieren
COVERAGE=$(cat packages/@smolitux/$CURRENT_PACKAGE/coverage/coverage-summary.json 2>/dev/null | jq -r '.total.statements.pct // "N/A"')
echo "| @smolitux/$CURRENT_PACKAGE | $COMPONENT_NAME | ✅ | $COVERAGE% | ✅ FERTIG | $(date) |" >> COMPONENT_STATUS.md
```

---

## 🔧 **Phase 3: Komponenten-Fixes & Verbesserungen**

### 3.1 **Für JEDE fehlerhafte Komponente:**

```bash
echo "🛠 REPARIERE KOMPONENTE: $COMPONENT_NAME"
echo "======================================\n"

# 1. TypeScript-Fehler beheben
npm run type-check --workspace=@smolitux/$CURRENT_PACKAGE

# 2. ESLint-Fehler beheben
npm run lint --workspace=@smolitux/$CURRENT_PACKAGE -- --fix

# 3. Test-Fehler beheben
npm test --workspace=@smolitux/$CURRENT_PACKAGE -- --testPathPattern="$COMPONENT_NAME" --verbose

# 4. Accessibility prüfen
npm test --workspace=@smolitux/$CURRENT_PACKAGE -- --testPathPattern="$COMPONENT_NAME.*a11y"

# 5. Performance prüfen
npm run build --workspace=@smolitux/$CURRENT_PACKAGE
```

### 3.2 **Vollständige Komponente erstellen (Template):**

**Für jede Komponente soll Codex sicherstellen:**

✅ **Implementierung** (`ComponentName.tsx`):
- Props-Interface mit vollständiger TypeScript-Typisierung
- forwardRef für ref-Weiterleitung
- Accessibility-Attribute (ARIA, Semantic HTML)
- Error Boundaries wo nötig
- Performance-Optimierungen (React.memo bei Bedarf)

✅ **Tests** (`ComponentName.test.tsx`):
- Unit Tests für alle Props
- Accessibility Tests (jest-axe)
- Interaction Tests (user-events)
- Snapshot Tests
- Error-Handling Tests
- Performance Tests bei komplexen Komponenten

✅ **Stories** (`ComponentName.stories.tsx`):
- Default Story
- Alle Prop-Varianten
- Interaction Stories
- Accessibility Stories
- Documentation

✅ **Types** (`ComponentName.types.ts`):
- Vollständige Props-Interfaces
- Event-Handler Typen
- Ref-Typen
- Theme-Integration

---

## 📊 **Phase 4: Dokumentation & Tracking**

### 4.1 **Nach jeder Komponente:**

```bash
# 1. Coverage-Daten aktualisieren
./generate-coverage-dashboard.sh --package $CURRENT_PACKAGE --component $COMPONENT_NAME

# 2. Test-Dashboard aktualisieren
echo "| $COMPONENT_NAME | $(npm test --workspace=@smolitux/$CURRENT_PACKAGE --silent -- --testPathPattern="$COMPONENT_NAME" --passWithNoTests | grep -c "✓") Tests | $(cat packages/@smolitux/$CURRENT_PACKAGE/coverage/coverage-summary.json | jq -r '.total.statements.pct')% | ✅ | $(date +%Y-%m-%d) |" >> docs/wiki/testing/test-coverage-dashboard.md

# 3. Komponenten-Dokumentation
echo "### $COMPONENT_NAME\n- ✅ Implementation complete\n- ✅ Tests: $(npm test --workspace=@smolitux/$CURRENT_PACKAGE --silent -- --testPathPattern="$COMPONENT_NAME" --passWithNoTests | grep -c "✓")\n- ✅ Coverage: $(cat packages/@smolitux/$CURRENT_PACKAGE/coverage/coverage-summary.json | jq -r '.total.statements.pct')%\n- ✅ Stories: Available\n- ✅ Types: Complete\n\n" >> docs/wiki/development/component-status.md
```

### 4.2 **Paket-Abschluss:**

```bash
echo "📦 PAKET @smolitux/$CURRENT_PACKAGE ABGESCHLOSSEN"
echo "============================================\n"

# 1. Gesamt-Coverage berechnen
npm test --workspace=@smolitux/$CURRENT_PACKAGE -- --coverage --coverageReporters=json-summary,text

# 2. Build-Test
npm run build --workspace=@smolitux/$CURRENT_PACKAGE

# 3. Lint final
npm run lint --workspace=@smolitux/$CURRENT_PACKAGE

# 4. Package.json aktualisieren (Version, Scripts, etc.)
# 5. README.md des Pakets aktualisieren
# 6. CHANGELOG.md Entry
```

---

## 🔄 **Phase 5: Iterative Fortsetzung**

### 5.1 **Nach jedem Prompt-Durchlauf:**

```bash
echo "📈 FORTSCHRITT NACH DIESEM DURCHLAUF:"
echo "====================================\n"

# 1. Fortschritt anzeigen
cat COMPONENT_STATUS.md

# 2. Nächste Schritte definieren
echo "\n🎯 NÄCHSTER DURCHLAUF:"
echo "- Bearbeite nächstes Paket: @smolitux/NÄCHSTES_PAKET"
echo "- Fokus auf: [spezifische Komponenten die noch fehlen]"
echo "- Behebe: [spezifische Errors aus diesem Durchlauf]"

# 3. Issues für komplexe Probleme erstellen
# (Codex soll echte GitHub Issues mit Details erstellen)
```

---

## ⚠️ **Fehlerbehandlung & Robustheit**

### **Wenn Abhängigkeiten fehlen:**
```bash
# Automatische Erkennung und Installation
npm ls 2>&1 | grep "UNMET DEPENDENCY" | awk '{print $3}' | xargs npm install --save-dev

# Fallback für häufige fehlende Pakete:
npm install --save-dev \
  @typescript-eslint/eslint-plugin \
  @eslint/js \
  jest jest-axe jest-environment-jsdom \
  tsup ts-node \
  react react-dom @types/react @types/react-dom \
  eslint-config-prettier eslint-config-standard
```

### **Wenn Tests fehlschlagen:**
```bash
echo "🐛 TEST-FEHLER in $COMPONENT_NAME:"
npm test --workspace=@smolitux/$CURRENT_PACKAGE -- --testPathPattern="$COMPONENT_NAME" --verbose --no-cache

# Codex soll:
# 1. Fehler-Logs analysieren
# 2. Mocks/Setup prüfen
# 3. Tests reparieren
# 4. Komponente anpassen falls nötig
```

---

## 🎯 **Erfolgs-Kriterien pro Komponente:**

- ✅ **100% TypeScript-Konformität** (keine any-Types)
- ✅ **≥90% Test-Coverage** (Statements, Branches, Functions, Lines)
- ✅ **Alle Accessibility-Tests bestanden**
- ✅ **Storybook-Integration funktional**
- ✅ **Build erfolgreich** (keine Errors/Warnings)
- ✅ **ESLint sauber** (0 Errors, minimale Warnings)
- ✅ **Performance optimiert** (Bundle-Size, Render-Performance)
- ✅ **Dokumentation vollständig** (Props, Examples, Usage)

---

## 📝 **Ausgabe-Format nach jedem Durchlauf:**

```markdown
# Smolitux UI - Component Completion Report
**Datum:** $(date)
**Durchlauf:** #X

## ✅ Abgeschlossene Komponenten:
- @smolitux/core/Button (Tests: 15/15, Coverage: 95%)
- @smolitux/core/Input (Tests: 12/12, Coverage: 92%)
- ...

## 🔧 Reparierte Komponenten:
- @smolitux/layout/Grid (TypeScript-Fehler behoben)
- ...

## ❌ Noch zu bearbeitende Komponenten:
- @smolitux/charts/LineChart (Tests fehlen)
- ...

## 📊 Gesamt-Fortschritt:
- Pakete: 3/14 vollständig
- Komponenten: 45/120 fertiggestellt
- Durchschnittliche Coverage: 87%

## 🎯 Nächster Schritt:
Bearbeite @smolitux/charts Paket - Fokus auf LineChart, BarChart, PieChart
```

---

**💡 Hinweis:** Dieser Prompt ist designed für **mehrfache Ausführung**. Jeder Durchlauf sollte 3-5 Komponenten komplett fertigstellen. Nach 5-10 Durchläufen sollten alle Komponenten perfekt sein.
