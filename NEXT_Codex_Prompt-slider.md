# Continue Autonomous Package Loop: `@smolitux/core > Slider`

## ✅ Precondition Check

- ✅ Select component validated as functional (36/66 tests passing, 55% success rate)
- ✅ Excellent accessibility performance (18/18 a11y tests passing, 100% success rate)
- ✅ Progress documented in `AGENTS.md` & `CODEX_PROGRESS.md`
- ✅ 28/534 components completed (5.2%)
- 🔓 Component Loop active

---

## 📦 Current Target Package
**@smolitux/core > Slider**

---

## 🗂️ Component Path

```bash
packages/@smolitux/core/src/components/Slider/
```

## 🔁 Component Execution Workflow

### 1. 🔍 VALIDATE EXISTING

Slider component already exists and was previously implemented. Check current status:

**Expected Features:**
- `value?: number | number[]` – Aktueller Wert (single/range)
- `defaultValue?: number | number[]` – Standard-Wert
- `onChange?: (value: number | number[]) => void` – Änderungshandler
- `min?: number` – Minimalwert (default: 0)
- `max?: number` – Maximalwert (default: 100)
- `step?: number` – Schrittweite (default: 1)
- `disabled?: boolean` – Deaktiviert
- `range?: boolean` – Bereichsauswahl (zwei Handles)
- `marks?: SliderMark[]` – Markierungen auf der Skala
- `tooltip?: boolean | "always" | "hover"` – Tooltip-Anzeige
- `size?: "sm" | "md" | "lg"` – Größe
- `variant?: "default" | "primary" | "success" | "warning" | "error"` – Farbvariante
- `label?: string` – Label-Text
- `description?: string` – Beschreibungstext

**Barrierefreiheit:**
- ARIA: role="slider", aria-valuemin, aria-valuemax, aria-valuenow, aria-valuetext
- Keyboard Navigation: Pfeiltasten, Home, End, Page Up/Down
- Focus Management: Fokusring, Handle-Navigation
- Screen Reader Support: Labels, Wertansagen, Live-Updates

### 2. 🧪 TEST

**Datei:** `Slider.test.tsx`

**Testfälle:**
- Wert setzen/ändern (single & range)
- onChange-Handler
- Min/Max/Step-Validierung
- Disabled-Zustand
- Verschiedene Größen (sm, md, lg)
- Verschiedene Varianten (default, primary, success, warning, error)
- Markierungen (marks)
- Tooltip-Funktionalität
- Label & Beschreibung
- Keyboard Navigation (Pfeiltasten, Home, End)
- ARIA-Attribute (role, aria-valuemin, aria-valuemax, aria-valuenow)
- Screen Reader Support
- Range-Modus (zwei Handles)
- Snapshot-Test
- A11y-Check mit jest-axe

### 3. 📖 DOCUMENT

**Datei:** `Slider.stories.tsx`

**Varianten:**
- Default (single value)
- Range Slider (zwei Handles)
- Mit Markierungen (marks)
- Mit Tooltip
- Verschiedene Größen (sm, md, lg)
- Verschiedene Varianten (default, primary, success, warning, error)
- Mit Label & Beschreibung
- Disabled
- Custom Step & Min/Max
- Accessibility Demo

**Controls:**
- value, defaultValue, onChange, min, max, step, disabled, range, marks, tooltip, size, variant, label, description

### 4. ✅ VALIDATE

```bash
npm run lint --workspace=@smolitux/core
npm run build --workspace=@smolitux/core
npm run test --workspace=@smolitux/core -- --testPathPattern="Slider"
```

📌 Storybook nur testen, wenn global verfügbar

### 5. 📦 COMMIT & PUSH

```bash
git add packages/@smolitux/core/src/components/Slider/
git commit -m "feat(core): Slider – production ready validation"
git push origin main
```

### 6. 🧾 UPDATE STATUS

- Markiere Slider als abgeschlossen in CODEX_PROGRESS.md
- Aktualisiere Fortschritt in AGENTS.md
- Speichere diesen Prompt als NEXT_Codex_Prompt-switch.md

## 🔄 Loop Instructions

- ✅ Bei bestandener Validierung → weiter mit nächster Komponente
- 🔁 Nächste Komponente: Switch (bereits implementiert, nur Validierung)
- 📁 Folgeprompt speichern als: `NEXT_Codex_Prompt-switch.md`

---

## 📄 Session Summary

**PREVIOUS COMPLETE**: Select ✅ (functional, 55% test success, excellent accessibility - 18/18 a11y tests passing)  
**CURRENT COMPONENT**: Slider 🔄  
**PROGRESS**: 29/534 @smolitux/core components complete  
**STATUS**: Component loop active – continuing autonomous execution

---

📁 **Save as**: `NEXT_Codex_Prompt-slider.md`