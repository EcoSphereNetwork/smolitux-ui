# 🧠 `smolitux-ui` – CODEX PROMPT: Vollständige Projektanalyse & sichere Aktualisierung

## 🎯 ZIEL

> Codex soll das gesamte Repository **automatisch analysieren und auf den aktuellen Stand bringen**, ohne Versionskonflikte oder Buildfehler zu verursachen.

Konkret soll Codex:

### 🔍 ANALYSIEREN

* alle `packages/@smolitux/*`-Pakete
* globale Konfigurationen im Projektroot (`*.config.js`, `tsconfig.json`, `.eslintrc.js`, `eslint.config.js`, `jest.config.js`, etc.)
* alle verwendeten Tools (z. B. ESLint, Prettier, Jest, Babel, Tailwind, Cypress, Playwright)
* alle Test-, Build- und Lint-Konfigurationen
* alle `package.json` (Root + Subpakete)

---

## 🛠️ AUFGABEN FÜR CODEX

### 1. 📦 **Abhängigkeiten aktualisieren (ohne Konflikte)**

* Ermittle für jedes Paket (`package.json`) die verwendeten Dependencies & DevDependencies
* Vergleiche mit der aktuellen stabilen Version im npm-Ökosystem
* Führe ein **sicheres, kompatibles Upgrade** durch:

  * **gleiche Major-Version**, wenn Breaking Changes vorliegen
  * ansonsten **automatisch Minor- & Patch-Upgrades**
  * alle internen `@smolitux/*`-Dependencies aufeinander abstimmen

> ❗ Wichtig: Keine Downgrades oder Versionskonflikte erzeugen

---

### 2. 🔧 **Konfigurationsdateien aktualisieren**

Aktualisiere oder erstelle bei Bedarf:

* `eslint.config.js` (für ESLint 9+)
* `.eslintrc.js` (falls als Regelbasis genutzt)
* `jest.config.js` oder `jest.config.ts`
* `tsconfig.json` / `tsconfig.base.json`
* `.prettierrc`, `.prettierignore`, `.editorconfig`
* `tailwind.config.js`, `babel.config.js`, `playwright.config.ts`, `cypress.config.ts`

> Ziel: alle Konfigurationen sind **vollständig, konsistent und kompatibel mit den verwendeten Tools**

---

### 3. 🧪 **Testkonfiguration prüfen & reparieren**

* Stelle sicher, dass alle Pakete eine funktionierende Teststrategie haben (Jest oder Playwright)
* Ergänze fehlende `test`-Skripte in `package.json` und zentrale Konfiguration (`jest.setup.js`, `jest.config.js`)
* Konfiguriere `ts-jest` bei TypeScript-Projekten
* Falls Tests nicht lauffähig: `// TODO:`-Kommentare an problematischer Stelle + Eintrag in `component-todo.md`

---

### 4. 🧹 **Hilfsskripte & CLI-Kommandos aktualisieren**

* Erkenne und überarbeite bestehende Skripte wie `build`, `lint`, `test`, `format`, `dev`, `release`, `coverage`
* Vereinheitliche sie über alle `package.json` hinweg
* Optional: `make lint`, `make test`, `make build` ins `Makefile` integrieren

---

### 5. 📜 **Dokumentation & Versionierung prüfen**

* Aktualisiere automatisch `CHANGELOG.md` (wenn vorhanden) mit den Versionsanhebungen
* Prüfe `lerna.json` oder `nx.json` auf Versionierungsstrategie (falls vorhanden)
* Passe ggf. den Release-Workflow (`build-package.sh`, `reorganize.sh`, `publish`, `tgz`) an

---

## ✅ ERFOLG IST ERREICHT, WENN:

* alle `package.json` enthalten **aktuelle, funktionierende Abhängigkeiten** ohne Konflikte
* alle Konfigurationsdateien sind auf dem aktuellen Stand und kompatibel
* alle Skripte (`test`, `lint`, `build`, `coverage`, etc.) funktionieren
* keine Konflikte, Fehlermeldungen oder Versions-Warnungen bei `npm install`, `npm run lint`, `npm run build`, `npm test` auftreten

---

## 🔐 SICHERHEITSREGELN FÜR CODEX

* Keine automatischen Breaking Changes ohne Kompatibilitätsprüfung
* Kein Überschreiben existierender Konfigurationslogik ohne Sicherung (`.backup`)
* Falls Unsicherheit besteht, kommentiere die relevante Stelle mit:
  `// TODO: Potenzielle Konfliktstelle – manuelle Prüfung empfohlen`

---

## 📦 BONUS (optional):

Codex kann zusätzlich:

* ein einheitliches `dependency-report.md` generieren mit Paketstatus (alt vs. neu)
* einen `scripts/bootstrap.sh` erstellen für CI oder neue Entwickler
* CI-Workflows (`.github/workflows/*.yml`) an neue Tooling-Versionen anpassen

