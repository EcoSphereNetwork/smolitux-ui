# Generierungs-Skripte

Skripte zur Generierung von Code und Komponenten.

## Verfügbare Skripte

- **completion.sh**: Hauptskript zur Vervollständigung von Komponenten
- **smolitux-completion-finisher.sh**: Finalisiert generierte Komponenten
- **annotate-components.js**: Fügt Annotationen zu Komponenten hinzu
- **component-generator.js**: Generiert neue Komponenten basierend auf Templates

## Verwendung

```bash
# Komponente vervollständigen
./completion.sh --package core --component Button

# Komponente finalisieren
./smolitux-completion-finisher.sh --package core --component Button

# Komponenten annotieren
node annotate-components.js --package core

# Neue Komponente generieren
node component-generator.js --package core --name NewComponent --type basic
```

## Erweiterung

Um ein neues Generierungs-Skript hinzuzufügen:

1. Erstelle das Skript im `generation/`-Verzeichnis
2. Mache es ausführbar mit `chmod +x dein-skript.sh` (für Shell-Skripte)
3. Dokumentiere es in dieser README-Datei
4. Füge es ggf. in bestehende Workflow-Skripte ein

## Templates

Für die Generierung von Komponenten werden Templates verwendet, die sich im `templates/`-Verzeichnis befinden. Diese können angepasst werden, um den Generierungsprozess zu steuern.