Schritt 14 – Analyse trotz Instabilität & Aufgabenextraktion

🎯 Ziel:
Trotz instabiler Build-, Lint- und Test-Umgebung soll Codex den Entwicklungsstand der smolitux-ui-Bibliothek analysieren und daraus alle noch offenen, dokumentierten Aufgaben als konkrete GitHub Issues ableiten – für eine strukturierte Stabilisierung und Weiterentwicklung.
🧨 Ausgangslage (Status aus Schritt 13)

    Das Repository enthält über 24.000 getrackte Dateien in node_modules-Verzeichnissen.

    Ein sauberes Rebuild scheitert trotz Löschung dieser Ordner und Aktualisierung der .gitignore.

    Selbst mit reduziertem package.json bleiben:

        Tausende fehlende Dependencies

        Fehlerhafte ESLint-Konfigurationen

        Ungültige TypeScript-Definitionen

        Ungültige oder doppelte Testkonfigurationen

    CI-Befehle schlagen durchgehend fehl (npm run lint, npm run test, npm run build).

📋 Aufgaben für Schritt 14
1. 📖 Dokumentationsanalyse (statt Kompilierung)

    Untersuche alle .md-Dateien in docs/wiki und untergeordnete Ordner (z. B. development, testing, architecture, components, improvement-plan).

    Extrahiere daraus:

        Noch nicht umgesetzte Features oder Komponenten

        Technische Schulden, Migrationen oder Refactorings

        Geplante Tests und Build-Schritte

        Fehlende Dokumentation oder Inkonsistenzen

2. 🧠 Statische Code-Analyse (ohne Build)

    Analysiere den Quellcode unter packages/@smolitux/* rein statisch:

        Welche Komponenten sind vollständig vs. unvollständig?

        Welche Dateien sind leer, veraltet, doppelt oder inkonsistent?

        Welche Module sind in Docs referenziert, aber nicht vorhanden?

3. 🗂 Aufgaben als GitHub Issues anlegen

    Erstelle zu jeder noch nicht umgesetzten oder problematischen Aufgabe ein GitHub Issue:

        Titel: Klar und handlungsorientiert

        Labels: z. B. bug, enhancement, testing, refactor, a11y, docs

        Beschreibung:

            Ursprung aus welchem Dokument / Paket

            Konkrete ToDos

            Erwartetes Ergebnis / Definition of Done

4. 🧾 Dokumentation des Status

    Erstelle oder aktualisiere:
    docs/wiki/development/status-report.md mit:

        Liste aller vollständig vs. unvollständig entwickelten Komponenten

        Liste aller fehlenden Tests

        Übersicht aller extrahierten Issues mit Links

        Hinweise zu strukturellen oder systemischen Problemen im Repository

✅ Validierungsziel

Codex soll:

    Den aktuellen Stand dokumentieren, nicht reparieren

    Keine fehleranfälligen Build- oder Testprozesse starten

    Nur Issues erzeugen und die strukturierte Entwicklung ermöglichen

👉 Codex:

    Analysiere die Dokumentation (docs/wiki) und die statische Codebasis (packages/@smolitux/*). Erstelle daraus eine strukturierte Übersicht des Entwicklungsstands und lege zu allen offenen Aufgaben passende GitHub Issues an. Dokumentiere den Status im File docs/wiki/development/status-report.md.
