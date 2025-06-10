#!/bin/bash
# -------------------------------------------------------
# validate-build.sh
# Validiert den Build-Prozess
#
# Verwendung: ./validate-build.sh [--package PACKAGE]
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

while [[ $# -gt 0 ]]; do
  case "$1" in
    --package)
      PACKAGE="$2"
      shift 2
      ;;
    *)
      log_error "Unbekanntes Argument: $1"
      exit 1
      ;;
  esac
done

# Funktion zur Validierung eines Pakets
validate_package_build() {
  local package="$1"
  log_info "Validiere Build für Paket $package..."
  
  # Paket-Verzeichnis
  local package_dir="${REPO_ROOT}/packages/@smolitux/${package}"
  
  # Prüfen, ob Paket existiert
  if [[ ! -d "$package_dir" ]]; then
    log_error "Paket $package existiert nicht"
    return 1
  fi
  
  # Build durchführen
  log_info "Führe Build durch..."
  if ! npm run build --workspace=@smolitux/${package}; then
    log_error "Build fehlgeschlagen für Paket $package"
    return 1
  fi
  
  # Prüfen, ob dist-Verzeichnis existiert
  local dist_dir="${package_dir}/dist"
  if [[ ! -d "$dist_dir" ]]; then
    log_error "dist-Verzeichnis existiert nicht für Paket $package"
    return 1
  fi
  
  # Prüfen, ob ESM-Build existiert
  if [[ ! -f "${dist_dir}/index.mjs" ]]; then
    log_error "ESM-Build existiert nicht für Paket $package"
    return 1
  fi
  
  # Prüfen, ob CJS-Build existiert
  if [[ ! -f "${dist_dir}/index.js" ]]; then
    log_error "CJS-Build existiert nicht für Paket $package"
    return 1
  fi
  
  # Prüfen, ob TypeScript-Definitionen existieren
  if [[ ! -f "${dist_dir}/index.d.ts" ]]; then
    log_error "TypeScript-Definitionen existieren nicht für Paket $package"
    return 1
  fi
  
  log_success "Build erfolgreich für Paket $package"
  return 0
}

# Hauptfunktionalität
log_info "Validiere Build-Prozess..."

# Wenn ein Paket angegeben wurde, nur dieses validieren
if [[ -n "$PACKAGE" ]]; then
  validate_package_build "$PACKAGE"
  BUILD_STATUS=$?
else
  # Alle Pakete validieren
  log_info "Validiere Build für alle Pakete..."
  
  # Pakete finden
  PACKAGES=$(find "${REPO_ROOT}/packages/@smolitux" -maxdepth 1 -mindepth 1 -type d -exec basename {} \;)
  
  # Pakete validieren
  BUILD_STATUS=0
  for package in $PACKAGES; do
    if ! validate_package_build "$package"; then
      BUILD_STATUS=1
    fi
  done
  
  # Gesamtbuild validieren
  log_info "Validiere Gesamtbuild..."
  if ! npm run build:all; then
    log_error "Gesamtbuild fehlgeschlagen"
    BUILD_STATUS=1
  else
    log_success "Gesamtbuild erfolgreich"
  fi
fi

# Gesamtstatus
if [[ $BUILD_STATUS -eq 0 ]]; then
  log_success "Build-Validierung erfolgreich"
  exit 0
else
  log_error "Build-Validierung fehlgeschlagen"
  exit 1
fi