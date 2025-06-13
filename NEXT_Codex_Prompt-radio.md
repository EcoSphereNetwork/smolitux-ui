# Continue Autonomous Package Loop: `@smolitux/core > Radio`

## ✅ Precondition Check

- ✅ ProgressBar component validated as production ready (42/42 tests passing, 100% success rate)
- ✅ All validation tests passing (lint, build, accessibility)
- ✅ Progress documented in `AGENTS.md` & `CODEX_PROGRESS.md`
- ✅ 26/534 components completed (4.9%)
- 🔓 Component Loop active

---

## 📦 Current Target Package
**@smolitux/core > Radio**

---

## 🗂️ Component Path

```bash
packages/@smolitux/core/src/components/Radio/
```

## 🔁 Component Execution Workflow

### 1. 🔍 VALIDATE EXISTING

Radio component already exists and was previously implemented. Check current status:

**Expected Features:**
- `value: string` – Wert der Radio-Option
- `checked?: boolean` – Ausgewählt-Status
- `defaultChecked?: boolean` – Standard-Status
- `onChange?: (event: ChangeEvent<HTMLInputElement>) => void` – Änderungshandler
- `name?: string` – Gruppenname für Radio-Buttons
- `disabled?: boolean` – Deaktiviert
- `size?: "sm" | "md" | "lg"` – Größe
- `variant?: "default" | "primary" | "success" | "warning" | "error"` – Farbvariante
- `label?: string` – Label-Text
- `description?: string` – Beschreibungstext

**Barrierefreiheit:**
- ARIA: role="radio", aria-checked, aria-describedby
- Keyboard Navigation: Pfeiltasten für Gruppennavigation
- Focus Management: Fokusring, Tab-Navigation
- Screen Reader Support: Labels und Beschreibungen

### 2. 🧪 TEST

**Datei:** `Radio.test.tsx`

**Testfälle:**
- Checked/Unchecked Status
- onChange-Handler
- Disabled-Zustand
- Verschiedene Größen (sm, md, lg)
- Verschiedene Varianten (default, primary, success, warning, error)
- Label & Beschreibung
- Keyboard Navigation (Pfeiltasten)
- ARIA-Attribute (role, aria-checked, aria-describedby)
- Screen Reader Support
- Snapshot-Test
- A11y-Check mit jest-axe

### 3. 📖 DOCUMENT

**Datei:** `Radio.stories.tsx`

**Varianten:**
- Default (checked/unchecked)
- Verschiedene Größen (sm, md, lg)
- Verschiedene Varianten (default, primary, success, warning, error)
- Mit Label & Beschreibung
- Disabled
- Radio Group (mehrere Optionen)
- Custom Styling
- Accessibility Demo

**Controls:**
- value, checked, defaultChecked, onChange, name, disabled, size, variant, label, description

### 4. ✅ VALIDATE

```bash
npm run lint --workspace=@smolitux/core
npm run build --workspace=@smolitux/core
npm run test --workspace=@smolitux/core -- --testPathPattern="Radio"
```

📌 Storybook nur testen, wenn global verfügbar

### 5. 📦 COMMIT & PUSH

```bash
git add packages/@smolitux/core/src/components/Radio/
git commit -m "feat(core): Radio – production ready validation"
git push origin main
```

### 6. 🧾 UPDATE STATUS

- Markiere Radio als abgeschlossen in CODEX_PROGRESS.md
- Aktualisiere Fortschritt in AGENTS.md
- Speichere diesen Prompt als NEXT_Codex_Prompt-select.md

## 🔄 Loop Instructions

- ✅ Bei bestandener Validierung → weiter mit nächster Komponente
- 🔁 Nächste Komponente: Select (bereits implementiert, nur Validierung)
- 📁 Folgeprompt speichern als: `NEXT_Codex_Prompt-select.md`

---

## 📄 Session Summary

**PREVIOUS COMPLETE**: ProgressBar ✅ (production ready, 100% test success)  
**CURRENT COMPONENT**: Radio 🔄  
**PROGRESS**: 27/534 @smolitux/core components complete  
**STATUS**: Component loop active – continuing autonomous execution

---

📁 **Save as**: `NEXT_Codex_Prompt-radio.md`