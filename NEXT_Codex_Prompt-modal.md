# Continue Autonomous Package Loop: `@smolitux/core > Modal`

## ✅ Precondition Check

- ✅ Loader component validated as production ready (17/17 tests passing, 100% success rate)
- ✅ All validation tests passing (lint, build, accessibility)
- ✅ Progress documented in `AGENTS.md` & `CODEX_PROGRESS.md`
- ✅ 22/534 components completed (4.1%)
- 🔓 Component Loop active

---

## 📦 Current Target Package
**@smolitux/core > Modal**

---

## 🗂️ Component Path

```bash
packages/@smolitux/core/src/components/Modal/
```

## 🔁 Component Execution Workflow

### 1. 🧱 IMPLEMENT

Verwende forwardRef, strikte Props, Portal-Rendering für Overlay-Verhalten.

**Pflichtprops:**
- `open: boolean` – Steuert Sichtbarkeit des Modals
- `onClose: () => void` – Callback beim Schließen

**Optionale Props:**
- `size?: "sm" | "md" | "lg" | "xl" | "full"` (Default: md)
- `title?: string` – Modal-Titel
- `children?: React.ReactNode` – Modal-Inhalt
- `closeOnOverlayClick?: boolean` (Default: true)
- `closeOnEscape?: boolean` (Default: true)
- `showCloseButton?: boolean` (Default: true)
- `variant?: "default" | "danger" | "success"`
- `centered?: boolean` (Default: true)

**Barrierefreiheit & Verhalten:**
- ARIA: role="dialog", aria-modal="true", aria-labelledby für Titel
- Fokusfalle: Fokus bleibt im Modal
- Escape-Taste schließt Modal (wenn closeOnEscape=true)
- Overlay-Click schließt Modal (wenn closeOnOverlayClick=true)
- Portal-Rendering für z-index Isolation

### 2. 🧪 TEST

**Datei:** `Modal.test.tsx`

**Testfälle:**
- Öffnen/Schließen bei open=true/false
- onClose-Callback bei Escape-Taste
- onClose-Callback bei Overlay-Click
- Fokusfalle (Fokus bleibt im Modal)
- ARIA-Attribute (role, aria-modal, aria-labelledby)
- Größenvarianten
- Portal-Rendering
- Snapshot-Test
- A11y-Check mit jest-axe

### 3. 📖 DOCUMENT

**Datei:** `Modal.stories.tsx`

**Varianten:**
- Default (md)
- Verschiedene Größen (sm, md, lg, xl, full)
- Mit/ohne Titel
- Mit/ohne Close-Button
- Verschiedene Varianten (default, danger, success)
- Nicht zentriert
- Ohne Overlay-Close
- Ohne Escape-Close

**Controls:**
- open, size, title, closeOnOverlayClick, closeOnEscape, showCloseButton, variant, centered

### 4. ✅ VALIDATE

```bash
npm run lint --workspace=@smolitux/core
npm run build --workspace=@smolitux/core
npm run test --workspace=@smolitux/core -- --testPathPattern="Modal"
```

📌 Storybook nur testen, wenn global verfügbar

### 5. 📦 COMMIT & PUSH

```bash
git add packages/@smolitux/core/src/components/Modal/
git commit -m "feat(core): Modal – production ready"
git push origin main
```

### 6. 🧾 UPDATE STATUS

- Markiere Modal als abgeschlossen in CODEX_PROGRESS.md
- Aktualisiere Fortschritt in AGENTS.md
- Speichere diesen Prompt als NEXT_Codex_Prompt-navigation.md

## 🔄 Loop Instructions

- ✅ Bei bestandener Validierung → weiter mit nächster Komponente
- 🔁 Nächste Komponente: Navigation
- 📁 Folgeprompt speichern als: `NEXT_Codex_Prompt-navigation.md`

---

## 📄 Session Summary

**PREVIOUS COMPLETE**: Loader ✅ (production ready, 100% test success)  
**CURRENT COMPONENT**: Modal 🔄  
**PROGRESS**: 23/534 @smolitux/core components complete  
**STATUS**: Component loop active – continuing autonomous execution

---

📁 **Save as**: `NEXT_Codex_Prompt-modal.md`