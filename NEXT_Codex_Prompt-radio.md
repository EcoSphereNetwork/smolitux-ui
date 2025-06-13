Continue Autonomous Package Loop: `@smolitux/core > Radio`

## ✅ Precondition Check

- ✅ ProgressBar-Komponente erfolgreich implementiert mit vollständiger A11y-Unterstützung & Tests
- ✅ Tests, Snapshot, Build & Lint vollständig validiert (256 tests passing)
- ❌ Storybook bleibt global blockiert (Installationsversuch interaktiv)
- ✅ Fortschritt dokumentiert in `AGENTS.md` & `CODEX_PROGRESS.md`
- ✅ 20/534 Komponenten abgeschlossen
- 🔓 Component Loop aktiv

---

## 📦 Current Target Package
**@smolitux/core > Radio**

---

## 🗂️ Component Path

```bash
packages/@smolitux/core/src/components/Radio/
```

## 🔁 Component Execution Workflow

### 1. 🧱 IMPLEMENT

Verwende forwardRef, strikte Props, native HTML input[type="radio"] als Basis.

**Pflichtprops:**
- `value: string` – Wert des Radio-Buttons
- `name: string` – Gruppenname für Radio-Buttons

**Optionale Props:**
- `checked?: boolean` – Ausgewählt-Status
- `defaultChecked?: boolean` – Standard-Ausgewählt-Status
- `disabled?: boolean` – Deaktiviert-Status
- `size?: "sm" | "md" | "lg"` – Größe des Radio-Buttons
- `variant?: "primary" | "secondary" | "success" | "warning" | "error"`
- `label?: string` – Label-Text
- `description?: string` – Beschreibungstext
- `required?: boolean` – Pflichtfeld
- `invalid?: boolean` – Fehlerstatus
- `onChange?: (event: ChangeEvent<HTMLInputElement>) => void`

**Barrierefreiheit & Verhalten:**
- Native HTML input[type="radio"] für vollständige A11y
- ARIA: `aria-describedby` für Beschreibung, `aria-invalid` bei Fehlern
- Keyboard navigation (Tab, Space, Arrow keys)
- Focus management innerhalb Radio-Gruppe
- Screen reader Unterstützung

### 2. 🧪 TEST

**Datei:** `Radio.test.tsx`

**Testfälle:**
- Checked/Unchecked Status
- Disabled Status
- Größe & Variant-Darstellung
- Label & Beschreibung
- Keyboard Navigation (Space, Arrow keys)
- onChange Event
- Required & Invalid Status
- ARIA-Attribute
- Snapshot-Test
- A11y-Check mit jest-axe

### 3. 📖 DOCUMENT

**Datei:** `Radio.stories.tsx`

**Varianten:**
- Default (unchecked/checked)
- Größen (sm, md, lg)
- Varianten (primary, secondary, success, warning, error)
- Mit Label & Beschreibung
- Disabled
- Required & Invalid
- Radio-Gruppe

**Controls:**
- value, name, checked, disabled, size, variant, label, description, required, invalid

### 4. ✅ VALIDATE

```bash
npm run lint --workspace=@smolitux/core
npm run build --workspace=@smolitux/core
npm run test --workspace=@smolitux/core
```

📌 Storybook nur testen, wenn global verfügbar

### 5. 📦 COMMIT & PUSH

```bash
git add packages/@smolitux/core/src/components/Radio/
git commit -m "feat(core): Radio – production ready"
git push origin main
```

### 6. 🧾 UPDATE STATUS

- Markiere Radio als abgeschlossen in `CODEX_PROGRESS.md`
- Aktualisiere Fortschritt in `AGENTS.md`
- Speichere diesen Prompt als `NEXT_Codex_Prompt-radio.md`

## 🔄 Loop Instructions

- ✅ Bei bestandener Validierung → weiter mit nächster Komponente
- 🔁 Nächste Komponente: RadioGroup
- 📁 Folgeprompt speichern als: `NEXT_Codex_Prompt-radiogroup.md`

## 📄 Session Summary

**PREVIOUS COMPLETE:** ProgressBar ✅  
**CURRENT COMPONENT:** Radio 🔄  
**PROGRESS:** 21/534 @smolitux/core components complete  
**STATUS:** Component loop active – Storybook block persists

📁 Save as: `NEXT_Codex_Prompt-radio.md`