#!/bin/bash
# -------------------------------------------------------
# validate-component.sh
# Validiert eine Komponente auf Vollständigkeit und Qualität
#
# Verwendung: ./validate-component.sh --package PACKAGE --component COMPONENT
# -------------------------------------------------------

# Fehler bei nicht gesetzten Variablen anzeigen
set -u

# Bei Fehlern abbrechen
set -e

# Pfad zum Skriptverzeichnis
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"

# Hilfsfunktionen laden
source "${SCRIPT_DIR}/../utils/common-functions.sh" 2>/dev/null || source "${REPO_ROOT}/scripts/utils/common-functions.sh"

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
      log_error "Unbekanntes Argument: $1"
      exit 1
      ;;
  esac
done

# Argumente validieren
if [[ -z "$PACKAGE" ]]; then
  log_error "Fehler: --package muss angegeben werden"
  exit 1
fi

if [[ -z "$COMPONENT" ]]; then
  log_error "Fehler: --component muss angegeben werden"
  exit 1
fi

# Hauptfunktionalität
log_info "Validiere Komponente $COMPONENT im Paket $PACKAGE..."

# Komponenten-Verzeichnis
COMPONENT_DIR="${REPO_ROOT}/packages/@smolitux/${PACKAGE}/src/components/${COMPONENT}"

# Prüfen, ob Komponente existiert
if [[ ! -d "$COMPONENT_DIR" ]]; then
  log_error "Komponente $COMPONENT existiert nicht im Paket $PACKAGE"
  exit 1
fi

# TypeScript-Validierung
log_info "Führe TypeScript-Validierung durch..."
TS_STATUS=0

if ! npx tsc --noEmit --project "${REPO_ROOT}/packages/@smolitux/${PACKAGE}/tsconfig.json"; then
  log_error "TypeScript-Fehler gefunden"
  TS_STATUS=1
else
  log_success "Keine TypeScript-Fehler gefunden"
fi

# ESLint-Validierung
log_info "Führe ESLint-Validierung durch..."
ESLINT_STATUS=0

if ! npx eslint "${COMPONENT_DIR}" --ext .ts,.tsx; then
  log_error "ESLint-Fehler gefunden"
  ESLINT_STATUS=1
else
  log_success "Keine ESLint-Fehler gefunden"
fi

# Test-Validierung
log_info "Führe Tests durch..."
TEST_STATUS=0

TEST_PATTERN="packages/@smolitux/${PACKAGE}/src/components/${COMPONENT}"
if ! npx jest --testPathPattern="${TEST_PATTERN}"; then
  log_error "Tests fehlgeschlagen"
  TEST_STATUS=1
else
  log_success "Tests erfolgreich"
fi

# Barrierefreiheits-Validierung
log_info "Führe Barrierefreiheitstests durch..."
A11Y_STATUS=0

if ! npx jest --testPathPattern="${TEST_PATTERN}" --testNamePattern="accessibility"; then
  log_warning "Barrierefreiheitstests fehlgeschlagen"
  A11Y_STATUS=1
else
  log_success "Barrierefreiheitstests erfolgreich"
fi

# Build-Validierung
log_info "Führe Build-Validierung durch..."
BUILD_STATUS=0

if ! npm run build --workspace=@smolitux/${PACKAGE}; then
  log_error "Build fehlgeschlagen"
  BUILD_STATUS=1
else
  log_success "Build erfolgreich"
fi

# Gesamtstatus
log_info "Gesamtstatus..."

if [[ $TS_STATUS -eq 0 && $ESLINT_STATUS -eq 0 && $TEST_STATUS -eq 0 && $A11Y_STATUS -eq 0 && $BUILD_STATUS -eq 0 ]]; then
  log_success "Komponente $COMPONENT im Paket $PACKAGE ist valide"
  exit 0
else
  log_warning "Komponente $COMPONENT im Paket $PACKAGE ist nicht valide"
  [[ $TS_STATUS -eq 1 ]] && log_error "  - TypeScript-Fehler"
  [[ $ESLINT_STATUS -eq 1 ]] && log_error "  - ESLint-Fehler"
  [[ $TEST_STATUS -eq 1 ]] && log_error "  - Test-Fehler"
  [[ $A11Y_STATUS -eq 1 ]] && log_error "  - Barrierefreiheits-Fehler"
  [[ $BUILD_STATUS -eq 1 ]] && log_error "  - Build-Fehler"
  exit 1
fi