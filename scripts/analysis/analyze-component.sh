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
FILES_STATUS=0

check_file_exists "${COMPONENT_DIR}/${COMPONENT}.tsx" || FILES_STATUS=1
check_file_exists "${COMPONENT_DIR}/index.ts" || FILES_STATUS=1

if [[ -f "${COMPONENT_DIR}/${COMPONENT}.test.tsx" ]]; then
  log_success "Test-Datei gefunden: ${COMPONENT}.test.tsx"
elif [[ -f "${COMPONENT_DIR}/__tests__/${COMPONENT}.test.tsx" ]]; then
  log_success "Test-Datei gefunden: __tests__/${COMPONENT}.test.tsx"
else
  log_warning "Keine Test-Datei gefunden"
  FILES_STATUS=1
fi

if [[ -f "${COMPONENT_DIR}/${COMPONENT}.stories.tsx" ]]; then
  log_success "Storybook-Datei gefunden: ${COMPONENT}.stories.tsx"
else
  log_warning "Keine Storybook-Datei gefunden"
  FILES_STATUS=1
fi

if [[ -f "${COMPONENT_DIR}/${COMPONENT}.css" ]]; then
  log_success "CSS-Datei gefunden: ${COMPONENT}.css"
elif [[ -f "${COMPONENT_DIR}/${COMPONENT}.scss" ]]; then
  log_success "SCSS-Datei gefunden: ${COMPONENT}.scss"
else
  log_warning "Keine Style-Datei gefunden"
fi

if [[ -f "${COMPONENT_DIR}/${COMPONENT}.a11y.tsx" ]]; then
  log_success "Barrierefreiheits-Datei gefunden: ${COMPONENT}.a11y.tsx"
else
  log_warning "Keine Barrierefreiheits-Datei gefunden"
fi

# TypeScript-Analyse
log_info "Prüfe TypeScript-Implementierung..."
TS_STATUS=0

# Prüfen auf any-Typen
if grep -q "any" "${COMPONENT_DIR}/${COMPONENT}.tsx"; then
  log_warning "any-Typen gefunden in ${COMPONENT}.tsx"
  TS_STATUS=1
else
  log_success "Keine any-Typen gefunden"
fi

# Prüfen auf forwardRef
if grep -q "forwardRef" "${COMPONENT_DIR}/${COMPONENT}.tsx"; then
  log_success "forwardRef wird verwendet"
else
  log_warning "forwardRef wird nicht verwendet"
  TS_STATUS=1
fi

# Prüfen auf displayName
if grep -q "displayName" "${COMPONENT_DIR}/${COMPONENT}.tsx"; then
  log_success "displayName ist gesetzt"
else
  log_warning "displayName ist nicht gesetzt"
  TS_STATUS=1
fi

# Prüfen auf JSDoc-Kommentare
if grep -q "/\*\*" "${COMPONENT_DIR}/${COMPONENT}.tsx"; then
  log_success "JSDoc-Kommentare gefunden"
else
  log_warning "Keine JSDoc-Kommentare gefunden"
  TS_STATUS=1
fi

# Test-Analyse
log_info "Prüfe Tests..."
TEST_STATUS=0

TEST_FILE=""
if [[ -f "${COMPONENT_DIR}/${COMPONENT}.test.tsx" ]]; then
  TEST_FILE="${COMPONENT_DIR}/${COMPONENT}.test.tsx"
elif [[ -f "${COMPONENT_DIR}/__tests__/${COMPONENT}.test.tsx" ]]; then
  TEST_FILE="${COMPONENT_DIR}/__tests__/${COMPONENT}.test.tsx"
fi

if [[ -n "$TEST_FILE" ]]; then
  # Prüfen auf Barrierefreiheitstests
  if grep -q "axe" "$TEST_FILE" || grep -q "toHaveNoViolations" "$TEST_FILE"; then
    log_success "Barrierefreiheitstests gefunden"
  else
    log_warning "Keine Barrierefreiheitstests gefunden"
    TEST_STATUS=1
  fi
  
  # Prüfen auf Snapshot-Tests
  if grep -q "toMatchSnapshot" "$TEST_FILE"; then
    log_success "Snapshot-Tests gefunden"
  else
    log_warning "Keine Snapshot-Tests gefunden"
    TEST_STATUS=1
  fi
  
  # Prüfen auf Interaktionstests
  if grep -q "fireEvent" "$TEST_FILE" || grep -q "userEvent" "$TEST_FILE"; then
    log_success "Interaktionstests gefunden"
  else
    log_warning "Keine Interaktionstests gefunden"
    TEST_STATUS=1
  fi
else
  log_warning "Keine Tests vorhanden"
  TEST_STATUS=1
fi

# Barrierefreiheits-Analyse
log_info "Prüfe Barrierefreiheit..."
A11Y_STATUS=0

# Prüfen auf ARIA-Attribute
if grep -q "aria-" "${COMPONENT_DIR}/${COMPONENT}.tsx"; then
  log_success "ARIA-Attribute gefunden"
else
  log_warning "Keine ARIA-Attribute gefunden"
  A11Y_STATUS=1
fi

# Prüfen auf role-Attribute
if grep -q "role=" "${COMPONENT_DIR}/${COMPONENT}.tsx"; then
  log_success "role-Attribute gefunden"
else
  log_warning "Keine role-Attribute gefunden"
  A11Y_STATUS=1
fi

# Prüfen auf Keyboard-Navigation
if grep -q "onKeyDown" "${COMPONENT_DIR}/${COMPONENT}.tsx" || grep -q "onKeyPress" "${COMPONENT_DIR}/${COMPONENT}.tsx"; then
  log_success "Keyboard-Navigation gefunden"
else
  log_warning "Keine Keyboard-Navigation gefunden"
  A11Y_STATUS=1
fi

# Gesamtstatus
log_info "Gesamtstatus..."

if [[ $FILES_STATUS -eq 0 && $TS_STATUS -eq 0 && $TEST_STATUS -eq 0 && $A11Y_STATUS -eq 0 ]]; then
  log_success "Komponente $COMPONENT im Paket $PACKAGE ist vollständig"
  exit 0
else
  log_warning "Komponente $COMPONENT im Paket $PACKAGE ist unvollständig"
  [[ $FILES_STATUS -eq 1 ]] && log_error "  - Fehlende Dateien"
  [[ $TS_STATUS -eq 1 ]] && log_error "  - TypeScript-Probleme"
  [[ $TEST_STATUS -eq 1 ]] && log_error "  - Test-Probleme"
  [[ $A11Y_STATUS -eq 1 ]] && log_error "  - Barrierefreiheits-Probleme"
  exit 1
fi