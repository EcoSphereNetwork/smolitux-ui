# Skript-Reorganisationsplan für Smolitux UI

## Aktuelle Struktur

Die aktuelle Skriptstruktur ist unorganisiert und enthält eine Mischung aus aktuellen und veralteten Skripten ohne klare Kategorisierung:

```
scripts/
├── core/                 # Kern-Skripte mit gemischten Funktionalitäten
├── legacy/               # Veraltete Skripte, teilweise noch in Verwendung
└── workflows/            # Workflow-Skripte ohne klare Abgrenzung
```

## Neue Struktur

Die neue Struktur organisiert Skripte nach ihrer Funktion und Verantwortlichkeit:

```
scripts/
├── analysis/             # Skripte zur Codeanalyse
│   ├── analyze-repo.sh   # Repository-Analyse
│   ├── analyze-component.sh # Komponenten-Analyse
│   └── analyze-tests.sh  # Test-Analyse
├── generation/           # Skripte zur Codegenerierung
│   ├── generate-component.sh # Komponenten-Generierung
│   ├── generate-test.sh  # Test-Generierung
│   └── generate-docs.sh  # Dokumentations-Generierung
├── validation/           # Skripte zur Codevalidierung
│   ├── validate-component.sh # Komponenten-Validierung
│   ├── validate-build.sh # Build-Validierung
│   └── validate-tests.sh # Test-Validierung
├── utils/                # Hilfsskripte
│   ├── setup.sh          # Setup-Skript
│   ├── cleanup.sh        # Aufräum-Skript
│   └── helpers.sh        # Hilfsfunktionen
└── prompts/              # Prompt-Skripte
    ├── process-prompt.sh # Prompt-Verarbeitung
    └── generate-prompt.sh # Prompt-Generierung
```

## Migrationsstrategie

### Schritt 1: Verzeichnisstruktur erstellen

```bash
mkdir -p scripts/analysis
mkdir -p scripts/generation
mkdir -p scripts/validation
mkdir -p scripts/utils
mkdir -p scripts/prompts
```

### Schritt 2: Bestehende Skripte kategorisieren

Bestehende Skripte werden nach ihrer Funktion kategorisiert:

#### Analyse-Skripte
- `scripts/core/analyze-repo.sh` → `scripts/analysis/analyze-repo.sh`
- `scripts/core/analyze-component.sh` → `scripts/analysis/analyze-component.sh`

#### Generierungs-Skripte
- `scripts/core/generate-component.sh` → `scripts/generation/generate-component.sh`
- `scripts/workflows/generate-test.sh` → `scripts/generation/generate-test.sh`

#### Validierungs-Skripte
- `scripts/core/validate-component.sh` → `scripts/validation/validate-component.sh`
- `scripts/workflows/validate-build.sh` → `scripts/validation/validate-build.sh`

#### Hilfsskripte
- `scripts/core/setup.sh` → `scripts/utils/setup.sh`
- `scripts/core/helpers.sh` → `scripts/utils/helpers.sh`

#### Prompt-Skripte
- `scripts/workflows/process-prompt.sh` → `scripts/prompts/process-prompt.sh`

### Schritt 3: Skripte überarbeiten und standardisieren

Jedes Skript sollte folgende Elemente enthalten:

1. **Header-Kommentar**: Beschreibung, Verwendung, Argumente
2. **Fehlerbehandlung**: Robuste Fehlerbehandlung
3. **Logging**: Konsistentes Logging-Format
4. **Hilfsfunktionen**: Gemeinsame Funktionen in `scripts/utils/helpers.sh`
5. **Dokumentation**: Inline-Dokumentation und README

#### Beispiel für ein standardisiertes Skript:

```bash
#!/bin/bash
# -------------------------------------------------------
# analyze-component.sh
# Analysiert eine Komponente auf Vollständigkeit und Qualität
#
# Verwendung: ./analyze-component.sh --package PACKAGE --component COMPONENT
# -------------------------------------------------------

# Fehler bei nicht gesetzten Variablen anzeigen
set -u

# Bei Fehlern abbrechen
set -e

# Pfad zum Skriptverzeichnis
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Hilfsfunktionen laden
source "${SCRIPT_DIR}/../utils/helpers.sh"

# Argumente parsen
PACKAGE=""
COMPONENT=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --package)
      PACKAGE="$2"
      shift 2
      ;;
    --component)
      COMPONENT="$2"
      shift 2
      ;;
    *)
      echo "Unbekanntes Argument: $1"
      exit 1
      ;;
  esac
done

# Argumente validieren
if [[ -z "$PACKAGE" ]]; then
  echo "Fehler: --package muss angegeben werden"
  exit 1
fi

if [[ -z "$COMPONENT" ]]; then
  echo "Fehler: --component muss angegeben werden"
  exit 1
fi

# Hauptfunktionalität
log_info "Analysiere Komponente $COMPONENT im Paket $PACKAGE..."

# Komponenten-Verzeichnis
COMPONENT_DIR="${REPO_ROOT}/packages/@smolitux/${PACKAGE}/src/components/${COMPONENT}"

# Prüfen, ob Komponente existiert
if [[ ! -d "$COMPONENT_DIR" ]]; then
  log_error "Komponente $COMPONENT existiert nicht im Paket $PACKAGE"
  exit 1
fi

# Analyse durchführen
log_info "Prüfe Dateien..."
check_file_exists "${COMPONENT_DIR}/${COMPONENT}.tsx"
check_file_exists "${COMPONENT_DIR}/${COMPONENT}.test.tsx"
check_file_exists "${COMPONENT_DIR}/index.ts"

log_info "Prüfe TypeScript-Fehler..."
check_typescript_errors "${COMPONENT_DIR}"

log_info "Prüfe Test-Abdeckung..."
check_test_coverage "${PACKAGE}" "${COMPONENT}"

log_info "Analyse abgeschlossen"
```

### Schritt 4: Neue Skripte erstellen

Für fehlende Funktionalitäten werden neue Skripte erstellt:

1. `scripts/analysis/analyze-tests.sh`: Analysiert Testabdeckung
2. `scripts/generation/generate-docs.sh`: Generiert Dokumentation
3. `scripts/validation/validate-tests.sh`: Validiert Tests
4. `scripts/utils/cleanup.sh`: Bereinigt temporäre Dateien
5. `scripts/prompts/generate-prompt.sh`: Generiert Prompts

### Schritt 5: Dokumentation

Für jedes Verzeichnis wird eine README-Datei erstellt:

- `scripts/README.md`: Übersicht über alle Skripte
- `scripts/analysis/README.md`: Dokumentation der Analyse-Skripte
- `scripts/generation/README.md`: Dokumentation der Generierungs-Skripte
- `scripts/validation/README.md`: Dokumentation der Validierungs-Skripte
- `scripts/utils/README.md`: Dokumentation der Hilfsskripte
- `scripts/prompts/README.md`: Dokumentation der Prompt-Skripte

## Implementierungsplan

### Phase 1: Grundlegende Struktur (Tag 1)

1. Erstellen der neuen Verzeichnisstruktur
2. Kopieren bestehender Skripte in die neue Struktur (ohne Änderungen)
3. Erstellen grundlegender README-Dateien

### Phase 2: Standardisierung (Tag 2-3)

1. Überarbeiten der kopierten Skripte gemäß dem Standardformat
2. Extrahieren gemeinsamer Funktionen in `helpers.sh`
3. Implementieren konsistenter Fehlerbehandlung und Logging

### Phase 3: Neue Funktionalitäten (Tag 4-5)

1. Erstellen neuer Skripte für fehlende Funktionalitäten
2. Testen aller Skripte
3. Vervollständigen der Dokumentation

### Phase 4: Integration (Tag 6-7)

1. Aktualisieren von CI/CD-Workflows zur Verwendung der neuen Skripte
2. Aktualisieren der Dokumentation mit Beispielen
3. Schulung der Entwickler zur Verwendung der neuen Skripte

## Zu migrierende Skripte

| Aktueller Pfad | Neuer Pfad | Änderungen |
|----------------|------------|------------|
| `scripts/core/analyze-repo.sh` | `scripts/analysis/analyze-repo.sh` | Standardisierung, verbesserte Fehlerbehandlung |
| `scripts/core/analyze-component.sh` | `scripts/analysis/analyze-component.sh` | Standardisierung, verbesserte Fehlerbehandlung |
| `scripts/core/generate-component.sh` | `scripts/generation/generate-component.sh` | Standardisierung, verbesserte Templates |
| `scripts/workflows/generate-test.sh` | `scripts/generation/generate-test.sh` | Standardisierung, verbesserte Templates |
| `scripts/core/validate-component.sh` | `scripts/validation/validate-component.sh` | Standardisierung, erweiterte Validierung |
| `scripts/workflows/validate-build.sh` | `scripts/validation/validate-build.sh` | Standardisierung, erweiterte Validierung |
| `scripts/core/setup.sh` | `scripts/utils/setup.sh` | Standardisierung, verbesserte Konfiguration |
| `scripts/core/helpers.sh` | `scripts/utils/helpers.sh` | Erweiterte Hilfsfunktionen |
| `scripts/workflows/process-prompt.sh` | `scripts/prompts/process-prompt.sh` | Standardisierung, verbesserte Prompt-Verarbeitung |

## Zu erstellende Skripte

| Neuer Pfad | Beschreibung | Priorität |
|------------|--------------|-----------|
| `scripts/analysis/analyze-tests.sh` | Analysiert Testabdeckung | Hoch |
| `scripts/generation/generate-docs.sh` | Generiert Dokumentation | Mittel |
| `scripts/validation/validate-tests.sh` | Validiert Tests | Hoch |
| `scripts/utils/cleanup.sh` | Bereinigt temporäre Dateien | Niedrig |
| `scripts/prompts/generate-prompt.sh` | Generiert Prompts | Mittel |

## Zu erstellende Dokumentation

| Pfad | Beschreibung | Priorität |
|------|--------------|-----------|
| `scripts/README.md` | Übersicht über alle Skripte | Hoch |
| `scripts/analysis/README.md` | Dokumentation der Analyse-Skripte | Mittel |
| `scripts/generation/README.md` | Dokumentation der Generierungs-Skripte | Mittel |
| `scripts/validation/README.md` | Dokumentation der Validierungs-Skripte | Mittel |
| `scripts/utils/README.md` | Dokumentation der Hilfsskripte | Mittel |
| `scripts/prompts/README.md` | Dokumentation der Prompt-Skripte | Mittel |

## Fazit

Die Reorganisation der Skripte wird die Wartbarkeit, Erweiterbarkeit und Benutzerfreundlichkeit des Smolitux-UI-Projekts erheblich verbessern. Durch die klare Kategorisierung und Standardisierung werden Entwickler und Codex-Agenten effizienter arbeiten können.

Die neue Struktur unterstützt den gesamten Entwicklungszyklus von der Analyse über die Generierung bis zur Validierung und bietet eine solide Grundlage für zukünftige Erweiterungen.