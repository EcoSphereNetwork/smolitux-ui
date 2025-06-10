# Smolitux UI Modular Prompt System

## Übersicht

Dieses Verzeichnis enthält ein modulares Prompt-System für Codex-Agenten, die an der Smolitux UI-Komponentenbibliothek arbeiten. Das System ist so konzipiert, dass es:

- **Modular**: Kombiniere Prompts basierend auf spezifischen Anforderungen
- **Wartbar**: Einfach zu aktualisieren und zu erweitern
- **Konsistent**: Stelle sicher, dass alle Agenten die gleichen Standards befolgen
- **Effizient**: Minimiere Redundanz und maximiere Wiederverwendung

## Verzeichnisstruktur

```
/prompts/
├── README.md                     # Diese Datei
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

## Verwendung

### Verwendung des Prompt-Builders

Der Prompt-Builder-Skript kombiniert Prompt-Module basierend auf deiner spezifischen Aufgabe:

```bash
# Generiere einen Prompt für die Entwicklung von Komponenten im Core-Paket
node scripts/prompts/prompt-builder.js --base core/system-prompt.md --package core --task component-development --template component

# Generiere einen Prompt für das Testen von Komponenten im Theme-Paket
node scripts/prompts/prompt-builder.js --base core/system-prompt.md --package theme --task testing --template test
```

### Manuelle Zusammenstellung

Du kannst Prompts auch manuell zusammenstellen, indem du folgende Elemente kombinierst:

1. **Immer einschließen**: `core/system-prompt.md`
2. **Paket-Kontext hinzufügen**: `packages/[package-name].md`
3. **Aufgabenfokus hinzufügen**: `workflows/[task-name].md`
4. **Templates hinzufügen**: `templates/[template-name].md`

## Prompt-Module

### Basis-Prompts

- **system-prompt.md**: Basisanweisungen für alle Codex-Agenten
- **component-template.md**: Generische Richtlinien für die Komponenten-Entwicklung
- **quality-standards.md**: Qualitätsanforderungen für alle Komponenten

### Paket-spezifische Prompts

Jedes Paket hat spezifische Überlegungen:

- **core.md**: Grundlegende Komponenten mit breiter Verwendung
- **theme.md**: Theming-System und Design-Tokens
- **utils.md**: Utility-Funktionen und Hilfsmethoden
- **layout.md**: Layout-Komponenten und -Systeme
- **charts.md**: Datenvisualisierungs-Komponenten
- **media.md**: Medien-Komponenten
- **ai.md**: KI-gestützte Komponenten
- **blockchain.md**: Blockchain-Integrations-Komponenten
- **community.md**: Soziale und Community-Komponenten
- **resonance.md**: Plattform-spezifische Komponenten
- **federation.md**: Plattformübergreifende Integration
- **voice-control.md**: Sprachschnittstellen-Komponenten

### Workflow-Prompts

Aufgabenspezifische Anweisungen:

- **component-development.md**: Komponenten-Entwicklung
- **bug-fixing.md**: Fehlerbehebung
- **testing.md**: Testen
- **documentation.md**: Dokumentation
- **refactoring.md**: Code-Refactoring
- **accessibility.md**: Barrierefreiheits-Verbesserungen
- **performance.md**: Performance-Optimierung

### Templates

Wiederverwendbare Code-Templates:

- **component.md**: Komponenten-Implementierungs-Templates
- **test.md**: Test-Implementierungs-Templates
- **story.md**: Storybook-Story-Templates
- **hook.md**: React-Hook-Templates
- **utility.md**: Utility-Funktions-Templates

## Best Practices

1. **Beginne mit Analyse**: Beginne immer mit einer Repository-Analyse, um den aktuellen Zustand zu verstehen
2. **Folge der Prioritätsreihenfolge**: Arbeite an Paketen in der empfohlenen Prioritätsreihenfolge
3. **Halte Qualitätsstandards ein**: Halte dich immer an die Qualitätsstandards
4. **Dokumentiere den Fortschritt**: Aktualisiere die Fortschrittsverfolgung nach jeder Sitzung
5. **Validiere Änderungen**: Teste alle Änderungen, bevor du weitermachst

## Erweiterung des Systems

Um neue Prompt-Module hinzuzufügen:

1. Erstelle eine neue Markdown-Datei im entsprechenden Verzeichnis
2. Folge dem etablierten Format und Stil
3. Aktualisiere diese README, wenn du eine neue Kategorie hinzufügst
4. Teste das neue Modul mit dem Prompt-Builder

## Versionierung

Prompt-Module folgen der semantischen Versionierung:

- **Major-Version**: Grundlegende Änderungen an der Prompt-Struktur
- **Minor-Version**: Neue Funktionen oder signifikante Verbesserungen
- **Patch-Version**: Fehlerbehebungen und kleinere Verbesserungen

Füge Versionsinformationen in den Header jeder Prompt-Datei ein.
