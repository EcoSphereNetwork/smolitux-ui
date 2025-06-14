# 🧠 Codex Prompt – Continue Autonomous Package Loop: `@smolitux/core > Stepper`

## ✅ Precondition Check

- ✅ Alle vorangegangenen Komponenten erfolgreich validiert & gemergt (29/534 Komponenten = 5.4%)
- ✅ Build, Lint, Jest: vollständig grün
- ✅ Fortschritt dokumentiert in `AGENTS.md` & `CODEX_PROGRESS.md`
- ✅ Autonomer Loop aktiv: letzte Commit-ID `039ff7b04`
- ✅ `Stepper` als nächstes validierungsbereites Ziel identifiziert

---

## 📦 Current Target Package
**@smolitux/core > Stepper**

---

## 🗂️ Component Path

```bash
packages/@smolitux/core/src/components/Stepper/
```

## 🔁 Component Execution Workflow

### 1. 🧱 IMPLEMENT

Verwende forwardRef, strikte Props, barrierefreie Schritte & Navigation.

**Pflichtprops:**
- `steps: StepperStep[]` – Array von Schritten mit label, status, optional description
- `currentStep: number` – Aktueller Schritt (0-basiert)

**Optionale Props:**
- `orientation?: "horizontal" | "vertical"` (Default: horizontal)
- `onStepClick?: (stepIndex: number) => void` – Callback bei Klick auf Schritt
- `allowClickNavigation?: boolean` – Erlaubt Navigation per Klick
- `showStepNumbers?: boolean` – Zeigt Schrittnummern an
- `size?: "sm" | "md" | "lg"`
- `variant?: "default" | "minimal" | "dots"`

**StepperStep Interface:**
```typescript
interface StepperStep {
  label: string;
  description?: string;
  status?: "pending" | "current" | "completed" | "error";
  disabled?: boolean;
  icon?: React.ReactNode;
}
```

**A11y:**
- Nutze `role="tablist"` für Container, `role="tab"` für Schritte
- ARIA: `aria-current="step"` für aktuellen Schritt
- Tastatursteuerung: Pfeiltasten für Navigation
- Fokusindikator für alle interaktiven Elemente

**Interaktion:**
- Visueller Status für jeden Schritt (pending, current, completed, error)
- Optional: Klickbare Navigation zwischen Schritten
- Responsive Design für mobile Geräte

### 2. 🧪 TEST

**Datei:** `Stepper.test.tsx`

**Testfälle:**
- Rendering mit verschiedenen Schritten
- Navigation per Klick (wenn erlaubt)
- Tastatursteuerung (Arrow Keys)
- Disabled States
- Verschiedene Orientierungen
- Snapshot & ARIA-Tests (jest-axe)

### 3. 📖 DOCUMENT

**Datei:** `Stepper.stories.tsx`

**Varianten:**
- Standard Stepper (horizontal)
- Vertikaler Stepper
- Mit Beschreibungen
- Verschiedene Status
- Klickbare Navigation
- Minimal/Dots Varianten

**Controls:**
- steps, currentStep, orientation, allowClickNavigation, showStepNumbers

### 4. ✅ VALIDATE

```bash
npm run lint --workspace=@smolitux/core
npm run build --workspace=@smolitux/core
npm run test --workspace=@smolitux/core
```

🔒 Storybook wird nicht geprüft (globaler Blocker besteht weiterhin)

### 5. 📦 COMMIT & PUSH

```bash
git add packages/@smolitux/core/src/components/Stepper/
git commit -m "feat(core): Stepper – production ready"
git push origin main
```

### 6. 🧾 UPDATE STATUS

- **CODEX_PROGRESS.md**: Stepper als validiert markieren
- **AGENTS.md**: Status und Komponentenzahl aktualisieren
- Prompt speichern als: `NEXT_Codex_Prompt-switch.md`

## 🔄 Loop Instructions

- ✅ Wenn Stepper vollständig validiert → weiter mit nächster Komponente
- 🔁 Nächste Komponente: **Switch**
- 📁 Nächsten Prompt speichern als: `NEXT_Codex_Prompt-switch.md`

---

## 📄 Session Summary

**PREVIOUS COMPLETE**: Modal, Loader, Select, Radio, ProgressBar, Slider ✅  
**CURRENT COMPONENT**: Stepper 🔄  
**PROGRESS**: 29/534 @smolitux/core components complete (5.4%)  
**STATUS**: Component loop active – quality metrics good

---

📁 **Save as:** `NEXT_Codex_Prompt-stepper.md`