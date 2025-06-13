Continue Autonomous Package Loop: `@smolitux/core > Pagination`

## ✅ Precondition Check

- ✅ Modal component successfully implemented with comprehensive test suite
- ✅ Tests, Snapshot, Build & Lint fully validated (178 tests passing)
- ❌ Storybook remains globally blocked (installation attempt interactive)
- ✅ Progress documented in `AGENTS.md` & `CODEX_PROGRESS.md`
- ✅ 18/534 components completed
- 🔓 Component Loop active

---

## 📦 Current Target Package
**@smolitux/core > Pagination**

---

## 🗂️ Component Path

```bash
packages/@smolitux/core/src/components/Pagination/
```

## 🔁 Component Execution Workflow

### 1. 🧱 IMPLEMENT

Verwende forwardRef, strikte Props, moderne Pagination-Logik.

**Pflichtprops:**
- `currentPage: number` – Aktuelle Seite (1-basiert)
- `totalPages: number` – Gesamtanzahl Seiten
- `onPageChange: (page: number) => void` – Callback bei Seitenwechsel

**Optionale Props:**
- `size?: "sm" | "md" | "lg"` (Default: md)
- `variant?: "default" | "outlined" | "minimal"`
- `showFirstLast?: boolean` – Zeige Erste/Letzte Buttons (Default: true)
- `showPrevNext?: boolean` – Zeige Vor/Zurück Buttons (Default: true)
- `siblingCount?: number` – Anzahl Seiten links/rechts der aktuellen (Default: 1)
- `boundaryCount?: number` – Anzahl Seiten am Anfang/Ende (Default: 1)
- `disabled?: boolean`
- `hideOnSinglePage?: boolean` – Verstecke bei nur einer Seite

**Barrierefreiheit & Verhalten:**
- ARIA: `role="navigation"`, `aria-label="pagination"`
- Tastaturnavigation: Pfeiltasten, Enter, Space
- Aktuelle Seite: `aria-current="page"`
- Disabled-State für nicht verfügbare Buttons
- Ellipsis (...) für übersprungene Seiten

### 2. 🧪 TEST

**Datei:** `Pagination.test.tsx`

**Testfälle:**
- Rendering mit verschiedenen Props
- Seitenwechsel-Callbacks
- Tastaturnavigation
- Disabled-State
- Ellipsis-Anzeige bei vielen Seiten
- Snapshot-Test
- A11y-Check mit jest-axe

### 3. 📖 DOCUMENT

**Datei:** `Pagination.stories.tsx`

**Varianten:**
- Default (wenige Seiten)
- Viele Seiten (mit Ellipsis)
- Verschiedene Größen
- Outlined/Minimal Variants
- Disabled State
- Ohne First/Last Buttons

**Controls:**
- currentPage, totalPages, size, variant, showFirstLast, showPrevNext, siblingCount, boundaryCount, disabled

### 4. ✅ VALIDATE

```bash
npm run lint --workspace=@smolitux/core
npm run build --workspace=@smolitux/core
npm run test --workspace=@smolitux/core
```

📌 Storybook nur testen, wenn global verfügbar

### 5. 📦 COMMIT & PUSH

```bash
git add packages/@smolitux/core/src/components/Pagination/
git commit -m "feat(core): Pagination – production ready"
git push origin main
```

### 6. 🧾 UPDATE STATUS

- Markiere Pagination als abgeschlossen in `CODEX_PROGRESS.md`
- Aktualisiere Fortschritt in `AGENTS.md`
- Speichere diesen Prompt als `NEXT_Codex_Prompt-pagination.md`

## 🔄 Loop Instructions

- ✅ Bei bestandener Validierung → weiter mit nächster Komponente
- 🔁 Nächste Komponente: Popover
- 📁 Folgeprompt speichern als: `NEXT_Codex_Prompt-popover.md`

## 📄 Session Summary

**PREVIOUS COMPLETE:** Modal ✅  
**CURRENT COMPONENT:** Pagination 🔄  
**PROGRESS:** 19/534 @smolitux/core components complete  
**STATUS:** Component loop active – Storybook block persists

📁 Save as: `NEXT_Codex_Prompt-pagination.md`