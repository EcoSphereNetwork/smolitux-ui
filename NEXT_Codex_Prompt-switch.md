# 🧠 Codex Prompt – Continue Autonomous Package Loop: `@smolitux/core > Switch`

## ✅ Precondition Check

- ✅ Alle vorangegangenen Komponenten erfolgreich validiert & gemergt (30/534 Komponenten = 5.6%)
- ✅ Build, Lint, Jest: vollständig grün
- ✅ Fortschritt dokumentiert in `AGENTS.md` & `CODEX_PROGRESS.md`
- ✅ Autonomer Loop aktiv: letzte Commit-ID `cbd435d36`
- ✅ `Switch` als nächstes validierungsbereites Ziel identifiziert

---

## 📦 Current Target Package
**@smolitux/core > Switch**

---

## 🗂️ Component Path

```bash
packages/@smolitux/core/src/components/Switch/
```

## 🔁 Component Execution Workflow

### 1. 🧱 IMPLEMENT

Verwende forwardRef, strikte Props, barrierefreie Toggle-Funktionalität.

**Pflichtprops:**
- `checked: boolean` – Aktueller Zustand des Switches
- `onChange: (checked: boolean) => void` – Callback bei Zustandsänderung

**Optionale Props:**
- `disabled?: boolean` – Deaktiviert den Switch
- `size?: "sm" | "md" | "lg"` (Default: md)
- `variant?: "default" | "success" | "warning" | "danger"`
- `label?: string` – Label für den Switch
- `description?: string` – Zusätzliche Beschreibung
- `required?: boolean` – Markiert als Pflichtfeld
- `name?: string` – Name für Formulare
- `value?: string` – Wert für Formulare
- `colorScheme?: string` – Farbschema
- `thumbIcon?: React.ReactNode` – Icon im Thumb
- `checkedIcon?: React.ReactNode` – Icon wenn aktiviert
- `uncheckedIcon?: React.ReactNode` – Icon wenn deaktiviert

**A11y:**
- Nutze `role="switch"` oder native checkbox mit switch styling
- ARIA: `aria-checked`, `aria-labelledby`, `aria-describedby`
- Tastatursteuerung: Space/Enter für Toggle
- Fokusindikator für Tastaturnavigation
- Screen Reader Support für Zustandsänderungen

**Interaktion:**
- Visueller Toggle-Effekt (Thumb bewegt sich)
- Hover/Focus/Active States
- Smooth Transitions
- Touch-friendly für mobile Geräte

### 2. 🧪 TEST

**Datei:** `Switch.test.tsx`

**Testfälle:**
- Rendering mit verschiedenen Props
- Toggle-Funktionalität (Klick & Tastatur)
- Disabled State
- Verschiedene Größen & Varianten
- Label & Description Rendering
- Snapshot & ARIA-Tests (jest-axe)

### 3. 📖 DOCUMENT

**Datei:** `Switch.stories.tsx`

**Varianten:**
- Standard Switch
- Mit Label & Description
- Verschiedene Größen
- Verschiedene Varianten
- Disabled State
- Mit Icons
- Controlled vs Uncontrolled

**Controls:**
- checked, disabled, size, variant, label, description, required

### 4. ✅ VALIDATE

```bash
npm run lint --workspace=@smolitux/core
npm run build --workspace=@smolitux/core
npm run test --workspace=@smolitux/core
```

🔒 Storybook wird nicht geprüft (globaler Blocker besteht weiterhin)

### 5. 📦 COMMIT & PUSH

```bash
git add packages/@smolitux/core/src/components/Switch/
git commit -m "feat(core): Switch – production ready"
git push origin main
```

### 6. 🧾 UPDATE STATUS

- **CODEX_PROGRESS.md**: Switch als validiert markieren
- **AGENTS.md**: Status und Komponentenzahl aktualisieren
- Prompt speichern als: `NEXT_Codex_Prompt-table.md`

## 🔄 Loop Instructions

- ✅ Wenn Switch vollständig validiert → weiter mit nächster Komponente
- 🔁 Nächste Komponente: **Table**
- 📁 Nächsten Prompt speichern als: `NEXT_Codex_Prompt-table.md`

---

## 📄 Session Summary

**PREVIOUS COMPLETE**: Modal, Loader, Select, Radio, ProgressBar, Slider, Stepper ✅  
**CURRENT COMPONENT**: Switch 🔄  
**PROGRESS**: 30/534 @smolitux/core components complete (5.6%)  
**STATUS**: Component loop active – excellent quality metrics

---

📁 **Save as:** `NEXT_Codex_Prompt-switch.md`