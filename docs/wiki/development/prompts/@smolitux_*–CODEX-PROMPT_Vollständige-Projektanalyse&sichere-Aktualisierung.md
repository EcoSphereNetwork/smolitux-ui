# 🧠 `smolitux-ui` – CODEX PROMPT: Vollständige Projektanalyse, Toolchain-Modernisierung & sichere Aktualisierung

## 🎯 ZIEL

> Codex soll das gesamte Repository **automatisch analysieren, modernisieren und vereinheitlichen**, ohne Buildfehler, Versionskonflikte oder Breaking Changes zu verursachen.

---

## 🔍 ANALYSEUMFANG

Codex analysiert:

* alle `packages/@smolitux/*`-Pakete (Quellcode, Tests & Konfiguration)
* zentrale Dateien im Projektroot:
  `*.config.{js,ts}`, `tsconfig*.json`, `package.json`, `Makefile`, `.prettier*`, `.editorconfig`
* alle verwendeten Tools und Workflows:

  * **ESLint 9+ (eslint.config.js, typescript-eslint, react, prettier)**
  * **Tests:** Jest / Playwright
  * **Build:** tsup
  * **Styling:** TailwindCSS
  * **E2E:** Cypress
  * **Formatierung:** Prettier

---

## 🛠️ CODEX-AUFGABEN

### 1. 📦 Abhängigkeiten aktualisieren & Tooling modernisieren

* Ermittle alle Dependencies & DevDependencies (Root + Subpakete)
* Führe ein **kompatibles, sicheres Upgrade** durch:

  * keine Downgrades
  * nur gleiche Major-Version bei Breaking Changes
  * ansonsten automatische Minor-/Patch-Upgrades
* Ersetze Altlasten wie `ts-jest`, `@eslint/compat` durch moderne Alternativen
* Synchronisiere interne `@smolitux/*`-Versionen
* Generiere optional einen `dependency-report.md` (alt vs. neu)

---

### 2. 🧹 ESLint 9+ vollständig implementieren

* Entferne alte Lint-Konfigurationen: `.eslintrc.js`, `"eslintConfig"` in `package.json`
* Erstelle `eslint.config.js` mit:

  * `@eslint/js`, `@typescript-eslint/*`, `eslint-plugin-react`, `eslint-config-prettier`
* Ergänze `.eslintignore` (z. B. `node_modules`, `dist`, `*.test.tsx`)
* Lint-Skripte sicherstellen (`npm run lint`) – **nur noch `eslint.config.js` aktiv**

---

### 3. 🔧 Konfigurationsdateien aktualisieren & vereinheitlichen

* Aktualisiere oder erstelle:

  * `jest.config.js` / `jest.setup.js` / `ts-jest` falls nötig
  * `tsconfig.json`, `tsconfig.base.json`
  * `.prettierrc`, `.prettierignore`, `.editorconfig`
  * `tailwind.config.js`, `babel.config.js`, `playwright.config.ts`, `cypress.config.ts`
* Entferne überflüssige oder veraltete Dateien
* Trenne zentrale von paketbezogenen Configs bei Bedarf

---

### 4. 🧪 Tests reaktivieren & prüfen

* Installiere: `jest`, `@types/jest`, ggf. `ts-jest`
* Stelle sicher, dass `npm run test` in Root + Subpaketen funktioniert
* Testskripte einpflegen: `test`, `test:unit`, `test:e2e`, etc.
* Wenn Tests nicht laufen:

  * `// TODO: Testumgebung fehlt` + Eintrag in `component-todo.md`

---

### 5. ⚙️ Skripte & CLI-Kommandos vereinheitlichen

* Stelle sicher: `npm run lint`, `build`, `test`, `format`, `coverage` überall vorhanden
* Optional: `make lint`, `make test`, `make build` ins Makefile
* Aktualisiere alle `package.json`-Skripte
* Optional: `scripts/bootstrap.sh` für neue Entwickler oder CI erzeugen

---

### 6. 📜 Dokumentation & Meta-Dateien pflegen

* Aktualisiere `CHANGELOG.md` bei Versionsänderungen
* Prüfe & aktualisiere:

  * `lerna.json`, `nx.json` (Versionierung & Paketstrategie)
  * `reorganize.sh`, `build-package.sh`, ggf. `publish`, `.tgz-Dateien`
* Entferne obsolete Releases (z. B. `*.tgz` im Root)

---

## ✅ ERFOLG IST ERREICHT, WENN:

* [x] Alle Tools sind installiert, modern konfiguriert und lauffähig
* [x] Alle `package.json` enthalten aktuelle, geprüfte Dependencies
* [x] Alle Lint-, Build- und Testprozesse laufen durch
* [x] `eslint.config.js` ist die **einzige aktive** ESLint-Konfiguration
* [x] Veraltete Dateien wurden entfernt (z. B. `.eslintrc.js`)
* [x] Keine Fehler oder Warnungen mehr bei `npm run lint`, `build`, `test`

---

## 🔐 SICHERHEITSREGELN FÜR CODEX

* Keine Breaking Changes ohne Prüfung
* Kein Überschreiben existierender Konfigurationen ohne `.backup`
* Alle risikobehafteten Änderungen kommentieren mit:
  `// TODO: Manuelle Prüfung empfohlen – potenziell inkompatibel`

---

## 📦 BONUS (optional)

Codex kann zusätzlich:

* `dependency-report.md` mit Versionsvergleich erzeugen
* `scripts/bootstrap.sh` für lokale Setups anlegen
* CI-Workflows (`.github/workflows/*.yml`) für `lint`, `test`, `build` modernisieren
