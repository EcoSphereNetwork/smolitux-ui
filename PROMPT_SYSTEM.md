# Smolitux UI Prompt-System

## Übersicht

Das Smolitux UI Prompt-System ist ein modulares System zur Generierung von Prompts für Codex-Agenten. Es ermöglicht die Kombination verschiedener Prompt-Module zu einem vollständigen Prompt, der auf die spezifischen Anforderungen einer Aufgabe zugeschnitten ist.

## Verzeichnisstruktur

```
/prompts/
├── README.md                     # Dokumentation des Prompt-Systems
├── core/                         # Basis-Prompts
│   ├── system-prompt.md          # Basis-Systemprompt für alle Agenten
│   ├── component-template.md     # Generische Komponenten-Entwicklung
│   └── quality-standards.md      # Qualitätsanforderungen
├── packages/                     # Paket-spezifische Prompts
│   ├── core.md                   # @smolitux/core spezifisch
│   ├── theme.md                  # @smolitux/theme spezifisch
│   └── ...                       # Andere Pakete
├── workflows/                    # Aufgaben-spezifische Prompts
│   ├── component-development.md  # Komponenten-Entwicklung
│   ├── bug-fixing.md             # Fehlerbehebung
│   └── ...                       # Andere Workflows
└── templates/                    # Wiederverwendbare Templates
    ├── component.md              # Komponenten-Template
    ├── test.md                   # Test-Template
    └── story.md                  # Story-Template
```

## Prompt-Builder

Der Prompt-Builder ist ein Skript, das Prompt-Module basierend auf den angegebenen Parametern kombiniert. Es befindet sich unter `/workspace/smolitux-ui/scripts/prompts/prompt-builder.js`.

### Verwendung

```bash
node scripts/prompts/prompt-builder.js --base core/system-prompt.md --package core --task component-development --template component
```

### Parameter

- `--base`: Der Basis-Prompt, der als Grundlage für den generierten Prompt dient
- `--package`: Das Paket, für das der Prompt generiert wird
- `--task`: Die Aufgabe, für die der Prompt generiert wird
- `--template`: Das Template, das für den Prompt verwendet wird
- `--output`: Der Pfad, in den der generierte Prompt geschrieben werden soll (optional)

## Prompt-Module

### Basis-Prompts

Basis-Prompts dienen als Grundlage für alle generierten Prompts. Sie enthalten allgemeine Informationen und Anweisungen, die für alle Aufgaben relevant sind.

- **system-prompt.md**: Enthält grundlegende Informationen über das Projekt, die Architektur und die Anforderungen
- **component-template.md**: Enthält Informationen über die Struktur und Implementierung von Komponenten
- **quality-standards.md**: Enthält Informationen über die Qualitätsanforderungen an den Code

### Paket-spezifische Prompts

Paket-spezifische Prompts enthalten Informationen über ein bestimmtes Paket, wie z.B. die enthaltenen Komponenten, die Abhängigkeiten und die spezifischen Anforderungen.

- **core.md**: Informationen über das Core-Paket
- **theme.md**: Informationen über das Theme-Paket
- **utils.md**: Informationen über das Utils-Paket
- **layout.md**: Informationen über das Layout-Paket
- **charts.md**: Informationen über das Charts-Paket
- **media.md**: Informationen über das Media-Paket
- **ai.md**: Informationen über das AI-Paket
- **blockchain.md**: Informationen über das Blockchain-Paket
- **community.md**: Informationen über das Community-Paket
- **resonance.md**: Informationen über das Resonance-Paket
- **federation.md**: Informationen über das Federation-Paket
- **voice-control.md**: Informationen über das Voice-Control-Paket

### Workflow-Prompts

Workflow-Prompts enthalten Informationen über eine bestimmte Aufgabe, wie z.B. die Schritte zur Durchführung der Aufgabe, die zu beachtenden Aspekte und die erwarteten Ergebnisse.

- **component-development.md**: Informationen über die Entwicklung von Komponenten
- **bug-fixing.md**: Informationen über die Behebung von Fehlern
- **testing.md**: Informationen über das Testen von Komponenten
- **documentation.md**: Informationen über die Dokumentation von Komponenten
- **refactoring.md**: Informationen über das Refactoring von Code
- **accessibility.md**: Informationen über die Verbesserung der Barrierefreiheit
- **performance.md**: Informationen über die Optimierung der Performance

### Templates

Templates enthalten wiederverwendbare Code-Snippets und Strukturen, die in verschiedenen Prompts verwendet werden können.

- **component.md**: Template für die Implementierung von Komponenten
- **test.md**: Template für die Implementierung von Tests
- **story.md**: Template für die Implementierung von Storybook-Stories
- **hook.md**: Template für die Implementierung von React-Hooks
- **utility.md**: Template für die Implementierung von Utility-Funktionen

## Integration in Skripte

Das Prompt-System ist in verschiedene Skripte integriert, die die Entwicklung, das Testen und die Dokumentation von Komponenten unterstützen.

### Komponenten-Entwicklung

```bash
# Generiere eine neue Komponente
scripts/generation/generate-component.sh --name Button --package core

# Analysiere eine bestehende Komponente
scripts/analysis/analyze-component.sh --name Button --package core

# Validiere eine Komponente
scripts/validation/validate-component.sh --name Button --package core
```

### Fehlerbehebung

```bash
# Analysiere einen Fehler
scripts/analysis/analyze-bug.sh --id 123

# Behebe einen Fehler
scripts/generation/fix-bug.sh --id 123
```

### Testen

```bash
# Generiere Tests für eine Komponente
scripts/generation/generate-tests.sh --name Button --package core

# Führe Tests für eine Komponente aus
scripts/validation/run-tests.sh --name Button --package core
```

## Erweiterung des Systems

Das Prompt-System kann einfach erweitert werden, indem neue Prompt-Module hinzugefügt werden. Folge diesen Schritten, um ein neues Prompt-Modul hinzuzufügen:

1. Erstelle eine neue Markdown-Datei im entsprechenden Verzeichnis
2. Folge dem etablierten Format und Stil
3. Aktualisiere die README.md, wenn du eine neue Kategorie hinzufügst
4. Teste das neue Modul mit dem Prompt-Builder

## Best Practices

1. **Modularität**: Halte Prompt-Module klein und fokussiert
2. **Wiederverwendbarkeit**: Erstelle wiederverwendbare Templates
3. **Konsistenz**: Verwende konsistente Formatierung und Struktur
4. **Dokumentation**: Dokumentiere alle Prompt-Module
5. **Versionierung**: Verwende semantische Versionierung für Prompt-Module