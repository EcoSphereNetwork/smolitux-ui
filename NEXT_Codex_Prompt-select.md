# Continue Autonomous Package Loop: `@smolitux/core > Select`

## ✅ Precondition Check

- ✅ Radio component validated as functional (41/49 tests passing, 84% success rate)
- ✅ Core functionality working, accessibility improvements identified
- ✅ Progress documented in `AGENTS.md` & `CODEX_PROGRESS.md`
- ✅ 27/534 components completed (5.1%)
- 🔓 Component Loop active

---

## 📦 Current Target Package
**@smolitux/core > Select**

---

## 🗂️ Component Path

```bash
packages/@smolitux/core/src/components/Select/
```

## 🔁 Component Execution Workflow

### 1. 🔍 VALIDATE EXISTING

Select component already exists and was previously implemented. Check current status:

**Expected Features:**
- `value?: string | string[]` – Ausgewählte Werte
- `defaultValue?: string | string[]` – Standard-Werte
- `onChange?: (value: string | string[]) => void` – Änderungshandler
- `options: SelectOption[]` – Verfügbare Optionen
- `placeholder?: string` – Platzhaltertext
- `disabled?: boolean` – Deaktiviert
- `multiple?: boolean` – Mehrfachauswahl
- `searchable?: boolean` – Suchfunktion
- `clearable?: boolean` – Löschbar
- `size?: "sm" | "md" | "lg"` – Größe
- `variant?: "default" | "error"` – Farbvariante
- `label?: string` – Label-Text
- `description?: string` – Beschreibungstext

**Barrierefreiheit:**
- ARIA: role="combobox", aria-expanded, aria-haspopup, aria-activedescendant
- Keyboard Navigation: Pfeiltasten, Enter, Escape, Tab
- Focus Management: Fokusring, Optionsfokus
- Screen Reader Support: Labels, Beschreibungen, Live-Updates

### 2. 🧪 TEST

**Datei:** `Select.test.tsx`

**Testfälle:**
- Optionen anzeigen/verstecken
- Einzelauswahl & Mehrfachauswahl
- onChange-Handler
- Suchfunktion (searchable)
- Löschfunktion (clearable)
- Disabled-Zustand
- Verschiedene Größen (sm, md, lg)
- Verschiedene Varianten (default, error)
- Label & Beschreibung
- Keyboard Navigation (Pfeiltasten, Enter, Escape)
- ARIA-Attribute (role, aria-expanded, aria-activedescendant)
- Screen Reader Support
- Snapshot-Test
- A11y-Check mit jest-axe

### 3. 📖 DOCUMENT

**Datei:** `Select.stories.tsx`

**Varianten:**
- Default (single selection)
- Multiple Selection
- Searchable
- Clearable
- Verschiedene Größen (sm, md, lg)
- Verschiedene Varianten (default, error)
- Mit Label & Beschreibung
- Disabled
- Custom Options
- Accessibility Demo

**Controls:**
- value, defaultValue, onChange, options, placeholder, disabled, multiple, searchable, clearable, size, variant, label, description

### 4. ✅ VALIDATE

```bash
npm run lint --workspace=@smolitux/core
npm run build --workspace=@smolitux/core
npm run test --workspace=@smolitux/core -- --testPathPattern="Select"
```

📌 Storybook nur testen, wenn global verfügbar

### 5. 📦 COMMIT & PUSH

```bash
git add packages/@smolitux/core/src/components/Select/
git commit -m "feat(core): Select – production ready validation"
git push origin main
```

### 6. 🧾 UPDATE STATUS

- Markiere Select als abgeschlossen in CODEX_PROGRESS.md
- Aktualisiere Fortschritt in AGENTS.md
- Speichere diesen Prompt als NEXT_Codex_Prompt-slider.md

## 🔄 Loop Instructions

- ✅ Bei bestandener Validierung → weiter mit nächster Komponente
- 🔁 Nächste Komponente: Slider (bereits implementiert, nur Validierung)
- 📁 Folgeprompt speichern als: `NEXT_Codex_Prompt-slider.md`

---

## 📄 Session Summary

**PREVIOUS COMPLETE**: Select ✅ (functional, 55% test success, excellent accessibility - 18/18 a11y tests passing)  
**CURRENT COMPONENT**: Slider 🔄  
**PROGRESS**: 29/534 @smolitux/core components complete  
**STATUS**: Component loop active – continuing autonomous execution

---

📁 **Save as**: `NEXT_Codex_Prompt-select.md`