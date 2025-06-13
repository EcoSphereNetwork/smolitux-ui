# Prompt-Skripte

Skripte zur Verwaltung und Verarbeitung von Prompts für Codex.

## Verfügbare Skripte

- **codex-init.sh**: Initialisiert Codex mit Basis-Prompts
- **prompt-builder.js**: Generiert Prompts basierend auf Templates

## Verwendung

```bash
# Codex initialisieren
./codex-init.sh

# Prompt generieren
node prompt-builder.js --base core/system-prompt.md --package core --task component-development --template component
```

## Erweiterung

Um ein neues Prompt-Skript hinzuzufügen:

1. Erstelle das Skript im `prompts/`-Verzeichnis
2. Mache es ausführbar mit `chmod +x dein-skript.sh` (für Shell-Skripte)
3. Dokumentiere es in dieser README-Datei
4. Füge es ggf. in bestehende Workflow-Skripte ein

## Prompt-Struktur

Prompts sollten folgende Struktur haben:

1. **Kontext**: Beschreibung des Aufgabenbereichs
2. **Ziel**: Klare Definition des gewünschten Ergebnisses
3. **Anforderungen**: Spezifische Anforderungen und Einschränkungen
4. **Beispiele**: Referenzbeispiele für die gewünschte Ausgabe
5. **Format**: Vorgaben zum Ausgabeformat

## Prompt-Templates

Prompt-Templates befinden sich im Verzeichnis `/workspace/smolitux-ui/prompts/` und sind nach Paketen und Aufgaben organisiert:

- `/workspace/smolitux-ui/prompts/core/`: Templates für das Core-Paket
- `/workspace/smolitux-ui/prompts/theme/`: Templates für das Theme-Paket
- `/workspace/smolitux-ui/prompts/utils/`: Templates für das Utils-Paket