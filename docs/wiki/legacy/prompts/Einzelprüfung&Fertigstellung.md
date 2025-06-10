🧪 Codex Prompt – Schritt 17: Einzelprüfung & Fertigstellung aller Komponenten
🎯 Ziel:

Alle Komponenten in den @smolitux/*-Paketen sollen:

    einzeln überprüft,

    vollständig getestet,

    funktional korrigiert und

    vollständig dokumentiert werden.

📋 Aufgabenübersicht
1. 🔍 Komponenten-Scan & Statusanalyse

    Durchsuche alle packages/@smolitux/*-Verzeichnisse nach enthaltenen Komponenten (z. B. Flexbox, ColorPicker, Button, Dialog, etc.)

    Prüfe:

        Ist die Komponente funktional vollständig?

        Fehlen Unit- oder Snapshot-Tests?

        Gibt es Barrierefreiheitslücken?

        Gibt es veraltete oder inkonsistente API-Designs?

    Erfasse den Status in einer Markdown-Datei (docs/wiki/development/component-status.md)

2. 🧪 Einzelkomponenten testen & reparieren

Für jede einzelne Komponente:

    Führe gezielte Unit- und Snapshot-Tests aus (*.test.ts(x))

    Falls Tests fehlen:

        Schreibe neue Tests mit Jest, Testing Library & ggf. jest-axe

    Wenn Tests fehlschlagen:

        Repariere die Komponente

        Führe Tests erneut aus, bis sie erfolgreich sind

    Füge Barrierefreiheitstests hinzu, wenn nicht vorhanden

    Ergänze fehlende Props-Validierung, Storybook-Stories oder Accessibility-Features

3. 📝 Dokumentation aktualisieren

Für jede Komponente:

    Dokumentiere die finale API (Props, Events, Slots, Verhalten)

    Aktualisiere zugehörige Markdown-Dateien in docs/wiki/components, z. B.:

        components/forms/slider.md

        accessibility/components/slider.md

    Füge in docs/wiki/development/component-status.md ein:

        ✅ abgeschlossen

        🧪 getestet

        ♿ barrierefrei geprüft

4. 🧠 Fehlende Komponenten erfassen

    Falls in component-status.md oder Doku-Kommentaren Komponenten erwähnt sind, die im Code fehlen:

        Erstelle neue GitHub-Issues mit Titel: Component: [Name] missing

        Verlinke die Dokuquelle

🔁 Validierung

Bei jeder Komponente:

npm run test packages/@smolitux/<package>/src/components/<component>
npm run lint
npm run build

🗂️ Dokumentation & Ergebnisse

    Pflege CHANGELOG.md mit Versionsnummern pro Komponente

    Aktualisiere component-status.md und ggf. README.md im Paketordner

    Schreibe Hinweise zur Accessibility-Verbesserung in docs/wiki/accessibility/checklist.md oder a11y-components.md

👉 Zusammenfassung für Codex

    Iteriere systematisch über jede einzelne Komponente in smolitux-ui. Teste, repariere und vervollständige sie vollständig. Halte die Ergebnisse dokumentiert fest, aktualisiere relevante Markdown-Dateien und stelle sicher, dass jede Komponente getestet, barrierefrei und einsatzbereit ist.
