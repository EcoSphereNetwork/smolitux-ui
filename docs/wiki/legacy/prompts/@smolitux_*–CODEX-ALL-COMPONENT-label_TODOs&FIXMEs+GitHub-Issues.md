# 🧠 `smolitux-ui` – CODEX PROMPT: Automatisches Erkennen & Kommentieren von TODOs und FIXMEs + GitHub Issues

## 🎯 ZIEL

Codex soll:

* selbstständig **alle Komponenten aller `@smolitux/*` Pakete** analysieren
* **direkt im Code** präzise Kommentare wie `// TODO:` oder `// FIXME:` hinterlegen, **wo Schwächen, fehlende Teile oder Fehler** erkennbar sind

Zusätzlich soll Codex:

* **jede `// TODO:`-Anmerkung** mit kurzer Beschreibung in
  `docs/wiki/development/component-todo.md` dokumentieren
* **jede `// FIXME:`-Anmerkung** mit Beschreibung in
  `docs/wiki/development/component-fixme.md` erfassen
* **für jeden gesetzten Kommentar automatisch ein GitHub-Issue erstellen** mit:

  * sprechendem Titel (`[TODO] Button: Storybook fehlt`)
  * Paket und Komponente im Body (`Gefunden in @smolitux/core/Button.tsx`)
  * Link zum Quellcode (wenn möglich)
  * Label: `todo` oder `fixme` entsprechend der Art

---

## 📑 DOKUMENTATIONSFORMAT

```md
## @smolitux/[paketname]

| Komponente | TODOs/FIXMEs |
|------------|--------------|
| [Name]     | [Beschreibung] |
```

Beispiel `component-todo.md`:

```md
## @smolitux/core

| Komponente | TODOs |
|------------|-------|
| Modal      | Tests fehlen, keine A11y |
```

Beispiel `component-fixme.md`:

```md
## @smolitux/media

| Komponente | FIXMEs |
|------------|--------|
| VideoPlayer | useEffect ohne Cleanup |
```

---

## 🚀 BEFEHL FÜR CODEX

> **Starte mit allen Komponenten in allen**
> `packages/@smolitux/*/src/components/`

Für jede `.tsx`-Datei:

1. **Analysiere den gesamten Code**
2. **Wo nötig, kommentiere den Code direkt**:

   * `// TODO: Storybook fehlt`
   * `// FIXME: Props sind nicht typisiert`
3. **Trage alle Funde ein in:**

   * `component-todo.md` oder
   * `component-fixme.md` (Struktur siehe oben)
4. **Erstelle automatisch ein GitHub Issue**:

   * `gh issue create --title "[TODO] Button: Storybook fehlt" --body "Gefunden in @smolitux/core/Button.tsx"`
     *(Pfad, Beschreibung und Codeauszug ergänzen)*
   * Verwende `--label "todo"` oder `--label "fixme"`

---

## 🧩 BEISPIEL – CODEMOD DURCH CODEX

Vorher (`Button.tsx`):

```tsx
export const Button = (props) => {
  return <button {...props} />
}
```

Nachher:

```tsx
// FIXME: Props sind nicht typisiert
export const Button = (props) => {
  return <button {...props} />
}

// TODO: Accessibility fehlt (role, aria-*)
```

Zusätzlich erzeugt Codex:

```md
## @smolitux/core

| Komponente | TODOs |
|------------|-------|
| Button     | Accessibility fehlt (role, aria-*) |
```

```md
## @smolitux/core

| Komponente | FIXMEs |
|------------|--------|
| Button     | Props sind nicht typisiert |
```

Und GitHub-Issues wie:

```
Title: [FIXME] Button: Props sind nicht typisiert
Body: In Datei `packages/@smolitux/core/src/components/Button/Button.tsx` fehlen Props-Typen.
Label: fixme
```

---

Natürlich! Hier ist die **erweiterte und verbesserte Version** der `## 🛠️ CODEX-LOGIKHINWEISE` – ergänzt um präzise Regeln für:

* **fehlerhafte oder unsaubere TypeScript-Funktionen**
* **fehlende oder fehlerhafte Formatierung**
* weiterhin im strukturierten Tabellenformat mit klaren Codex-Handlungsanweisungen

---

## 🛠️ CODEX-LOGIKHINWEISE

| Erkanntes Muster                                                                        | Codex-Kommentar                                        | Eintragen in         | Issue-Label |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------ | -------------------- | ----------- |
| Nicht typisierte Props                                                                  | `// FIXME: Props nicht typisiert`                      | `component-fixme.md` | `fixme`     |
| Props mit `any` oder inkonsistenter Typverwendung                                       | `// FIXME: Typisierung unspezifisch oder inkonsistent` | `component-fixme.md` | `fixme`     |
| Funktionen ohne Rückgabetyp (z. B. `() => {}`)                                          | `// FIXME: Rückgabetyp fehlt`                          | `component-fixme.md` | `fixme`     |
| Verwendung von untypisierten Callbacks (z. B. `onChange={(e) => ...}`)                  | `// FIXME: Callback nicht typisiert`                   | `component-fixme.md` | `fixme`     |
| Komponenten ohne `forwardRef`                                                           | `// TODO: forwardRef hinzufügen`                       | `component-todo.md`  | `todo`      |
| Keine `.stories.tsx` vorhanden                                                          | `// TODO: Storybook fehlt`                             | `component-todo.md`  | `todo`      |
| Keine `.test.tsx` vorhanden                                                             | `// TODO: Tests fehlen`                                | `component-todo.md`  | `todo`      |
| Fehlende Barrierefreiheit (`role`, `aria-*`, Tastaturfokus)                             | `// TODO: Barrierefreiheit fehlt`                      | `component-todo.md`  | `todo`      |
| `useEffect` ohne Cleanup-Funktion                                                       | `// FIXME: useEffect ohne Cleanup`                     | `component-fixme.md` | `fixme`     |
| Doppelte useEffect-Dependencies oder unkontrollierte Nebenwirkungen                     | `// FIXME: useEffect-Dependencies prüfen`              | `component-fixme.md` | `fixme`     |
| Formatierungsfehler (z. B. fehlende Leerzeichen, Klammern inkonsistent, linter-Verstoß) | `// TODO: Formatierung korrigieren`                    | `component-todo.md`  | `todo`      |
| Verstoß gegen Style Guide (z. B. Inline-Styles, harte Farbwerte, kein Token)            | `// TODO: Style Guide beachten`                        | `component-todo.md`  | `todo`      |
| Funktionalität nicht testbar (z. B. schwer testbare Logik im Render-Block)              | `// FIXME: Logik sollte ausgelagert werden`            | `component-fixme.md` | `fixme`     |
| Komplexe Komponente ohne interne Aufteilung (z. B. fehlende Subkomponenten)             | `// TODO: Komponente aufteilen`                        | `component-todo.md`  | `todo`      |
| Veraltete oder ungenutzte Importe                                                       | `// FIXME: Unbenutzter Import`                         | `component-fixme.md` | `fixme`     |
| Harte Strings im Code (z. B. UI-Texte) ohne Lokalisierung                               | `// TODO: Lokalisierung vorbereiten`                   | `component-todo.md`  | `todo`      |
| Magic Numbers oder undefinierte Konstanten                                              | `// FIXME: Magic Number ersetzen durch Konstante`      | `component-fixme.md` | `fixme`     |

---

### 🧠 Codex soll zusätzlich:

* bei **mehreren Problemen pro Datei** jeden Kommentar einzeln an der betroffenen Stelle setzen
* bei **unsicherer Einschätzung** lieber einen `TODO` mit Hinweis setzen, z. B.
  `// TODO: Code-Abschnitt prüfen – ggf. optimieren oder vereinfachen`
* alle Kommentare so schreiben, dass sie **für andere Entwickler\:innen selbsterklärend sind**
* für jeden Eintrag **ein GitHub-Issue erstellen**, wie zuvor beschrieben

---

## 🔁 Wiederholen, bis:

* alle Dateien kommentiert sind,
* alle Markdown-Dateien aktuell sind,
* alle relevanten Issues auf GitHub erstellt wurden.

---

## ✅ ZIEL ERREICHT, WENN:

* [x] Jeder erkannte Mangel ist im Code kommentiert
* [x] Die `component-todo.md` und `component-fixme.md` enthalten strukturierte Tabellen mit Einträgen pro Komponente
* [x] Für jede Zeile ein eigenes GitHub-Issue erstellt wurde (mit passendem Label)
* [x] Keine automatische Korrektur vorgenommen wurde – nur Kommentierung & Dokumentation

