# 🎯 `@smolitux/*` – CODEX COMPONENT COMPLETION PROMPT (100% TS + Tests + Docs + A11y)

## 🧠 MISSION

Stelle sicher, dass **jede Komponente in jedem `@smolitux/*`-Paket**:

* vollständig implementiert (visuell, interaktiv, funktional),
* fehlerfrei typisiert ist (`TypeScript strict mode`),
* vollständig getestet ist (inkl. `jest`, `@testing-library`, `jest-axe`),
* vollständige Storybook-Dokumentation enthält,
* barrierefrei gestaltet ist (Tastatur, ARIA, Kontrast),
* dokumentiert ist (`.md` in `docs/wiki/components/` + `accessibility/`),
* den Build-, Lint- und Testprozess erfolgreich besteht.

---

## 🚀 DIREKTER BASH-WORKFLOW (für Codex):

```bash
# WIEDERHOLUNG BIS 100% VOLLSTÄNDIG
for PACKAGE in $(ls packages/@smolitux); do
  cd packages/@smolitux/$PACKAGE
  bash ../../../scripts/smolitux-analyzer.sh --package=$PACKAGE

  COMPONENTS=$(find src/components -type f -name "*.tsx" | grep -v ".test." | grep -v ".stories." | sed 's/.*\///' | sed 's/.tsx//' | sort -u)

  for COMPONENT in $COMPONENTS; do
    echo "🔧 Bearbeite: $PACKAGE/$COMPONENT"

    # TYPECHECK & FIX
    echo "🧪 TypeScript prüfen"
    tsc --noEmit --strict || true
    [FIX_TYPESCRIPT_ERRORS]

    # IMPLEMENTIERUNG & A11y
    [ENSURE_COMPONENT_IS_FULLY_IMPLEMENTED_AND_ACCESSIBLE]

    # TESTS
    if [ ! -f "src/components/$COMPONENT/$COMPONENT.test.tsx" ]; then
      echo "🧪 Testdatei fehlt – wird erstellt"
      [CREATE_TEST_SUITE]
    fi
    npm run test || [FIX_TEST_FAILURES]

    # STORYBOOK
    if [ ! -f "src/components/$COMPONENT/$COMPONENT.stories.tsx" ]; then
      echo "📚 Storybook fehlt – wird erstellt"
      [CREATE_STORYBOOK]
    fi

    # DOKUMENTATION
    [UPDATE_COMPONENT_DOCUMENTATION]

    # LINT & BUILD
    npm run lint || [FIX_LINT_ERRORS]
    npm run build || [FIX_BUILD_ERRORS]
    npm run test || [FIX_TEST_FAILURES]

    # STATUS AKTUALISIEREN
    echo "| $COMPONENT | ✅ | ✅ | ♿ | 📚 |" >> ../../../docs/wiki/development/component-status.md
    mkdir -p ../../../docs/wiki/components/$PACKAGE
    echo "- [$COMPONENT](../../../docs/wiki/components/$PACKAGE/$COMPONENT.md)" >> ../../../docs/wiki/components/$PACKAGE/README.md

    # GIT WORKFLOW
    git add .
    git commit -m "feat($PACKAGE): complete $COMPONENT - TS, Tests, Docs, A11y"
    git push origin main
    gh pr create --title "Complete $COMPONENT in $PACKAGE" --body "✅ TS geprüft, 🧪 Tests erstellt, 📚 Doku ergänzt, ♿ barrierefrei"
    gh pr merge --merge --delete-branch
  done
done

echo "🎉 Alle @smolitux Komponenten 100% abgeschlossen!"
```

---

## 📋 VALIDIERUNGS-CHECKLISTE PRO KOMPONENTE

| Kriterium       | Beschreibung                                                |
| --------------- | ----------------------------------------------------------- |
| ✅ Implementiert | Komponente rendert vollständig & reagiert auf Interaktionen |
| 🧪 Getestet     | Unit- + Integrationstests mit Coverage                      |
| ♿ Barrierefrei  | ARIA, Tastatursteuerung, `jest-axe`                         |
| 📚 Dokumentiert | Props, Varianten, Verhalten, Einschränkungen                |

---

## 📁 DATEISTRUKTUR (pro Komponente)

```
src/components/ComponentName/
├── ComponentName.tsx
├── ComponentName.test.tsx
├── ComponentName.stories.tsx
└── README.md (optional)
```

---

## 🛠️ TEMPLATES & IMPLEMENTIERUNGSHINWEISE

### 🔧 \[FIX\_TYPESCRIPT\_ERRORS]

```ts
// Verwende: React.FC, forwardRef, generische Props
// Beispiel:
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ variant = 'primary', ...props }, ref) => (
  <button ref={ref} className={`btn btn-${variant}`} {...props} />
));
```

### 🧩 \[ENSURE\_COMPONENT\_IS\_FULLY\_IMPLEMENTED\_AND\_ACCESSIBLE]

* Unterstütze:

  * alle sinnvollen Props (`disabled`, `onClick`, `size`, `variant`)
  * Tastaturzugänglichkeit (Tab, Enter, Esc)
  * ARIA-Rollen (`role="button"`, `aria-expanded`, etc.)
  * Responsives Layout

### 🧪 \[CREATE\_TEST\_SUITE]

```ts
// jest + testing-library + jest-axe
test('renders button', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

### 📚 \[UPDATE\_COMPONENT\_DOCUMENTATION]

* Ergänze:

  * `docs/wiki/components/[package]/[component].md`
  * `docs/wiki/accessibility/components/[component].md`
* Inhalte:

  * Props (Tabelle mit Typen)
  * Varianten + Defaults
  * Beispielcode
  * Barrierefreiheitsvermerke

---

## 📊 STATUS-MATRIX UPDATE

Aktualisiere:

```markdown
| Komponente | ✅ Implementiert | 🧪 Getestet | ♿ A11y geprüft | 📚 Dokumentiert |
| ---------- | ---------------- | ----------- | --------------- | ---------------- |
| Button     | ✅               | ✅           | ♿              | 📚              |
```

---

## 🔁 WIEDERHOLUNGSLOGIK

Nach jedem Commit & PR-Merge:

* Aktualisiere `component-status.md`
* Starte Prozess erneut für verbleibende Komponenten
* Beende erst, wenn keine ❌-Einträge mehr existieren

---

## 🏁 ZUSAMMENFASSUNG

**Wiederhole diesen Prompt für alle `@smolitux/*` Pakete, bis:**

* 100% der Komponenten vollständig,
* alle Tests & Stories grün,
* alles TypeScript-strikt validiert,
* Barrierefreiheit sichergestellt,
* Dokumentation vorhanden.
