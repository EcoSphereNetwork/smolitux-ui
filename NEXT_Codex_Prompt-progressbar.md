# Continue Autonomous Package Loop: `@smolitux/core > ProgressBar`

## ✅ Precondition Check

- ✅ Popover component fixed and validated as production ready (45/45 tests passing, 100% success rate)
- ✅ ThemeProvider integration fixed for all tests
- ✅ All validation tests passing (lint, build, accessibility)
- ✅ Progress documented in `AGENTS.md` & `CODEX_PROGRESS.md`
- ✅ 25/534 components completed (4.7%)
- 🔓 Component Loop active

---

## 📦 Current Target Package
**@smolitux/core > ProgressBar**

---

## 🗂️ Component Path

```bash
packages/@smolitux/core/src/components/ProgressBar/
```

## 🔁 Component Execution Workflow

### 1. 🔍 VALIDATE EXISTING

ProgressBar component already exists and was previously implemented. Check current status:

**Expected Features:**
- `value: number` – Aktueller Fortschritt (0-100)
- `max?: number` – Maximaler Wert (Default: 100)
- `size?: "sm" | "md" | "lg"` – Größe
- `variant?: "default" | "success" | "warning" | "error"` – Farbvariante
- `showLabel?: boolean` – Prozentanzeige
- `label?: string` – Custom Label
- `animated?: boolean` – Animation
- `striped?: boolean` – Gestreiftes Design

**Barrierefreiheit:**
- ARIA: role="progressbar", aria-valuenow, aria-valuemin, aria-valuemax
- Screen Reader Support: aria-label oder aria-labelledby
- Live Region Updates bei Wertänderungen

### 2. 🧪 TEST

**Datei:** `ProgressBar.test.tsx`

**Testfälle:**
- Wert-Darstellung (0-100%)
- Verschiedene Größen (sm, md, lg)
- Verschiedene Varianten (default, success, warning, error)
- Label-Anzeige (showLabel, custom label)
- Animation & Striped Design
- ARIA-Attribute (role, aria-valuenow, aria-valuemin, aria-valuemax)
- Screen Reader Support
- Snapshot-Test
- A11y-Check mit jest-axe

### 3. 📖 DOCUMENT

**Datei:** `ProgressBar.stories.tsx`

**Varianten:**
- Default (0%, 50%, 100%)
- Verschiedene Größen (sm, md, lg)
- Verschiedene Varianten (default, success, warning, error)
- Mit Label (showLabel, custom label)
- Animiert & Gestreift
- Indeterminate Progress
- Custom Styling
- Accessibility Demo

**Controls:**
- value, max, size, variant, showLabel, label, animated, striped

### 4. ✅ VALIDATE

```bash
npm run lint --workspace=@smolitux/core
npm run build --workspace=@smolitux/core
npm run test --workspace=@smolitux/core -- --testPathPattern="ProgressBar"
```

📌 Storybook nur testen, wenn global verfügbar

### 5. 📦 COMMIT & PUSH

```bash
git add packages/@smolitux/core/src/components/ProgressBar/
git commit -m "feat(core): ProgressBar – production ready validation"
git push origin main
```

### 6. 🧾 UPDATE STATUS

- Markiere ProgressBar als abgeschlossen in CODEX_PROGRESS.md
- Aktualisiere Fortschritt in AGENTS.md
- Speichere diesen Prompt als NEXT_Codex_Prompt-radio.md

## 🔄 Loop Instructions

- ✅ Bei bestandener Validierung → weiter mit nächster Komponente
- 🔁 Nächste Komponente: Radio (bereits implementiert, nur Validierung)
- 📁 Folgeprompt speichern als: `NEXT_Codex_Prompt-radio.md`

---

## 📄 Session Summary

**PREVIOUS COMPLETE**: Popover ✅ (production ready, 100% test success, ThemeProvider fixed)  
**CURRENT COMPONENT**: ProgressBar 🔄  
**PROGRESS**: 26/534 @smolitux/core components complete  
**STATUS**: Component loop active – continuing autonomous execution

---

📁 **Save as**: `NEXT_Codex_Prompt-progressbar.md`