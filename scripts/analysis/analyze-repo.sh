#!/bin/bash
# -------------------------------------------------------
# analyze-repo.sh
# Analysiert das Repository auf Vollständigkeit und Qualität
#
# Verwendung: ./analyze-repo.sh [--package PACKAGE]
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

# Funktion zur Analyse eines Pakets
analyze_package() {
  local package="$1"
  log_info "Analysiere Paket $package..."
  
  # Paket-Verzeichnis
  local package_dir="${REPO_ROOT}/packages/@smolitux/${package}"
  
  # Prüfen, ob Paket existiert
  if [[ ! -d "$package_dir" ]]; then
    log_error "Paket $package existiert nicht"
    return 1
  fi
  
  # TypeScript-Fehler prüfen
  log_info "Prüfe TypeScript-Fehler..."
  if ! npx tsc --noEmit --project "${package_dir}/tsconfig.json"; then
    log_error "TypeScript-Fehler gefunden im Paket $package"
  else
    log_success "Keine TypeScript-Fehler gefunden im Paket $package"
  fi
  
  # ESLint-Fehler prüfen
  log_info "Prüfe ESLint-Fehler..."
  if ! npx eslint "${package_dir}/src" --ext .ts,.tsx; then
    log_error "ESLint-Fehler gefunden im Paket $package"
  else
    log_success "Keine ESLint-Fehler gefunden im Paket $package"
  fi
  
  # Tests prüfen
  log_info "Prüfe Tests..."
  if ! npx jest --testPathPattern="packages/@smolitux/${package}"; then
    log_error "Tests fehlgeschlagen im Paket $package"
  else
    log_success "Tests erfolgreich im Paket $package"
  fi
  
  # Build prüfen
  log_info "Prüfe Build..."
  if ! npm run build --workspace=@smolitux/${package}; then
    log_error "Build fehlgeschlagen im Paket $package"
  else
    log_success "Build erfolgreich im Paket $package"
  fi
  
  # Komponenten analysieren
  log_info "Analysiere Komponenten..."
  local components_dir="${package_dir}/src/components"
  if [[ -d "$components_dir" ]]; then
    local components=$(find "$components_dir" -maxdepth 1 -mindepth 1 -type d -exec basename {} \;)
    local total_components=0
    local complete_components=0
    
    for component in $components; do
      total_components=$((total_components + 1))
      
      # Komponente analysieren
      log_info "Analysiere Komponente $component..."
      if "${SCRIPT_DIR}/analyze-component.sh" --package "$package" --component "$component" > /dev/null 2>&1; then
        log_success "Komponente $component ist vollständig"
        complete_components=$((complete_components + 1))
      else
        log_warning "Komponente $component ist unvollständig"
      fi
    done
    
    # Zusammenfassung
    log_info "Zusammenfassung für Paket $package:"
    log_info "  - Gesamtzahl Komponenten: $total_components"
    log_info "  - Vollständige Komponenten: $complete_components"
    log_info "  - Unvollständige Komponenten: $((total_components - complete_components))"
    log_info "  - Vollständigkeitsgrad: $(( (complete_components * 100) / (total_components > 0 ? total_components : 1) ))%"
  else
    log_warning "Keine Komponenten gefunden im Paket $package"
  fi
}

# Hauptfunktionalität
log_info "Analysiere Repository..."

# Wenn ein Paket angegeben wurde, nur dieses analysieren
if [[ -n "$PACKAGE" ]]; then
  analyze_package "$PACKAGE"
else
  # Alle Pakete analysieren
  log_info "Analysiere alle Pakete..."
  
  # Pakete finden
  PACKAGES=$(find "${REPO_ROOT}/packages/@smolitux" -maxdepth 1 -mindepth 1 -type d -exec basename {} \;)
  
  # Pakete analysieren
  for package in $PACKAGES; do
    analyze_package "$package"
  done
  
  # Gesamtzusammenfassung
  log_info "Gesamtzusammenfassung:"
  log_info "  - Anzahl Pakete: $(echo "$PACKAGES" | wc -w)"
  
  # TypeScript-Fehler im gesamten Repository prüfen
  log_info "Prüfe TypeScript-Fehler im gesamten Repository..."
  if ! npx tsc --noEmit; then
    log_error "TypeScript-Fehler gefunden im Repository"
  else
    log_success "Keine TypeScript-Fehler gefunden im Repository"
  fi
  
  # ESLint-Fehler im gesamten Repository prüfen
  log_info "Prüfe ESLint-Fehler im gesamten Repository..."
  if ! npx eslint "packages/@smolitux" --ext .ts,.tsx; then
    log_error "ESLint-Fehler gefunden im Repository"
  else
    log_success "Keine ESLint-Fehler gefunden im Repository"
  fi
  
  # Tests im gesamten Repository prüfen
  log_info "Prüfe Tests im gesamten Repository..."
  if ! npx jest; then
    log_error "Tests fehlgeschlagen im Repository"
  else
    log_success "Tests erfolgreich im Repository"
  fi
  
  # Build im gesamten Repository prüfen
  log_info "Prüfe Build im gesamten Repository..."
  if ! npm run build:all; then
    log_error "Build fehlgeschlagen im Repository"
  else
    log_success "Build erfolgreich im Repository"
  fi
fi

log_success "Analyse abgeschlossen"