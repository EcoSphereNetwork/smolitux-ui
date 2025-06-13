# Continue Autonomous Package Loop: `@smolitux/core > Loader`

## ✅ Precondition Check

- ✅ Radio component accessibility improvements completed (41/49 tests passing, 84% success rate)
- ✅ TypeScript build errors resolved
- ✅ Lint & build validation passing
- ✅ Changes committed and pushed to main branch
- ✅ Progress documented in `AGENTS.md` & `CODEX_PROGRESS.md`
- ✅ 21/534 components completed (3.9%)
- 🔓 Component Loop active

---

## 📦 Current Target Package
**@smolitux/core > Loader**

---

## 🗂️ Component Path

```bash
packages/@smolitux/core/src/components/Loader/
```

## 🔁 Component Execution Workflow

### 1. 🧱 IMPLEMENT

Verwende forwardRef, strikte Props, ein SVG oder CSS-Animation für Spinner.

**Pflichtprop:**
- `visible: boolean` – Steuert Sichtbarkeit (optional per display: none oder bedingtem Rendern)

**Optionale Props:**
- `size?: "sm" | "md" | "lg" | number` (Default: md)
- `label?: string` – für Screenreader oder sichtbaren Text
- `variant?: "primary" | "subtle" | "contrast"`
- `aria-live?: "polite" | "assertive"`
- `fullscreen?: boolean` – zentrierter Modus für Ladebildschirm

**Barrierefreiheit & Verhalten:**
- ARIA: role="status" oder aria-live, wenn label gesetzt
- Bei fullscreen: Fokusfalle verhindern, zentrierte Darstellung

### 2. 🧪 TEST

**Datei:** `Loader.test.tsx`

**Testfälle:**
- Sichtbarkeit bei visible=true/false
- Größe & Variant-Darstellung
- ARIA-Rolle & Live-Region
- Snapshot-Test
- A11y-Check mit jest-axe

### 3. 📖 DOCUMENT

**Datei:** `Loader.stories.tsx`

**Varianten:**
- Default (md)
- Klein/Groß
- Mit Label
- Fullscreen
- Unsichtbar (visible=false)

**Controls:**
- visible, size, label, variant, fullscreen, aria-live

### 4. ✅ VALIDATE

```bash
npm run lint --workspace=@smolitux/core
npm run build --workspace=@smolitux/core
npm run test --workspace=@smolitux/core
```

📌 Storybook nur testen, wenn global verfügbar

### 5. 📦 COMMIT & PUSH

```bash
git add packages/@smolitux/core/src/components/Loader/
git commit -m "feat(core): Loader – production ready"
git push origin main
```

### 6. 🧾 UPDATE STATUS

- Markiere Loader als abgeschlossen in CODEX_PROGRESS.md
- Aktualisiere Fortschritt in AGENTS.md
- Speichere diesen Prompt als NEXT_Codex_Prompt-modal.md

## 🔄 Loop Instructions

- ✅ Bei bestandener Validierung → weiter mit nächster Komponente
- 🔁 Nächste Komponente: Modal
- 📁 Folgeprompt speichern als: `NEXT_Codex_Prompt-modal.md`

---

## 📄 Session Summary

**PREVIOUS COMPLETE**: Radio ✅ (accessibility improvements, 84% test success)  
**CURRENT COMPONENT**: Loader 🔄  
**PROGRESS**: 22/534 @smolitux/core components complete  
**STATUS**: Component loop active – continuing autonomous execution

---

📁 **Save as**: `NEXT_Codex_Prompt-loader.md`
