#!/bin/bash
# -------------------------------------------------------
# setup-prompts.sh
# Erstellt die Verzeichnisstruktur für Prompts
#
# Verwendung: ./setup-prompts.sh
# -------------------------------------------------------

# Fehler bei nicht gesetzten Variablen anzeigen
set -u

# Bei Fehlern abbrechen
set -e

# Pfad zum Skriptverzeichnis
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
PROMPTS_DIR="${REPO_ROOT}/prompts"

# Farben für Logging
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging-Funktionen
log_info() {
  echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
  echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
  echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

# Verzeichnisstruktur erstellen
create_directory_structure() {
  log_info "Erstelle Verzeichnisstruktur für Prompts..."
  
  mkdir -p "${PROMPTS_DIR}/core"
  mkdir -p "${PROMPTS_DIR}/packages/core"
  mkdir -p "${PROMPTS_DIR}/packages/theme"
  mkdir -p "${PROMPTS_DIR}/packages/utils"
  mkdir -p "${PROMPTS_DIR}/packages/testing"
  mkdir -p "${PROMPTS_DIR}/workflows"
  
  log_success "Verzeichnisstruktur erstellt"
}

# README-Dateien erstellen
create_readme_files() {
  log_info "Erstelle README-Dateien..."
  
  # Hauptverzeichnis README
  cat > "${PROMPTS_DIR}/README.md" << EOF
# Smolitux UI - Prompts

Dieses Verzeichnis enthält Prompt-Templates für die Entwicklung mit Codex.

## Verzeichnisstruktur

- **core/**: Basis-Prompts für das gesamte Projekt
- **packages/**: Paket-spezifische Prompts
  - **core/**: Prompts für das Core-Paket
  - **theme/**: Prompts für das Theme-Paket
  - **utils/**: Prompts für das Utils-Paket
  - **testing/**: Prompts für das Testing-Paket
- **workflows/**: Workflow-spezifische Prompts

## Verwendung

Prompts können mit dem Prompt-Builder generiert werden:

\`\`\`bash
node scripts/prompts/prompt-builder.js --base core/system-prompt.md --package core --task component-development --template component
\`\`\`
EOF
  
  # Core README
  cat > "${PROMPTS_DIR}/core/README.md" << EOF
# Basis-Prompts

Diese Prompts dienen als Grundlage für alle anderen Prompts.

## Verfügbare Prompts

- **system-prompt.md**: Basis-Systemprompt für Codex
- **component-template.md**: Template für Komponenten-Entwicklung
- **test-template.md**: Template für Test-Entwicklung
- **documentation-template.md**: Template für Dokumentations-Entwicklung
EOF
  
  # Packages README
  cat > "${PROMPTS_DIR}/packages/README.md" << EOF
# Paket-spezifische Prompts

Diese Prompts sind spezifisch für die verschiedenen Pakete.

## Verfügbare Pakete

- **core/**: Prompts für das Core-Paket
- **theme/**: Prompts für das Theme-Paket
- **utils/**: Prompts für das Utils-Paket
- **testing/**: Prompts für das Testing-Paket
EOF
  
  # Workflows README
  cat > "${PROMPTS_DIR}/workflows/README.md" << EOF
# Workflow-Prompts

Diese Prompts sind spezifisch für verschiedene Workflows.

## Verfügbare Workflows

- **build.md**: Prompt für den Build-Workflow
- **test.md**: Prompt für den Test-Workflow
- **deploy.md**: Prompt für den Deploy-Workflow
EOF
  
  log_success "README-Dateien erstellt"
}

# Basis-Prompts erstellen
create_base_prompts() {
  log_info "Erstelle Basis-Prompts..."
  
  # System-Prompt
  cat > "${PROMPTS_DIR}/core/system-prompt.md" << EOF
# Smolitux UI - System-Prompt

## Kontext

Du bist ein Codex-Agent, der bei der Entwicklung der Smolitux UI Komponentenbibliothek hilft. Diese Bibliothek ist eine modulare React-Komponentenbibliothek, die auf Barrierefreiheit, Konsistenz und Wiederverwendbarkeit ausgelegt ist.

## Ziel

Deine Aufgabe ist es, bei der Entwicklung, dem Testen und der Dokumentation von UI-Komponenten zu helfen. Du sollst qualitativ hochwertigen, typsicheren und barrierefreien Code erstellen, der den Anforderungen und Best Practices entspricht.

## Anforderungen

1. **Typsicherheit**: Verwende TypeScript mit strikten Typen und vermeide \`any\`
2. **Barrierefreiheit**: Alle Komponenten müssen WCAG 2.1 AA-konform sein
3. **Modularität**: Komponenten sollten unabhängig und wiederverwendbar sein
4. **Konsistenz**: Folge der einheitlichen API und Designsprache
5. **Testbarkeit**: Implementiere umfassende Unit- und Accessibility-Tests

## Format

Deine Antworten sollten folgendes Format haben:

1. **Analyse**: Kurze Analyse der Aufgabe oder des Problems
2. **Lösung**: Detaillierte Lösung mit Code-Beispielen
3. **Tests**: Testcode für die Lösung
4. **Dokumentation**: Kurze Dokumentation der Lösung
5. **Nächste Schritte**: Empfehlungen für weitere Verbesserungen
EOF
  
  # Component-Template
  cat > "${PROMPTS_DIR}/core/component-template.md" << EOF
# Komponenten-Template

## Kontext

Eine UI-Komponente für die Smolitux UI Bibliothek soll entwickelt werden. Die Komponente muss den Anforderungen und Best Practices entsprechen.

## Ziel

Entwickle eine vollständige, produktionsreife UI-Komponente, die alle Qualitätsstandards erfüllt und einfach in andere Projekte integriert werden kann.

## Anforderungen

1. **Typsicherheit**: Verwende TypeScript mit strikten Typen und vermeide \`any\`
2. **Barrierefreiheit**: Die Komponente muss WCAG 2.1 AA-konform sein
3. **Modularität**: Die Komponente sollte unabhängig und wiederverwendbar sein
4. **Konsistenz**: Folge der einheitlichen API und Designsprache
5. **Testbarkeit**: Implementiere umfassende Unit- und Accessibility-Tests

## Komponenten-Struktur

\`\`\`
Component/
├── Component.tsx            # Hauptimplementierung
├── Component.a11y.tsx       # Barrierefreiheits-Implementierung (optional)
├── Component.css            # Komponenten-spezifische Styles
├── Component.test.tsx       # Unit-Tests
└── index.ts                 # Re-Export
\`\`\`

## Format

Bitte implementiere die angeforderte Komponente gemäß den oben genannten Anforderungen und der Struktur.
EOF
  
  # Test-Template
  cat > "${PROMPTS_DIR}/core/test-template.md" << EOF
# Test-Template

## Kontext

Tests für eine UI-Komponente der Smolitux UI Bibliothek sollen entwickelt werden. Die Tests müssen umfassend sein und alle Aspekte der Komponente abdecken.

## Ziel

Entwickle umfassende Tests für eine UI-Komponente, die alle Funktionalitäten, Zustände und Barrierefreiheitsaspekte abdecken.

## Anforderungen

1. **Unit-Tests**: Teste alle Funktionalitäten und Zustände der Komponente
2. **Barrierefreiheitstests**: Teste die WCAG 2.1 AA-Konformität
3. **Snapshot-Tests**: Erstelle Snapshots für visuelle Regression-Tests
4. **Interaktionstests**: Teste Benutzerinteraktionen mit der Komponente
5. **Edge-Cases**: Teste Grenzfälle und Fehlerbehandlung

## Test-Struktur

\`\`\`
Component/
├── Component.test.tsx       # Unit-Tests
├── Component.a11y.test.tsx  # Barrierefreiheitstests (optional)
└── __snapshots__/           # Snapshot-Tests
\`\`\`

## Format

Bitte implementiere die angeforderten Tests gemäß den oben genannten Anforderungen und der Struktur.
EOF
  
  # Documentation-Template
  cat > "${PROMPTS_DIR}/core/documentation-template.md" << EOF
# Dokumentations-Template

## Kontext

Dokumentation für eine UI-Komponente der Smolitux UI Bibliothek soll entwickelt werden. Die Dokumentation muss umfassend sein und alle Aspekte der Komponente abdecken.

## Ziel

Entwickle umfassende Dokumentation für eine UI-Komponente, die alle Funktionalitäten, Props, Zustände und Verwendungsbeispiele abdeckt.

## Anforderungen

1. **API-Dokumentation**: Dokumentiere alle Props und ihre Typen
2. **Verwendungsbeispiele**: Zeige Beispiele für verschiedene Anwendungsfälle
3. **Barrierefreiheit**: Dokumentiere Barrierefreiheitsaspekte
4. **Best Practices**: Gib Hinweise zu Best Practices
5. **Einschränkungen**: Dokumentiere bekannte Einschränkungen

## Dokumentations-Struktur

\`\`\`
Component/
├── Component.stories.tsx    # Storybook-Stories
└── README.md                # Komponenten-Dokumentation (optional)
\`\`\`

## Format

Bitte implementiere die angeforderte Dokumentation gemäß den oben genannten Anforderungen und der Struktur.
EOF
  
  log_success "Basis-Prompts erstellt"
}

# Hauptfunktion
main() {
  log_info "Starte Setup für Prompts..."
  
  create_directory_structure
  create_readme_files
  create_base_prompts
  
  log_success "Setup für Prompts abgeschlossen"
}

# Skript ausführen
main