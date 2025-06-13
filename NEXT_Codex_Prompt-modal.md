Continue Autonomous Package Loop: `@smolitux/core > Modal`

## ✅ Precondition Check

- ✅ Loader component successfully implemented with visibility control & comprehensive props
- ✅ Tests, Snapshot, Build & Lint fully validated
- ❌ Storybook remains globally blocked (Installation attempt interactive)
- ✅ Progress documented in `AGENTS.md` & `CODEX_PROGRESS.md`
- ✅ 17/534 components completed
- 🔓 Component Loop active

---

## 📦 Current Target Package
**@smolitux/core > Modal**

---

## 🗂️ Component Path

```bash
packages/@smolitux/core/src/components/Modal/

🔁 Component Execution Workflow
1. 🧱 IMPLEMENT

Verwende forwardRef, strikte Props, Portal für Overlay-Rendering.

Pflichtprops:

    isOpen: boolean – Steuert Sichtbarkeit
    onClose: () => void – Schließen-Handler

Optionale Props:

    size?: "sm" | "md" | "lg" | "xl" | "full" (Default: md)
    closeOnOverlayClick?: boolean (Default: true)
    closeOnEscape?: boolean (Default: true)
    showCloseButton?: boolean (Default: true)
    title?: string – Modal-Titel
    footer?: ReactNode – Footer-Inhalt
    preventScroll?: boolean (Default: true)

Barrierefreiheit & Verhalten:

    ARIA: role="dialog", aria-modal="true", aria-labelledby für Titel
    Focus-Management: Fokus-Falle, Rückgabe nach Schließen
    Portal-Rendering für z-index Kontrolle
    Body-Scroll-Lock bei preventScroll

2. 🧪 TEST

Datei:

Modal.test.tsx

Testfälle:

    Öffnen/Schließen bei isOpen
    onClose bei Overlay-Click & Escape
    Focus-Management & Fokus-Falle
    ARIA-Attribute & Rollen
    Portal-Rendering
    Snapshot-Test
    A11y-Check mit jest-axe

3. 📖 DOCUMENT

Datei:

Modal.stories.tsx

Varianten:

    Default (md)
    Klein/Groß/Vollbild
    Mit Titel & Footer
    Ohne Schließen-Button
    Ohne Overlay-Schließen

Controls:

    isOpen, size, title, footer, closeOnOverlayClick, closeOnEscape, showCloseButton

4. ✅ VALIDATE

npm run lint --workspace=@smolitux/core
npm run build --workspace=@smolitux/core
npm run test --workspace=@smolitux/core

📌 Storybook nur testen, wenn global verfügbar
5. 📦 COMMIT & PUSH

git add packages/@smolitux/core/src/components/Modal/
git commit -m "feat(core): Modal – production ready"
git push origin main

6. 🧾 UPDATE STATUS

Markiere Modal als abgeschlossen in CODEX_PROGRESS.md

Aktualisiere Fortschritt in AGENTS.md

    Speichere diesen Prompt als NEXT_Codex_Prompt-modal.md

🔄 Loop Instructions

    ✅ Bei bestandener Validierung → weiter mit nächster Komponente

    🔁 Nächste Komponente: Pagination

    📁 Folgeprompt speichern als: NEXT_Codex_Prompt-pagination.md

📄 Session Summary

PREVIOUS COMPLETE: Loader ✅  
CURRENT COMPONENT: Modal 🔄  
PROGRESS: 17/534 @smolitux/core components complete  
STATUS: Component loop active – Storybook block persists

📁 Save as: NEXT_Codex_Prompt-modal.md