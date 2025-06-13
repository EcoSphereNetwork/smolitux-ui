# Continue Autonomous Package Loop: `@smolitux/core > Navigation`

## ✅ Precondition Check

- ✅ Modal component validated as production ready (58/58 tests passing, 100% success rate)
- ✅ All validation tests passing (lint, build, accessibility)
- ✅ Progress documented in `AGENTS.md` & `CODEX_PROGRESS.md`
- ✅ 23/534 components completed (4.3%)
- 🔓 Component Loop active

---

## 📦 Current Target Package
**@smolitux/core > Navigation**

---

## 🗂️ Component Path

```bash
packages/@smolitux/core/src/components/Navigation/
```

## 🔁 Component Execution Workflow

### 1. 🧱 IMPLEMENT

Verwende forwardRef, strikte Props, semantische Navigation-Struktur.

**Pflichtprops:**
- `items: NavigationItem[]` – Array von Navigation-Elementen

**NavigationItem Interface:**
- `label: string` – Anzeigetext
- `href?: string` – Link-URL
- `onClick?: () => void` – Click-Handler
- `active?: boolean` – Aktiver Zustand
- `disabled?: boolean` – Deaktiviert
- `icon?: React.ReactNode` – Icon
- `children?: NavigationItem[]` – Untermenü

**Optionale Props:**
- `orientation?: "horizontal" | "vertical"` (Default: horizontal)
- `variant?: "default" | "pills" | "tabs" | "breadcrumb"`
- `size?: "sm" | "md" | "lg"`
- `spacing?: "compact" | "normal" | "relaxed"`
- `showIcons?: boolean` (Default: true)
- `collapsible?: boolean` – Für mobile Ansicht
- `activeIndicator?: "underline" | "background" | "border"`

**Barrierefreiheit & Verhalten:**
- ARIA: role="navigation", aria-label, aria-current für aktive Items
- Keyboard Navigation: Arrow keys, Enter, Space
- Focus Management: Sichtbare Fokus-Indikatoren
- Screen Reader: Proper labeling und Struktur

### 2. 🧪 TEST

**Datei:** `Navigation.test.tsx`

**Testfälle:**
- Rendering von Navigation-Items
- Click-Handler und href-Navigation
- Aktive Item-Markierung
- Keyboard Navigation (Arrow keys, Enter)
- ARIA-Attribute (role, aria-current, aria-label)
- Orientierung (horizontal/vertical)
- Varianten (default, pills, tabs, breadcrumb)
- Disabled Items
- Nested Navigation (Untermenüs)
- Snapshot-Test
- A11y-Check mit jest-axe

### 3. 📖 DOCUMENT

**Datei:** `Navigation.stories.tsx`

**Varianten:**
- Default (horizontal)
- Vertical Navigation
- Pills Variant
- Tabs Variant
- Breadcrumb Navigation
- With Icons
- Nested Navigation
- Mobile Collapsible
- Different Sizes

**Controls:**
- items, orientation, variant, size, spacing, showIcons, collapsible, activeIndicator

### 4. ✅ VALIDATE

```bash
npm run lint --workspace=@smolitux/core
npm run build --workspace=@smolitux/core
npm run test --workspace=@smolitux/core -- --testPathPattern="Navigation"
```

📌 Storybook nur testen, wenn global verfügbar

### 5. 📦 COMMIT & PUSH

```bash
git add packages/@smolitux/core/src/components/Navigation/
git commit -m "feat(core): Navigation – production ready"
git push origin main
```

### 6. 🧾 UPDATE STATUS

- Markiere Navigation als abgeschlossen in CODEX_PROGRESS.md
- Aktualisiere Fortschritt in AGENTS.md
- Speichere diesen Prompt als NEXT_Codex_Prompt-pagination.md

## 🔄 Loop Instructions

- ✅ Bei bestandener Validierung → weiter mit nächster Komponente
- 🔁 Nächste Komponente: Pagination
- 📁 Folgeprompt speichern als: `NEXT_Codex_Prompt-pagination.md`

---

## 📄 Session Summary

**PREVIOUS COMPLETE**: Modal ✅ (production ready, 100% test success)  
**CURRENT COMPONENT**: Navigation 🔄  
**PROGRESS**: 24/534 @smolitux/core components complete  
**STATUS**: Component loop active – continuing autonomous execution

---

📁 **Save as**: `NEXT_Codex_Prompt-navigation.md`