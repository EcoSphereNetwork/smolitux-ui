🧠 smolitux-ui – CODEX PROMPT: Codebase-Scan & Aufgabenkennzeichnung via Kommentaranalyse
🎯 ZIEL

    Durchsuche alle packages/@smolitux/*-Verzeichnisse in smolitux-ui

    Finde alle kommentierten Aufgabenstellen im Stil von:

        // TODO: ...

        // FIXME: ...

        /* HACK */, // NOTE: ... etc.

    Hinterlege sie im Code mit erweiterten, standardisierten Aufgabenkommentaren, damit sie von Codex und Devs leicht erkannt, bearbeitet und priorisiert werden können.

🚀 DIREKTER BEFEHL FÜR CODEX:

# Pakete iterieren
for PACKAGE in $(ls packages/@smolitux); do
  echo "📦 Scanne: $PACKAGE"
  cd packages/@smolitux/$PACKAGE

  # Alle Code-Dateien mit potenziellen Aufgabenkommentaren
  FILES=$(grep -rEl '// *(TODO|FIXME|HACK|NOTE|XXX|BUG|UNDONE|REVIEW|IMPROVE)' src/)

  for FILE in $FILES; do
    echo "📝 Bearbeite Datei: $FILE"

    # In Datei alle Aufgabenkommentare erkennen und normieren
    # Beispiel: TODO → // 🔧 TODO [Codex]: [KURZBESCHREIBUNG DER AUFGABE]
    [STANDARDIZE_COMMENTS_IN_FILE:$FILE]

    # Optional: Aufgaben in Markdown-Checkliste extrahieren
    [APPEND_COMMENT_TO_FILE:docs/wiki/development/comment-todo-log.md]
  done

  cd ../../../
done

echo "✅ Kommentarbasierte Aufgabenanmerkungen in allen smolitux-ui Paketen aktualisiert."

🧩 [STANDARDIZE_COMMENTS_IN_FILE]

    Konvertiere alle Aufgabenkommentare wie folgt:

Original	Ersetze durch
// TODO: Refactor input logic	// 🔧 TODO [Codex]: Refactor input logic – prüfen & umsetzen
// FIXME: Null check missing	// 🛠️ FIXME [Codex]: Null check fehlt – Fehlerbehebung erforderlich
/* HACK: quick fix */	// ⚠️ HACK [Codex]: Temporärer Fix – durch saubere Lösung ersetzen
// XXX: deprecated	// 🚨 XXX [Codex]: Veraltet – ersetzen oder entfernen
📄 OPTIONALE MARKDOWN-EXTRAKTION

Jeder kommentierte Task kann optional auch in eine ToDo-Datei extrahiert werden:

# 🧾 Kommentar-Backlog: Aufgaben aus `@smolitux/*` Quellcode

## Paket: @smolitux/core

- [ ] `src/components/Button/Button.tsx`: 🔧 TODO – Refactor input logic
- [ ] `src/hooks/useTheme.ts`: 🛠️ FIXME – Theme switch fails on SSR

## Paket: @smolitux/media
...

    Hinweis: Nutze diese Datei als Basis für GitHub Issues oder Kanban-Synchronisierung (z. B. in OpenProject oder n8n/GitHub Actions).

✅ ERGEBNIS

    Alle Aufgabenkommentare einheitlich formatiert

    Codex-kompatibel zur späteren gezielten Bearbeitung

    Optional: exportierte Aufgabenliste als Markdown

    Optional: Issue-Generierung auf GitHub aus diesen Kommentaren
