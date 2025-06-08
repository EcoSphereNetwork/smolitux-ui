#!/bin/bash

# =============================================================================
# Test Coverage Dashboard Generator für SmolitUX
# =============================================================================

# Entferne set -e temporär für besseres Debugging
# set -e  # Exit bei Fehlern

# Konfiguration
DASHBOARD_FILE="docs/wiki/testing/test-coverage-dashboard.md"
PACKAGES_DIR="packages/@smolitux"
DATE=$(date +"%d. %B %Y")
DEBUG=${DEBUG:-false}
VERBOSE=${VERBOSE:-false}
DRY_RUN=${DRY_RUN:-false}
SINGLE_PACKAGE=${SINGLE_PACKAGE:-""}

# Farben für Output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging-Funktionen
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

log_debug() {
    if [ "$DEBUG" = true ]; then
        echo -e "${YELLOW}🐛 DEBUG: $1${NC}"
    fi
}

# Hilfsfunktionen
check_dependencies() {
    log_info "Überprüfe Abhängigkeiten..."
    
    local missing_deps=()
    
    if ! command -v npm &> /dev/null; then
        missing_deps+=("npm")
    fi
    
    if ! command -v jq &> /dev/null; then
        missing_deps+=("jq")
    fi
    
    if [ ${#missing_deps[@]} -ne 0 ]; then
        log_error "Fehlende Abhängigkeiten: ${missing_deps[*]}"
        log_info "Installation: sudo apt-get install ${missing_deps[*]}"
        exit 1
    fi
    
    log_success "Alle Abhängigkeiten verfügbar"
}

# Coverage-Bewertung mit Emojis
rating_emoji() {
    local percent=$1
    if [ -z "$percent" ] || [ "$percent" = "null" ]; then
        echo "🚫 N/A"
        return
    fi
    
    # Entferne Anführungszeichen falls vorhanden
    percent=$(echo "$percent" | tr -d '"')
    
    if (( $(echo "$percent >= 90" | bc -l 2>/dev/null || echo "0") )); then
        echo "✅ ${percent}%"
    elif (( $(echo "$percent >= 75" | bc -l 2>/dev/null || echo "0") )); then
        echo "⚠️ ${percent}%"
    elif (( $(echo "$percent >= 50" | bc -l 2>/dev/null || echo "0") )); then
        echo "🔶 ${percent}%"
    else
        echo "❌ ${percent}%"
    fi
}

# Überprüfe ob Workspaces grundsätzlich konfiguriert sind
workspaces_configured() {
    if [ -f "package.json" ]; then
        jq -e '.workspaces' package.json &>/dev/null
    else
        return 1
    fi
}

# Überprüfe ob Workspace existiert
workspace_exists() {
    local workspace_name=$1
    if workspaces_configured; then
        # Teste auch bei Exit-Code != 0, falls Output trotzdem verfügbar ist
        local workspace_output
        workspace_output=$(npm list --workspace="$workspace_name" --depth=0 2>&1)
        local exit_code=$?
        
        # Prüfe ob der Workspace in der Ausgabe erscheint (auch bei Warnungen)
        if echo "$workspace_output" | grep -q "$workspace_name"; then
            log_debug "Workspace $workspace_name gefunden (exit code: $exit_code)"
            return 0
        else
            log_debug "Workspace $workspace_name nicht gefunden"
            return 1
        fi
    else
        return 1
    fi
}

# Finde Coverage-Datei
find_coverage_file() {
    local pkg_path=$1
    local coverage_files=(
        "$pkg_path/coverage/coverage-summary.json"
        "$pkg_path/coverage-summary.json"
        "$pkg_path/tmp/coverage/coverage-summary.json"
        "$pkg_path/coverage/coverage-final.json"
        "$pkg_path/test-results/coverage/coverage-summary.json"
        "$pkg_path/.nyc_output/coverage-summary.json"
    )
    
    for file in "${coverage_files[@]}"; do
        if [ -f "$file" ]; then
            echo "$file"
            return 0
        fi
    done
    
    return 1
}

# Teste ein Paket
test_package() {
    local pkg_path=$1
    local pkg_name=$2
    local workspace_name="@smolitux/$pkg_name"
    
    log_info "Testing $pkg_name..."
    log_debug "Package path: $pkg_path"
    log_debug "Workspace: $workspace_name"
    
    # Überprüfe ob package.json existiert
    if [ ! -f "$pkg_path/package.json" ]; then
        log_warning "Keine package.json in $pkg_path gefunden"
        return 1
    fi
    
    # Überprüfe ob Test-Script existiert
    local has_test_script=$(jq -r '.scripts.test // empty' "$pkg_path/package.json" 2>/dev/null)
    if [ -z "$has_test_script" ]; then
        log_warning "Kein Test-Script in $pkg_name definiert"
        return 1
    fi
    
    # Entscheide zwischen Workspace- und lokalen Tests
    local test_cmd
    local use_workspace=false
    
    if workspaces_configured && workspace_exists "$workspace_name"; then
        # Verwende Workspace-Methode
        test_cmd="npm run test --workspace='$workspace_name' -- --coverage --coverageReporters=json-summary"
        use_workspace=true
        log_debug "Using workspace method"
    else
        # Verwende lokale Methode (cd in Paket-Verzeichnis)
        test_cmd="cd '$pkg_path' && npm test -- --coverage --coverageReporters=json-summary"
        log_debug "Using local method (workspaces not available)"
    fi
    
    log_debug "Executing: $test_cmd"
    
    if [ "$DRY_RUN" = true ]; then
        log_info "DRY RUN: Würde ausführen: $test_cmd"
        return 0
    fi
    
    local output
    if [ "$use_workspace" = true ]; then
        # Workspace-Methode
        if ! output=$(npm run test --workspace="$workspace_name" -- --coverage --coverageReporters=json-summary 2>&1); then
            log_error "Tests für $pkg_name fehlgeschlagen (Workspace)"
            log_debug "Output: $output"
            return 1
        fi
    else
        # Lokale Methode
        if ! output=$(cd "$pkg_path" && npm test -- --coverage --coverageReporters=json-summary 2>&1); then
            log_error "Tests für $pkg_name fehlgeschlagen (Lokal)"
            log_debug "Output: $output"
            return 1
        fi
    fi
    
    log_success "Tests für $pkg_name erfolgreich"
    return 0
}

# Parse Coverage-Daten
parse_coverage() {
    local coverage_file=$1
    local pkg_name=$2
    
    log_debug "Parsing coverage file: $coverage_file"
    
    if [ ! -f "$coverage_file" ]; then
        log_warning "Coverage-Datei nicht gefunden: $coverage_file"
        return 1
    fi
    
    # Validiere JSON
    if ! jq empty "$coverage_file" 2>/dev/null; then
        log_error "Ungültige JSON in $coverage_file"
        return 1
    fi
    
    local data=$(cat "$coverage_file")
    local stmts=$(echo "$data" | jq -r '.total.statements.pct // empty' 2>/dev/null)
    local brchs=$(echo "$data" | jq -r '.total.branches.pct // empty' 2>/dev/null)
    local funcs=$(echo "$data" | jq -r '.total.functions.pct // empty' 2>/dev/null)
    local lines=$(echo "$data" | jq -r '.total.lines.pct // empty' 2>/dev/null)
    
    log_debug "Coverage data - Statements: $stmts, Branches: $brchs, Functions: $funcs, Lines: $lines"
    
    # Formatiere mit Emojis
    local stmt_str=$(rating_emoji "$stmts")
    local brch_str=$(rating_emoji "$brchs")
    local func_str=$(rating_emoji "$funcs")
    local line_str=$(rating_emoji "$lines")
    
    echo "| @smolitux/$pkg_name | $stmt_str | $brch_str | $func_str | $line_str |"
    return 0
}

# Erstelle Dashboard-Header
create_dashboard_header() {
    local file=$1
    
    cat > "$file" << EOF
# Test Coverage Dashboard

Automatisch generiertes Test-Coverage-Dashboard für alle SmolitUX-Pakete.

## Bewertungslegende
- ✅ Exzellent (≥90%)
- ⚠️ Gut (≥75%)
- 🔶 Ausreichend (≥50%)
- ❌ Verbesserung nötig (<50%)
- 🚫 Keine Daten

## Coverage-Übersicht

| Paket | Statements | Branches | Functions | Lines |
|--------|------------|----------|-----------|-------|
EOF
}

# Diagnostiziere Workspace-Konfiguration
diagnose_workspaces() {
    log_info "Diagnostiziere Workspace-Konfiguration..."
    
    if [ ! -f "package.json" ]; then
        log_error "Keine package.json im Root-Verzeichnis gefunden"
        return 1
    fi
    
    local workspaces_config=$(jq -r '.workspaces // empty' package.json 2>/dev/null)
    if [ -z "$workspaces_config" ]; then
        log_warning "Keine Workspaces in package.json konfiguriert"
        log_info "Root package.json sollte etwa so aussehen:"
        echo '  "workspaces": ["packages/@smolitux/*"]'
        return 1
    fi
    
    log_success "Workspaces konfiguriert: $workspaces_config"
    
    # Teste ob npm workspaces grundsätzlich funktioniert
    log_debug "Teste npm workspaces..."
    local workspace_list
    workspace_list=$(npm list --workspaces --depth=0 2>&1)
    local exit_code=$?
    log_debug "npm list exit code: $exit_code"
    
    # Prüfe ob die Ausgabe Workspace-Informationen enthält
    if echo "$workspace_list" | grep -q "@smolitux/"; then
        log_success "npm workspaces funktioniert (Pakete erkannt)"
        if [ $exit_code -ne 0 ]; then
            log_warning "npm meldet Dependency-Probleme, aber Workspaces sind verfügbar"
            log_debug "npm Exit-Code: $exit_code"
            
            # Test ob einzelne Workspaces funktionieren
            log_debug "Teste einzelnen Workspace..."
            local single_test
            single_test=$(npm list --workspace=@smolitux/core --depth=0 2>&1)
            local single_exit=$?
            if [ $single_exit -eq 0 ]; then
                log_success "Einzelne Workspaces funktionieren korrekt"
            else
                log_warning "Auch einzelne Workspaces haben Probleme"
            fi
        fi
        
        log_debug "Verfügbare Workspaces:"
        echo "$workspace_list" | grep "^├─\|^└─" | grep "@smolitux/" | sed 's/^├─\|^└─/ - /' | head -5
        return 0  # Erfolg, auch wenn npm Warnings hatte
    else
        log_error "npm workspaces funktioniert nicht - keine @smolitux Pakete gefunden"
        log_debug "Workspace-Output: $workspace_list"
        return 1
    fi
}

# Main-Funktion
main() {
    log_info "Starte Coverage-Dashboard-Generierung..."
    
    # Überprüfe Abhängigkeiten
    check_dependencies
    
    # Diagnostiziere Workspaces
    local workspace_status=0
    if ! diagnose_workspaces; then
        log_warning "Workspace-Diagnose fehlgeschlagen, verwende lokale Methode"
        workspace_status=1
    fi
    
    # Erstelle Zielverzeichnis falls nötig
    mkdir -p "$(dirname "$DASHBOARD_FILE")"
    
    # Erstelle Dashboard-Header
    create_dashboard_header "$DASHBOARD_FILE"
    
    local total_packages=0
    local successful_packages=0
    local failed_packages=()
    
    # Überprüfe ob Packages-Verzeichnis existiert
    if [ ! -d "$PACKAGES_DIR" ]; then
        log_error "Packages-Verzeichnis nicht gefunden: $PACKAGES_DIR"
        exit 1
    fi
    
    # Durchlaufe alle Pakete oder nur ein spezifisches
    if [ -n "$SINGLE_PACKAGE" ]; then
        # Teste nur ein spezifisches Paket
        local pkg="$PACKAGES_DIR/$SINGLE_PACKAGE"
        if [ ! -d "$pkg" ]; then
            log_error "Paket '$SINGLE_PACKAGE' nicht gefunden in $PACKAGES_DIR"
            exit 1
        fi
        
        log_info "🔬 Teste nur Paket: $SINGLE_PACKAGE"
        
        total_packages=1
        if test_package "$pkg" "$SINGLE_PACKAGE"; then
            local coverage_file
            if coverage_file=$(find_coverage_file "$pkg"); then
                if coverage_line=$(parse_coverage "$coverage_file" "$SINGLE_PACKAGE"); then
                    echo "$coverage_line" >> "$DASHBOARD_FILE"
                    successful_packages=1
                    log_success "Coverage für $SINGLE_PACKAGE hinzugefügt"
                else
                    echo "| @smolitux/$SINGLE_PACKAGE | 🚫 Parse-Fehler | 🚫 | 🚫 | 🚫 |" >> "$DASHBOARD_FILE"
                    failed_packages+=("$SINGLE_PACKAGE (Parse-Fehler)")
                fi
            else
                echo "| @smolitux/$SINGLE_PACKAGE | 🚫 keine Coverage-Datei | 🚫 | 🚫 | 🚫 |" >> "$DASHBOARD_FILE"
                failed_packages+=("$SINGLE_PACKAGE (keine Coverage-Datei)")
            fi
        else
            echo "| @smolitux/$SINGLE_PACKAGE | 🚫 Test fehlgeschlagen | 🚫 | 🚫 | 🚫 |" >> "$DASHBOARD_FILE"
            failed_packages+=("$SINGLE_PACKAGE (Test fehlgeschlagen)")
        fi
    else
        # Durchlaufe alle Pakete
        for pkg in "$PACKAGES_DIR"/*; do
            if [ -d "$pkg" ]; then
                local pkg_name=$(basename "$pkg")
                total_packages=$((total_packages + 1))
                
                log_info "🔬 Verarbeite $pkg_name..."
                
                # Teste das Paket
                if test_package "$pkg" "$pkg_name"; then
                    # Suche Coverage-Datei
                    local coverage_file
                    if coverage_file=$(find_coverage_file "$pkg"); then
                        # Parse Coverage-Daten
                        if coverage_line=$(parse_coverage "$coverage_file" "$pkg_name"); then
                            echo "$coverage_line" >> "$DASHBOARD_FILE"
                            successful_packages=$((successful_packages + 1))
                            log_success "Coverage für $pkg_name hinzugefügt"
                        else
                            echo "| @smolitux/$pkg_name | 🚫 Parse-Fehler | 🚫 | 🚫 | 🚫 |" >> "$DASHBOARD_FILE"
                            failed_packages+=("$pkg_name (Parse-Fehler)")
                        fi
                    else
                        echo "| @smolitux/$pkg_name | 🚫 keine Coverage-Datei | 🚫 | 🚫 | 🚫 |" >> "$DASHBOARD_FILE"
                        failed_packages+=("$pkg_name (keine Coverage-Datei)")
                    fi
                else
                    echo "| @smolitux/$pkg_name | 🚫 Test fehlgeschlagen | 🚫 | 🚫 | 🚫 |" >> "$DASHBOARD_FILE"
                    failed_packages+=("$pkg_name (Test fehlgeschlagen)")
                fi
            fi
        done
    fi
    
    # Footer hinzufügen
    cat >> "$DASHBOARD_FILE" << EOF

## Statistiken
- **Gesamt:** $total_packages Pakete
- **Erfolgreich:** $successful_packages Pakete
- **Fehlgeschlagen:** $((total_packages - successful_packages)) Pakete

> **Letzte Aktualisierung:** $DATE  
> **Generiert mit:** $(basename "$0")
EOF
    
    # Zusammenfassung
    log_success "Dashboard aktualisiert: $DASHBOARD_FILE"
    log_info "Statistiken: $successful_packages/$total_packages Pakete erfolgreich"
    
    if [ ${#failed_packages[@]} -gt 0 ]; then
        log_warning "Fehlgeschlagene Pakete:"
        for pkg in "${failed_packages[@]}"; do
            echo "  - $pkg"
        done
    fi
}

# Hilfe anzeigen
show_help() {
    cat << EOF
Test Coverage Dashboard Generator für SmolitUX

Usage: $0 [OPTIONS]

OPTIONS:
    -h, --help              Zeige diese Hilfe
    -d, --debug             Aktiviere Debug-Ausgaben
    -v, --verbose           Aktiviere verbose Ausgaben
    --dry-run               Führe nur eine Simulation aus
    -p, --package <name>    Teste nur ein spezifisches Paket
    --diagnose             Nur Workspace-Diagnostik ausführen

ENVIRONMENT VARIABLES:
    DEBUG=true              Aktiviere Debug-Modus
    VERBOSE=true            Aktiviere verbose Modus
    DRY_RUN=true            Führe nur eine Simulation aus
    SINGLE_PACKAGE=<name>   Teste nur ein spezifisches Paket

EXAMPLES:
    $0                                  # Normale Ausführung
    DEBUG=true $0                       # Mit Debug-Ausgaben
    $0 --verbose --debug                # Mit allen Ausgaben
    $0 --dry-run                       # Simulation ohne Ausführung
    $0 --package core                   # Nur das 'core' Paket testen
    $0 --diagnose                      # Nur Workspace-Diagnostik

TROUBLESHOOTING:
    # Wenn Workspaces nicht funktionieren:
    $0 --debug --verbose               # Zeigt detaillierte Fehlermeldungen
    
    # Workspace-Konfiguration prüfen:
    npm list --workspaces --depth=0
    
    # Einzelnes Paket manuell testen:
    cd packages/@smolitux/core && npm test

EOF
}

# Argument-Parsing
DIAGNOSE_ONLY=false

while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            show_help
            exit 0
            ;;
        -d|--debug)
            DEBUG=true
            shift
            ;;
        -v|--verbose)
            VERBOSE=true
            shift
            ;;
        --dry-run)
            DRY_RUN=true
            shift
            ;;
        -p|--package)
            SINGLE_PACKAGE="$2"
            shift 2
            ;;
        --diagnose)
            DIAGNOSE_ONLY=true
            shift
            ;;
        *)
            log_error "Unbekannte Option: $1"
            show_help
            exit 1
            ;;
    esac
done

# Nur Diagnostik ausführen wenn gewünscht
if [ "$DIAGNOSE_ONLY" = true ]; then
    log_info "Führe nur Workspace-Diagnostik aus..."
    check_dependencies
    diagnose_workspaces
    exit $?
fi

# Führe main-Funktion aus
main
