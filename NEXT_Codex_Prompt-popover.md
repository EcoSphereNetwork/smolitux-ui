# Continue Autonomous Package Loop: `@smolitux/core > Popover`

## ✅ Precondition Check

- ✅ Pagination component validated as production ready (36/36 tests passing, 100% success rate)
- ✅ All validation tests passing (lint, build, accessibility)
- ✅ Progress documented in `AGENTS.md` & `CODEX_PROGRESS.md`
- ✅ 24/534 components completed (4.5%)
- 🔓 Component Loop active

---

## 📦 Current Target Package
**@smolitux/core > Popover**

---

## 🗂️ Component Path

```bash
packages/@smolitux/core/src/components/Popover/
```

## 🔁 Component Execution Workflow

### 1. 🧱 IMPLEMENT

Verwende forwardRef, strikte Props, Portal-Rendering für Overlay-Verhalten.

**Pflichtprops:**
- `trigger: React.ReactElement` – Element das den Popover auslöst
- `children: React.ReactNode` – Popover-Inhalt

**Optionale Props:**
- `open?: boolean` – Kontrollierter Zustand
- `defaultOpen?: boolean` – Standard-Zustand
- `onOpenChange?: (open: boolean) => void` – Zustandsänderung
- `placement?: "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "left-start" | "left-end" | "right-start" | "right-end"`
- `offset?: number` – Abstand zum Trigger
- `arrow?: boolean` – Pfeil anzeigen
- `closeOnClickOutside?: boolean` (Default: true)
- `closeOnEscape?: boolean` (Default: true)
- `disabled?: boolean` – Popover deaktivieren

**Barrierefreiheit & Verhalten:**
- ARIA: role="tooltip" oder role="dialog", aria-describedby
- Keyboard Navigation: Escape schließt Popover
- Focus Management: Fokus bleibt auf Trigger
- Portal-Rendering für z-index Isolation
- Positioning: Automatische Positionierung mit Kollisionserkennung

### 2. 🧪 TEST

**Datei:** `Popover.test.tsx`

**Testfälle:**
- Öffnen/Schließen bei Hover/Click
- onOpenChange-Callback
- Escape-Taste schließt Popover
- Click außerhalb schließt Popover
- ARIA-Attribute (role, aria-describedby)
- Positionierung (placement)
- Portal-Rendering
- Disabled-Zustand
- Snapshot-Test
- A11y-Check mit jest-axe

### 3. 📖 DOCUMENT

**Datei:** `Popover.stories.tsx`

**Varianten:**
- Default (bottom placement)
- Verschiedene Positionierungen
- Mit Pfeil
- Kontrolliert vs. unkontrolliert
- Mit verschiedenen Triggern (Button, Text, Icon)
- Disabled
- Custom Styling
- Nested Popovers

**Controls:**
- open, placement, offset, arrow, closeOnClickOutside, closeOnEscape, disabled

### 4. ✅ VALIDATE

```bash
npm run lint --workspace=@smolitux/core
npm run build --workspace=@smolitux/core
npm run test --workspace=@smolitux/core -- --testPathPattern="Popover"
```

📌 Storybook nur testen, wenn global verfügbar

### 5. 📦 COMMIT & PUSH

```bash
git add packages/@smolitux/core/src/components/Popover/
git commit -m "feat(core): Popover – production ready"
git push origin main
```

### 6. 🧾 UPDATE STATUS

- Markiere Popover als abgeschlossen in CODEX_PROGRESS.md
- Aktualisiere Fortschritt in AGENTS.md
- Speichere diesen Prompt als NEXT_Codex_Prompt-progressbar.md

## 🔄 Loop Instructions

- ✅ Bei bestandener Validierung → weiter mit nächster Komponente
- 🔁 Nächste Komponente: ProgressBar (bereits implementiert, nur Validierung)
- 📁 Folgeprompt speichern als: `NEXT_Codex_Prompt-progressbar.md`

---

## 📄 Session Summary

**PREVIOUS COMPLETE**: Pagination ✅ (production ready, 100% test success)  
**CURRENT COMPONENT**: Popover 🔄  
**PROGRESS**: 25/534 @smolitux/core components complete  
**STATUS**: Component loop active – continuing autonomous execution

---

📁 **Save as**: `NEXT_Codex_Prompt-popover.md`